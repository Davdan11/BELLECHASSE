"use client";
import { useMemo, useState } from 'react';
import Link from 'next/link';
import styles from './SubsidyCalculator.module.css';

/*
 * MONTANTS INDICATIFS — À VALIDER AUPRÈS DES PROGRAMMES.
 * Les fourchettes ci-dessous sont des ordres de grandeur utilisés pour donner une idée du
 * coût net d'un projet. Elles ne constituent ni une promesse ni une offre. Les montants réels
 * dépendent de la capacité de chauffage de l'appareil, de son inscription sur les listes de
 * modèles admissibles, du système remplacé, du type de bâtiment et des budgets disponibles.
 * Sources à consulter : LogisVert (Hydro-Québec) et Rénoclimat (Gouvernement du Québec).
 */
export const SUBSIDY_CONFIG = {
  updated: '2026-09-09',
  disclaimer: 'Montants à valider auprès des programmes. Estimation indicative, sans engagement.',
  logisvert: {
    // [min, max] en dollars, selon l'appareil et le système remplacé
    murale: { sansConversion: [500, 2500], conversion: [1500, 4000] },
    centrale: { sansConversion: [1000, 5000], conversion: [3000, 7000] },
  },
  renoclimat: {
    // Rénoclimat exige une évaluation énergétique avant et après les travaux.
    murale: { sansConversion: [0, 800], conversion: [800, 2500] },
    centrale: { sansConversion: [0, 1000], conversion: [1000, 3000] },
  },
};

const APPLIANCES = [
  { value: 'murale', label: 'Thermopompe murale ou multizone' },
  { value: 'centrale', label: 'Thermopompe centrale (avec conduits)' },
];

const CURRENT = [
  { value: 'electrique', label: 'Plinthes ou fournaise électrique' },
  { value: 'mazout', label: 'Fournaise au mazout' },
  { value: 'gaz', label: 'Fournaise au gaz ou au propane' },
  { value: 'thermopompe', label: 'Thermopompe existante à remplacer' },
];

const OCCUPANCY = [
  { value: 'occupant', label: 'Propriétaire occupant' },
  { value: 'non-occupant', label: 'Propriétaire non occupant (logement loué)' },
];

const BUILDINGS = [
  { value: 'unifamiliale', label: 'Maison unifamiliale ou jumelée' },
  { value: 'plex', label: 'Duplex, triplex ou petit plex' },
  { value: 'condo', label: 'Condo (copropriété divise)' },
];

const money = (n) => `${Math.round(n).toLocaleString('fr-CA')} $`;

function estimate({ appliance, current, occupancy, building }) {
  const conversion = current === 'mazout' || current === 'gaz';
  const key = conversion ? 'conversion' : 'sansConversion';
  const notes = [];

  let lv = [...SUBSIDY_CONFIG.logisvert[appliance][key]];
  let rc = [...SUBSIDY_CONFIG.renoclimat[appliance][key]];

  if (current === 'thermopompe') {
    // Le remplacement d'une thermopompe existante est parfois exclu ou réduit.
    lv = [0, lv[1]];
    rc = [0, rc[1]];
    notes.push("Le remplacement d'une thermopompe existante n'est pas toujours admissible. Certains programmes exigent que l'appareil remplacé soit un système de chauffage électrique classique ou à combustible.");
  }

  if (conversion) {
    notes.push("Les conversions du mazout, du gaz et du propane donnent droit aux montants majorés. Le retrait du réservoir à mazout peut aussi faire l'objet d'une aide municipale ponctuelle.");
  }

  if (building === 'condo') {
    rc = [0, 0];
    notes.push("Rénoclimat vise surtout les maisons et les petits immeubles; un condo dans un grand immeuble n'y est généralement pas admissible. LogisVert peut s'appliquer à l'unité avec l'accord du syndicat pour l'unité extérieure.");
  }

  if (building === 'plex') {
    notes.push("Dans un plex, chaque logement équipé peut faire l'objet d'une demande distincte selon les règles du programme. L'évaluation Rénoclimat porte sur le bâtiment entier.");
  }

  if (occupancy === 'non-occupant') {
    notes.push("Certaines aides sont réservées aux propriétaires occupants ou demandent que le compte d'électricité soit au nom du demandeur. Un propriétaire de petit immeuble locatif peut toutefois être admissible à Rénoclimat. À vérifier selon votre situation.");
    lv = [0, lv[1]];
  }

  const total = [lv[0] + rc[0], lv[1] + rc[1]];
  return { lv, rc, total, conversion, notes };
}

function Group({ name, label, options, value, onChange }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{label}</legend>
      <div className={styles.options}>
        {options.map((o) => {
          const active = value === o.value;
          return (
            <label key={o.value} className={`${styles.option} ${active ? styles.optionActive : ''}`}>
              <input type="radio" name={name} value={o.value} checked={active} onChange={onChange} className={styles.srOnly} />
              <span className={styles.check} aria-hidden="true" />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function SubsidyCalculator() {
  const [values, setValues] = useState({ appliance: 'murale', current: 'electrique', occupancy: 'occupant', building: 'unifamiliale' });
  const result = useMemo(() => estimate(values), [values]);
  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <span className={styles.eyebrow}>VOTRE PROJET</span>
        <Group name="appliance" label="Type d’appareil" options={APPLIANCES} value={values.appliance} onChange={set('appliance')} />
        <Group name="current" label="Système de chauffage actuel" options={CURRENT} value={values.current} onChange={set('current')} />
        <Group name="building" label="Type d’habitation" options={BUILDINGS} value={values.building} onChange={set('building')} />
        <Group name="occupancy" label="Occupation" options={OCCUPANCY} value={values.occupancy} onChange={set('occupancy')} />
      </form>

      <div className={styles.result} aria-live="polite">
        <span className={styles.eyebrow}>ESTIMATION INDICATIVE</span>
        <p className={styles.total}>
          {result.total[1] === 0 ? 'À vérifier' : `${money(result.total[0])} à ${money(result.total[1])}`}
        </p>
        <p className={styles.totalLabel}>d’aide financière potentielle{result.conversion ? ', conversion incluse' : ''}</p>

        <dl className={styles.lines}>
          <div>
            <dt>LogisVert (Hydro-Québec)</dt>
            <dd>{result.lv[1] === 0 ? 'À vérifier' : `${money(result.lv[0])} à ${money(result.lv[1])}`}</dd>
          </div>
          <div>
            <dt>Rénoclimat (Québec)</dt>
            <dd>{result.rc[1] === 0 ? 'Généralement non admissible' : `${money(result.rc[0])} à ${money(result.rc[1])}`}</dd>
          </div>
        </dl>

        {result.notes.length > 0 && (
          <ul className={styles.notes}>
            {result.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        )}

        <p className={styles.disclaimer}>
          {SUBSIDY_CONFIG.disclaimer} L’appareil doit être inscrit sur les listes de modèles admissibles et installé par un
          entrepreneur licencié RBQ. Dernière mise à jour : {SUBSIDY_CONFIG.updated}.
        </p>

        <div className={styles.actions}>
          <Link href="/rendez-vous" className={styles.button}>
            Réserver une évaluation gratuite
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
          </Link>
          <Link href="/financement" className={styles.link}>Voir le financement</Link>
        </div>
      </div>
    </div>
  );
}

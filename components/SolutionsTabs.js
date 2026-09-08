"use client";
import { useEffect, useState } from 'react';
import styles from './SolutionsTabs.module.css';

export const SOLUTION_TABS = [
  { id: 'thermopompes-centrales', num: '01', label: <>Thermopompes<br />centrales</> },
  { id: 'thermopompes-murales', num: '02', label: <>Thermopompes<br />murales</> },
  { id: 'climatisation', num: '03', label: 'Climatisation' },
  { id: 'chauffage', num: '04', label: 'Chauffage' },
  { id: 'ventilation', num: '05', label: 'Ventilation' },
];

export default function SolutionsTabs() {
  const [active, setActive] = useState(SOLUTION_TABS[0].id);

  useEffect(() => {
    const targets = SOLUTION_TABS
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="Sections des solutions">
      <div className={`container ${styles.row}`}>
        {SOLUTION_TABS.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`${styles.tab} ${active === t.id ? styles.active : ''}`}
            aria-current={active === t.id ? 'true' : undefined}
          >
            <span className={styles.num}>{t.num}</span>
            <span className={styles.label}>{t.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

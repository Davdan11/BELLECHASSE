import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  const services = [
    {
      title: "Installation",
      desc: "Nos experts assurent une installation clé en main, propre et conforme aux normes les plus strictes de l'industrie pour optimiser la durée de vie de vos appareils.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      title: "Entretien préventif",
      desc: "Un entretien régulier de vos systèmes de chauffage et de climatisation garantit une meilleure efficacité énergétique et prévient les bris coûteux.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      )
    },
    {
      title: "Réparation & SAV",
      desc: "Un problème technique ? Notre équipe de techniciens qualifiés intervient rapidement pour diagnostiquer et réparer vos appareils de toutes marques.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <rect x="6" y="2" width="12" height="8" rx="2" ry="2" />
          <line x1="12" y1="14" x2="12" y2="22" />
        </svg>
      )
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Nos Services</span>
          <h2 className={styles.title}>Une offre complète pour votre confort</h2>
          <p className={styles.desc}>
            De l&apos;achat à l&apos;entretien, Bellechasse Énergie vous accompagne à chaque étape pour assurer le climat parfait dans votre demeure.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

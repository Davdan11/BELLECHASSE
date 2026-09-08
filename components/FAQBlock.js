import styles from './FAQBlock.module.css';

/**
 * Server-rendered FAQ using <details>. The matching FAQPage JSON-LD
 * is emitted by the page that uses this block.
 */
export default function FAQBlock({ faq = [], eyebrow = 'QUESTIONS FRÉQUENTES', title = 'On nous demande souvent…' }) {
  if (!faq.length) return null;
  return (
    <section className={styles.section} aria-labelledby="faq-block-title">
      <div className="container">
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 id="faq-block-title" className={styles.title}>{title}</h2>
        <div className={styles.list}>
          {faq.map((f) => (
            <details key={f.q} className={styles.item}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

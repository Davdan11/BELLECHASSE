import Image from 'next/image';
import styles from './BrandMarquee.module.css';

export default function BrandMarquee() {
  const logos = [
    '/marqee-1.webp',
    '/marqee-2.webp',
    '/marqee-3.webp',
    '/marqee-4.webp',
    '/marqee-5.webp',
    '/marqee-6.webp',
    '/marqee-7.webp',
  ];

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {/* Double the logos to create an infinite seamless loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <Image 
                src={logo} 
                alt={`Marque partenaire ${index + 1}`}
                width={200}
                height={80}
                style={{ width: 'auto', height: '100%', maxHeight: '60px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

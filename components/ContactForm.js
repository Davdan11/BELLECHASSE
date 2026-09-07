"use client";
import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for the frontend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      e.target.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Text and Info */}
        <div className={styles.textContent}>
          <h2 className={styles.title}>Prêt à améliorer votre confort ?</h2>
          <p className={styles.subtitle}>
            Remplissez le formulaire ci-dessous et notre équipe d'experts vous contactera rapidement pour discuter de vos besoins.
          </p>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span>(514) 494-0400</span>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span>info@bellechasseenergie.com</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Demander une soumission</h3>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Nom complet</label>
              <input type="text" id="name" name="name" className={styles.input} placeholder="Jean Tremblay" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Courriel</label>
              <input type="email" id="email" name="email" className={styles.input} placeholder="jean@exemple.com" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>Téléphone</label>
              <input type="tel" id="phone" name="phone" className={styles.input} placeholder="(514) 123-4567" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>De quoi avez-vous besoin ?</label>
              <textarea 
                id="message" 
                name="message" 
                className={styles.textarea} 
                placeholder="Ex: Je veux le même air climatisé que mon voisin..." 
                required
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : (
                <>
                  Envoyer la demande
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
            
            {isSuccess && (
              <div style={{ marginTop: '1rem', color: '#10b981', fontWeight: '600', textAlign: 'center' }}>
                Merci ! Votre demande a été envoyée avec succès.
              </div>
            )}
          </form>
        </div>
        
      </div>
    </section>
  );
}

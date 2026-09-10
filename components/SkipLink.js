"use client";

/** Lien « passer au contenu » pour la navigation au clavier. */
export default function SkipLink() {
  const go = (e) => {
    const main = document.querySelector('main');
    if (!main) return;
    e.preventDefault();
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: false });
    main.scrollIntoView({ block: 'start' });
  };
  return (
    <a href="#contenu" className="skip-link" onClick={go}>
      Passer au contenu
    </a>
  );
}

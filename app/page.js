import EditorialNavbar from '../components/EditorialNavbar';
import EditorialHero from '../components/EditorialHero';
import EditorialSolutions from '../components/EditorialSolutions';
import EditorialExpertise from '../components/EditorialExpertise';
import EditorialContact from '../components/EditorialContact';
import EditorialTrustMarks from '../components/EditorialTrustMarks';
import EditorialProducts from '../components/EditorialProducts';
import EditorialDaikin from '../components/EditorialDaikin';
import EditorialVideos from '../components/EditorialVideos';
import EditorialCharity from '../components/EditorialCharity';
import EditorialFinancing from '../components/EditorialFinancing';
import EditorialFAQ from '../components/EditorialFAQ';
import EditorialFooterFull from '../components/EditorialFooterFull';
import Testimonials from '../components/Testimonials';
import { SITE_URL } from '../lib/site';

export const metadata = {
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <>
      <EditorialNavbar />
      <main id="contenu">
        <EditorialHero />
        <EditorialSolutions />
        <EditorialExpertise />
        <EditorialTrustMarks />
        <EditorialProducts />
        <EditorialDaikin />
        <EditorialVideos />
        <Testimonials />
        <EditorialCharity />
        <EditorialFinancing />
        <EditorialFAQ />
      </main>
      <EditorialFooterFull />
    </>
  );
}

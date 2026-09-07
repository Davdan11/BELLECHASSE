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
import EditorialFooterFull from '../components/EditorialFooterFull';

export default function Home() {
  return (
    <>
      <EditorialNavbar />
      <main>
        <EditorialHero />
        <EditorialSolutions />
        <EditorialExpertise />
        <EditorialTrustMarks />
        <EditorialProducts />
        <EditorialDaikin />
        <EditorialVideos />
        <EditorialCharity />
        <EditorialFinancing />
      </main>
      <EditorialFooterFull />
    </>
  );
}

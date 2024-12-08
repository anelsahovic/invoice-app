import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardSection from './components/DashboardSection';
import PdfSection from './components/PdfSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="">
      <div className="mx-auto h-full bg-gradient-to-r from-[#3da1f3] via-[#0ccfd6] to-[#099e83] z-10">
        <Navbar />
        <Hero />
      </div>
      <DashboardSection />
      <PdfSection />
      <Footer />
    </div>
  );
}

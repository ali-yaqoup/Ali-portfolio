import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import InternshipsSection from './sections/InternshipsSection';
import EducationSection from './sections/EducationSection';
import CertificationsSection from './sections/CertificationsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Scene3D from './components/Scene3D';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Scene3D />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <InternshipsSection />
      <EducationSection />
      <CertificationsSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
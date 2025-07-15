import React from "react";
import Navbar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/HeroBanner";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";
import AboutSection from "../components/LandingPage/AboutSection";
import ProjectsSection from "../components/LandingPage/ProjectSection";
import HappyClients from "../components/LandingPage/HappyClients";
import Footer from "../components/LandingPage/Footer";
import ContactForm from "../components/LandingPage/ContactForm";
import Newsletter from "../components/LandingPage/Newsletter";

const LandingPage = () => {
  return (
    <div className="font-['Poppins'] bg-white text-[#1b2430] scroll-smooth overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <AboutSection />
        <ProjectsSection />
        <HappyClients /> 
         <ContactForm/>  
         <Newsletter/>
        </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

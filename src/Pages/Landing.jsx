import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Reviews from "../components/Reviews";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Reviews />
        <Testimonials />
        <CallToAction />
      <Footer />
    </div>
  )
}

export default Landing


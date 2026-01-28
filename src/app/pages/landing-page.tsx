import About from "../_components/about";
import Booking from "../_components/booking";
import Footer from "../_components/footer";
import Hero from "../_components/hero";
import Navbar from "../_components/navbar";
import Pricing from "../_components/pricing";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Pricing />
      <Booking/> 
      <Footer/> 
    </>
  );
};

export default LandingPage;

import AboutPoolix from "./Components/AboutPoolix/AboutPoolix"
import ContactUs from "./Components/ContactUs/ContactUs"
import FunFucts from "./Components/FunFucts/FunFucts"
import MainTop from "./Components/MainTop/MainTop"
import Portfolio from "./Components/Portfolio/Portfolio"
import Services from "./Components/Services/Services"
import Subscribe from "./Components/Subscribe/Subscribe"
import Testimonials from "./Components/Testimonials/Testimonials"
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs"
import Workers from "./Components/Workers/Workers"

function AboutUs() {
  return (
    <>
      <MainTop/>
      <AboutPoolix/>
      <Services/>
      <ContactUs/>
      <Testimonials/>
      <FunFucts/>
      <WhyChooseUs/>
      <Portfolio/>
      <Workers/>
      <Subscribe/>
    </>
  )
}
export default AboutUs
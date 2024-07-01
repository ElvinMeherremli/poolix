import AboutPoolix from "./Components/AboutPoolix/AboutPoolix";
import ContactUs from "./Components/ContactUs/ContactUs";
import FeaturesServices from "./Components/FeaturesServices/FeaturesServices";
import MainTop from "./Components/MainTop/MainTop";
import Portfolio from "./Components/Portfolio/Portfolio";
import Services from "./Components/Services/Services";
import Testimonials from "./Components/Testimonials/Testimonials";
import WhyChoose from "./Components/WhyChoose/WhyChoose";
import Workers from "./Components/Workers/Workers";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainTop />
      <FeaturesServices />
      <AboutPoolix />
      <Services />
      <WhyChoose />
      <Workers />
      <Portfolio />
      <Testimonials />
      <ContactUs />
    </>
  );
}
export default Home;

import { Helmet } from "react-helmet";
import ContactInfo from "./Components/ContactInfo/ContactInfo";
import GetInTouch from "./Components/GetInTouch/GetInTouch";
import GoogleMap from "./Components/GoogleMap/GoogleMap";
import MainTop from "./Components/MainTop/MainTop";
import Subscribe from "./Components/Subscribe/Subscribe";

function Contact() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainTop />
      <ContactInfo />
      <GetInTouch />
      <GoogleMap />
      <Subscribe />
    </>
  );
}
export default Contact;

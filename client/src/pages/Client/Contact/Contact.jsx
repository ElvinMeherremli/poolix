import ContactInfo from "./Components/ContactInfo/ContactInfo"
import GetInTouch from "./Components/GetInTouch/GetInTouch"
import GoogleMap from "./Components/GoogleMap/GoogleMap"
import MainTop from "./Components/MainTop/MainTop"
import Subscribe from "./Components/Subscribe/Subscribe"

function Contact() {
  return (
    <>
      <MainTop/>
      <ContactInfo/>
      <GetInTouch/>
      <GoogleMap/>
      <Subscribe/>
    </>
  )
}
export default Contact
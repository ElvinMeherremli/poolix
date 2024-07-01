import { Helmet } from "react-helmet";
import MainTop from "./Components/MainTop/MainTop";
import PricingTable from "./Components/PricingTable/PricingTable";
import ServicesComponent from "./Components/Services/Services";
import Subscribe from "./Components/Subscribe/Subscribe";

function Services() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Services</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainTop />
      <ServicesComponent />
      <PricingTable />
      <Subscribe />
    </>
  );
}
export default Services;

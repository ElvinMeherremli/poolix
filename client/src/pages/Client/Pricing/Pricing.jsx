import { Helmet } from "react-helmet";
import MainTop from "./Components/MainTop/MainTop";
import PricingTable from "./Components/PricingTable/PricingTable";
import Subscribe from "./Components/Subscribe/Subscribe";

function Pricing() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pricing</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainTop />
      <PricingTable />
      <Subscribe />
    </>
  );
}
export default Pricing;

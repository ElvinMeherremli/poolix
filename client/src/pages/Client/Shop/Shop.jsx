import { Helmet } from "react-helmet";
import Content from "./Components/Content/Content";
import MainTop from "./Components/MainTop/MainTop";

function Shop() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainTop />
      <Content />
    </>
  );
}
export default Shop;

import { Outlet } from "react-router-dom";
import Header from "../../components/Admin/Header/Header";
import { Helmet } from "react-helmet";

function LayoutPageAdmin() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Header />
      <Outlet />
    </>
  );
}
export default LayoutPageAdmin;

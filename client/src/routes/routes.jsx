import AboutUs from "../pages/Client/AboutUs/AboutUs";
import Home from "../pages/Client/Home/Home";
import Contact from "../pages/Client/Contact/Contact";
import LayoutPageClient from "../pages/Client/LayoutPageClient";
import Pricing from "../pages/Client/Pricing/Pricing";
import Shop from "../pages/Client/Shop/Shop";
import Services from "../pages/Client/Services/Services";
import Blog from "../pages/Client/Blog/Blog";
import AddServices from "../pages/Admin/AddServices/AddServices";
import LoginAdmin from "../pages/Admin/LoginAdmin/LoginAdmin";

import LayoutPageAdmin from "../pages/Admin/LayoutPageAdmin";
import ServiceDetail from "../pages/Client/Details/Service-Detail/ServiceDetail";

export const ROUTES = [
  {
    path: "",
    element: <LayoutPageClient />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service-detail/:id",
        element: <ServiceDetail />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "admin",
    element: <LayoutPageAdmin />,
    children: [
      {
        index: true,
        element: <LoginAdmin/>
      },
      {
        path: 'servides',
        element: <AddServices/>
      },
    ],
  },
];

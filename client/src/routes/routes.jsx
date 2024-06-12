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
        path: 'add',
        element: <AddServices/>
      },
    ],
  },
];

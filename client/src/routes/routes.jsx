import AboutUs from "../pages/Client/AboutUs/AboutUs";
import Home from "../pages/Client/Home/Home";
import Contact from "../pages/Client/Contact/Contact";
import LayoutPageClient from "../pages/Client/LayoutPageClient";
import Pricing from "../pages/Client/Pricing/Pricing";
import Shop from "../pages/Client/Shop/Shop";
import Services from "../pages/Client/Services/Services";
import AddServices from "../pages/Admin/AddServices/AddServices";
import LoginAdmin from "../pages/Admin/LoginAdmin/LoginAdmin";

import LayoutPageAdmin from "../pages/Admin/LayoutPageAdmin";
import ServiceDetail from "../pages/Client/Details/Service-Detail/ServiceDetail";
import Cart from "../pages/Client/Cart/Cart";
import Users from "../pages/Admin/Users/Users";
import Login from "../pages/Client/Login/Login";
import Register from "../pages/Client/Register/Register";
import Profile from "../pages/Client/Profile/Profile";
import Workers from "../pages/Admin/Workers/Workers";
import Messages from "../pages/Admin/Messages/Messages";
import Basket from "../pages/Admin/Basket/Basket";

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
        path: "/cart",
        element: <Cart />,
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
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'profile',
        element: <Profile/>
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
        path: 'services',
        element: <AddServices/>
      },
      {
        path: 'users',
        element: <Users/>
      },
      {
        path: 'workers',
        element: <Workers/>
      },
      {
        path: 'messages',
        element: <Messages/>
      },
      {
        path: 'basket',
        element: <Basket/>
      },
    ],
  },
];

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./routes/routes";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PortfolioApi,
  ServiceApi,
  TestimonialApi,
  WorkerApi,
} from "./context/ContextApi";

const router = createBrowserRouter(ROUTES);

function App() {
  const [WorkerApiData, setWorkerApiData] = useState();
  const [serviceApiData, setServiceApiData] = useState();
  const [TestimonialApiData, setTestimonialApiData] = useState();
  const [PortfolioApiData, setPortfolioApiData] = useState();
  useEffect(() => {
    axios.get("http://localhost:1212/api/services").then((res) => {
      setServiceApiData(res.data.data);
    });
    axios.get("http://localhost:1212/api/workers").then((res) => {
      setWorkerApiData(res.data.data);
    });
    axios.get("http://localhost:1212/api/testimonials").then((res) => {
      setTestimonialApiData(res.data.data);
    });
    axios.get("http://localhost:1212/api/portfolio").then((res) => {
      setPortfolioApiData(res.data.data);
    });
  }, []);
  return (
    <>
      <WorkerApi.Provider value={{ WorkerApiData, setWorkerApiData }}>
        <TestimonialApi.Provider
          value={{ TestimonialApiData, setTestimonialApiData }}
        >
          <ServiceApi.Provider value={{ serviceApiData, setServiceApiData }}>
            <PortfolioApi.Provider
              value={{ PortfolioApiData, setPortfolioApiData }}
            >
              <RouterProvider router={router} />
            </PortfolioApi.Provider>
          </ServiceApi.Provider>
        </TestimonialApi.Provider>
      </WorkerApi.Provider>
    </>
  );
}

export default App;

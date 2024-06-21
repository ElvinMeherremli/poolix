import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./routes/routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { ServiceApi, TestimonialApi, WorkerApi } from "./context/ContextApi";

const router = createBrowserRouter(ROUTES);

function App() {
  const [WorkerApiData, setWorkerApiData] = useState();
  const [serviceApiData, setServiceApiData] = useState();
  const [TestimonialApiData, setTestimonialApiData] = useState();
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
  }, []);
  return (
    <>
      <WorkerApi.Provider value={{ WorkerApiData, setWorkerApiData }}>
        <TestimonialApi.Provider
          value={{ TestimonialApiData, setTestimonialApiData }}
        >
          <ServiceApi.Provider value={{ serviceApiData, setServiceApiData }}>
            <RouterProvider router={router} />
          </ServiceApi.Provider>
        </TestimonialApi.Provider>
      </WorkerApi.Provider>
    </>
  );
}

export default App;

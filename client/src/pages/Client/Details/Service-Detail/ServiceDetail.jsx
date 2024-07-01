import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainTop from "./Components/MainTop/MainTop";
import Content from "./Components/Content/Content";
import Subscribe from "./Components/Subscribe/Subscribe";
import { Helmet } from "react-helmet";

function ServiceDetail() {
  const { id } = useParams();
  const [serverData, useServerData] = useState();
  useEffect(() => {
    axios.get(`http://localhost:1212/api/services/${id}`).then((res) => {
      useServerData(res.data.data);
    });
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Service</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainTop />
      <Content serverData={serverData} />
      <Subscribe />
    </>
  );
}
export default ServiceDetail;

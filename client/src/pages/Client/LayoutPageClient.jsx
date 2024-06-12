import { Outlet } from "react-router-dom"
import Header from "../../components/User/Header/Header"
import Footer from "../../components/User/Footer/Footer"

function LayoutPageClient() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}
export default LayoutPageClient
import { Outlet } from "react-router-dom"
import Header from "../../components/Admin/Header/Header"

function LayoutPageAdmin() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
export default LayoutPageAdmin
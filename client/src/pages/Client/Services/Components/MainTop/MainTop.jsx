import { Link } from "react-router-dom";
import './MainTop.scss'
function MainTop() {
  return (
    <div className="MainTop_services-section">
      <div className="wrapper">
        <h1>Our Services</h1>
        <div className="nav">
          <Link to={"/"}>Home</Link> <p>&nbsp;/ Our Services</p>
        </div>
      </div>
      <img src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-18.png" alt="" />
    </div>
  );
}
export default MainTop;

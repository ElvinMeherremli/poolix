import { Link } from "react-router-dom";
import './MainTop.scss'
function MainTop() {
  return (
    <div className="MainTop_shop-section">
      <div className="wrapper">
        <h1>Shop Page</h1>
        <div className="nav">
          <Link to={"/"}>Home</Link> <p>&nbsp;/ Shop Page</p>
        </div>
      </div>
      <img src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-17.png" alt="" />
    </div>
  );
}
export default MainTop;

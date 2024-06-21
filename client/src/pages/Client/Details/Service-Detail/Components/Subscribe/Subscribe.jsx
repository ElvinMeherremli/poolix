import "./Subscribe.scss";
function Subscribe() {
  return (
    <div className="Subscribe_serviceDetail-section">
      <div className="wrapper">
        <h3>Subscribe To Our Newsletter</h3>
        <form className="action">
          <input type="mail" placeholder="e-mail address" />
          <button type="submit" className="inner-btn">
            SUBSCRIBE NOW
            <span></span>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Subscribe;

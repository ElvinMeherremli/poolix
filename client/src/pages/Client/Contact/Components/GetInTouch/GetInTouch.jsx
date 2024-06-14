import "./GetInTouch.scss";

function GetInTouch() {
  return (
    <div className="GetInTouch-contact_section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Get In Touch</p>
        <h2 className="title">Get in Touch with Poolix</h2>
        <div className="outer">
          <div className="vector-1">
            <img
              src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-22.png"
              alt=""
            />
          </div>
          <div className="form-inner">
            <form>
              <div className="row gap-y-7">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <input type="text" className="name" placeholder="Your Name" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <input type="email" placeholder="Your email" />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <input type="num" placeholder="Phone"></input>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <textarea placeholder="message"></textarea>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <button className="inner-btn" type="submit">SEND MESSAGE <span></span></button>
                </div>
              </div>
            </form>
          </div>
          <div className="vector-2">
            <img
              src="https://html.tonatheme.com/2023/poolix/assets/images/shape/vector-3.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default GetInTouch;

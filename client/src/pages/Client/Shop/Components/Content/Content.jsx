import { IoIosSearch } from "react-icons/io";
import { useContext, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CartApi } from "../../../../../context/ContextApi";
import ReactSlider from "react-slider";
import "./Content.scss";
import { BasketContext } from "../../../../../context/BaksetContext";

function Content() {
  const { basket, setBasket } = useContext(BasketContext);
  const { CartApiData } = useContext(CartApi);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredData = CartApiData
    ? CartApiData.filter((item) => {
        const matchesSearchTerm = item.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesPriceRange =
          item.price >= priceRange[0] && item.price <= priceRange[1];
        return matchesSearchTerm && matchesPriceRange;
      })
    : [];

  return (
    <div className="Content_shop-section mt-32">
      <div className="container max-w-[1320px]">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="search-section">
              <h3 className="section-title">Search</h3>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <IoIosSearch />
              </div>
            </div>
            <div className="filter_by_price-section">
              <div className="section-title mt-[28px]">Filter by Price</div>
              <ReactSlider
                className="range-slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={100}
                value={priceRange}
                onChange={handlePriceChange}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    className={`${props.className} ${
                      state.index === 1 ? "track-1" : "track-0"
                    }`}
                  />
                )}
              />
              <p className="price_interspace">
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12">
            <div className="row">
              {filteredData.length > 0 ? (
                filteredData.map((elem) => {
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-12" key={elem.id}>
                      <div className="card">
                        <div className="image">
                          <img src={elem.img} alt={elem.productName} />
                          <div className="icon-area">
                            <ul>
                              <li className="facebook-ico social-icon">
                                <CiHeart />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="content">
                          <h3 className="content-title">{elem.productName}</h3>
                          <p className="content-worker-position">
                            ${elem.price}
                          </p>
                          <button
                            onClick={() => {
                              const foundItem = basket.find(
                                (x) => x._id === elem._id
                              );
                              if (foundItem) {
                                foundItem.count += 1;
                                setBasket([...basket]);
                                localStorage.setItem(
                                  "basket",
                                  JSON.stringify(basket)
                                );
                              } else {
                                const basketProduct = { ...elem, count: 1 };
                                setBasket((currentBasket) => {
                                  const newBasket = [
                                    ...currentBasket,
                                    basketProduct,
                                  ];
                                  localStorage.setItem(
                                    "basket",
                                    JSON.stringify(newBasket)
                                  );
                                  return newBasket;
                                });
                              }
                            }}
                            className="inner-btn"
                          >
                            BUY NOW
                            <span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center mx-auto font-medium text-4xl text-[#013B5A]">
                  No products found :(
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;

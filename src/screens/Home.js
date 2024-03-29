import React, { useEffect, useState } from "react";
import Card from "../componenets/Card";
import Footer from "../componenets/Footer";
import Navbar from "../componenets/Navbar";

const Home = () => {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  // If we have to call it once time it is getting loaded(render) the we have to send the empty array },[])
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {/* We have tranfered the carousel from the component to here because we need search bar to be operated here  */}
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-rise="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?pastery"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?latte"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {/* We want to show cards after the setFoodCat and setFoodItem are rendered */}
        {foodCat !== [] ? (
          foodCat.map((data) => {
            // key is used to distinguish elements
            return (
              <div className="row mb-3 g-1">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />

                {/* map function is applied on array not on object */}
                {foodItem !== [] ? 
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-5 col-lg-3"
                        >
                        {/* Here we have done change we are sending foodItem instead */}
                          <Card foodItem = {filterItems}
                            // foodName={filterItems.name}
                            options={filterItems.options[0]}
                            // imgSrc={filterItems.img}
                          ></Card>
                        </div>
                      );
                    })
                 : (
                  <div>No Such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
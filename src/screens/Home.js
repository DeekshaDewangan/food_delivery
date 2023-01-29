import React from "react";
import Card from "../componenets/Card";
import Carousel from "../componenets/Carousel";
import Footer from "../componenets/Footer";
import Navbar from "../componenets/Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel/>
      </div>
      <div className="m-3">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

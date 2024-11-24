import { Fragment, useState, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import Category from '../components/Category'
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from 'axios'
import Logo from '../Images/about.jpg'
import { Box, Typography } from "@mui/material";
import './homecontainer.css';

const Home = () => {
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop(); 

  const [getCategory, SetgetCategory] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/view-category")
      .then((res) => {
        SetgetCategory(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <Fragment>
      <SliderHome />
      {/* <Wrapper /> */}
      <Category
        title="Our Services"
        title1="Whatever you need done"
        bgColor="#333333"
        productItems={getCategory}
      />
      {/* <Section
        title="Selling Product"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      /> */}
      {/* <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      /> */}

      <div className="container10">
        <div className="logo-container10">

          <img src={Logo} alt="Logo" className="logo10" />
        </div>
        <div className="content10">
          <div className="text-container10">
            <h2>Simple, Upfront Pricing</h2>
            <h4>Get more for your money</h4>
            <p>We don’t want to confuse you or leave you wondering how much you’ll be paying for our services, so we work off of an hourly wage. Let us know what your projects are, and we’ll provide a free estimate of hours and our hourly wage for that type of job. Then, you can let us know if you’d like us to come out.</p>
          </div>
        </div>
      </div>



      {/* <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
    </Fragment>
  );
};

export default Home;

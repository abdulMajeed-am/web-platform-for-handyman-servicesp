import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ServiceList from "../components/ServiceList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import WorkerDetails from "../components/WorkerDetails/WorkerDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import Rating from "@mui/material/Rating";
import "./rewiew.css";
import Logo from "../Images/tool-hero-orange.jpg";
import { Button, Box, TextField } from "@mui/material";
import moment from "moment";
const Product = () => {
  const { id } = useParams();
  console.log(id);

  const [selectedProduct, setSelectedProduct] = useState(
    products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedProduct(
      products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item.id !== selectedProduct?.id
      )
    );
  }, [selectedProduct, id]);
  const [Worker, setWorker] = useState([]);
  const [SingleWorker, setSingleWorker] = useState([]);
  useEffect(() => {
    const single = Worker?.filter((worker) => {
      return worker?._id === id;
    });

    setSingleWorker(...single);
  }, [Worker]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/AllWorker")
      .then((res) => {
        setWorker(res.data, "worker");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useWindowScrollToTop();
  const [getService, SetgetService] = useState([]);
  const [getreview, SetGetReview] = useState([]);
  const [count, setCount] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/worker/view-worker-service/${id}`)
      .then((res) => {
        SetgetService(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/get-review/${id}`)
      .then((res) => {
        SetGetReview(res.data);
        console.log(res.data, "SetGetReview");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const [review, setReview] = useState({});
  const HandleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  console.log(review, "review");
  const HandleClick = () => {
    setCount(!count);
    const token = JSON.parse(localStorage.getItem("User"));

    axios
      .post(
        "http://localhost:5000/api/user/review",
        { review, worker_id: id },
        {
          headers: {
            "auth-token": token,
          },
        }
      )

      .then((res) => {
        console.log(res.data,'new');
        setReview({reviews:''})
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      {/* <div classNameName="image-container">
        <img src={Logo} alt="Product-bg" />
        <div classNameName="overlay">
          <Container>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h2 style={{ color: "#d06f2a" }}>Hands-Free</h2>
              </div>
              <div>
                <h2
                  style={{
                    color: "#e3dad3",
                    letterDpacing: "2px",
                    fontWeight: 400,
                    fontFamily: "bebas-neueregular,sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {SingleWorker?.name}
                </h2>
              </div>
              <div>
                <p style={{ color: "#e3dad3", textAlign: "center" }}>
                  "Enjoy the convenience of our skilled handymen for all your
                  furniture assembly needs. Our experts are adept at a wide
                  range of handyman tasks, including assembling furniture, so
                  you can sit back and relax while we take care of it for you."
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div> */}
      <WorkerDetails selectedProduct={SingleWorker} />
      {/* <ProductReviews selectedProduct={selectedProduct} /> */}
      <section classNameName="related-products">
        <Container></Container>
        <ServiceList productItems={getService} />
      </section>
      <section >
        <div className="block">
          <div className="block-header">
            <div className="title">
              <h2>Comments</h2>
              <div className="tag">{getreview.length}</div>
            </div>
          </div>
          <div className="writing">
            <div>
              <TextField
                name="reviews"
                onChange={HandleChange}
                placeholder="Insert Your Comments..."
                value={review.reviews}
                type="text"
                fullWidth
                inputProps={{ style: { border: "none", fontSize: "20px" } }} // Remove border using style prop
                multiline
              />
            </div>
            <div className="footer">
              <div className="text-format">
                <Rating
                  name="rating"
                  onChange={HandleChange}
                  defaultValue={0}
                  size="large"
                />
              </div>
              <div className="group-button">
                <button className="btn">
                  <i className="ri-at-line"></i>
                </button>
                <button className="btn primary" onClick={HandleClick}>
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="scroll-container" >
            {getreview?.slice().reverse().map((rev) => (
              <div className="comment">
                <div className="user-banner">
                  <div className="user">
                    <h5>{rev?.user_id?.name}</h5>
                  </div>
                  <div>
                    <moment>{moment(rev?.Date).format("DD/MMM/YYYY")}</moment>
                  </div>
                  <button className="btn dropdown">
                    <Rating
                      name="size-large"
                      defaultValue={rev.rating}
                      size="large"
                      readOnly
                    />
                  </button>
                </div>
                <div className="content" style={{marginLeft:'120px'}}>
                  <p>{rev?.reviews}</p>
                </div>
                <div className="footer"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Product;

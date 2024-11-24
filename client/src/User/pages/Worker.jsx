import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import { products } from "../utils/products";
import WorkerList from "../components/WorkerList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../Images/tool-hero-orange.jpg";
const Shop = ({role}) => {
  const { id } = useParams();
  console.log(id);
  const [Worker, setWorker] = useState([]);
  const [SingleWorker, setSingleWorker] = useState([]);
  useEffect(() => {
    const single = Worker?.filter((worker) => {
      return worker?.category_id?._id === id;
    });

    setSingleWorker(single);
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

  console.log(SingleWorker);
  const [filterList, setFilterList] = useState(
    products.filter((item) => item.category === "sofa")
  );
  useWindowScrollToTop();

  return (
    <Fragment>
      <div className="image-container" style={{position:'static'}}>
        <img src={Logo} alt="Product-bg" />
        <div className="overlay">
          <Container >
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
                  {SingleWorker[0]?.category_id?.category_name}
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
      </div>
      <section className="filter-bar" style={{ padding: "20px" }}>
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              {/* <FilterSelect setFilterList={setFilterList} /> */}
            </Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h4
                style={{
                  color: "#d06f2a",
                  letterDpacing: "2px",
                  fontWeight: 400,
                  fontFamily: "bebas-neueregular,sans-serif",
                  textTransform: "uppercase",
                }}
              >
                Workers
              </h4>
            </div>
          </Row>
        </Container>
        <Container>
          <WorkerList productItems={SingleWorker} role={role}/>
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;

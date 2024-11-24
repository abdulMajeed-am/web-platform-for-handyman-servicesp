import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState,useEffect} from "react";
import { products } from "../utils/products";
import AllWorkerList from "../components/AllWorkerList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from 'axios'
import Logo from "../Images/tool-hero-orange.jpg";

const Shop = ({role}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [Worker, SetWorker] = useState([]);
  const [count, setCount] = useState(true);
  
  useEffect(() => {
    axios
    .get("http://localhost:5000/api/admin/AllWorker")
    .then((res) => {
      SetWorker(res.data);
      setFilterList(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  const [filterList, setFilterList] = useState();
  console.log(Worker,'SetWorker')
  useWindowScrollToTop();

  const loc=Worker.filter((i)=>i.status == 'Accepted');
  console.log(loc,'lll')

  return (
    <Fragment>
      <div className="image-container">
        <img src={Logo} alt="Product-bg" />
        <div className="overlay">
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
                  All Workers
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
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="d-flex justify-content-center mt-5 align-items-center">
           
            <Col md={6} >
              <SearchBar setFilterList={setFilterList} filterList={Worker} count={count} setCount={setCount}/> 
            </Col>
            <Col md={4}>
              <FilterSelect setFilterList={Worker} loc={loc} setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
            </Col>
          </Row>
        </Container>
        <Container>
        <AllWorkerList productItems={filterList} role={role} selectedOption={selectedOption}/>

        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;

import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
// import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ServiceDetails from "../components/ServiceDetails/ServiceDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from 'axios'
const Product = () => {
  const { id } = useParams();
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

  useWindowScrollToTop();
  const [getService, SetgetService] = useState([]);
//   const [SingleService, setSingleService] = useState([]);
// useEffect(()=>{
//     const single=getService?.filter((value)=>value._id==id)
//     setSingleService(...single)
// },[getService])
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/worker/single-service/${id}`)
      .then((res) => {
        SetgetService(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(SingleService,'SingleService')
  return (
    <Fragment>
      {/* <Banner title={selectedProduct?.productName} /> */}
      <ServiceDetails selectedProduct={getService} />
      {/* <ProductReviews selectedProduct={selectedProduct} /> */}
      <section className="related-products">
        {/* <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} /> */}
      </section>
    </Fragment>
  );
};

export default Product;

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./worker-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  console.log(selectedProduct, 'selectedProduct')
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <>

      <section className="product-page1" style={{ marginTop: '20px',padding:'40px' }}>

        {/* <Container> */}
        <div className="user-details-container">
          <div className="user-image">
            <img loading="lazy" src={`http://localhost:5000/api/worker/${selectedProduct?.profile}`} alt="" />
          </div>
          <div className="user-info">
            <h2>Name: {selectedProduct?.name}</h2>
            <div className="user-rate">
              <span>Email: {selectedProduct?.email}</span>
            </div>
            <div className="user-info">
              <span>Phone: {selectedProduct?.phone}</span>
            </div>
            <div className="user-info">
              <span>Address: {selectedProduct?.address}</span>
            </div>
          </div>
        </div>

        {/* </Container> */}
      </section>
    </>
  );
};

export default ProductDetails;

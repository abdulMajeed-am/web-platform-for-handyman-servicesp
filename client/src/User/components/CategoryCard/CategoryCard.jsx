import { Col } from "react-bootstrap";
import "./category-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  
  const handelClick = (id) => {
    router(`/worker/${id}`);
  };
  
  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };
  
  return (
    <Col lg={2} md={3} sm={4} xs={6} className="product mtop">
      <div className="main-container1">
        <img
          loading="lazy"
          onClick={() => handelClick(productItem._id)}
          src={`http://localhost:5000/api/category/${productItem.category_image}`}
          alt=""
          className="img-fluid"
        />
        <h3 className="product-details" onClick={() => handelClick(productItem._id)}>
          {productItem.category_name}
        </h3>
      </div>
    </Col>
  );
};

export default ProductCard;

import { Col } from "react-bootstrap";
import "./service-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button,Box } from "@mui/material";
import Chip from '@mui/material/Chip';

const ProductCard = ({ title, productItem,topColor }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = (id) => {
    router(`/servicedetails/${id}`);
  };
  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <>
      
        
         
            <div className="card" style={{ "--top-color": topColor,boxShadow:'2px 2px 2px gray'}}>
              <img
                className="card__icon"
                src={`http://localhost:5000/api/upload/${productItem.service_image}`}
                alt="ux-design" 
              />
              <div class="card__body">
                <h4 class="card__head">{productItem.service_name}</h4>
                <p class="card__content">
                Price: ₹ {productItem.service_charge}
                </p>


                <Box sx={{display:'flex',justifyContent:'center',marginTop:'12px'}}>
                  <Chip label="Know More" className="button-container" fullWidth sx={{fontWeight:'700',color:'rgb(208, 111, 42)',fontSize:'12px',padding:'10px'}}
                            onClick={() => handelClick(productItem._id)} component="a" href="#basic-chip" clickable />
                          </Box>


                 {/* <Button
            aria-label="Add"
            type="submit"
            variant="outlined"
            fullWidth
            onClick={() => handelClick(productItem._id)}
          >
             <p style={{fontSize:'15px'}}>View More</p>
          </Button> */}
              </div>
            </div>
           
        
     
    </>
    //   <Col md={3} sm={5} xs={10} className="product mtop" style={{ backgroundColor: '#eeeeee', padding: '20px' }}>
    //   <img
    //     loading="lazy"
    //     onClick={() => handelClick(productItem._id)}
    //     src={`http://localhost:5000/api/upload/${productItem.service_image}`}
    //     alt=""
    //   />
    //   <div className="product-details">
    //     <h3 onClick={() => handelClick(productItem._id)}>{productItem.service_name}</h3>
    //     <div className="price">
    //       <h4>Price: ₹ {productItem.service_charge}</h4>
    //       <button
    //         aria-label="Add"
    //         type="submit"
    //         className="add"
    //         onClick={() => handelClick(productItem._id)}
    //       >
    //         <VisibilityIcon />
    //       </button>
    //     </div>
    //   </div>
    // </Col>
  );
};

export default ProductCard;

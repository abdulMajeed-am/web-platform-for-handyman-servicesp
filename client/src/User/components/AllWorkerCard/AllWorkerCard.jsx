import { Col } from "react-bootstrap";
import "./all-worker-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import EngineeringIcon from '@mui/icons-material/Engineering';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "@mui/material";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const ProductCard = ({ title, productItem,role }) => {
  const dispatch = useDispatch();
  console.log(productItem.profile,'prd')
  const router = useNavigate();
  const handelClick = (id) => {
    router(`/workerdetails/${id}`);
  };
  const handelLogin=()=>{
    router(`/userlogin`)
  }
  return (
    <div className="wsk-cp-product" >
                <div className="wsk-cp-img">
                  <img
                    src={`http://localhost:5000/api/worker/${productItem.profile}`}
                    alt="Product"
                    className="img-responsive"
                    style={{height:'200px',objectFit:'cover'}}
                  />
                </div>
                <div className="wsk-cp-text" style={{marginTop:'-50px'}}>
                  <div className="category">
                    <span>{productItem.category_id.category_name}</span>
                  </div>
                  <div className="title-product">
                    <h3>Name: {productItem.name}</h3>
                  </div>
                  {/* <div className="description-prod">
              <p>Description Product tell me how to change playlist height size like 600px in html5 player. player good work now check this link</p>
            </div> */}
                  <div className="card-footer">
                    <div>
                      {role == "user" ? (
                        
                         <Box sx={{display:'flex',justifyContent:'center'}}>
                           <Chip label="Know More" className="button-container" fullWidth sx={{fontWeight:'700',color:'rgb(208, 111, 42)'}}
                                     onClick={() => handelClick(productItem._id)} component="a" href="#basic-chip" clickable />
                          {/* <Button
                            type="submit"
                            variant="outlined"
                            classNameName="button-container"
                            fullWidth
                            onClick={() => handelClick(productItem._id)}
                            style={{fontSize:15}}
                          >
                            Know More
                          </Button> */}
                        </Box>
                      ) : (
                         
                        <Box sx={{display:'flex',justifyContent:'center'}}>
                        <Chip label="Know More" className="button-container" fullWidth sx={{fontWeight:'700',color:'rgb(208, 111, 42)'}}
                                   onClick={handelLogin} component="a" href="#basic-chip" clickable />
                          {/* <Button
                            type="submit"
                            variant="outlined"
                            fullWidth
                            classNameName="button-container"
                            onClick={handelLogin}
                            style={{fontSize:15}}
                          >
                            Know More
                          </Button> */}
                        </Box>
                      )}
                    </div>
                  </div>
                </div>
              </div>
         
  
  );
};

export default ProductCard;

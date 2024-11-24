import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import Alert from "@mui/material/Alert";
const ShopList = ({ productItems }) => {
  useEffect(() => { }, [productItems]);
  if (productItems.length === 0) {
    return (
      <Alert
        severity="error"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        Service Not Found !!
      </Alert>
    );
  }

  return (
    <div style={{ backgroundColor: "#e3dad3", padding: "40px" }}>
      <>
        <main class="main">
          <div class="container">
            <div
              class="inner"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div class="inner__headings">
                <h5 class="inner__sub">Our Capabilities</h5>
                <h2 class="inner__head">
                  Having attractive services has never been{" "}
                  <span class="inner__clr">easier.</span>
                </h2>
              </div>
              <div class="inner__content">
                <p class="inner__text">
                  We're a brand strategy and digital design agency dedicated to crafting brands that resonate within culture. With over a decade of experience and expertise in digital design, we specialize in building brands that leave a lasting impact.
                </p>
              </div>
            </div>
            <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
              {productItems?.map((productItem, index) => {
                let topColor = ""; // Initialize variable to hold the top color
                // Determine the top color based on the data
                if (productItem.color === 'yellow') {
                  topColor = "#ffd25f";
                } else if (productItem.color === 'blue') {
                  topColor = "#63a2ff";
                } else if (productItem.color === 'green') {
                  topColor = "#5ed291";
                } else {
                  topColor = "#ffd25f"; // Default top color
                }
                return (
                  <>
                  <ServiceCard
                    key={productItem.id}
                    title={null}
                    productItem={productItem}
                    topColor={topColor}

                  />
                  
                  </>
                );
              })}
            </div>

          </div>
        </main>
      </>
    </div>
  );
};
export default memo(ShopList);

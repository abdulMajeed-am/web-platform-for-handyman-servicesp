import { Row } from "react-bootstrap";
import { memo, useState,useEffect } from "react";
import AllWorkerCard from "./AllWorkerCard/AllWorkerCard";
import { Alert } from '@mui/material';




const ShopList = ({ productItems, role, selectedOption }) => {

  const [filteredItems, setFilteredItems] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null); 

  useEffect(() => {
    if (!selectedOption || selectedOption.value === 'all') {
      // If no pincode is selected or 'All' is selected, display all data
      setFilteredItems(productItems?.filter(item => item.status === "Accepted"));
    } else {
      // If a pincode is selected, display data related to that pincode
      setFilteredItems(productItems?.filter(item => item.pincode === selectedOption.value && item.status === "Accepted"));
    }
  }, [productItems, selectedOption]);

  
  return (
    <div className="shell" >
      <div className="container">
        <div className=" " style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {/* {productItems
            ?.filter((value) => value.status === "Accepted")
            ?.map((productItem) => ( */}
              {filteredItems?.length > 0 ? (
            filteredItems.map(productItem => (
              <div key={productItem.id} style={{ flex: '0 0 calc(25% - 15px)', marginBottom: '15px' }}>
                <AllWorkerCard
                  key={productItem.id}
                  title={null}
                  productItem={productItem}
                  role={role}
                />
              </div>
            ))
          ) : (
            <Alert severity="info" className="not-found" style={{ width: '100%', textAlign: 'center',display:'flex',justifyContent:'center' }}>
             <p> No workers found.</p>
            </Alert>
          )}
        </div>
      </div>
    </div>
    // <Row className="justify-content-center">
    //   {productItems?.filter((val)=>val.status=='Accepted')?.map((productItem) => {
    //     return (
    //       <AllWorkerCard
    //         key={productItem.id}
    //         title={null}
    //         productItem={productItem}
    //         role={role}
    //       />
    //     );
    //   })}
    // </Row>
  );
};
export default memo(ShopList);

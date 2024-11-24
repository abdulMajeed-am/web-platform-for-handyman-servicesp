import { memo, useEffect } from "react";
import WorkerCard from "./WorkerCard/WorkerCard";

const ShopList = ({ productItems, role }) => {
  useEffect(() => {}, [productItems]);

  if (productItems.length === 0) {
    return <h1 className="not-found">Worker Not Found !!</h1>;
  }

  return (
    <div className="shell" >
      <div className="container">
        <div className=" " style={{display:'flex',flexWrap:'wrap',gap:'20px',justifyContent:'center'}}>
          {productItems
            .filter((value) => value.status === "Accepted")
            .map((productItem) => (
              <div key={productItem.id} style={{ flex: '0 0 calc(25% - 15px)', marginBottom: '15px'}} >
                <WorkerCard
                  key={productItem.id}
                  title={null}
                  productItem={productItem}
                  role={role}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ShopList);

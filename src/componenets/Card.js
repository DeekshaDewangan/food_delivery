import React from "react";

const Card = (props) => {

  // Data stored in key value pair
  let options = props.options;

  // We want to display keys
  let priceOptions = Object.keys(options);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          {/* In jsx we write like this */}
          <img src={props.imgSrc} className="card-img-top" alt="..." style={{height: "200px", objectFit: "fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodName}</h5>
            <div className="container w-100">

              {/* The options will be shown in a drop down list */}
              <select className="m-2 h-100 bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select name="" id="" className="m-2 h-100 bg-success rounded">
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
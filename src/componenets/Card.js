import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch = useDispatchCart();

  //Changes in the state in the ContextReducer.js is going to get reflected
  let data = useCart();

  // We are required to specify initial value
  const priceRef = useRef();

  // Data stored in key value pair
  let options = props.options;

  // We want to display keys
  let priceOptions = Object.keys(options);

  // For the number of items to be selected by user
  const [qty, setQty] = useState(1);

  // For the size of items to be selected by user
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          anme: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      // await console.log(data);
      return
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      anme: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  let finalPrice = qty * parseInt(options[size]);

  // On the run we are setting the size
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          {/* In jsx we write like this */}
          {/* We have directly sent the value  */}
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              {/* The options will be shown in a drop down list */}
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                name=""
                id=""
                className="m-2 h-100 bg-success rounded"
                // Read about the ref in web
                ref={priceRef}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">${finalPrice}/-</div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

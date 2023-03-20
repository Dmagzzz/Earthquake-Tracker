import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// friends list

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    // image,
    name,
    _id,
    // price,
    // quantity
  } = item;

  const { cart } = state

  // will this be changed to adding friends?
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      {/* need link to friends instead of products */}
      <Link to={`/products/${_id}`}>
        <p>{name}</p>
      </Link>
      <div>
        {/* current status */}
        <div></div>
        {/* donation */}
        <form class="donation">
          <p>Donate:</p>
          <input type="number" id="donated" name="donated"></input><br></br>
          <input type="submit" id="submitbtn" name="submitbtn"></input>
        </form>
      </div>
    </div>
  );
}

export default ProductItem;

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { fetchUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState();

  const isInCart = cart?.cart?.productsInCart?.some(
    (item) => item.productId === product.productId
  );

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [token, user]);

  useEffect(() => {
    if (isInCart) {
      const cartProduct = cart?.cart?.productsInCart?.find(
        (item) => item.productId === product.productId
      );
      setQuantity(cartProduct.quantity)
    }
  }, [isInCart, cart, product]);

  const handleUpdateQuantity = async () => {
    if (isInCart) {
      dispatch(
        updateCartQuantity({
          productId: product.productId,
          productQty: quantity,
          userId: user.userId,
        })
      );
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      navigate("/signup");
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId: product.productId,
          productQty: quantity,
          userId: user.userId,
        })
      ).unwrap();
      dispatch(fetchCart(user.userId));
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error?.message || "Failed to add to cart.");
    }
  };

  return (
    <div className="w-full">
      {isInCart ? (
        <div className="flex items-center  gap-3 px-2 py-1 border-[1px] border-mutedPrimary rounded-md w-full">
         <input type="number" value={quantity} className="focus:ring-0 focus:border-0 w-full flex items-center text-center justify-center" onChange={(e)=>setQuantity(e.target.value)} />
          <button
            onClick={handleUpdateQuantity}
          
            className="bg-primary rounded-sm p-1 text-white"
          >
        Update
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="px-1 py-2 w-full rounded-md text-sm text-white transition bg-primary"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;

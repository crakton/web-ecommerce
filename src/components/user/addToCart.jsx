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
  const [cartItem, setCartItem] = useState();
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
      setCartItem(cartProduct);
    }
  }, [isInCart, cart, product]);

  const handleAddQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (isInCart) {
      dispatch(
        updateCartQuantity({
          productId: product.productId,
          productQty: newQty,
          userId: user.userId,
        })
      );
    }
  };


  const handleRemoveQuantity = () => {
    const newQty = quantity - 1;
    setQuantity(newQty);
    if (isInCart) {
      dispatch(
        updateCartQuantity({
          productId: product.productId,
          productQty: newQty,
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
        <div className="flex items-center justify-between px-2 py-1 border-[1px] border-mutedPrimary rounded-md w-full">
          <button onClick={handleAddQuantity}>
            <FaPlus size={20} />
          </button>
          <p className="border-[1px] w-[35px] flex items-center justify-center text-sm rounded-md border-mutedPrimary">
            {cartItem?.quantity}
          </p>
          <button
            onClick={handleRemoveQuantity}
            disabled={quantity <= 1}
            className={quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}
          >
            <FaMinus size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="px-1 py-2 rounded-md text-sm text-white transition bg-primary"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;

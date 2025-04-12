import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart, removeFromCart } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { fetchUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate =  useNavigate()

  // Fetch user on refresh
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [ token, user]);

  // Check if product is already in cart
  const isInCart = cart?.cart?.productsInCart?.some((item) => item.productId === product.productId);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      navigate("/signup")
      return;
    }

    try {
      await dispatch(addToCart({ productId: product.productId, productQty: 1, userId: user.userId })).unwrap();
      dispatch(fetchCart(user?.user.Id))
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error || "Failed to add to cart.");
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await dispatch(removeFromCart({ userId: user.userId, productId: product.productId })).unwrap();
      toast.success(`${product.name} removed from cart!`);
    } catch (error) {
      toast.error(error || "Failed to remove from cart.");
    }
  };

  return (
    <button
      onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
      className={`px-1 py-2 rounded-md text-sm text-white transition ${
        isInCart ? "bg-gray-400 hover:bg-gray-500" : "bg-pink-600 hover:bg-pink-500"
      }`}
    >
      {isInCart ? "Added to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCart;

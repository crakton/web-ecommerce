import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '../config/api';
import { toast } from 'react-toastify';
import validateCartItems from '../utils/validateCartItems';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [sideCartVisible, setSideCartVisible] = useState(false);
  
    const userData = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
    const userId = userData?.userId;
    const isAuthenticated = useMemo(() => localStorage.getItem('isAuthenticated'), []);
    
    const fetchCart = useCallback(async () => {
        if (!userId) {
            setCartItems([]);
            return;
        }
        try {
            const response = await api.get(`/cart/${userId}`);
            const data = response.data;
            if (data.status) {
                setCartItems(data.cart ?? []);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = useCallback(async (productId, productQty) => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to cart");
            document.location.replace('/Login');
            return;
        }
        try {
            const response = await api.post(`/cart/add`, { userId, productId, productQty });
            if (response.data.success) {
                toast.success("Added item to cart");
                setSideCartVisible(true);
                fetchCart();
            }
        } catch (error) {
            toast.warning(error.response?.data?.message || "An unexpected error occurred.");
            console.error('Cart error:', error.response?.data?.message || error.message);
        }
    }, [fetchCart, userId, isAuthenticated]);

    const removeCartItem = useCallback(async (productId) => {
        if (!isAuthenticated) {
            toast.error("Please login to remove items from cart");
            document.location.replace('/Login');
            return;
        }
        try {
            const response = await api.delete(`/cart/remove/${userId}/${productId}`);
            if (response.data.status) {
                toast.success(response.data.message);
                fetchCart();
            }
        } catch (error) {
            toast.warning(error.response?.data?.message || "An unexpected error occurred.");
            console.error("Cart error:", error);
        }
    }, [fetchCart, userId, isAuthenticated]);

    const updateQty = useCallback(async (productId, productQty) => {
        if (!isAuthenticated) {
            toast.error("Please login to update item quantity");
            document.location.replace('/Login');
            return;
        }
        try {
            const response = await api.put('/cart/update-qty', { userId, productId, productQty });
            if (response.data.status) {
                toast.success(response.data.message);
                fetchCart();
            }
        } catch (error) {
            toast.warning(error.response?.data?.message || "An unexpected error occurred.");
            console.error("Cart error:", error);
        }
    }, [fetchCart, userId, isAuthenticated]);

    const memorizedCartItemCount = useMemo(() => cartItems?.productsInCart?.length || 0, [cartItems]);

    const handleCheckout = useCallback(async (event) => {
        try {
            const validationError = validateCartItems(cartItems?.productsInCart);
            if (validationError) {
                toast.warning(validationError);
                return;
            }

            const mydata = cartItems?.productsInCart?.map(item => ({
                variant_id: item.productId,
                quantity: item.quantity || 1,
            }));

            const transformedData = {
                cart_data: { items: mydata },
                redirect_url: "/checkout",
                metadata: {
                    cartId: cartItems?.cart?.cartId,
                    totalAmount: cartItems?.cart?.total,
                    itemCount: mydata?.length,
                }
            };

            const response = await api.post("/shiprocket/order", transformedData);
            const { token } = response.data || {};

            if (token) {
                window.HeadlessCheckout.addToCart(event, token, {
                    fallbackUrl: "/checkout",
                    onError: (error) => {
                        console.error('[Checkout] HeadlessCheckout error:', error);
                        toast.warning("Error during checkout process. Please try again.");
                    }
                });
            } else {
                toast.warning("Something went wrong during checkout. Please try again.");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            toast.warning(error.response?.data?.message || "Unable to process your request at this time. Please try again later.");
        }
    }, [cartItems]);

    const memorizedValues = useMemo(() => ({
        fetchCart,
        cartItems,
        sideCartVisible,
        setSideCartVisible,
        addToCart,
        updateQty,
        removeCartItem,
        memorizedCartItemCount,
        handleCheckout
    }), [fetchCart, cartItems, sideCartVisible, addToCart, updateQty, removeCartItem, memorizedCartItemCount, handleCheckout]);
  
    return (
        <CartContext.Provider value={memorizedValues}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };

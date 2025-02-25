import { createContext, useCallback, useMemo, useState } from 'react';
import api from '../config/api';
import { toast } from 'react-toastify';
import validateCartItems from '../utils/validateCartItems';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [sideCartVisible, setSideCartVisible] = useState(false);
  
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.userId;
    console.log('logged in user, ', userId);
    const fetchCart = useCallback( async () => {
      
      try {
        
        if (!userId||userId === undefined){
          setCartItems([])
         
          return;
        }
        const response = await api.get(`/cart/${userId}`);
  
        const data = await response.data;
        console.log('cart data: ',data);
        
         if (data.status){
          const items =  data.cart??[];
          setCartItems(items)
         } 
      } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
      }
    },[userId]);
  
    const addToCart = useCallback(async (productId,productQty) => {
      try {

        console.log({userId, productId, productQty});
        
        const isAuthenticated =  localStorage.getItem('isAuthenticated')
        
        if (!isAuthenticated){
          toast.error("Please login to add items to cart");
          document.location.replace('/Login');
          return 
        }
        const response = await api.post(`/cart/add`, {
          userId,
          productId,
          productQty
        });
  
        const data = await response.data;
        if (data.success) {
          toast.success("Added item to cart");
          setSideCartVisible(true)
          fetchCart();
        }
      } catch (error) {
        toast.warning(error.response.data.message)
        console.error('Cart error:', error.response?.data?.message || error.message);
      }
    }, [fetchCart, userId]);

    const removeCartItem = useCallback(async (productId)=>{
      try {
        const isAuthenticated =  localStorage.getItem('isAuthenticated')
        
        if (!isAuthenticated){
          toast.error("Please login to add items to cart");
          document.location.replace('/Login');
          return 
        }
        const response = await api.delete(`/cart/remove/${userId}/${productId}`);
        if (response.data.status){
          toast.success(response.data.message);
          fetchCart();
        }
      } catch (error) {
        toast.warning(error.response.data.message);
        console.error();
      }
    },[fetchCart, userId])

    const updateQty = useCallback(async(productId, productQty) => {
      try {
        const isAuthenticated =  localStorage.getItem('isAuthenticated')
        console.log({userId, productId, productQty});
        
        if (!isAuthenticated){
          toast.error("Please login to add items to cart");
          document.location.replace('/Login');
          return 
        }
        const response = await api.put('/cart/update-qty', {userId,productId, productQty});
        if (response.data.status){
          toast.success(response.data.message);
           fetchCart();
        }

      } catch (error) {
        toast.warning(error.response.data.message)
        console.error(error)
      }
    },[fetchCart, userId])
    const memorizedCartItemCount = useMemo(()=>cartItems?.productsInCart?.length,[cartItems])


// Checkout handler with logging and validation
const handleCheckout = useCallback(async (event) => {
  // Log checkout initiation
  console.log('[Checkout] Initiating checkout process', {
    timestamp: new Date().toISOString(),
    cartId: cartItems?.cart?.cartId,
    itemCount: cartItems?.cart?.productsInCart?.length
  });

  try {
    // Validate cart items
    const validationError = validateCartItems(cartItems?.productsInCart);
    if (validationError) {
      console.error('[Checkout] Validation failed:', validationError);
      toast.warning(validationError);
      return;
    }

    // Transform cart items for Shiprocket API
    const mydata = cartItems?.productsInCart?.map((item) => {
      console.log('[Checkout] Processing item:', {
        productId: item.productId,
        name: item.name,
        quantity: item.quantity
      });

      return {
        variant_id: item.productId,
        quantity: item.quantity || 1,
      };
    });

    const transformedData = {
      cart_data: { items: mydata },
      redirect_url: "/checkout",
      timestamp: new Date().toISOString(),
      metadata: {
        cartId: cartItems?.cart?.cartId,
        totalAmount: cartItems?.cart?.total,
        itemCount: mydata?.length
      }
    };

    // Log API request
    console.log('[Checkout] Sending request to Shiprocket API:', {
      timestamp: transformedData.timestamp,
      itemCount: mydata?.length,
      totalAmount: cartItems?.cart?.total
    });

    // Make API request
    const response = await api.post("/shiprocket/order", transformedData);

    // Log API response
    console.log('[Checkout] Received response from Shiprocket API:', {
      success: response.data?.success,
      hasToken: !!response.data?.token,
      timestamp: new Date().toISOString()
    });

    if (response.data && response.data.token) {
      const { token } = response.data;

      // Log checkout initialization
      console.log('[Checkout] Initializing HeadlessCheckout with token', {
        timestamp: new Date().toISOString()
      });

      // Initialize checkout process
      window.HeadlessCheckout.addToCart(event, token, {
        fallbackUrl: "/checkout",
        onError: (error) => {
          console.error('[Checkout] HeadlessCheckout error:', error);
          toast.warning("Error during checkout process. Please try again.");
        }
      });
    } else {
      const error = "Invalid response format from Shiprocket API.";
      console.error('[Checkout] API Response Error:', {
        error,
        response: response.data,
        timestamp: new Date().toISOString()
      });
      toast.warning("Something went wrong during checkout. Please try again.");
    }
  } catch (error) {
    // Log detailed error information
    console.error('[Checkout] Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      timestamp: new Date().toISOString(),
      cartDetails: {
        cartId: cartItems?.cart?.cartId,
        itemCount: cartItems?.cart?.productsInCart?.length,
        total: cartItems?.cart?.total
      }
    });

    const errorMessage =
      error.response?.data?.message ||
      "Unable to process your request at this time. Please try again later.";
    
    toast.warning(errorMessage);
  }
}, [cartItems?.cart?.cartId, cartItems?.cart?.productsInCart, cartItems?.cart?.total, cartItems?.productsInCart]);
 
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
    }),[fetchCart, cartItems, sideCartVisible, addToCart, updateQty, removeCartItem, memorizedCartItemCount, handleCheckout]);
  
  

  return (
    <CartContext.Provider value={memorizedValues}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };


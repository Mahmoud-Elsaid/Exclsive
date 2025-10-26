import axios from "axios";
import { useContext } from "react";
import { CartContext } from './CartContext';
import { CountersContext } from './../CountersContext/CountersContext';


export default function CartContextProvider({ children }) {
    
    
    
    const { setNumberOfCartItems } = useContext(CountersContext);
    
    function getAuthHeaders() {
        const token = localStorage.getItem("UserToken");
        return token ? { token } : null;
    }

    async function addToCart(productId) {

        const headers = getAuthHeaders();
        if (!headers) return;
        
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers }
            );
            await getCart();
            return response;
        } catch (error) {
            return error;
        }
    }

    async function getCart() {
        
        const headers = getAuthHeaders();
        if (!headers) return;
        
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
            setNumberOfCartItems(response.data.numOfCartItems || 0);
            return response;
        } catch (error) {
            return error;
        }
    }

    async function deleteCartProduct(productId) {

        
        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            await getCart();
            return response;
        } catch (error) {
            return error;
        }
    }

    async function updateProductsCount(productId, count) {

        
        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                { headers }
            );
            await getCart();
            return response;
        } catch (error) {
            return error;
        }
    }

    async function deleteAllProducts() {
        
        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
            await getCart();
            return response;
        } catch (error) {
            return error;
        }
    }

    function onlinePayment(cartId, values, url) {
        
        const headers = getAuthHeaders();
        if (!headers) return;
        
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
                { shippingAddress: values },
                { headers }
            )
            .then((response) => response)
            .catch((error) => error);
    }

    return (
        <CartContext.Provider
            value={{
                addToCart,
                getCart,
                deleteCartProduct,
                updateProductsCount,
                deleteAllProducts,
                onlinePayment,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

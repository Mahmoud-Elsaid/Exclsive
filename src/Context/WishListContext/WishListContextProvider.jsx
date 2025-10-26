


import axios from "axios";
import { useContext } from "react";
import { CountersContext } from './../CountersContext/CountersContext';
import { WishListContext } from "./WishListContext";


export default function WishlistContextProvider({ children }) {
    
    
    const { setNumberWishlistItems } = useContext(CountersContext);


    function getAuthHeaders() {
        const token = localStorage.getItem("UserToken");
        return token ? { token } : null;
    }


    async function addToWishlist(productId) {

        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId },
                { headers }
            );
            await getWishlist();
            return response;
        } catch (error) {
            return error;
        }
    }

    async function getWishlist() {

        const headers = getAuthHeaders();
        if (!headers) return;

        try 
        {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            
            setNumberWishlistItems(response.data.count || 0);
            console.log("meee" , response.data);
            
            return response;
        } 
        catch (error) 
        {
            return error;
        }
    }

    async function deleteWishlistProduct(productId) {

        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            await getWishlist();
            return response;
        } catch (error) {
            return error;
        }
    }

    
    async function deleteAllWishlistProducts() {

        const headers = getAuthHeaders();
        if (!headers) return;

        try 
        {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            await getWishlist();
            return response;
        } 
        catch (error) 
        {
            return error;
        }
    }

    

    return (
        <WishListContext.Provider
            value={{
                addToWishlist,
                getWishlist,
                deleteWishlistProduct,
                deleteAllWishlistProducts,
            }}
        >
            {children}
        </WishListContext.Provider>
    );
}





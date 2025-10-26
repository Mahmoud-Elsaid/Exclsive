


import React, {  useState } from 'react';

import { CountersContext } from './CountersContext';



export default function CounterContextProvider({ children }) {
    
    const [numberWishlistItems, setNumberWishlistItems] = useState(0);
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);

    return (
        <CountersContext.Provider value={{ numberOfCartItems, setNumberOfCartItems , numberWishlistItems, setNumberWishlistItems }}>
            {children}
        </CountersContext.Provider>
    );
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import "./i18n";
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import UserAuthContextProvider from './Context/UserContext/UserAuthContextProvider.jsx';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import Cart from './Pages/Cart/Cart.jsx';
import CartContextProvider from './Context/CartContext/CartContextProvider.jsx';
import CounterContextProvider from './Context/CountersContext/CountersContextProvider.jsx';
import WishlistContextProvider from './Context/WishListContext/WishListContextProvider.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';

const queryClient = new QueryClient();



createRoot(document.getElementById('root')).render(
    
  <ThemeProvider>
            <QueryClientProvider client={queryClient}>
            <CounterContextProvider>
                <WishlistContextProvider>
                    <CartContextProvider>
                        <UserAuthContextProvider>
                            <App />
                        </UserAuthContextProvider>
                    </CartContextProvider>
                </WishlistContextProvider>
                
            </CounterContextProvider>
        </QueryClientProvider>

  </ThemeProvider>


    
    
)

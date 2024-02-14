import { useState, useCallback, useEffect } from "react";
import Menu from "./Components/Routes/Menu/Menu";
import SignInUp from "./Components/SignInUp";
import SideBar from "./Components/SideBar";
import { UserContext } from './Context/UserContext'

import './App.css'
import Basket from "./Components/Routes/Cart/Basket";
import { ShopContextProvider } from "./Context/ShopContext";
import { ProductsContextProvider } from "./Context/ProductsContext";
import InitPage from "./Components/Routes/InitPage";
import Settings from "./Components/Routes/Settings/Settings";
import Favorites from "./Components/Routes/Favorites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactUs from "./Components/Routes/ContactUs/ContactUs";
import AboutUs from "./Components/Routes/AboutUs";

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
    {
      loggedInUser ?
        <ProductsContextProvider>
          <ShopContextProvider>
              <BrowserRouter>
                <SideBar />
                <div style={{marginLeft: '75px'}}>
                  <Routes>
                    <Route path="/" element={<InitPage />} />
                    <Route path="/Menu" element={<Menu />} />
                    <Route path="/Cart" element={<Basket />} />
                    <Route path="/Favorites" element={<Favorites />} />
                    <Route path="/Settings" element={<Settings />} />
                    // <Route path="/ContactUs" element={<ContactUs />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                  </Routes>
                </div>

            </BrowserRouter>

          </ShopContextProvider>
        </ProductsContextProvider>
      : 
      <SignInUp value={{loggedInUser, setLoggedInUser}}/>
    }
    </UserContext.Provider>

  )
}

export default App;

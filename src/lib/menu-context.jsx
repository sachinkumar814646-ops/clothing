"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMenu } from "services/api/menu";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [settings, setSettings] = useState({});
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadAppData();
  }, []);

  const loadAppData = async () => {
    try {
      const res = await getMenu();

      setMenu(res.data || []);
      setSettings(res.settings || {});
      setWishlistCount(res.wishlist || 0);
      setCartCount(res.cart || 0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        menu,
        settings,
        wishlistCount,
        cartCount,
        refreshAppData: loadAppData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
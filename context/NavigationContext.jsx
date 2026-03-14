'use client';
import { createContext, useContext } from 'react';

const bookingOnly = process.env.NEXT_PUBLIC_BOOKING_MODE === 'true';

const NavigationContext = createContext({ bookingOnly });

export function NavigationProvider({ children }) {
  return (
    <NavigationContext.Provider value={{ bookingOnly }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import store, { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

export default ReduxProvider;

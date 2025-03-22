"use client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "./store";
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  persistStore(store);
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

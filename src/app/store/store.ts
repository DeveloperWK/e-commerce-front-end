import { apiSlice } from "@/app/api/apiSlice";
import { authReducer } from "@/app/features/authStateProvider/authStateProvider";
import { hasSearchedReducer } from "@/app/features/hasSearched/hasSearched";
import { mobileFilterVisibleReducer } from "@/app/features/mobileFilter/mobileFilterState";
import { searchResultsReducer } from "@/app/features/searchResults/searchResults";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartCounterReducer } from "../features/cart-counter/cart-counter";
type ApiState = ReturnType<typeof apiSlice.reducer> & {
  [apiSlice.reducerPath]?: Omit<
    ApiState,
    "queries" | "mutations" | "provided" | "subscriptions"
  >;
};
const rtkQueryTransform = {
  in: (state: ApiState) => state,
  out: (state: ApiState) => {
    return {
      ...state,
      [apiSlice.reducerPath]: {
        ...state[apiSlice.reducerPath],
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
      },
    };
  },
};
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["mobileFilterVisible", "auth", "hasSearched"],
  blacklist: [apiSlice.reducerPath],
  transforms: [rtkQueryTransform],
};
const rootReducer = combineReducers({
  mobileFilterVisible: mobileFilterVisibleReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  hasSearched: hasSearchedReducer,
  searchResults: searchResultsReducer,
  cartCounter: cartCounterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, REGISTER, PURGE],
      },
    }).concat(apiSlice.middleware);
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

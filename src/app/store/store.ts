import { apiSlice } from "@/app/api/apiSlice";
import { authReducer } from "@/app/features/authStateProvider/authStateProvider";
import { hasSearchedReducer } from "@/app/features/hasSearched/hasSearched";
import { mobileFilterVisibleReducer } from "@/app/features/mobileFilter/mobileFilterState";
import { searchResultsReducer } from "@/app/features/searchResults/searchResults";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  mobileFilterVisible: mobileFilterVisibleReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  hasSearched: hasSearchedReducer,
  searchResults: searchResultsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }).concat(apiSlice.middleware);
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

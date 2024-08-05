import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import modelReducer from "../slices/modelSlice";
import roleReducer from "../slices/roleSlice";
import fileReducer from "../slices/fileSlice";
import editorReducer from "../slices/editorSlice";
import queryReducer from "../slices/querySlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only navigation will be persisted
};

const reducer = combineReducers({
  auth: authReducer,
  model: modelReducer,
  role: roleReducer,
  file: fileReducer,
  editor: editorReducer,
  query: queryReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;

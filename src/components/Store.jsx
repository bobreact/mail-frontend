import { configureStore } from "@reduxjs/toolkit";
import  ArriveSlice from "./slices/ArriveSlice";
import  DepartSlice from "./slices/DepartSlice";
import  StructureSlice  from "./slices/StructureSlice";
import  TokenSlice from "./slices/TokenSlice";
import  UserSlice  from "./slices/UserSlice";
import  Url  from "./slices/UrlSlice";

const combinedReducer = {
  arrive: ArriveSlice,
  depart: DepartSlice,
  structure: StructureSlice,
  token: TokenSlice,
  user: UserSlice,
  url: Url
};

export default configureStore({
  reducer: combinedReducer,
  devTools: true,
});
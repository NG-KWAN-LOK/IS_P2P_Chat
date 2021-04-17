import { configureStore } from "@reduxjs/toolkit";
import CoreLayoutReducer from "../container/CoreLayout/reducer";
export default configureStore({
  reducer: {
    coreLayout: CoreLayoutReducer,
  },
});

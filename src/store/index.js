import { configureStore } from "@reduxjs/toolkit";
import CoreLayoutReducer from "../container/CoreLayout/reducer";
import MessageReducer from "../components/Messages/reducer";
export default configureStore({
  reducer: {
    coreLayout: CoreLayoutReducer,
    message: MessageReducer,
  },
});

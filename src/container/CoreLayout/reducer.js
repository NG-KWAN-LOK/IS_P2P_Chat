import { createSlice } from "@reduxjs/toolkit";
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from "../../constants/Events";

export const CoreLayoutSlice = createSlice({
  name: "coreLayout",
  initialState: {
    myUser: null,
    activeUser: null,
    connectedUsers: {},
  },
  reducers: {
    setUser: (state, action) => {
      console.log("setUser");
      state.myUser = action.payload;
    },
    setActiveUser: (state, action) => {
      console.log("setActiveUser");
      state.activeUser = action.payload;
    },
    setConnectedUsers: (state, action) => {
      console.log("setConnectedUsers");
      state.connectedUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setActiveUser,
  setConnectedUsers,
} = CoreLayoutSlice.actions;

export default CoreLayoutSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const CoreLayoutSlice = createSlice({
  name: "coreLayout",
  initialState: {
    myUser: null,
    myKeys: {},
    activeUser: null,
    connectedUsers: {},
    isPopUpQRCodeDisplay: false,
  },
  reducers: {
    setUser: (state, action) => {
      //console.log("setUser");
      state.myUser = action.payload;
    },
    setActiveUser: (state, action) => {
      //console.log("setActiveUser");
      state.activeUser = action.payload;
    },
    setConnectedUsers: (state, action) => {
      //console.log("setConnectedUsers");
      state.connectedUsers = action.payload;
    },
    setMyKeys: (state, action) => {
      //console.log("setMyKeys");
      state.myKeys = action.payload;
      console.log(state.myKeys);
    },
    setIsPopUpQRCodeDisplay: (state, action) => {
      console.log("setPopupQRCODE", action.payload);
      state.isPopUpQRCodeDisplay = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setActiveUser,
  setConnectedUsers,
  setMyKeys, setIsPopUpQRCodeDisplay
} = CoreLayoutSlice.actions;

export default CoreLayoutSlice.reducer;

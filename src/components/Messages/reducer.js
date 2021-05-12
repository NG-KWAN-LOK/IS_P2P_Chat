import { createSlice } from "@reduxjs/toolkit";

export const MessageSlice = createSlice({
  name: "message",
  initialState: {
    messageListId: {},
    messageData: {},
  },
  reducers: {
    receivePlaintextMessage: (state, action) => {
      const message = action.payload;
      console.log("Message received ");
      console.log(message, message.chatRoomUser, message.sender, message.id);
      if (state.messageListId[message.chatRoomUser.userId])
        state.messageListId[message.chatRoomUser.userId] = [
          ...state.messageListId[message.chatRoomUser.userId],
          message.id,
        ];
      else state.messageListId[message.chatRoomUser.userId] = [message.id];
      console.log(state.messageListId[message.chatRoomUser.userId]);

      state.messageData[message.id] = {
        message: message.message,
        id: message.id,
        sender: message.sender,
      };
      console.log(state.messageData[message.id]);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMyKeys, receivePlaintextMessage } = MessageSlice.actions;

export default MessageSlice.reducer;

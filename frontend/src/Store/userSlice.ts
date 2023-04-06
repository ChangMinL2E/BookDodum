import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface User {
  userid: string,
  name: string,
  
}

const initialState: User = {
  userid: "",
  name: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login 성공 시
    loginAction(state, action) {
      state.userid = action.payload.userid;
      state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const userAction = userSlice.actions;

export default userSlice;

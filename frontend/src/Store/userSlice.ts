import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    userid: "",
  },
  reducers: {
    // login 성공 시
    loginUser: (state, action) => {
      state.name = action.payload.name;
      state.userid = action.payload.userid;
      return state;
    },
    // login 실패 시
    clearUser: (state) => {
      state.name = "";
      state.userid = "";
      return state;
    },
  },
});

export default userSlice.reducer;

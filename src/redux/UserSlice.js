import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickName: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.nickName = action.payload.nickname;
      state.email = action.payload.email;
      console.log(state, "확인용");
    },
    clearUser: (state) => {
      state.nickName = "";
      state.email = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

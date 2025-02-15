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
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
      console.log(state, "리덕스에 잘 적용되는지 확인");
    },
    clearUser: (state) => {
      state.nickName = "";
      state.email = "";
      console.log(state, "리덕스에 잘 적용되는지 확인");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

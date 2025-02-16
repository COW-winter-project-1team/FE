import axios from "axios";

//회원가입 API 함수
export const signup = async (userData) => {
  try {
    const response = await axios.post("/api/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "회원가입 요청 실패" };
  }
};
//로그인 api
export const login = async (userData) => {
  try {
    const response = await axios.post("/api/login", userData);
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "로그인 요청 실패" };
  }
};

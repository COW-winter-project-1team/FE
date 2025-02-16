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
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post("/api/login", userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("응답값확인:", response.data);
    console.log("token값확인:", response.data.token);
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "로그인 요청 실패" };
  }
};

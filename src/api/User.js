import axios from 'axios';

//회원가입 API 함수
export const signup = async (userData) => {
  try {
    const response = await axios.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '회원가입 요청 실패' };
  }
};
//로그인 api
export const login = async (userData) => {
  try {
    const response = await axios.post('/api/login', userData);
    console.log('응답값확인:', response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '로그인 요청 실패' };
  }
};

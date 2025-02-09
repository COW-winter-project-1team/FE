import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

// 회원가입 API 함수
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/signup`, userData);
        return response.data; // 성공 응답 반환
    } catch (error) {
        throw error.response?.data || { message: '회원가입 요청 실패' };
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: '로그인 요청 실패' };
    }
};

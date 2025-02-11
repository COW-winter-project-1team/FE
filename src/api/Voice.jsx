import axios from 'axios';
import CryptoJS from 'crypto-js';

// clova STT api
export const convertVoiceToText = async (file) => {
  try {
    const res = await axios.post('/stt?lang=Kor', file, {
      headers: {
        'X-CLOVASPEECH-API-KEY': import.meta.env.VITE_CLOVA_CLIENT_SECRET,
        'Content-Type': 'application/octet-stream',
      },
    });
    console.log('stt api:', res);
    return res.data;
  } catch (err) {
    console.log('STT 변환 실패: ', err);
  }
};

//clova chatbot api
export const playListRecommendation = async (moodText) => {
  const generateSignature = (requestBody, secretKey) => {
    const hash = CryptoJS.HmacSHA256(requestBody, secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  const requestBody = JSON.stringify({
    version: 'v2',
    userId: 'cowMoodi',
    timestamp: Date.now(),
    bubbles: [
      {
        type: 'text',
        data: {
          description: moodText,
        },
      },
    ],
    event: 'send',
  });

  const signature = generateSignature(
    requestBody,
    import.meta.env.VITE_CLOVA_CHATBOT_SECRET,
  );

  try {
    const res = await axios.post('/chatbot', requestBody, {
      headers: {
        'X-NCP-CHATBOT_SIGNATURE': signature,
        'Content-Type': 'application/json; UTF-8',
      },
    });
    console.log('Response Status:', res.status);
    console.log('chatbot API 결과: ', res);
    return res.data;
  } catch (err) {
    console.log('clova chatbot api 호출 실패: ', err);
  }
};

//플레이리스트 생성
export const createReport = async (reportInfo) => {
  try {
    await axios.post(
      '/api',
      {
        userId: reportInfo.userId,
        playlistNumber: reportInfo.playlistnumber,
        title: reportInfo.title,
        playlistImage: reportInfo.platlistImage,
        timestamp: reportInfo.timestamp,
        emotion: reportInfo.emotion,
        trackIds: [],
      },
      {
        headers: {},
      },
    );
  } catch (err) {
    console.log('createReport error: ', err);
  }
};

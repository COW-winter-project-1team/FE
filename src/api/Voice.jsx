import axios from 'axios';

// clova api
export const convertVoiceToText = async (file) => {
  try {
    const res = await axios.post('/clova?lang=Kor', file, {
      headers: {
        'X-CLOVASPEECH-API-KEY': import.meta.env.VITE_CLOVA_CLIENT_SECRET,
        'Content-Type': 'application/octet-stream',
      },
    });
    return res.data;
  } catch (err) {
    console.log('STT 변환 실패', err);
  }
};

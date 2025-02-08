import axios from 'axios';

// const clova = axios.create({
//   baseURL: import.meta.env.VITE_CLOVA_STT_API_URL,
// });

// clova api
export const convertVoiceToText = async (file) => {
  console.log('getVoiceText api 호출');
  console.log('file type: ', typeof file);
  try {
    //바이너리 데이터 변환
    // const arrayBuffer = await file.arrayBuffer();
    // const binaryData = new Uint8Array(arrayBuffer);
    // console.log('binary data: ', binaryData);

    const res = await axios.post('/clova/stt?lang=Kor', file, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': import.meta.env.VITE_CLOVA_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': import.meta.env.VITE_CLOVA_CLIENT_SECRET,
        'Content-Type': 'application/octet-stream',
      },
    });
    return res.data;
  } catch (err) {
    console.log('STT 변환 실패', err);
  }
};

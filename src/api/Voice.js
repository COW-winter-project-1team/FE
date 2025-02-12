import axios from 'axios';

//clova STT api
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

//Clova Studio api
export const playListRecommendation = async (moodText) => {
  try {
    const response = await axios.post(
      '/chatbot',
      {
        messages: [
          {
            role: 'system',
            content:
              '#명령#\n사용자 기분에 맞는 한국 및 미국 음악 플레이리스트를 JSON 형식으로 생성하고, JSON 데이터만 반환하고, 추가 설명은 금지한다. \n곡 개수는 10개로 설정하되, 응답이 중간에 절대 끊기지 않고 JSON 형식이 완전하고 올바르게 닫힌 상태로 제공해라.\n\n#JSON 구조#{ "data": [{"trackName": "", "아티스트": ""}]}',
          },
          { role: 'user', content: moodText },
        ],
        topP: 0.8,
        topK: 0,
        maxTokens: 256,
        temperature: 0.5,
        repeatPenalty: 5.0,
        stopBefore: [],
        includeAiFilters: true,
        seed: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CLOVA_CHATBOT_SECRET}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Encoding': 'identity',
        },
      },
    );
    console.log('chatbot 컨텐트 :', response.data.result.message.content);
    // 응답 데이터 반환

    return response.data.result.message.content;
  } catch (error) {
    console.error('Clova Chatbot API 호출 실패:', error);
    return null;
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

import axios from "axios";

//clova STT api
export const convertVoiceToText = async (file) => {
  try {
    const res = await axios.post("/stt?lang=Kor", file, {
      headers: {
        "X-CLOVASPEECH-API-KEY": import.meta.env.VITE_CLOVA_CLIENT_SECRET,
        "Content-Type": "application/octet-stream",
      },
    });
    return res.data;
  } catch (err) {
    console.log("STT 변환 실패: ", err);
  }
};

//Clova Studio api
export const clovaStudio = async (moodText) => {
  try {
    const response = await axios.post(
      "/chatbot",
      {
        messages: [
          {
            role: "system",
            content:
              '사용자의 감정을 "HAPPY", "SAD", "ANGRY", "EXCITING", "TIRED" 중 하나로 분석해라.  \n사용자가 입력한 상황을 반영하여 title을 작성하고, 해당 감정에 맞는 한국 및 미국 음악 10곡을 JSON으로 반환하라.\n\nJSON 형식:\n{\n  "title": "",\n  "emotion": "",\n  "playlist": [\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""},\n    {"trackName": "", "artistName": ""}\n  ]\n}\n\n**규칙**\n- JSON만 출력하라.\n- title은 사용자가 입력한 상황을 반영하여 작성하라.\n- 모든 값은 `""`로 감싸라.\n',
          },
          { role: "user", content: moodText },
        ],
        topP: 0.8,
        topK: 0,
        maxTokens: 320,
        temperature: 0.5,
        repeatPenalty: 5.0,
        stopBefore: [],
        includeAiFilters: true,
        seed: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CLOVA_CHATBOT_SECRET}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data.result.message.content;
  } catch (error) {
    console.error("Clova Chatbot API 호출 실패:", error);
    return null;
  }
};

//스포티파이 외부 api 연결
export const spotifyTrackSave = async (playlist) => {
  //josn으로 변환
  const jsonTrack = JSON.stringify(playlist);
  const accessToken = localStorage.getItem("accessToken");

  try {
    const res = await axios.post("/api/spotify/api/tracks", jsonTrack, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.log("노래를 저장할 수 없습니다 (api file) :", err);
    throw err;
  }
};

//플레이리스트 생성
export const createReport = async (reportInfo) => {
  const accessToken = localStorage.getItem("accessToken");

  const res = await axios.post("/api/playlists", reportInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

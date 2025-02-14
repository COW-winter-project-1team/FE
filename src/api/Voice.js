import axios from "axios";
import { getCookie } from "../util/Cookie";

//clova STT api
export const convertVoiceToText = async (file) => {
  try {
    const res = await axios.post("/stt?lang=Kor", file, {
      headers: {
        "X-CLOVASPEECH-API-KEY": import.meta.env.VITE_CLOVA_CLIENT_SECRET,
        "Content-Type": "application/octet-stream",
      },
    });
    console.log("stt api:", res);
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
              '## 명령 ##\n사용자의 감정을 "HAPPY", "SAD", "ANGRY", "EXCITING", "TIRED" 중 하나로 분석하고, 해당 감정에 맞는 한국 및 미국 음악 10곡을 JSON 형식으로 반환하라.  \nJSON 데이터만 출력하며, 응답에 문자열 포맷(`string`)이나 코드 블록(`json`)을 포함하지 말고, 추가 설명 없이 완전한 JSON 형식으로 제공하라.  \n{} 안의 모든 요소 값이 `""`로 감싸지도록 하라.\n\n## JSON 형식 ##\n{\n    "emotion": "",\n    "playlist": [\n        {"trackName": "", "artistName": ""}\n    ]\n}',
          },
          { role: "user", content: moodText },
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
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log(response);
    console.log("api chatbot 컨텐트 :", response.data.result.message.content);
    return response.data.result.message.content;
  } catch (error) {
    console.error("Clova Chatbot API 호출 실패:", error);
    return null;
  }
};

//스포티파이 외부 api 연결
export const spotifyTrackSave = async (playlist) => {
  console.log("스포티파이 외부 api 실행");

  //josn으로 변환
  const jsonTrack = JSON.stringify(playlist);
  console.log("JSOn playlist:", jsonTrack, typeof jsonTrack);
  const accessToken = getCookie("accessToken");

  try {
    const res = await axios.post("/api/spotify/api/tracks", jsonTrack, {
      header: {
        withCredentials: true,
        "cookie": accessToken,
        "Content-Type": "application/json",
      },
    });
    console.log("트랙 저장에 성공했습니다 (api file):", res);
    return res;
  } catch (err) {
    console.log("노래를 저장할 수 없습니다 (api file) :", err);
    throw err;
  }
};

//플레이리스트 생성
export const createReport = async (reportInfo) => {
  try {
    console.log("플레이리스트 생성 api 실행");
    const res = await axios.post("/api/playlists", {
      title: reportInfo.title,
      playlistImage: reportInfo.platlistImage,
      timestamp: reportInfo.timestamp,
      emotion: reportInfo.emotion,
      trackIds: [reportInfo.trackIds],
    });
    console.log("크리에이트 레포트 api:", res.data);
    return res.data;
  } catch (err) {
    console.log("createReport error: ", err);
    throw err;
  }
};

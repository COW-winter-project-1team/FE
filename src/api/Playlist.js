import axios from "axios";

const getAccessToken = () => localStorage.getItem("accessToken");

export const fetchPlaylist = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get("/api/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "플레이리스트 조회 실패" };
  }
};

export const deletePlaylist = async ({ playlistNumber }) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.delete(`/api/playlists/${playlistNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "플레이리스트 삭제 중 오류 발생" };
  }
};

export const deleteTracks = async (playlistNumber, playlistTrackNumber) => {
  const token = localStorage.getItem("accessToken"); // 저장된 토큰 가져오기

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axios.delete(
      `/api/playlists/${playlistNumber}/tracks/${playlistTrackNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰 추가
        },
      },
    );

    return response;
  } catch (error) {
    console.error("트랙 삭제 실패:", error);
    throw error;
  }
};

export const fetchPlaylistCard = async ({ playlistNumber }) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`/api/playlists/${playlistNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "플레이리스트 내부 조회 중 오류 발생" }
    );
  }
};

export const fetchTracklist = async ({ trackId }) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`/api/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "트랙 조회 중 오류 발생" };
  }
};

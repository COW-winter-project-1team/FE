import axios from "axios";

export const fetchPlaylist = async () => {
  try {
    const response = await axios.get("/api/playlists", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "플레이리스트 조회 실패" };
  }
};

export const deletePlaylist = async ({ playlistNumber }) => {
  try {
    const response = await axios.delete(`/api/playlist/${playlistNumber}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "플레이리스트 삭제 중 오류 발생" };
  }
};

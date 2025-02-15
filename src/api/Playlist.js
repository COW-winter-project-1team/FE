import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const fetchPlaylist = async () => {
  try {
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

export const deleteTracks = async ({ playlistNumber, trackId }) => {
  try {
    const response = axios.delete(
      `/api/playlists/${playlistNumber}/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "트랙 삭제 중 오류 발생" };
  }
};

export const fetchPlaylistCard = async ({ playlistNumber }) => {
  try {
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

import axios from "axios";

export const getReportInfo = async (newReportNum) => {
  const accessToken = localStorage.getItem("accessToken");

  const res = await axios.get(`/api/playlists/${newReportNum}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return res;
};

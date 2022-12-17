import { privateAxios } from "../../api/axios";

export const requestUploadAvatar = async (data) => {
  return await privateAxios.post("/v1/user/update-avatar", data);
};
export const requestUploadBackground = async (data) => {
  return await privateAxios.post("/v1/user/update-background", data);
};

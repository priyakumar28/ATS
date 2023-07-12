import { fileUploadHttp } from "../utils/commanUtils";

export const uploadFile = async (data) => {
  console.log(data+"ertyui");
  let response = await fileUploadHttp.post("/upload", data);
  console.log(response.data);
  return response.data;
};

export const updateFile = async (data) => {
  console.log(data);
  let response = await fileUploadHttp.put("/update", data);
  return response.data;
};

export const deleteFile = async (data) => {
  let response = await fileUploadHttp.delete("/delete", { data });
  return response.data;
};

export const deleteOrginalFile = async (data) => {
  let response = await fileUploadHttp.delete("/deleteOrginalFile", { data });
  return response.data;
};

export const uploadFiles = async (data) => {
  let response = await fileUploadHttp.post("/multipleUpload", data);
  return response.data;
};

export const uploadFilesWithName = async (data) => {
  let response = await fileUploadHttp.post("/multipleUploadWithName", data);
  return response.data;
};

export const viewFile = async (data) => {
  let response = await fileUploadHttp.get("/viewFile?filename="+ data);
  return response.data;
};

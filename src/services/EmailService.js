import { http, mailHttp } from "../utils/commanUtils";
const CONTEXT_PATH = "/Application-tracking-system/email/api";
export async function postEmail(data) {
  console.log(data);
  try {
    const res = await mailHttp.post(`${CONTEXT_PATH}/Send-email`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

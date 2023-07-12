import { http } from "../utils/commanUtils";
const CONTEXT_PATH = "/applicant-service/api";

export const otpservice = async (email,otp)=>{
        let response = await http.get(CONTEXT_PATH+`/verify?email=${email}&token=${otp}`)
        console.log(response.data,"resp service");
        if (response.data.statusCode == "2200") return response.data.value;
        else{
                throw new Error (response.data.errors.errors); 
        }
}
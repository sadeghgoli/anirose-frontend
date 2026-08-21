import { sendOtp, verifyOtp } from "../../../api/services/auth.js";

export const loginUser = async (mobile, _password) => {
  const result = await sendOtp(mobile);
  if (result?.otp) {
    const verifyResult = await verifyOtp(mobile, result.otp);
    if (verifyResult?.token) {
      return { status: "ok", token: verifyResult.token, user: verifyResult.user };
    }
  }
  return { status: "no" };
};

export { sendOtp, verifyOtp };

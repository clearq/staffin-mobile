import axios from "axios";
import api from "./config";
import { IAuthInfo, useAuth } from "@/contexts/authContext";


const appURL = process.env.EXPO_PUBLIC_APP_URL // 'https://app.staffin.pro';


export const sendVerificationCode = async (email: string) => {
  try {
    const response = await api.get(`/Auth/verification-code/${email}`);
    const { code } = response.data;
   
     // Send email via frontend route
    const emailResponse = await fetch(`${appURL}/api/send-reset-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: code }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(emailResult.error || "Failed to send verification email");
    }

    return {
      ...response.data,
      emailSent: true,
    };
  } catch (error: any) {
    console.error("Error in sendVerificationCode:", error?.message || error);
    throw error;
  }
};


export const verifyEmailWithCode = async ({email, code}: {email: string, code: string}) => {
  try {
    const response = await api.post("/Auth/verify-email", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};


export const resendVerificationCode = async (email: string) => {
  try {
    // First get a new code from the backend
    const response = await api.post("/Auth/ResendVerificationCode", email);
    const { code } = response.data;
    console.log('code:', code);

    // Then send the email
    const emailResponse = await fetch(`${appURL}/api/send-reset-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: code }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(
        emailResult.error || "Failed to resend verification email"
      );
    }

    return {
      ...response.data,
      emailSent: true,
    };
  } catch (error) {
    console.error("Error resending verification code:", error);
    throw error;
  }
};




export const requestPasswordReset = async (email: string) => {
  
  try {
    // Send request to backend to get the reset code
    const response = await api.post(
      `/Auth/request-password-reset?email=${encodeURIComponent(email)}`);

    const { code } = response.data;
   
    
    // Construct reset link
    const resetLink = `${appURL}/reset-password?email=${encodeURIComponent(
      email
    )}&code=${code}`

    // Send the reset email
    const emailResponse = await fetch(`${appURL}/api/send-reset-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: code, resetLink }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(
        emailResult.error || "Failed to send password reset email"
      );
    }

    return {
      ...response.data,
      emailSent: true,
    };
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    throw error;
  }
};


export const resetPassword = async ({ email, code, newPassword }:{email: string, code: string, newPassword: string}) => {
  try {
    const response = await api.post(
      "/Auth/reset-password",
      {
        email,
        code,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
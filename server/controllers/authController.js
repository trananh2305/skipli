import { db } from "../config/firebase.js";
import generateCode from "../utils/generateCode.js";
import { sendSMS } from "../services/smsService.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

config();

export const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const userEmail = email;

    const verifyOtpRef = db.collection("verificationCodes").doc(userEmail);
    const verifyOtpSnap = await verifyOtpRef.get();

    if (!verifyOtpSnap.exists) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request OTP again." });
    }

    const { code, createdAt } = verifyOtpSnap.data();

    const expired = Date.now() - createdAt > 5 * 60 * 1000;
    if (expired) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otp !== code) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await verifyOtpRef.update({ code: "" });

    const userRef = db.collection("users").doc(userEmail);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userSnap.data();

    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          _id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginWithEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const userRef = db.collection("users").doc(email);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(400).json({ message: "Email not found" });
    }

    const codeVerify = generateCode();
    await db
      .collection("verificationCodes")
      .doc(email)
      .set({ code: codeVerify, createdAt: Date.now() });

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_USER,
      },
    });

    const mainOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Code to verify",
      text: `Your code to reset password is: ${codeVerify}`,
    };

    transport.sendMail(mainOptions, (error) => {
      if (error) {
        return res.status(500).json({ message: `${error}` });
      } else {
        return res.status(200).json({ message: "Sent mail successfully" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAccessCode = async (req, res) => {
  const { phoneNumber } = req.body;
  const code = generateCode();

  try {
    await db.collection("accessCodes").doc(phoneNumber).set({ code });
    await sendSMS(phoneNumber, `Your access code is: ${code}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const validateAccessCode = async (req, res) => {
  const { phoneNumber, accessCode } = req.body;

  try {
    const ref = db.collection("accessCodes").doc(phoneNumber);
    const snap = await ref.get();

    if (!snap.exists || snap.data().code !== accessCode) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    await ref.update({ code: "" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

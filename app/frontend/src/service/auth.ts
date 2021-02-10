import {
  CompletePasswordResetReq,
  LoginReq,
  ResetPasswordReq,
  SignupReq,
  SignupTokenInfoReq,
  UsernameValidReq,
} from "../pb/auth_pb";
import client from "./client";

export async function checkUsername(username: string) {
  const req = new LoginReq();
  req.setUser(username);
  const res = await client.auth.login(req);
  return res.getNextStep();
}

export async function createEmailSignup(email: string) {
  const req = new SignupReq();
  req.setEmail(email);
  const res = await client.auth.signup(req);
  return res.getNextStep();
}

export async function getSignupEmail(signupToken: string) {
  const req = new SignupTokenInfoReq();
  req.setSignupToken(signupToken);
  const res = await client.auth.signupTokenInfo(req);
  return res.getEmail();
}

export async function validateUsername(username: string) {
  const req = new UsernameValidReq();
  req.setUsername(username);
  const res = await client.auth.usernameValid(req);
  return res.getValid();
}

export function resetPassword(userId: string) {
  const req = new ResetPasswordReq();
  req.setUser(userId);
  return client.auth.resetPassword(req);
}

export function completePasswordReset(resetToken: string) {
  const req = new CompletePasswordResetReq();
  req.setPasswordResetToken(resetToken);
  return client.auth.completePasswordReset(req);
}

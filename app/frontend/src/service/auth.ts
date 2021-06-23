import { ContributorForm as ContributorFormPb } from "pb/account_pb";
import { HostingStatus } from "pb/api_pb";
import {
  LoginReq,
  SignupAccount,
  SignupBasic,
  SignupFlowReq,
  UsernameValidReq,
} from "proto/auth_pb";
import client from "service/client";

export async function checkUsername(username: string) {
  const req = new LoginReq();
  req.setUser(username);
  const res = await client.auth.login(req);
  return res.getNextStep();
}

export async function startSignup(name: string, email: string) {
  const req = new SignupFlowReq();
  const basic = new SignupBasic();
  basic.setName(name);
  basic.setEmail(email);
  req.setBasic(basic);
  const res = await client.auth.signupFlow(req);
  return res.toObject();
}

export async function signupFlowAccount(
  flowToken: string,
  username: string,
  birthdate: string,
  gender: string,
  acceptTOS: boolean,
  hostingStatus: HostingStatus,
  city: string,
  lat: number,
  lng: number,
  radius: number,
  password?: string
) {
  const req = new SignupFlowReq();
  req.setFlowToken(flowToken);
  const account = new SignupAccount();
  account.setUsername(username);
  account.setBirthdate(birthdate);
  account.setGender(gender);
  account.setAcceptTos(acceptTOS);
  account.setHostingStatus(hostingStatus);
  account.setCity(city);
  account.setLat(lat);
  account.setLng(lng);
  account.setRadius(radius);
  if (password) {
    account.setPassword(password);
  }
  req.setAccount(account);
  const res = await client.auth.signupFlow(req);
  return res.toObject();
}

export async function signupFlowFeedback(
  flowToken: string,
  form: ContributorFormPb
) {
  const req = new SignupFlowReq();
  req.setFlowToken(flowToken);
  req.setFeedback(form);
  const res = await client.auth.signupFlow(req);
  return res.toObject();
}

export async function signupFlowEmailToken(emailToken: string) {
  const req = new SignupFlowReq();
  req.setEmailToken(emailToken);
  const res = await client.auth.signupFlow(req);
  return res.toObject();
}

export async function validateUsername(username: string) {
  const req = new UsernameValidReq();
  req.setUsername(username);
  const res = await client.auth.usernameValid(req);
  return res.getValid();
}

import { AxiosResponse } from "axios";
import instance from "./axiosSetup";

export async function login(email: string, password: string): Promise<any> {
  const res: AxiosResponse<any> = await instance.post("/auth/login", {
    email,
    password,
  });
  sessionStorage.setItem("token", res.data.access_token);
  return res;
}
export async function register(email: string, password: string): Promise<any> {
  const res: AxiosResponse<any> = await instance.post("/auth/register", {
    email,
    password,
  });
  return res;
}

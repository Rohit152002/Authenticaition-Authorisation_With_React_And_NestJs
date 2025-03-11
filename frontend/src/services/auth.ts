import { AxiosResponse } from "axios";
import instance from "./axiosSetup";

// Define a type for the response data
interface AuthResponse {
  access_token: string;
}

interface RegisterReponse {
  id: number;
  email: string;
  password: string;
  role: string;
}

export async function login(
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  const res: AxiosResponse<AuthResponse> = await instance.post("/auth/login", {
    email,
    password,
  });
  sessionStorage.setItem("token", res.data.access_token);
  return res;
}

export async function register(
  email: string,
  password: string
): Promise<AxiosResponse<RegisterReponse>> {
  const res: AxiosResponse<RegisterReponse> = await instance.post(
    "/auth/register",
    {
      email,
      password,
    }
  );
  return res;
}

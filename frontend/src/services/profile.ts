import instance from "./axiosSetup";

export async function getProfile() {
  //   const token = sessionStorage.getItem("token");
  const res = await instance.post(
    "/auth/profile"
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  );
  return res.data;
}

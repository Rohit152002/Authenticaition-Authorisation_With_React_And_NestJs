import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";
import { toast } from "react-toastify";
interface user {
  id: number;
  email: string;
  role: string;
}
const ProfileComponent = () => {
  const [data, setData] = useState<user>();

  async function getProfileHandler() {
    const res = await toast.promise(getProfile(), {
      success: "success",
      error: {
        render({ data }) {
          const errorData = data as { response: { data: { message: string } } };
          console.log(errorData.response.data.message);
          return `Unauthorised`;
        },
      },
      pending: "pending",
    });
    setData(res);
    console.log(res);
  }

  useEffect(() => {
    getProfileHandler();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      {!data && (
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-lg">
          <span className="font-semibold">ID:</span> {data?.id}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {data?.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Role:</span> {data?.role}
        </p>
      </div>
    </div>
  );
};

export default ProfileComponent;

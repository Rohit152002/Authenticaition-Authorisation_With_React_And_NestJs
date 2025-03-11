import React from "react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="border border-black rounded-md w-fit"
    >
      Back Button
    </div>
  );
};

export default BackButton;

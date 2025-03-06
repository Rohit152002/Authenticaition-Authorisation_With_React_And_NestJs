import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../services/auth";
import FormComponent from "./FormComponent";

const RegisterComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function registerHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) {
    e.preventDefault();
    console.log(email);
    console.log(password);
    await toast.promise(register(email, password), {
      pending: "pending",
      success: {
        theme: "colored",
        data: "register successfull",
      },
      error: {
        render({ data }) {
          const errorData = data as { response: { data: { message: string } } };
          console.log(errorData.response.data.message);
          return `${errorData.response.data.message}`;
        },
      },
    });
  }

  return (
    <FormComponent
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={registerHandler}
      formName="Register"
    />
  );
};

export default RegisterComponent;

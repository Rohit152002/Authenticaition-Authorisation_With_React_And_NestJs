import React from "react";

interface FormComponentProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => void;
  formName: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  formName,
}) => {
  return (
    <form className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md">
      <h1>{formName}</h1>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          value={email}
          required
          className="mt-1 p-2 block w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          value={password}
          name="password"
          required
          className="mt-1 p-2 block w-full border rounded"
        />
        {formName === "Register" && (
          <select>
            <option value="">Admin</option>
            <option value="">User</option>
          </select>
        )}
      </div>
      <button
        className="bg-blue-500 text-white text-xl px-4 py-2 rounded hover:bg-blue-600"
        onClick={(e) => handleSubmit(e, email, password)}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;

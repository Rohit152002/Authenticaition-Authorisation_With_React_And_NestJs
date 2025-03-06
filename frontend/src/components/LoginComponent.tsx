import { useState } from "react"
import FormComponent from "./FormComponent"
import { toast } from "react-toastify"
import { login } from "../services/auth"

const LoginComponent = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function loginHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) {
        e.preventDefault()
        console.log(email);
        console.log(password);
        await toast.promise(login(email, password), {
            pending: 'pending',
            success: {
                theme: 'colored',
                data: "haha nice "
            },
            error: 'error'
        })
    }

  return (
    <FormComponent
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={loginHandler}
                formName="Login"
            />
  )
}

export default LoginComponent
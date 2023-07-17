import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState("");
    const [seeButton, setSeeButton] = useState(false);

    const handleEmail = (event) => {
        setSeeButton(true);
        setEmail(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(email);
    }

    const isButtonDisabled = () => {
        return !(/(.+)@(.+){2,}\.(.+){2,}/.test(email))
    }

    const classAnimation = isButtonDisabled() ?  "animate__animated animate__fadeOut" : "animate__animated animate__fadeInUp";

    return (
        <form className='form-login animate__animated animate__fadeInUp'>
                
                    <TextField
                        required
                        placeholder="Email"
                        label="Email"
                        onChange={handleEmail}
                        type="email"
                    />
               

                    <div className={` ${classAnimation} buttons-login d-flex flex-wrap justify-content-center mt-3`}>
                        {seeButton && <Button
                            type="button"
                            className="buttonstrap"
                            disabled={isButtonDisabled()}
                            onClick={handleLogin}
                        >
          LOGIN
                        </Button>}
                
                    </div>
                </form>
    )


}

export default Login;
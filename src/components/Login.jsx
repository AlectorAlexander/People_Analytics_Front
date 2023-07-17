import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/Login.css";
import React from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [seeButton, setSeeButton] = useState(false);

    const handleEmail = (event) => {
        setSeeButton(true);
        setEmail(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(email);
    };

    const isButtonDisabled = () => {
        return !(/(.+)@(.+){2,}\.(.+){2,}/.test(email));
    };

    const classAnimation = isButtonDisabled() ?  "animate__animated animate__fadeOut" : "animate__animated animate__fadeInUp";

    return (
        <div className="form-login">
            <form className='d-flex flex-column'>
                
                <TextField
                    required
                    placeholder="Email"
                    label="Email"
                    onChange={handleEmail}
                    type="email"
                    color="success"
                    sx={{ input: {
                        color: "white",
                        fontFamily: "nunito",
                        fontSize: "1.2rem",
                        fontWeght: "bold",
                    },
                    fieldset: { borderColor: "green" }
                   
                    }}
                    InputLabelProps={{
                        style: {
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            width: "100%",
                            color: "white"
                        } }}
                    className=" animate__animated animate__fadeInUp font-color-white custom-text-field text-field"
                />
               

                <div className={` ${classAnimation} d-flex flex-wrap justify-content-center mt-3`}>
                    {seeButton && <Button
                        type="button"
                        variant="success"
                        className="button-login"
                        disabled={isButtonDisabled()}
                        onClick={handleLogin}
                    >
                        <spam className="button">LOGIN</spam>
                    </Button>}
                
                </div>
            </form>
        </div>
    );


}

export default Login;
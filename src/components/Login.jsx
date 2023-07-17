import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/Login.css";
import React from "react";

function Login({ setEmail, email, handleLogin }) {
    const [seeButton, setSeeButton] = useState(false);

    const handleEmail = (event) => {
        setSeeButton(true);
        setEmail(event.target.value);
    };

    const isButtonDisabled = () => {
        return !/(.+)@(.+){2,}\.(.+){2,}/.test(email);
    };

    const classAnimation = isButtonDisabled()
        ? "animate__animated animate__fadeOut"
        : "animate__animated animate__fadeInUp";

    return (
        <div className="form-login">
            <form className="d-flex flex-column">
                <TextField
                    required
                    placeholder="Email"
                    label="Email"
                    onChange={handleEmail}
                    type="email"
                    color="success"
                    sx={{
                        input: {
                            color: "white",
                            fontFamily: "nunito",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        },
                        fieldset: { borderColor: "green" },
                    }}
                    InputLabelProps={{
                        style: {
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            width: "100%",
                            color: "white",
                        },
                    }}
                    className="animate__animated animate__fadeInUp font-color-white custom-text-field text-field"
                    error={seeButton && isButtonDisabled()}
                    helperText={seeButton && isButtonDisabled() ? "Email inválido" : ""}
                />

                <div
                    className={` ${classAnimation} d-flex flex-wrap justify-content-center mt-3`}
                >
                    {seeButton && (
                        <Button
                            type="button"
                            variant="success"
                            className="button-login"
                            disabled={isButtonDisabled()}
                            onClick={handleLogin}
                        >
                            <span className="button">Ver Análise</span>
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setEmail: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
};

export default Login;

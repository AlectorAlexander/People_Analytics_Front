import Login from "../components/Login";
import React, { useState } from "react";
import "../styles/Home.css";
import Loading from "../components/Loading";
import { LoginFetch } from "../services/BDRequests";
import Analytics from "../components/Analytics";



function Home() {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = useState("");
    const [duzentão, setDuzentão] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        LoginFetch(email)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("userEmail", email);
                    setDuzentão(true);
                    setLoading(false);
                } else {
                    setLoading(false);
                    alert("Email não cadastrado");
                }
            })
            .catch((err) => {
                alert("Erro no servidor");
                console.log(err);
                setLoading(false);
            });
    };

    const theRightRender = () => {
        if (duzentão) {
            return <><Analytics/></>;
        }
        return  <Login setLoading={setLoading} handleLogin={handleLogin} setEmail={setEmail} email={email} />;
    };

    return (
        <div className="App">
            {loading ? <Loading /> :
                theRightRender()}
        </div>
    );
}

export default Home;
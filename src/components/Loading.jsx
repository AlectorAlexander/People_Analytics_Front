import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {

    return (
        <div className='d-flex justify-content-center align-items-center flex-column animate__animated animate__flipInX'>
            <ReactLoading type='cubes' color='#ffffff' height={"40%"} width={"40%"} />
            <p style={{color: "white", textAlign: "center", marginTop: "20px"}}>Servidor gratuito acordando, tenha paciência, por favor.</p>
        </div>
    );
};
export default Loading;
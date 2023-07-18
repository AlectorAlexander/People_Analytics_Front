import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import ReactLoading from "react-loading";

const Loading = ({animate}) => {

    const animation = !animate ? "animate__animated animate__flipOutX" : "animate__animated animate__flipInX";

    return (
        <div className={`d-flex justify-content-center align-items-center flex-column ${animation}`}>
            <ReactLoading type='cubes' color='#ffffff' height={"40%"} width={"40%"} />
            <p style={{color: "white", textAlign: "center", marginTop: "20px"}}>Servidor gratuito acordando, tenha paciência, por favor.</p>
        </div>
    );
};

export default Loading;

Loading.propTypes = {
    animate: propTypes.bool
};


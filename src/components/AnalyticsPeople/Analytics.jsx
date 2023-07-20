import React, { useState } from "react";
import "../../styles/Analytics.css";
import ModalRender from "./Modal";
import GraphicLine from "./GraphicLine";
import Button from "react-bootstrap/Button";

function Analytics() {
    const [openHeadcount, setOpenHeadcount] = useState(false);
    const [openTurnover, setOpenTurnover] = useState(false);
    const [data, setData] = useState([]);

    const handleBack = () => {
        setData([]);
        setOpenHeadcount(false);
        setOpenTurnover(false);

    };

    const handleOpenHeadcount = () => {
        setOpenHeadcount(true);
    };
    const handleCloseHeadcount = () => {
        setOpenHeadcount(false);
    };

    const handleOpenTurnover = () => {
        setOpenTurnover(true);
    };
    const handleCloseTurnover = () => {
        setOpenTurnover(false);
    };

    return (
        <div className="analytics animate__animated animate__flipInY">
            <h1>Analytics People</h1>
            {data && data.length > 0 ? (
                <div className="analytics-container">
                    <h3>{`Média ${data[0].id} do período pesquisado: ${data[0].id === "Headcount" ? data[0].headcount : data[0].turnover}`}</h3>
                    <GraphicLine data={data} />
                    <div className="button-container d-flex justify-content-center">
                        <Button
                            type="button"
                            variant="warning"
                            className="button-login"
                            onClick={handleBack}
                            sx={{
                                input: {
                                    color: "white",
                                    fontSize: "14.5rem",
                                    fontWeight: "bold",
                                },
                                fieldset: { borderColor: "green" },
                            }}
                        >
                        Fazer outra análise
                        </Button>
                    </div>
                </div>
            ) : (
                <React.Fragment>
                    <ModalRender
                        setData={setData}
                        handleOpen={handleOpenHeadcount}
                        open={openHeadcount}
                        handleClose={handleCloseHeadcount}
                        TypeOfAnalysis={"Headcount"}
                    />

                    <ModalRender
                        setData={setData}
                        handleOpen={handleOpenTurnover}
                        open={openTurnover}
                        handleClose={handleCloseTurnover}
                        TypeOfAnalysis={"Turnover"}
                    />
                </React.Fragment>
            )}
        </div>
    );
}

export default Analytics;

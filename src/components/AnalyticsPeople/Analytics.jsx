import React, { useState } from "react";
import "../../styles/Analytics.css";
import ModalRender from "./Modal";
import GraphicLine from "./GraphicLine";

function Analytics() {
    const [openHeadcount, setOpenHeadcount] = useState(false);
    const [openTurnover, setOpenTurnover] = useState(false);
    const [data, setData] = useState([]);

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
                    <GraphicLine data={data} />
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

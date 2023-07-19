import React, { useState } from "react";
import "../../styles/Analytics.css";
import ModalRender from "./Modal";


function Analytics() {
    const [openHeadcount, setOpenHeadcount] = useState(false);
    const [openTurnover, setOpenTurnover] = useState(false);
      
    const handleOpenHeadcont = () => {
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
            <ModalRender handleOpen={handleOpenHeadcont} open={openHeadcount} handleClose={handleCloseHeadcount} TypeOfAnalysis={"Headcount"}/>
            <ModalRender handleOpen={handleOpenTurnover} open={openTurnover} handleClose={handleCloseTurnover} TypeOfAnalysis={"Turnover"}/>
        </div>
    );
}
export default Analytics; 
import React, { useState } from "react";
import "../../styles/Analytics.css";
import ModalRender from "./Modal";


function Analytics() {
    const [openHeadcount, setOpenHeadcount] = useState(false);
      
    const handleOpenHeadcont = () => {
        setOpenHeadcount(true);
    };
    const handleClose = () => {
        setOpenHeadcount(false);
    };

    return (
        <div className="analytics animate__animated animate__flipInY">
            <h1>Analytics People</h1>
            <ModalRender handleOpen={handleOpenHeadcont} openHeadcount={openHeadcount} handleClose={handleClose} TypeOfAnalysis={"Headcount"}/>
            <ModalRender handleOpen={handleOpenHeadcont} openHeadcount={openHeadcount} handleClose={handleClose} TypeOfAnalysis={"Turnover"}/>
        </div>
    );
}
export default Analytics; 
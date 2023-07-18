import { Box, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Modal.css";
import Button from "react-bootstrap/Button";
import FormDate from "./FormDate";

function ModalRender({ openHeadcount, handleClose, handleOpen, TypeOfAnalysis }) {
    const [startYear, setStartYear] = useState(2020);
    const [startMonth, setStartMonth] = useState(1);
    const [startDay, setStartDay] = useState(1);
    const [endYear, setEndYear] = useState(2020);
    const [endMonth, setEndMonth] = useState(1);
    const [endDay, setEndDay] = useState(1);
    const [selectValue, setSelectValue] = useState("Selecione");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        border: "2px solid #000",
        boxShadow: 24,
        pt: 0,
        px: 0,
        pb: 0,
        maxHeight: "100vh", // Defina a altura máxima desejada aqui
        overflowY: "auto", // Habilita a barra de rolagem quando o conteúdo excede a altura máxima
    };

    const handleChoose = () => {
        console.log("bla");
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <Button
                type="button"
                variant="success"
                className="button-login"
                onClick={handleOpen}
                sx={{
                    input: {
                        color: "white",
                        fontFamily: "nunito",
                        fontSize: "2.2rem",
                        fontWeight: "bold",
                    },
                    fieldset: { borderColor: "green" },
                }}
            >
                {`Ver ${TypeOfAnalysis}`}
            </Button>
            <Modal
                open={openHeadcount}
                onClose={handleClose}
                className="ModalRender animate__animated animate__zoomIn"
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="ModalBox d-flex justify-content-center flex-column" sx={{ ...style, width: 400 }}>
                    <div className="header">
                        <h2 id="parent-modal-title">{`${TypeOfAnalysis}`}</h2>
                    </div>
                    <h3 className="mt-1 p-1" id="parent-modal-description">
            Defina o período desejado para realizar a análise.
                    </h3>

                    <div className="form d-flex justify-content-center flex-column">
                        <p className="mt-1">Pesquisar da data:</p>
                        <FormDate year={startYear} setYear={setStartYear} month={startMonth} setMonth={setStartMonth} day={startDay} setDay={setStartDay} />
                        <p className="mt-1">Até a data:</p>
                        <FormDate year={endYear} setYear={setEndYear} month={endMonth} setMonth={setEndMonth} day={endDay} setDay={setEndDay} />
                    </div>
                    <Typography variant="h6" className="mt-1" id="parent-modal-description">
            Você deseja analisar os:
                    </Typography>
                    <RadioGroup
                        className="d-flex justify-content-center flex-row"
                        name="radio-buttons"
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                        row
                    >
                        <FormControlLabel
                            value="a"
                            control={<Radio />}
                            label="Subordinados diretos"
                            labelPlacement="start"
                            slotProps={{
                                input: { "aria-label": "Subordinados diretos" },
                            }}
                        />
                        <FormControlLabel
                            value="b"
                            control={<Radio />}
                            label="Todos os subordinados"
                            labelPlacement="end"
                            slotProps={{
                                input: { "aria-label": "Todos os subordinados" },
                            }}
                        />
                       
                    </RadioGroup>
                    <div>
                        <Button
                            type="button"
                            variant="primary"
                            className="search-button w-25"
                            onClick={handleChoose}>
                                Pesquisar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

ModalRender.propTypes = {
    openHeadcount: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    TypeOfAnalysis: PropTypes.string.isRequired,
};

export default ModalRender;

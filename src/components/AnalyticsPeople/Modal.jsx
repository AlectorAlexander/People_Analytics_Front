import { Box, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Modal.css";
import Button from "react-bootstrap/Button";
import FormDate from "./FormDate";
import { HeadcountFetch, headcountForIndirects, turnoverForIndirects, TurnoverFetch } from "../../services/BDRequests.js";
import ReactLoading from "react-loading";


function ModalRender({ open, handleClose, handleOpen, TypeOfAnalysis }) {
    const [startYear, setStartYear] = useState(2020);
    const [startMonth, setStartMonth] = useState(1);
    const [startDay, setStartDay] = useState(1);
    const [endYear, setEndYear] = useState(2020);
    const [endMonth, setEndMonth] = useState(1);
    const [endDay, setEndDay] = useState(1);
    const [selectValue, setSelectValue] = useState("a");
    const [loading, setLoading] = useState(false);

    const handleHeadcount = () => {
        const leaderEmail = JSON.parse(localStorage.getItem("userEmail"));
        const startDate = `${startYear}-${startMonth}-${startDay}`;
        const endDate = `${endYear}-${endMonth}-${endDay}`;

        const fetchData = selectValue === "a" ? HeadcountFetch : headcountForIndirects;

        setLoading(true);
        fetchData(startDate, endDate, leaderEmail)
            .then((response) => {
                if (response.status === 200) {
                    const { activeEmployees } = response.data;
                    if (activeEmployees.length === 0) {
                        alert("Não foram encontrados dados com esses parâmetros de pesquisa");
                    } else {
                        console.log(activeEmployees);
                    }
                } else {
                    alert("Não foi possível realizar essa pesquisa");
                }
            })
            .catch((error) => {
                alert("Não foi possível realizar essa pesquisa");
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleTurnover = () => {
        const leaderEmail = JSON.parse(localStorage.getItem("userEmail"));
        const startDate = `${startYear}-${startMonth}-${startDay}`;
        const endDate = `${endYear}-${endMonth}-${endDay}`;

        const fetchData = selectValue === "a" ? TurnoverFetch : turnoverForIndirects;

        setLoading(true);
        fetchData(startDate, endDate, leaderEmail)
            .then((response) => {
                if (response.status === 200) {
                    const { employeesFired } = response.data;
                    if (employeesFired.length === 0) {
                        alert("Não foram encontrados dados com esses parâmetros de pesquisa");
                    } else {
                        console.log(employeesFired);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const callTheRightFunction = () => {
        if (TypeOfAnalysis === "Headcount") {
            handleHeadcount();
        } else {
            handleTurnover();
        }
    };

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
                open={open}
                onClose={handleClose}
                className="ModalRender animate__animated animate__fadeIn"
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="ModalBox d-flex justify-content-center flex-column" sx={{ ...style, width: 400 }}>
                    <div className="header mt-2">
                        <h2 className="mt-3" id="parent-modal-title">{`${TypeOfAnalysis}`}</h2>
                    </div>
                    <h3 className="" id="parent-modal-description">
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
                    <div className="d-flex justify-content-center flex-row mt-2">
                        {loading ? (
                            <ReactLoading type="spinningBubbles" color="#000000" height={50} width={50} />
                        ) : (
                            <Button
                                type="button"
                                variant="primary"
                                className="search-button w-25 mb-3"
                                onClick={callTheRightFunction}
                            >
                Pesquisar
                            </Button>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

ModalRender.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    TypeOfAnalysis: PropTypes.string.isRequired,
};

export default ModalRender;

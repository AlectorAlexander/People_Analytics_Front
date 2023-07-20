import { Box, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Modal.css";
import Button from "react-bootstrap/Button";
import FormDate from "./FormDate";
import { HeadcountFetch, headcountForIndirects, turnoverForIndirects, TurnoverFetch } from "../../services/BDRequests.js";
import { timeFormat } from "d3-time-format";
import ReactLoading from "react-loading";



function ModalRender({ setData, open, handleClose, handleOpen, TypeOfAnalysis }) {
    const [startYear, setStartYear] = useState(2020);
    const [startMonth, setStartMonth] = useState(1);
    const [startDay, setStartDay] = useState(1);
    const [endYear, setEndYear] = useState(2020);
    const [endMonth, setEndMonth] = useState(1);
    const [endDay, setEndDay] = useState(1);
    const [selectValue, setSelectValue] = useState("a");
    const [loading, setLoading] = useState(false);


    const formatDate = timeFormat("%d/%m/%y");

    const handleHeadcountAndTurnover = () => {
        const leaderEmail = JSON.parse(localStorage.getItem("userEmail"));
        const startDate = `${startYear}-${startMonth}-${startDay}`;
        const endDate = `${endYear}-${endMonth}-${endDay}`;

        const fetchData = selectValue === "a" ? HeadcountFetch : headcountForIndirects;

        setLoading(true);
        fetchData(startDate, endDate, leaderEmail)
            .then((response) => {
                if (response.status === 200) {
                    const { activeEmployees, headcount } = response.data;
                    if (activeEmployees.length === 0) {
                        alert("Não foram encontrados dados com esses parâmetros de pesquisa");
                    } else {
                        let cumulativeCount = 0;
                        const dataMap = new Map();

                        activeEmployees.sort((a, b) => new Date(a.hireDate) - new Date(b.hireDate))
                            .forEach((employee) => {
                                const { hireDate } = employee;
                                cumulativeCount++;
                                dataMap.set(hireDate, cumulativeCount);
                            });

                        const data = [
                            {
                                headcount,
                                id: "Headcount",
                                color: "hsl(205, 70%, 50%)",
                                data: Array.from(dataMap, ([x, y]) => ({ x: formatDate(new Date(x)), y })),
                            },
                        ];
                        setData(data);
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
                    const { employeesFired, turnover } = response.data;
                    if (employeesFired.length === 0) {
                        alert("Não foram encontrados dados com esses parâmetros de pesquisa");
                    } else {
                        let cumulativeCount = 0;
                        const dataMap = new Map();

                        employeesFired.sort((a, b) => new Date(a.terminationDate) - new Date(b.terminationDate))
                            .forEach((employee) => {
                                const { terminationDate } = employee;
                                cumulativeCount++;
                                dataMap.set(terminationDate, cumulativeCount);
                            });

                        const data = [
                            {
                                turnover,
                                id: "Turnover",
                                color: "hsl(205, 70%, 50%)",
                                data: Array.from(dataMap, ([x, y]) => ({ x: formatDate(new Date(x)), y })),
                            },
                        ];
                        console.log(data);
                        setData(data);
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
            handleHeadcountAndTurnover();
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
        maxHeight: "100vh",
        overflowY: "auto", 
    };

    return (
        <div className="Modal d-flex justify-content-center mt-3">
            <Button
                type="button"
                variant="success"
                className="button-Analysis my-3"
                onClick={handleOpen}
            >
                <span>{`Ver ${TypeOfAnalysis}`}</span>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                className="ModalRender animate__animated animate__fadeIn"
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="ModalBox d-flex justify-content-center flex-column" sx={{ ...style, width: 400 }}>
                    <div className="header">
                        <h2 className="mt-3" id="parent-modal-title">{`${TypeOfAnalysis}`}</h2>
                    </div>
                    <p className="p-2" id="parent-modal-description">
            Defina o período desejado para realizar a análise.
                    </p>

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
                                variant="success"
                                className="button-search mb-1"
                                onClick={callTheRightFunction}
                            >
                                <span>Pesquisar</span>
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
    setData: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    TypeOfAnalysis: PropTypes.string.isRequired,
};

export default ModalRender;

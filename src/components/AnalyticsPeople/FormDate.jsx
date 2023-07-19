import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function FormDate({year, month, day, setYear, setMonth, setDay}) {
    
    const menuMonthCreate = () => {
        const array = [];
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        
        for (let i = 1; i <= 12; i++) {
            array.push(
                <MenuItem key={i} value={i}>
                    {months[i - 1]}
                </MenuItem>
            );
        }
        
        return array;
    };
    

    const menuDayCreate = () => {
        const array = [];
        let daysInMonth = 31;
    
        if (month === 2) {
            daysInMonth = 28;
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            daysInMonth = 30;
        }
    
        for (let i = 1; i <= daysInMonth; i++) {
            array.push(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
        }
    
        return array;
    };

    return (
        <div className="d-flex justify-content-center mb-3 flex-row">
            <FormControl sx={{ mx: 1, minWidth: 120 }}>
                <InputLabel id="helper-ano">
                            Ano
                </InputLabel>
                <Select
                    labelId="helper-ano"
                    id="helper-ano"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    label="Ano"
                    autoWidth>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mx: 1, minWidth: 120 }}>
                <InputLabel id="helper-mes">Mês
                </InputLabel>
                <Select
                    labelId="helper-mes"
                    id="helper-mes"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    label="Mês"
                    autoWidth
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200
                            }
                        }
                    }}>
                    {menuMonthCreate()}
                </Select>
            </FormControl>
            <FormControl sx={{ mx: 1, minWidth: 20 }}>
                <InputLabel id="helper-dia">Dia</InputLabel>
                <Select
                    labelId="helper-dia"
                    id="helper-select"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    label="Dia"
                    autoWidth
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200
                            }
                        }
                    }}
                >
                    {menuDayCreate()}
                </Select>
            </FormControl>
        </div>
    );
}

FormDate.propTypes = {
    day: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    setMonth: PropTypes.func.isRequired,
    setYear: PropTypes.func.isRequired,
    setDay: PropTypes.func.isRequired,
};


export default FormDate;

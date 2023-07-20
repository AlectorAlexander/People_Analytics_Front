import { ResponsiveLine } from "@nivo/line";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

function GraphicLine({ data }) {
    const CustomTooltip = ({ point }) => (
        <div>
            <strong>Data: </strong>
            {point.data.x}
            <br />
            <strong>{data[0].id === "Headcount" ? "Headcount" : "Turnover"} </strong>
            {point.data.y}
        </div>
    );

    CustomTooltip.propTypes = {
        point: PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.shape({
                x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
        }).isRequired,
    };

    useEffect(() => {
        console.log(data);
        console.log(data[0].data[0]);
    }, [data]);

    const theme = {
        textColor: "#ffffff",
        axis: {
            ticks: {
                text: {
                    fill: "#fefefe",  // Cor do texto dos ticks dos eixos.
                },
            },
            legend: {
                text: {
                    fill: "#fefefe",  // Cor do texto das legendas dos eixos.
                },
            },
        },
        grid: {
            line: {
                stroke: "#0af952",  // Cor das linhas de grade.
            },
        },
        
        tooltip: {
            textColor: "#7d1d1d",
            container: {
                background: "rgba(153, 17, 17, 0.8)", // Defina a cor de fundo do tooltip aqui
            },
        },
    };

    const colors = (serie) => {
        return serie.id === "Headcount" ? "red" : "orange";
    };

    const legend = () => {
        return data[0].id === "Headcount" ? "Headcount" : "Turnover";
    };


    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            tooltip={CustomTooltip}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: legend(),
                legendOffset: 6,
                legendPosition: "middle",
                style: {
                    text: {
                        fill: "#ffffff",
                    },
                },
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendOffset: -40,
                legendPosition: "middle",
                style: {
                    text: {
                        fill: "#3f0d0d",
                    },
                },
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgb(253, 0, 0)",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgb(211, 16, 16)",
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            theme={theme}
            colors={colors}
        />
    );
}

GraphicLine.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.string.isRequired,
                    y: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default GraphicLine;

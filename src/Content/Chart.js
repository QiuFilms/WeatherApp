import { axisClasses, chartsAxisHighlightClasses, chartsGridClasses, legendClasses } from "@mui/x-charts";
import { LineChart, markElementClasses } from '@mui/x-charts/LineChart';

export default function Chart({labels, valuesY1, valuesY2, type}){

    return(
        <LineChart
                series={[
                    { data: valuesY1, 
                        color: "orange",
                        showMark: ({ index }) => {
                            if(type == "primary") return index

                            return index % 12 === 0
                        },
                        valueFormatter: (value) => (value == null ? '?' : `${value}°C`),
                        id: 'line1',
                        label: valuesY2 ? "Max Temperature" : "Temperature",
                        labelMarkType: 'square',
                    },
                    ...(valuesY2 ? [{
                        data: valuesY2,
                        color: "#006BD6",
                        label: "Min Temperature",
                        showMark: ({ index }) => {
                            if(type == "primary") return index

                            return index % 12 === 0
                        },
                        valueFormatter: (value) => (value == null ? '?' : `${value}°C`),
                        id: 'line2',
                        labelMarkType: 'square',
                    }]:[])

                ]}
                grid={{ vertical: true, horizontal: true }}
                xAxis={[{ scaleType: 'point', data: labels, label:"Days", 
                    valueFormatter: (value) => {
                        if(type == "primary") return value

                        if(value.includes("12:00")){
                            return "12:00"
                        }

                        if(value.includes("00:00")){
                            const date = new Date(value.replace("T00:00", ""))
                            return `${date.getDay().toString().padStart(2,"0")}/${date.getMonth().toString().padStart(2,"0")}/${date.getFullYear().toString().padStart(2,"0")}`
                        }
                        return "";
                    },
                    tickInterval: (value, index) => {
                        if(type == "primary") return value

                        return index % 12 === 0; 
                    }
                }]}
                yAxis={[{ width: 60, min:Math.floor(Math.min(...(valuesY2 ? valuesY2:valuesY1))), max:Math.ceil(Math.max(...valuesY1)), label:"Temperature", 
                    valueFormatter: (value) => (value == null ? '?' : `${value}°C`),
                    tickInterval: (value) => {
                        if(type == "primary") return value
                        
                        return value === 50
                    }
                }]}
                margin={{
                    right: 40
                }}
                width={1000}
                height={450}


                sx={{[`.${axisClasses.root}`]: {
                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {

                        stroke: 'white',
                    
                        strokeWidth: 2,
                    },
                    [`.${axisClasses.tickLabel}`]: {
                        fill: 'white',
                    },

                    [`.${axisClasses.label}`]: {
                        fill: 'white',
                    },
                },[`.${chartsGridClasses.line}`]: {
                    stroke: 'rgb(100,100,100)',
                    strokeWidth: 1,
                },[`.${chartsAxisHighlightClasses.root}`]:{
                    stroke:"white",
                    opacity:1,
                    strokeWidth: 2,
                    strokeDasharray:"0"
                },
                [`& .${markElementClasses.series}-line1`]: {
                    stroke: 'orange',
                    fill:  'orange',
                    strokeWidth: 2,
                }, 
                [`& .${markElementClasses.series}-line2`]: {
                    stroke: '#006BD6',
                    fill:  '#006BD6 ',
                    strokeWidth: 2,
                }, 
                [`& .${legendClasses.label}`]: {
                    color:"white"
                },
                [`.${legendClasses.mark}`]: {
                    width: 10,
                }

            }}
        />
    )
}
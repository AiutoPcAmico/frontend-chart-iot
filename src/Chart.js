import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchData } from './getData.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Temperature & Humidity',
        },
    },
    scales: {
        hum: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                    var correct = value.toFixed(0)
                    return correct + ' %';
                }
            }
        },
        temp: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                    var correct = value.toFixed(1)
                    return correct + ' °C';
                }
            }
        },
    },
};


async function getValues() {
    var timestamps = [];
    var temperatures = [];
    var humidities = []
    await fetchData().then((response) => {
        response.map((element) => {
            timestamps.push(element.timestamp)
            temperatures.push(element.value)
            humidities.push(element.hum)
            return null
        })
        return timestamps
    });
    return {
        timestamps,
        temperatures,
        humidities
    }

}


function formatDate(time) {
    var date = new Date(time)
    date.setHours(date.getHours() + 1);
    date = date.toISOString().slice(0, 19).replace('T', ' ')
    return date
}




export function Chart() {

    const [labels, setLabels] = useState([])
    const [temperatures, setTemperatures] = useState([])
    const [humidities, setHumidities] = useState([])
    const MINUTE_MS = 5000;

    function updateValue() {
        getValues().then((response) => {


            var correctedTimestamps = []

            correctedTimestamps = response.timestamps.slice(-30).map((singleTime) => {
                const date = formatDate(singleTime)
                return date
            })

            setLabels(correctedTimestamps.slice(-30))
            setTemperatures(response.temperatures.slice(-30))
            setHumidities(response.humidities.slice(-30))
            console.log("ricarico!")
        })
    }

    useEffect(() => {
        updateValue()
    }, [])


    React.useEffect(() => {
        const interval = setInterval(() => {
            updateValue()

        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])

    const data = {
        labels,
        datasets: [
            {
                label: 'Umidità',
                data: humidities,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'hum',
            },
            {
                label: 'Temperatura',
                data: temperatures,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'temp',
            },
        ],
    };

    return (
        <p>
            <p className='titols'>Grafico</p>
            <p><i>Vengono visualizzati gli ultimi 30 valori (150 secondi)</i></p>
            <Line options={options} data={data} />
        </p>
    );
}

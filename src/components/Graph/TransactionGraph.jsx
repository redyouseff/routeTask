import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TransactionGraph = ({ customerId }) => {
    const [trans, setTrans] = useState([]);

    useEffect(() => {
         fetch('https://redyouseff.github.io/jsonServer/db.json')
            .then((res) => res.json())
            .then((data) => setTrans(data.transactions));
    }, []);

    const customerTransactions = trans.filter((tran) => tran.customer_id == customerId);

    if (customerTransactions.length === 0) {
        return <p>No transactions available for this customer.</p>;
    }

    const data = {
        labels: customerTransactions.map((tran) => tran.date),
        datasets: [
            {
                label: 'Transaction Amount',
                data: customerTransactions.map((tran) => tran.amount),
                backgroundColor: 'rgba(13, 202, 240, 1)', 
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white',
                },
            },
            title: {
                display: true,
                text: 'Transaction Amounts Over Time',
                color: 'rgba(13, 202, 240, 1)', // Bright blue
            },
            tooltip: {
                callbacks: {
                    labelTextColor: function() {
                        return 'white';
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default TransactionGraph;

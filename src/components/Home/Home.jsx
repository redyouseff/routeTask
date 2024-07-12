import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { MDBInputGroup } from 'mdb-react-ui-kit';

export default function Home() {
    const [customers, setCustomers] = useState([]);
    const [trans, setTrans] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:8000/customers')
            .then((res) => res.json())
            .then((data) => setCustomers(data));
        fetch('http://localhost:8000/transactions')
            .then((res) => res.json())
            .then((data) => setTrans(data));
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            fetchData();
        }
    };

    const onHandelSubmit = () => {
        if (search === '') {
            fetchData();
            return;
        }
        fetch('http://localhost:8000/transactions')
            .then((res) => res.json())
            .then((data) => {
                const filteredData = data.filter((item) => {
                    const customer = customers.find(c => c.id == item.customer_id);
                    return (
                        item.amount == search ||
                        (customer && customer.name.toLowerCase().includes(search.toLowerCase()))
                    );
                });
                setTrans(filteredData);
            });
    };

    return (
        <>
            <div className='container'>
                <h1 className='text-center text-white'>Transaction Table</h1>
                <MDBInputGroup className='d-flex justify-content-center w-100 H-100'>
                    <input
                        className='mt-2 me-2 bar bg-white rounded-2'
                        placeholder='Search by Amount or Name'
                        onChange={onSearchChange}
                    />
                    <button
                        onClick={onHandelSubmit}
                        className='btn btn-outline-info search text-white h-25  rounded-2'
                    >
                        <i className='icon fa-solid fa-search'></i>
                        
                    </button>
                </MDBInputGroup>
                <Table
                    className='Table'
                    responsive="sm"
                    style={{ border: '1px solid black', borderCollapse: 'collapse' }}
                    bordered hover
                    variant="dark"
                >
                    <thead>
                        <tr>
                            <th className='bg-black text-white' style={{ border: '1px solid white' }}>ID</th>
                            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Customer ID</th>
                            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Name</th>
                            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Date</th>
                            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Amount</th>
                            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans.map((tran) => (
                            <tr key={tran.id}>
                                <td style={{ border: '1px solid black' }}>{tran.id}</td>
                                <td style={{ border: '1px solid black' }}>{tran.customer_id}</td>
                                {customers.map((item, index) => {
                                    if (parseInt(item.id) === parseInt(tran.customer_id)) {
                                        return <td key={index} style={{ border: '1px solid black' }}>{item.name}</td>;
                                    }
                                })}
                                <td style={{ border: '1px solid black' }}>{tran.date}</td>
                                <td style={{ border: '1px solid black' }}>{tran.amount}</td>
                                <td className='text-center' style={{ border: '1px solid black' }}>
                                    <Link to={`/${tran.customer_id}`} className='text-white btn btn-outline-info'>Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

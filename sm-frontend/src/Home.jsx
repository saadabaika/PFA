// Home.jsx
import React, { useState, useEffect } from 'react';
import { fetchProducts ,fetchClients,getProduitsStockFaible} from './services/api';
import { Link } from 'react-router-dom';
import './App.css';
import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill,BsGraphUp } from 'react-icons/bs';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import ProductsList from './components/ProductsList';

function Home() {
    const [productCount, setProductCount] = useState(0); 
    const [clientCount, setClientCount] = useState(0); 
    const [alertCount, setAlertCount] = useState(0); 
    const [products, setProducts] = useState([]); 
    const [clients, setClients] = useState([]); 
    const [alerts, setAlerts] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await fetchProducts();
                setProducts(productResponse.data); 
                setProductCount(productResponse.data.length); 

                const clientResponse = await fetchClients();
                setClients(clientResponse.data); 
                setClientCount(clientResponse.data.length); 

                const alertResponse = await getProduitsStockFaible();
                console.log('Alert Response:', alertResponse); // Debugging log
                if (alertResponse) {
                    setAlerts(alertResponse); 
                    setAlertCount(alertResponse.length); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div>
                  <Link to="/produits" className='card'>
                    <div className='card-inner'>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{productCount}</h1>
                    </Link>

                </div>
                
                <div> <Link to="/Clients" className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{clientCount}</h1>
                    </Link>

                </div>
              
                <div>
                    <Link to="/AlertProduct" className='card'>
                        <div className='card-inner'>
                            <h3>ALERTS</h3>
                            <BsFillBellFill className='card_icon'/>
                        </div>
                        <h1>{alertCount}</h1>
                    </Link>
                </div>
                <div>
                    <Link to="/report" className='card'>
                        <div className='card-inner'>
                            <h3>REPORT</h3>
                            <BsGraphUp className='card_icon'/>
                        </div>
                       <h1>3</h1>

                    </Link>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default Home;

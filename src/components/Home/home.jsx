import React, { useState, useEffect } from 'react';
import Loader from '../Common/Loder';
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils';
import axios from 'axios';
import './home.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
//import { Button, ButtonGroup } from '@material-ui/core';


function Home() {
  const [data, setData] = useState([]);
  const [view, setView] = useState('day');
  const [pieData, setPieData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  useEffect(() => {
    setView('day');
    fetchData('day');
  }, [view]);

  const fetchData = async (view) => {
    try {
      // const response = await axios.get(`/api/login-activities?view=${view}`);
      //setData(response.data);
      setData(getDataForDay());
      const pieData = [{
        name: '10:00',
        value: 1
      },
      {
        name: '11:00',
        value: 0.5
      }]
      setPieData(pieData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };
  const getDataForDay = () => {
    // Return mock data or fetch from database
    return [
      { time: '00:00', activeHours: 0 },
      { time: '04:00', activeHours: 0 },
      { time: '08:00', activeHours: 0.4 },
      { time: '12:00', activeHours: 1 },
      { time: '16:00', activeHours: 0.4 },
      { time: '20:00', activeHours: 0 },
      { time: '24:00', activeHours: 0 },
      // more data
    ];
  };

  return (
    <div className='dashboard'>
      <div className="pie-chart col-md-12 col-lg-12">
        <div className='row'>
          <div className='col-md-4 col-lg-4'>
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
              <h3>Activity Details</h3>
              <select className='form-select' >
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
                <option>All</option>
              </select>
            </div>
            <div style={{ width: 'max-content', margin: 'auto',backgroundColor:'bisque',padding:'5px 20px',textAlign:'center',borderRadius:'25px'}} className='mt-3'>
                <h4 className='mt-1'>Total Active Hours</h4>
                <h4 className='mt-1'>05:10</h4>
              </div>
          </div>
          <div className='col-md-4 col-lg-4'>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='col-md-4 col-lg-4'>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="line-chart">
        <ResponsiveContainer width="100%" height={300} style={{ marginLeft: '-25px' }}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activeHours" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Home; 

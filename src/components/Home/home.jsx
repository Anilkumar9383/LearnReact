import React, { useState, useEffect } from 'react';
import Loader from '../Common/Loder';
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils';
import './home.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import apiURL from '../Common/ApiUrl.jsx';
import {
  parse, differenceInMinutes, format, startOfWeek, endOfWeek, eachDayOfInterval,
  startOfMonth, endOfMonth, eachMonthOfInterval, startOfYear, endOfYear, subYears,isValid
} from 'date-fns';

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [Logins, setLogins] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [pieData1, setPieData1] = useState([]);
  const [totalHours, setTotalHours] = useState('00:00'); // Initialize with 0 hours
  const Username = window.sessionStorage.getItem('Username');
  const [flag, setFlag] = useState("Day");

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    GetLoginHistory(flag);
    //Set an interval to refresh data every 5 minutes
    const interval = setInterval(() => {
      GetLoginHistory(flag);
    }, 60000); // 300000ms = 5 minutes

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const GetLoginHistory = async (e) => {
    setLogins([]);
    try {
      setLoading(true);
      const inpObj = encryptJSON(JSON.stringify({ "username": Username, "flag": e }));
      const response = await fetch(apiURL + 'Login/LoginHistory', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(inpObj),
      });
      const data = await response.text();
      const result = JSON.parse(decryptJSON(JSON.stringify(data)));
      console.log('Fetched Data:', result);
      setLogins(result);
      const aggregatedData = aggregateTime(result, e);
      console.log('Aggregated Data:', aggregatedData);
      const formattedData = formatTimeData(aggregatedData, e);
      console.log('Formatted Data:', formattedData);
      fetchData(formattedData,e);
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = (Datas, flag) => {
    console.log("Fetched Data for Charts:", Datas);
    const pieData = Datas.map(item => ({
      name: item.dateStr,
      value: item.totalTime
    }));
    setPieData(pieData);
    if (flag === 'Day') {
      setPieData1(pieData);
    }

    const totalMinutes = Datas.reduce((sum, item) => sum + item.totalTime, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setTotalHours(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    setData(Datas);
  };

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setFlag(selectedValue);
    await GetLoginHistory(selectedValue);
  };

  
  const parseDate = (dateString) => {
    const formats = ['MM/dd/yyyy hh:mm:ss a', 'dd-MM-yyyy hh:mm:ss a', 'yyyy-MM-dd HH:mm:ss'];

    for (const format of formats) {
      const parsedDate = parse(dateString, format, new Date());
      if (isValid(parsedDate)) {
        return parsedDate;
      }
    }

    throw new Error('Invalid date format');
  };

  const initializeTimeMap = (flag) => {
    debugger;
    const timeMap = {};
    const today = new Date();
    switch (flag) {
      case 'Day':
        for (let i = 0; i < 24; i++) {
          timeMap[`${i.toString().padStart(2, '0')}:00`] = { dateStr: `${i.toString().padStart(2, '0')}:00`, totalTime: 0 };
        }
        break;
      case 'Week':
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        eachDayOfInterval({ start: weekStart, end: weekEnd }).forEach(date => {
          timeMap[format(date, 'dd-MMM')] = { dateStr: format(date, 'dd-MMM'), totalTime: 0 };
        });
        break;
      case 'Month':
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(date => {
          timeMap[format(date, 'dd-MMM')] = { dateStr: format(date, 'dd-MMM'), totalTime: 0 };
        });
        break;
      case 'Year':
        for (let i = 0; i < 12; i++) {
          const monthDate = new Date(today.getFullYear(), i, 1);
          timeMap[format(monthDate, 'MMM-yyyy')] = { dateStr: format(monthDate, 'MMM-yyyy'), totalTime: 0 };
        }
        break;
      case 'All':
        const startYear = subYears(today, 5);
        const endYear = today;
        eachMonthOfInterval({ start: startYear, end: endYear }).forEach(date => {
          timeMap[format(date, 'MMM-yyyy')] = { dateStr: format(date, 'MMM-yyyy'), totalTime: 0 };
        });
        break;
      default:
        break;
    }
    return timeMap;
  };

  const aggregateTime = (data, flag) => {
    const timeMap = initializeTimeMap(flag);
    const today = new Date();
    let startDate, endDate;
    switch (flag) {
      case 'Week':
        startDate = startOfWeek(today);
        endDate = endOfWeek(today);
        break;
      case 'Month':
        startDate = startOfMonth(today);
        endDate = endOfMonth(today);
        break;
      case 'Year':
        startDate = startOfYear(today);
        endDate = endOfYear(today);
        break;
      case 'All':
        startDate = subYears(today, 5);
        endDate = today;
        break;
      default: // 'Day'
        startDate = today;
        endDate = today; // For 'Day' case, use today
        break;
    }

    data.forEach(({ LastLogin, LastLogout }) => {
      debugger;
      const loginTime = parseDate(LastLogin);
      const logoutTime = parseDate(LastLogout);

      if (flag !== 'Day') {
        if (logoutTime <= loginTime) return;

        if (loginTime < startDate || logoutTime > endDate) {
          return;
        }
      }

      let dateStr;
      debugger;
      switch (flag) {
        case 'Day':
          dateStr = format(loginTime, 'HH:00');
          break;
        case 'Week':
        case 'Month':
          dateStr = format(loginTime, 'dd-MMM');
          break;
        case 'Year':
          dateStr = format(loginTime, 'MMM-yyyy');
          break;
        case 'All':
          dateStr = format(loginTime, 'MMM-yyyy');
          break;
        default:
          dateStr = format(loginTime, 'MMM-yyyy');
          break;
      }

      const durationMinutes = differenceInMinutes(logoutTime, loginTime);
      debugger;
      if (durationMinutes > 0) {
        if (!timeMap[dateStr]) {
          timeMap[dateStr] = { dateStr, totalTime: 0 };
        }
        timeMap[dateStr].totalTime += durationMinutes;
      }
    });

    return Object.values(timeMap);
  };

  const formatTimeData = (timeMap) => {
    return timeMap.map(({ dateStr, totalTime }) => ({
      dateStr,
      totalTime
    }));
  };

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { totalTime } = payload[0].payload;
      const hours = Math.floor(totalTime / 60);
      const minutes = totalTime % 60;
      const seconds = 0; // Assuming totalTime is in minutes, so seconds are 0
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="intro">{`Total Time: ${formattedTime}`}</p>
        </div>
      );
    }

    return null;
  };
  const CustomTooltip1 = ({ payload }) => {
    debugger
    if (payload && payload.length) {
      const { value } = payload[0].payload; // Access value instead of totalTime
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      const seconds = 0; // Assuming value is in minutes, so seconds are 0
      const label = payload[0].name;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="intro">{`Total Time: ${formattedTime}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='dashboard'>
      {loading && <Loader />}
      <div className="pie-chart col-md-12 col-lg-12">
        <div className='row'>
          <div className='col-md-4 col-lg-4'>
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
              <h3>Activity Details</h3>
              <select className='form-select' onChange={handleSelectChange} value={flag}>
                <option value={'Day'}>Today</option>
                <option value={'Week'}>This Week</option>
                <option value={'Month'}>This Month</option>
                <option value={'Year'}>This Year</option>
                <option value={'All'}>All</option>
              </select>
            </div>
            <div style={{ width: 'max-content', margin: 'auto', backgroundColor: 'bisque', padding: '5px 20px', textAlign: 'center', borderRadius: '10px', color: 'brown' }} className='mt-3'>
              <h4 className='mt-1'>Total Hours: {totalHours}</h4>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 col-sm-6 Dashsmview'>
            <ResponsiveContainer width="100%" height={200} className='DashsmHeight'>
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
                <Tooltip content={<CustomTooltip1 />} />
              </PieChart>
            </ResponsiveContainer>
            <p className='text-center'>Selected Activity</p>
          </div>
          <div className='col-md-4 col-lg-4 col-sm-6 Dashsmview'>
            <ResponsiveContainer width="100%" height={200} className='DashsmHeight'>
              <PieChart>
                <Pie
                  data={pieData1}
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
                <Tooltip content={<CustomTooltip1 />} />
              </PieChart>
            </ResponsiveContainer>
            <p className='text-center'>Today Activity</p>
          </div>
        </div>
      </div>
      <div className="line-chart">
        <ResponsiveContainer width="100%" height={300} style={{ marginLeft: '-25px' }}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateStr" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="totalTime" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Home;

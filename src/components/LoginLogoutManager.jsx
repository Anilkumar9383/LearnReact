import React, { useState } from 'react';
import { parse, differenceInMinutes, format, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, startOfYear, subYears, eachYearOfInterval, addDays } from 'date-fns';

const TimeCalculator = () => {
  // Example input data
  const data = [
    {
      "LastLogin": "04-08-2024 12:29:11 AM",
      "LastLogout": "04-08-2024 12:30:42 AM"
    },
    {
      "LastLogin": "04-08-2024 12:30:50 AM",
      "LastLogout": "04-08-2024 12:30:50 AM"
    }
  ];

  // State for the selected flag
  const [flag, setFlag] = useState('Day');

  // Function to handle select change
  const handleSelectChange = (event) => {
    setFlag(event.target.value);
  };

  // Function to parse date string
  const parseDate = (dateString) => {
    return parse(dateString, 'dd-MM-yyyy hh:mm:ss a', new Date());
  };

  // Initialize time map based on the flag
  const initializeTimeMap = (flag) => {
    const timeMap = {};
    let startDate, endDate;

    switch (flag) {
      case 'Day':
        for (let i = 0; i < 24; i++) {
          timeMap[`${i.toString().padStart(2, '0')}:00`] = { dateStr: `${i.toString().padStart(2, '0')}:00`, totalTime: 0 };
        }
        break;
      case 'Week':
        startDate = startOfWeek(new Date());
        endDate = addDays(startDate, 6); // 7 days in a week
        eachDayOfInterval({ start: startDate, end: endDate }).forEach(date => {
          timeMap[format(date, 'dd-MMM')] = { dateStr: format(date, 'dd-MMM'), totalTime: 0 };
        });
        break;
      case 'Month':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        eachDayOfInterval({ start: startDate, end: endDate }).forEach(date => {
          timeMap[format(date, 'dd-MMM')] = { dateStr: format(date, 'dd-MMM'), totalTime: 0 };
        });
        break;
      case 'Year':
        for (let i = 0; i < 12; i++) {
          timeMap[format(new Date(new Date().getFullYear(), i, 1), 'MMM-yyyy')] = { dateStr: format(new Date(new Date().getFullYear(), i, 1), 'MMM-yyyy'), totalTime: 0 };
        }
        break;
      case 'All':
        const startYear = subYears(new Date(), 5); // 5 years ago from today
        const endYear = new Date();
        eachMonthOfInterval({ start: startYear, end: endYear }).forEach(date => {
          timeMap[format(date, 'MMM-yyyy')] = { dateStr: format(date, 'MMM-yyyy'), totalTime: 0 };
        });
        break;
      default:
        break;
    }

    return timeMap;
  };

  // Function to calculate duration and aggregate by date and hour based on flag
  const aggregateTime = (data, flag) => {
    const timeMap = initializeTimeMap(flag);

    data.forEach(({ LastLogin, LastLogout }) => {
      const loginTime = parseDate(LastLogin);
      const logoutTime = parseDate(LastLogout);

      let dateStr;
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
      if (durationMinutes > 0) {
        if (!timeMap[dateStr]) {
          timeMap[dateStr] = { dateStr, totalTime: 0 };
        }
        timeMap[dateStr].totalTime += durationMinutes;
      }
    });

    return Object.values(timeMap);
  };

  // Function to format the time data
  const formatTimeData = (timeMap, flag) => {
    return timeMap.map(({ dateStr, totalTime }) => {
      const totalSeconds = totalTime * 60;
      const days = Math.floor(totalSeconds / 86400); // Number of days
      const hours = Math.floor((totalSeconds % 86400) / 3600); // Number of hours
      const minutes = Math.floor((totalSeconds % 3600) / 60); // Number of minutes
      const seconds = Math.floor(totalSeconds % 60); // Number of seconds

      let formattedTime;
      switch (flag) {
        case 'Day':
          formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          break;
        case 'Week':
        case 'Month':
          formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          break;
        case 'Year':
        case 'All':
          formattedTime = `${days.toString().padStart(2, '0')}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          break;
        default:
          formattedTime = '00:00:00';
          break;
      }

      return {
        dateStr,
        formattedTime
      };
    });
  };

  const aggregatedData = aggregateTime(data, flag);
  const formattedData = formatTimeData(aggregatedData, flag);

  return (
    <div>
      <select className='form-select' onChange={handleSelectChange} value={flag}>
        <option value='Day'>Today</option>
        <option value='Week'>This Week</option>
        <option value='Month'>This Month</option>
        <option value='Year'>This Year</option>
        <option value='All'>All Time</option>
      </select>

      {formattedData.length > 0 ? (
        formattedData.map((entry, index) => (
          <div key={index}>
            <p>Date: {entry.dateStr}</p>
            <p>Formatted Time: {entry.formattedTime}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TimeCalculator;

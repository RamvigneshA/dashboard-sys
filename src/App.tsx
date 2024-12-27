import { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';
import Barchart from './Bar';
import { Linechart } from './Line';
import { Radialchart } from './Radial';

const time = {
    ALL: 'all',
  '30_SEC': 'last30sec',
  '1_MIN': 'last1min',
  '2_MIN':'last2min'
}

function App() {
  const [systemMetrics, setSystemMetrics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTimeframe, setFilterTimeframe] = useState(time.ALL); // New state for filtering

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setSystemMetrics((prevMetrics) => [...prevMetrics, data]); // Append new metric data
    };

    return () => socket.close();
  }, []);

  const filteredData = systemMetrics.filter((item) => {
    // Determine if the item is within the specified timeframe
    const itemTimestamp = new Date(item?.timestamp).getTime();
    const now = Date.now();
    const withinTimeframe =
    filterTimeframe === time.ALL||
    (filterTimeframe === time['30_SEC']&& (now - itemTimestamp <= 30000)) || // Last 30 seconds
    (filterTimeframe === time['1_MIN'] && (now - itemTimestamp <= 60000)) || // Last 1 minute
    (filterTimeframe === time['2_MIN'] && (now - itemTimestamp <= 120000)); // Last 2 minutes
    return withinTimeframe;
  });

  // Return true if the item is within the timeframe and matches the search term
  // console.log('🚀 ~ App ~ filteredData:', filteredData);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Metrics</h1>
        <p className="text-gray-500">Real-time system metrics and analytics</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by timestamp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4"
        />
        <select
          value={filterTimeframe}
          onChange={(e) => setFilterTimeframe(e.target.value)}
          className="border p-2 mb-4"
        >
          <option value={time.ALL}>All Time</option>
          <option value={time['30_SEC']}>30sec</option>
          <option value={time['1_MIN']}>1sec</option>
          <option value={time['2_MIN']}>2sec</option>
        </select>
      </div>
      
      <div className="lg:flex gap-10 md:flex ">
        {/* <Barchart data={countryData} /> */}
        <Linechart data={filteredData} />
        <Radialchart data={filteredData} />
      </div>
    </div>
  );
}

export default App;

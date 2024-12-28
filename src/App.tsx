import { useState } from 'react';
import './App.css';
import { Linechart } from './Line';
import { Radialchart } from './Radial';

const time = {
    ALL: 'all',
  '30_SEC': 'last30sec',
  '1_MIN': 'last1min',
  '2_MIN':'last2min'
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const metrics = useWebSocket('ws://localhost:8080');
  const { filteredData, timeframe, setTimeframe } = useFilteredData(metrics);
  const latestData = filteredData[filteredData.length - 1];

  const charts = [
    {
      id: 'cpu',
      title: 'CPU Usage',
      component: <Linechart data={filteredData} />,
    },
    {
      id: 'ram',
      title: 'RAM Usage',
      component: <RAMUsageChart data={filteredData} />,
    },
    {
      id: 'rom',
      title: 'ROM Memory',
      component: <MemoryUsageChart memInfo={latestData?.rom} />,
    },
    {
      id: 'battery',
      title: 'Battery Status',
      component: <BatteryCard batteryData={latestData?.battery} />,
    },
  ];

  const filteredCharts = charts.filter((chart) =>
    chart.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors">
      <header className="mb-8 flex justify-between items-center p-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-left">System Metrics</h1>
          <p className="text-gray-500 dark:text-gray-400">Real-time system metrics and analytics</p>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex gap-4 mb-4 justify-center">
        <Input
          className="max-w-xs"
          type="text"
          placeholder="Search by chart name ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md px-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white min-w-fit">
            {Object.entries(TIME_FILTERS).find(([, value]) => value === timeframe)?.[0].replace('_', ' ').toLowerCase()}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(TIME_FILTERS).map(([key, value]) => (
              <DropdownMenuItem key={key} onSelect={() => setTimeframe(value)}>
                {key.replace('_', ' ').toLowerCase()}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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

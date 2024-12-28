import { useState } from 'react';
import './App.css';
import { Linechart } from './Line';
import { RAMUsageChart } from './Radial';
import { MemoryUsageChart } from './PieChart';
import { BatteryCard } from './components/BatteryCard';
import { useWebSocket } from './hooks/useWebSocket';
import { useFilteredData, TIME_FILTERS } from './hooks/useFilteredData';
import { ThemeToggle } from './components/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-6">
        {searchTerm === '' ? (
          charts.map((chart) => (
            <div key={chart.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{chart.title}</h3>
              {chart.component}
            </div>
          ))
        ) : filteredCharts.length > 0 ? (
          filteredCharts.map((chart) => (
            <div key={chart.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{chart.title}</h3>
              {chart.component}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">No charts found</h2>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search term</p>
            <p className="text-gray-500 dark:text-gray-400">
              SEARCH FOR THESE TERMS: CPU Usage, RAM Usage, ROM Memory, Battery Status
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

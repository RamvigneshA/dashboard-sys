import { useState } from 'react';

export const TIME_FILTERS = {
  ALL: 'all',
  '30_SEC': 'last30sec',
  '1_MIN': 'last1min',
  '2_MIN': 'last2min'
} as const;

export const useFilteredData = (data: any[]) => {
  const [timeframe, setTimeframe] = useState(TIME_FILTERS.ALL);

  const filteredData = data.filter((item) => {
    const itemTimestamp = new Date(item?.timestamp).getTime();
    const now = Date.now();
    
    const timeframes = {
      [TIME_FILTERS.ALL]: true,
      [TIME_FILTERS['30_SEC']]: now - itemTimestamp <= 30000,
      [TIME_FILTERS['1_MIN']]: now - itemTimestamp <= 60000,
      [TIME_FILTERS['2_MIN']]: now - itemTimestamp <= 120000
    };

    return timeframes[timeframe];
  });

  return { filteredData, timeframe, setTimeframe };
}; 
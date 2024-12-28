import { useState, useEffect } from 'react';

export const useWebSocket = (url: string) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics((prevMetrics) => [...prevMetrics, data]);
    };

    return () => socket.close();
  }, [url]);

  return metrics;
}; 
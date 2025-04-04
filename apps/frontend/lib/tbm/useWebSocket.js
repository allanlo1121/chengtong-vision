'use client';

// lib/useWebSocket.js
import { useEffect } from 'react';

export function useWebSocket(onMessage) {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        onMessage?.(message);
      } catch (err) {
        console.error('❌ WebSocket message parse error', err);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => socket.close();
  }, [onMessage]);
}

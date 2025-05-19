// WebSocketProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { DevicePayload } from "@/utils/websocketTypes";

type State = {
  latestData: Record<string, DevicePayload>;
};

type Action = {
  type: "UPDATE";
  payload: DevicePayload;
};

const DataContext = createContext<State | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        latestData: {
          ...state.latestData,
          [action.payload.tbmcode]: action.payload,
        },
      };
    default:
      return state;
  }
}

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, { latestData: {} });

  useEffect(() => {
    console.log("WebSocketProvider mounted");    
    const ws = new WebSocket(`ws://${process.env.NEXT_PUBLIC_WS_HOST}`);
    ws.onopen = () => {
      console.log("WebSocket connection established.");
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.topic?.startsWith("chengtong/realdata/")) {
        dispatch({ type: "UPDATE", payload: msg.payload });
       // console.log("Received data:", msg.payload);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return () => ws.close();
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

// export const useDataContext = () => useContext(DataContext);

export const useDataContext = (): State => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a WebSocketProvider");
  }
  return context;
};


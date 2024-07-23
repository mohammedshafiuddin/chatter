import React from "react";
import { wsContext } from "../contexts";

interface Props {
  children: React.ReactNode;
}

export function WsProivder(props: Props) {
  const {} = props;
  //   const socket = React.useRef<WebSocket | null>(null);
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const socketRef = React.useRef<WebSocket | null>(null);
  React.useEffect(() => {
    // const wsUrl = window.location.origin.replace("http", "ws");
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const wsUrl = "ws://localhost:3000/ws?userId=" + userId;
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = (event) => {
      socketRef.current = ws;
      setSocket(ws);
    };
  }, []);

  return (
    <wsContext.Provider value={{ socket: socket }}>
      {props.children}
    </wsContext.Provider>
  );
}

export const useWebSocket = () => {
  const wsData = React.useContext(wsContext);

  //   if (wsData === null) return null;
  const socket = wsData!.socket;
  React.useEffect(() => {
    setInterval(() => {
      console.log(wsData);
    }, 1000);
  }, []);
  // if (!socket) {
  //     throw new Error('useWs must be used within a WsProvider')
  // }
  return socket;
};

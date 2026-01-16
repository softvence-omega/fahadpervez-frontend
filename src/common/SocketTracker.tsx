import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { selectToken, selectUser } from "@/store/features/auth/auth.slice";

const SocketTracker = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const role = user?.account?.role;
    const isEligible = role === "STUDENT" || role === "PROFESSIONAL";

    // Only connect if we have a token and the user is a STUDENT or PROFESSIONAL
    if (token && isEligible) {
      const currentToken = token;
      
      // We'll try the root host first as requested, but we construct it carefully.
      // If the backend has an /api prefix for REST, it MIGHT need it for WS too.
      // For now, sticking to the user's provided string.
      const socketUrl = `wss://api.zyura-e.com?token=${currentToken}`;

      const connect = () => {
        // Prevent multiple connections
        if (socketRef.current) {
          if (
            socketRef.current.readyState === WebSocket.OPEN ||
            socketRef.current.readyState === WebSocket.CONNECTING
          ) {
            return;
          }
          socketRef.current.close();
        }

        console.log(`Connecting to WebSocket Tracker for ${role}...`);
        try {
          const socket = new WebSocket(socketUrl);
          socketRef.current = socket;

          socket.onopen = () => {
            console.log("WebSocket connection established for tracking.");
          };

          socket.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              console.log("WebSocket message received:", data);
            } catch (e) {
              console.log("WebSocket message received (raw):", event.data);
            }
          };

          socket.onerror = (error) => {
            console.error("WebSocket connection error. This might be due to server configuration or an incorrect endpoint URL.");
            // We log the error object but browsers often hide details for security
            console.debug("WS Error Object:", error);
          };

          socket.onclose = (event) => {
            console.log(
              "WebSocket connection closed:",
              event.code,
              event.reason || "No reason provided"
            );
            socketRef.current = null;

            // Reconnect if it wasn't a normal close (1000) or intended closure
            if (event.code !== 1000 && event.code !== 1001) {
              console.log("Attempting to reconnect in 5 seconds...");
              setTimeout(connect, 5000);
            }
          };
        } catch (err) {
          console.error("Failed to initiate WebSocket connection:", err);
        }
      };

      connect();

      return () => {
        if (socketRef.current) {
          console.log("Closing WebSocket connection due to unmount or status change.");
          socketRef.current.close(1000, "Component unmounted");
          socketRef.current = null;
        }
      };
    } else if (socketRef.current) {
      console.log("Closing WebSocket: User is not STUDENT/PROFESSIONAL or logged out.");
      socketRef.current.close(1000, "Ineligible role or logout");
      socketRef.current = null;
    }
  }, [token, user?.account?.role]);

  return null;
};

export default SocketTracker;


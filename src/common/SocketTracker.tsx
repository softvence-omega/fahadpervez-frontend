import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { selectToken, selectUser } from "@/store/features/auth/auth.slice";
import { io, Socket } from "socket.io-client";

const SocketTracker = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const role = user?.account?.role;
    const isEligible = role === "STUDENT" || role === "PROFESSIONAL";

    // Helper to establish connection
    const connectSocket = () => {
      // If already connected, do nothing
      if (socketRef.current?.connected) {
        return;
      }

      // If socket instance exists but disconnected, try to reconnect
      if (socketRef.current) {
        console.log("Visibility changed: Reconnecting Socket.IO...");
        socketRef.current.connect();
        return;
      }

      console.log(`Initializing Socket.IO Tracker for ${role}...`);
      
      const socket = io("https://api.zyura-e.com", {
        query: {
          token: token
        },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket.IO connection established for tracking.");
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket.IO disconnected:", reason);
        if (reason === "io server disconnect") {
          socket.connect();
        }
      });

      socket.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error);
      });
    };

    // Helper to disconnect
    const disconnectSocket = () => {
      if (socketRef.current) {
        console.log("Visibility changed/Unmount: Disconnecting Socket.IO...");
        socketRef.current.disconnect();
        // We don't nullify socketRef here immediately if we want to reuse the instance for quick reconnects, 
        // but for safety/cleanliness on unmount we will nullify it in the cleanup return.
        // For visibility toggles, keeping the instance is fine, but disconnect() stops the active connection.
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs or minimized -> Stop tracking
        disconnectSocket();
      } else {
        // User is back -> Start tracking
        if (isEligible && token) {
          connectSocket();
        }
      }
    };

    if (token && isEligible) {
      // Only connect initially if the page is visible
      if (!document.hidden) {
        connectSocket();
      }

      // Add visibility listener
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (socketRef.current) {
          console.log("Cleanup: Disconnecting Socket.IO...");
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    } else {
      // Not eligible or logged out
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }
  }, [token, user?.account?.role]);

  return null;
};

export default SocketTracker;


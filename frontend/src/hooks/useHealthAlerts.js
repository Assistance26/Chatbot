// import { useState, useEffect } from "react";

// function useHealthAlerts() {
//     const [alerts, setAlerts] = useState(() => {
//         // Load alerts from local storage if available
//         const savedAlerts = localStorage.getItem("healthAlerts");
//         return savedAlerts ? JSON.parse(savedAlerts) : [];
//     });

//     useEffect(() => {
//         const socket = new WebSocket("ws://localhost:5000"); // Replace with actual WebSocket server URL

//         socket.onmessage = (event) => {
//             const newAlert = JSON.parse(event.data);
//             setAlerts((prevAlerts) => {
//                 const updatedAlerts = [...prevAlerts, newAlert];
//                 localStorage.setItem("healthAlerts", JSON.stringify(updatedAlerts));
//                 return updatedAlerts;
//             });
//         };

//         return () => socket.close();
//     }, []);

//     // Function to dismiss an alert
//     const dismissAlert = (id) => {
//         setAlerts((prevAlerts) => {
//             const updatedAlerts = prevAlerts.filter((alert) => alert.id !== id);
//             localStorage.setItem("healthAlerts", JSON.stringify(updatedAlerts));
//             return updatedAlerts;
//         });
//     };

//     return { alerts, dismissAlert };
// }

// export default useHealthAlerts;

import { createContext, useContext, useState } from "react";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
    const [healthData, setHealthData] = useState({
        heartRate: null,
        bloodPressure: null,
        sleepQuality: null,
        fitnessLevel: null,
    });

    const updateHealthData = (newData) => {
        setHealthData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <HealthContext.Provider value={{ healthData, updateHealthData }}>
            {children}
        </HealthContext.Provider>
    );
};

export const useHealth = () => useContext(HealthContext);

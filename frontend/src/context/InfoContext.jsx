import React, { createContext, useState } from "react";

const InfoContext = createContext();

export default InfoContext;

export function InfoContextProvider({ children }) {
  const [info, setInfo] = useState({ message: "", severity: "info" });
  return (
    <InfoContext.Provider value={[info, setInfo]}>
      {children}
    </InfoContext.Provider>
  );
}

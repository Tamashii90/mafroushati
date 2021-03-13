import React, { createContext, useState } from "react";

export default InfoContext = createContext();

export function InfoContextProvider({ children }) {
  const [info, setInfo] = useState({ message: "", severity: "info" });
  return (
    <InfoContext.Provider value={[info, setInfo]}>
      {children}
    </InfoContext.Provider>
  );
}

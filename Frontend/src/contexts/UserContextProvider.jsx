import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [student, setStudent] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, student, setStudent }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

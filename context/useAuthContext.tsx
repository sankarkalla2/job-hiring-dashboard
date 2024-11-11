"use client";
import React, { useState } from "react";

type InitialValuesProps = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const InitialValues: InitialValuesProps = {
  token: "",
  setToken: () => undefined,
};

const authContext = React.createContext(InitialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>(InitialValues.token);
  const values = {
    token,
    setToken,
  };
  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};

import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Register state
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoding, setIsRegisterLoding] = useState(false);

  // Login state
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoding, setIsLoginLoding] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Register User
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      // Basic frontend validation
      if (
        !registerInfo.name.trim() ||
        !registerInfo.email.trim() ||
        !registerInfo.password.trim()
      ) {
        return setRegisterError({
          error: true,
          message: "All fields are required",
        });
      }

      setIsRegisterLoding(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        registerInfo
      );

      setIsRegisterLoding(false);

      if (response.error) {
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      console.log("New Registered User:", response);
    },
    [registerInfo]
  );

  // Login User
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      if (!loginInfo.email.trim() || !loginInfo.password.trim()) {
        return setLoginError({
          error: true,
          message: "Both email and password are required",
        });
      }

      setIsLoginLoding(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        loginInfo
      );

      setIsLoginLoding(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      console.log("Logged In User:", response);
    },
    [loginInfo]
  );

  // Logout
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  // Update Register Info
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // Update Login Info
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoding,
        loginUser,
        loginInfo,
        updateLoginInfo,
        loginError,
        isLoginLoding,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

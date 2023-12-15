import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const userData = {
  name: "Jack Haku",
  email: "jack@example.com",
  password: "123456",
  photo:
    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

const AuthContext = createContext();

const initialState = {
  // user: ,
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "user/login":
      return { ...state, user: payload, isAuthenticated: true };

    case "user/logout":
      return { ...state, user: null, isAuthenticated: false };
    // return initialState
    // return { ...state, user: {}, isAuthenticated: false };

    default:
      throw new Error("Unknown action!");
  }
};

function AuthProvider({ children }) {
  // const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  const login = (email, password) => {
    if (!email || !password) return;

    if (!email.endsWith(".com") || !email.includes("@")) return;

    if (userData.email !== email) return;

    if (userData.password !== password) return;

    dispatch({ type: "user/login", payload: userData });
    // setUser(userData);
    return userData;
  };

  const logout = () => {
    dispatch({ type: "user/logout" });
    // setUser([]);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("The AuthContext was using outside the AuthProvider");
  return context;
};

export { AuthProvider, useAuth };

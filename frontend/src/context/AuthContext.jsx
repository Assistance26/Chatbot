// import { createContext, useContext, useState, useEffect } from "react";
// import authService from "../services/authService"; // API calls for auth

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const checkUserSession = async () => {
//             try {
//                 const storedUser = JSON.parse(localStorage.getItem("user"));
//                 if (storedUser) {
//                     setUser(storedUser);
//                 } else {
//                     const loggedInUser = await authService.getCurrentUser();
//                     setUser(loggedInUser);
//                     localStorage.setItem("user", JSON.stringify(loggedInUser));
//                 }
//             } catch (error) {
//                 console.error("Auth error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkUserSession();
//     }, []);

//     const login = async (credentials) => {
//         const loggedInUser = await authService.login(credentials);
//         localStorage.setItem("user", JSON.stringify(loggedInUser));
//         setUser(loggedInUser);
//     };

//     const logout = async () => {
//         await authService.logout();
//         localStorage.removeItem("user");
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

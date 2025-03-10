// import { useState, useEffect } from "react";
// import authService from "../services/authService";

// function useAuth() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const userData = await authService.getCurrentUser();
//                 setUser(userData);
//             } catch (error) {
//                 console.error("Auth Error:", error);
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     const login = async (credentials) => {
//         const userData = await authService.login(credentials);
//         setUser(userData);
//     };

//     const logout = () => {
//         authService.logout();
//         setUser(null);
//     };

//     return { user, loading, login, logout };
// }

// export default useAuth;

// import { useAuth } from "../context/AuthContext";
// import { motion } from "framer-motion";

// function ProfilePage() {
//     const { user, logout } = useAuth();

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
//             <motion.div 
//                 initial={{ opacity: 0, y: 50 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-white border-opacity-30 relative"
//             >
//                 {/* Floating User Avatar */}
//                 <motion.div 
//                     initial={{ y: 0 }}
//                     animate={{ y: [-5, 5, -5] }} 
//                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                     className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg border-4 border-white"
//                 >
//                     {user?.name?.charAt(0).toUpperCase()}
//                 </motion.div>

//                 <h1 className="text-3xl font-extrabold text-white mt-4">Profile</h1>
//                 <p className="text-lg font-medium text-gray-200 mt-2">{user?.name || "User"}</p>
//                 <p className="text-sm text-gray-300">{user?.email || "No email provided"}</p>

//                 {/* Logout Button */}
//                 <motion.button
//                     onClick={logout}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md border border-red-700 shadow-red-500/50"
//                 >
//                     Logout
//                 </motion.button>
//             </motion.div>
//         </div>
//     );
// }

// export default ProfilePage;

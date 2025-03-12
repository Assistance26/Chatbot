// import React, { useState, useEffect, useCallback, useRef } from "react";
// import useSentiment from "../hooks/useSentiment";
// import chatService from "../services/chatService";
// import { motion } from "framer-motion";
// import { Send, Moon, Sun } from "lucide-react";

// const Chatbot = () => {
//   const { sentiment, loading: sentimentLoading, analyzeText } = useSentiment();
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const [aiPersona, setAiPersona] = useState("Friendly");
//   const [aiTyping, setAiTyping] = useState(false);
//   const [error, setError] = useState(null);
//   const chatContainerRef = useRef(null);

//   const personas = ["Friendly", "Formal", "Sarcastic", "Techie", "Philosopher"];

//   const scrollToBottom = () => {
//     chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSendMessage = useCallback(async () => {
//     if (!message.trim()) return;

//     setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
//     analyzeText(message);
//     setMessage("");
//     setAiTyping(true);
//     setError(null);

//     try {
//       const aiResponse = await chatService.getResponse(message, aiPersona);

//       if (!aiResponse || !aiResponse.success || !aiResponse.reply) {
//         throw new Error(aiResponse.error || "No valid response from AI.");
//       }

//       setChatHistory((prev) => [...prev, { sender: "ai", text: aiResponse.reply }]);
//     } catch (error) {
//       console.error("Chatbot Error:", error);
//       setError("⚠️ Oops! Something went wrong.");
//     } finally {
//       setAiTyping(false);
//       scrollToBottom();
//     }
//   }, [message, aiPersona, analyzeText]);

//   useEffect(() => {
//     document.body.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   return (
//     <div className={`flex flex-col items-center justify-center min-h-screen transition-all p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-4 right-6 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all"
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
//         <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">💬 AI Chatbot</h2>

//         <div className="flex gap-2 mb-4 overflow-x-auto">
//           {personas.map((persona) => (
//             <button
//               key={persona}
//               onClick={() => setAiPersona(persona)}
//               className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
//                 aiPersona === persona ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
//               }`}
//             >
//               {persona}
//             </button>
//           ))}
//         </div>

//         <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-4">
//           {chatHistory.length > 0 ? (
//             chatHistory.map((chat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 5 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`mb-2 p-2 rounded-lg max-w-fit ${
//                   chat.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
//                 }`}
//               >
//                 {chat.text}
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-gray-500 dark:text-gray-400">🤖 Ask me anything...</p>
//           )}
//           {aiTyping && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8 }}>
//               <p className="text-blue-500 dark:text-blue-300 italic">🤖 AI is thinking...</p>
//             </motion.div>
//           )}
//           <div ref={chatContainerRef}></div>
//         </div>

//         <div className="flex gap-3">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//             rows="2"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
//             disabled={aiTyping}
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </motion.div>

//       {sentimentLoading ? (
//         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 dark:text-gray-400 italic mt-4">Analyzing sentiment...</motion.p>
//       ) : sentiment ? (
//         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4">
//           Sentiment: <span className="text-blue-600 dark:text-blue-400">{sentiment}</span>
//         </motion.p>
//       ) : null}

//       {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 dark:text-red-400 mt-4">{error}</motion.p>}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useEffect, useCallback, useRef } from "react";
import useSentiment from "../hooks/useSentiment";
import chatService from "../services/chatService";
import { motion } from "framer-motion";
import { Send, Moon, Sun } from "lucide-react";

const Chatbot = () => {
  const { sentiment, loading: sentimentLoading, analyzeText } = useSentiment();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [aiPersona, setAiPersona] = useState("Friendly");
  const [aiTyping, setAiTyping] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // State to store API response
  const chatContainerRef = useRef(null);

  const personas = ["Friendly", "Formal", "Sarcastic", "Techie", "Philosopher"];

  // Scroll to the bottom of the chat container after every message update
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatHistory]);

  // Fetch AI response and process it
  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
  
    setChatHistory((prev) => [...prev, { sender: "user", text: trimmedMessage }]);
    analyzeText(trimmedMessage);
    setAiTyping(true);
    setError(null);
    setMessage(""); // Reset input field
  
    try {
      const responseData = await chatService.getResponse(trimmedMessage, aiPersona);
      console.log("🛠 Frontend Received Data:", responseData); // Debugging
  
      if (!responseData || typeof responseData !== "object" || !responseData.success) {
        throw new Error("Unexpected response format.");
      }
  
      // Here, ensure that reply is an array and access the first element of the array
      const replyText = Array.isArray(responseData.reply) ? responseData.reply[0] : responseData.reply;
      
      if (!replyText || typeof replyText !== "string") {
        throw new Error("Invalid reply format.");
      }
  
      setChatHistory((prev) => [...prev, { sender: "ai", text: replyText }]);
    } catch (err) {
      console.error("Chatbot Error:", err);
      setError("⚠️ Oops! AI couldn't generate a response. Try again.");
    } finally {
      setAiTyping(false);
    }
  }, [message, aiPersona, analyzeText]);
  

  // UseEffect to process the AI response when `data` changes
  useEffect(() => {
    if (data) {
      console.log("📡 API Response:", data);  // Debugging log

      if (data.success && data.reply) {
        let aiMessage = "";

        // Ensure reply is a string
        if (Array.isArray(data.reply)) {
          aiMessage = data.reply[0]; // Use the first item
        } else if (typeof data.reply === "string") {
          aiMessage = data.reply;
        } else {
          aiMessage = "⚠️ Unexpected reply format.";
        }

        setChatHistory((prev) => [...prev, { sender: "ai", text: aiMessage }]);
      } else {
        console.error("🚨 Error: Invalid API response format!", data);
        setChatHistory((prev) => [...prev, { sender: "ai", text: "⚠️ Error processing response." }]);
      }
    }
  }, [data]);

  // Dark mode toggling
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-all p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-6 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">💬 AI Chatbot</h2>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {personas.map((persona) => (
            <button
              key={persona}
              onClick={() => setAiPersona(persona)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                aiPersona === persona ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
              }`}
            >
              {persona}
            </button>
          ))}
        </div>

        <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-4">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`mb-2 p-2 rounded-lg max-w-fit ${chat.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"}`}
              >
                {chat.text}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">🤖 Ask me anything...</p>
          )}
          {aiTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8 }}>
              <p className="text-blue-500 dark:text-blue-300 italic">🤖 AI is thinking...</p>
            </motion.div>
          )}
          <div ref={chatContainerRef}></div>
        </div>

        <div className="flex gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            rows="2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
            disabled={aiTyping}
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>

      {sentimentLoading ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 dark:text-gray-400 italic mt-4">Analyzing sentiment...</motion.p>
      ) : sentiment ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4">
          Sentiment: <span className="text-blue-600 dark:text-blue-400">{sentiment}</span>
        </motion.p>
      ) : null}

      {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 dark:text-red-400 mt-4">{error}</motion.p>}
    </div>
  );
};

export default Chatbot;

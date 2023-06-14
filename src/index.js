import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { ChatContextProvider } from "./context/ChatContext";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
      <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  
  </AuthContextProvider>
  
);

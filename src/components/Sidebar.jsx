import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Navbar />
    <div style={{maxHeight:'70vh',overflowY:'auto'}}>
    <Search/>
    <Chats/>
    </div>

  </div>
  );
};

export default Sidebar;

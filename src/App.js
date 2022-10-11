import React, { useState, useEffect } from "react";
import Student from "./Students";
import Teacher from "./Teachers";
import Button from '@mui/material/Button';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';


function App(){

  

  return(
    <div style={{backgroundcolor:"grey"}}>

      <h2 style={{textAlign:"center",color:"orange",border:"2px solid  black",padding:"100px",backgroundColor:"grey"}}>Front Desk
      </h2>
      
      
      
      <BrowserRouter>
            <Routes>
           
                <Route path="/" element={<Student/>}></Route>
                <Route path="/teacher" element={<Teacher/>}></Route>
              
            </Routes>
            </BrowserRouter>
            </div>)};

            export default App;
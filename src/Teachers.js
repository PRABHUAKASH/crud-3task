import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


import {Link} from 'react-router-dom';


// ===================================================================================================================

function Teacher() {
  let formValues = {
    id: "",
    name: "",
    email: "",
    experience: "",
    batch: "",
    error: {
      name: "",
      email: "",
      experience: "",
      batch: "",
    },
  };
  const [formData, setFormData] = useState(formValues);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://6320876e9f82827dcf2ede90.mockapi.io/teachers"
      );
      setUserData(response.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    let error = { ...formData.error };
    if (e.target.value === "") {
      error[e.target.name] = `${e.target.name} is Required`;
    } else {
      error[e.target.name] = "";
    }
    setFormData({ ...formData, [e.target.name]: e.target.value, error });
  };

  const onPopulateData = (id) => {
    const selectedData = userData.filter((row) => row.id === id)[0];
    setFormData({
      ...formData,
      ...selectedData,
    });
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://6320876e9f82827dcf2ede90.mockapi.io/teachers/${id}`
    );
    console.log(response);
    const user = userData.filter((row) => row.id !== response.data.id);
    setUserData(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Delete
    const errKeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key !== "error" && key !== "id") {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert("Please fill all values");
    } else {
      if (formData.id) {
        // Update
        const response = await axios.put(
          `https://6320876e9f82827dcf2ede90.mockapi.io/teachers/${formData.id}`,
          {
            name: formData.name,
            email: formData.email,
            experience: formData.experience,
            batch: formData.batch,
          }
        );
        let users = [...userData];
        let index = users.findIndex((row) => row.id === response.data.id);
        users[index] = response.data;
        setUserData(users);
      } else {
        // Create
        const response = await axios.post(
          "https://6320876e9f82827dcf2ede90.mockapi.io/teachers",
          {
            name: formData.name,
            email: formData.email,
            experience: formData.experience,
            batch: formData.batch,
          }
        );
        setUserData([...userData, response.data]);
      }
      setFormData(formValues);
    }
  };
  // ==============================================================================================================
  return (
    <div style={{ padding: "20px" }}>
      
      <Link to="/teacher"><Button variant="outlined">Teacher</Button>&nbsp;</Link>
      <Link to="/"><Button variant="outlined">Student</Button></Link>
      
      <h3 style={{color:"orange"}}> Teachers Form </h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={formData.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.name}</span>
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="standard"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.email}</span>
        <br />
        <TextField
          id="experience"
          type="experience"
          label="Experience"
          variant="standard"
          name="experience"
          value={formData.experience}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.experience}</span>
        <br />
        <TextField
          id="batch"
          type="batch"
          label="Batch"
          variant="standard"
          name="batch"
          value={formData.batch}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.batch}</span>
        <br />
       
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      {/* ========================================================================================================== */}
      <h3 style={{color:"blue"}}> Teachers Data </h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 1300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Experience</TableCell>
              <TableCell align="right">Batch</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.experience}</TableCell>
                <TableCell align="right">{row.batch}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => onPopulateData(row.id)}>
                    Edit
                  </Button>&nbsp;
                  
                  <Button variant="contained" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Teacher;
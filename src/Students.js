

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
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {Link} from 'react-router-dom';


// ===================================================================================================================

function Student() {
  let formValues = {
    id: "",
    name: "",
    age: "",
    phoneno: "",
    image: "",
    course: "",
    qualification: "",
    error: {
      name: "",
     age: "",
     phoneno: "",
     image: "",
     course: "",
     qualification: "",
    },
  };
  const [formData, setFormData] = useState(formValues);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://6320876e9f82827dcf2ede90.mockapi.io/students"
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
      `https://6320876e9f82827dcf2ede90.mockapi.io/students/${id}`
    );
    console.log(response);
    const user = userData.filter((row) => row.id !== response.data.id);
    setUserData(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Delete
    const errKeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key != "error" && key !== "id") {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert("Please fill all values");
    } else {
      if (formData.id) {
        // Update
        const response = await axios.put(
          `https://6320876e9f82827dcf2ede90.mockapi.io/students/${formData.id}`,
          {
            name: formData.name,
            age: formData.age,
            phoneno: formData.phoneno,
            image: formData.image,
            course: formData.course,
            qualification: formData.qualification,
          }
        );
        let users = [...userData];
        let index = users.findIndex((row) => row.id === response.data.id);
        users[index] = response.data;
        setUserData(users);
      } else {
        // Create
        const response = await axios.post(
          "https://6320876e9f82827dcf2ede90.mockapi.io/students",
          {
            name: formData.name,
            age: formData.age,
            phoneno: formData.phoneno,
            image: formData.image,
            course: formData.course,
            qualification: formData.qualification,
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
      <Link to="/"></Link>
      <Link to="/teacher"><Button variant="outlined">Teacher</Button>&nbsp;</Link>
      <Link to="/"><Button variant="outlined">Student</Button></Link>
      
      <h3 style={{color:"orange"}}> Student Form </h3>
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
          variant="filled"
          value={formData.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.name}</span>
        <br />
        <TextField
          id="age"
          label="Age"
          variant="filled"
          type="number"
          name="age"
          value={formData.age}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.age}</span>
        <br />
        <TextField
          id="phoneno"
          type="phoneno"
          label="Phoneno"
          variant="filled"
          name="phoneno"
          value={formData.phoneno}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.phoneno}</span>
        <br />
        <TextField
          id="image"
          type="image"
          label="Image"
          variant="filled"
          name="image"
          value={formData.image}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.image}</span>
        <br />
        <FormControl fullWidth>
          <InputLabel id="Courses">Courses</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Courses"
            name="courses"
            value={formData.course}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Node">Node</MenuItem>
            <MenuItem value="Javascript">Javascript</MenuItem>
          </Select>
        </FormControl>
        <br />
        <span style={{ color: "red" }}>{formData.error.course}</span>
        <br /> <br />
        <TextField
          id="qualification"
          type="qualification"
          label="Qualification"
          variant="filled"
          name="qualification"
          value={formData.qualification}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.qualification}</span>
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      {/* ========================================================================================================== */}
      <h3> Student Data </h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 1300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">phoneno</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Qualification</TableCell>
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
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.phoneno}</TableCell>
                <TableCell align="right">{row.image}</TableCell>
                <TableCell align="right">{row.course}</TableCell>
                <TableCell align="right">{row.qualification}</TableCell>
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

export default Student;

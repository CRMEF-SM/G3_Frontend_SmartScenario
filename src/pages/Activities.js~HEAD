import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axiosInstance from '../axios';

export default function Activitie() {
  const [inputs, setInputs] = useState([null]);
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);

  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = () => {
    setTextareaValue(textareaRef.current.value);
  };

  useEffect(() => {
    if (successAlert) {
      const timeout = setTimeout(() => {
        setSuccessAlert(false);
      }, 100000);

      return () => clearTimeout(timeout);
    }
  }, [successAlert]);

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
    console.log(updatedInputs);
  };

  const handleAddInput = (e) => {
    e.preventDefault();
    const textareaValue = textareaRef.current.value; // Get the value of the textarea
    setInputs((prevInputs) => [...prevInputs, textareaValue]);
  };

  const DataActivities = Object.freeze({
    title: '',
    subject: '',
    lesson: '',
    level: '',
  });

  const [formData, updateFormData] = useState(DataActivities);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resourcesData = inputs.map((input) => ({
      content: input,
    }));
    axiosInstance
      .post(`activite/create/`, {
        name: formData.title,
        subject: formData.subject,
        lesson: formData.lesson,
        level: formData.level,
        contenu: textareaValue,
        created_by: 1,
        resources: resourcesData,
      })
      .then((res) => {
        setSuccessAlert(true);
        console.log(res);
        console.log(res.data);
        navigate('/getActivitie');
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          name="title"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          name="subject"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          name="lesson"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          name="level"
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          ref={textareaRef}
          style={{ width: '600px', height: '200px' }}
          onChange={handleTextareaChange}
        ></textarea>
      </div>
      <div>
        {inputs.map((input, index) => (
          <div key={index}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor={`standard-adornment-amount ${index}`}>Resource</InputLabel>
              <Input
                id={`standard-adornment-amount ${index}`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>
          </div>
        ))}
        <Button variant="contained" type="submit" onClick={handleAddInput}>
          Add Input
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Add new Activity
        </Button>
      </div>
      {successAlert && (
        <Alert severity="success" onClose={() => setSuccessAlert(false)}>
          Activity created successfully!
        </Alert>
      )}
    </Box>
  );
}

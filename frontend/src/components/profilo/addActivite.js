import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'

const addActivite = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const addaction = () => {
    let maxWeght=document.getElementById('weight').value;
    let reps=document.getElementById('Reps').value;
    console.log(maxWeght,reps,props.uid);
    if(!isNaN(maxWeght) && !isNaN(reps)){
      const requestOptions ={
        method:"POST",
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({
            UID:props.uid,
            actionName: selectedValue,
            weight: maxWeght,
            reps: reps,
        })
    }
    fetch("/data/creatAction",requestOptions).then((response)=>{
        if(response.ok){
            window.alert("Your workout has been created successfully. Good Job!");
            handleClose();
        }
        else{
            document.getElementById('addHelpText').innerHTML="Your username already be used."
        }
    })
     .then((data)=>console.log(data));
    }else{
       document.getElementById('addHelpText').innerHTML='Please enter vailed data';

    
    }
    
  }
  const handleOpen = () => {
 
    if(props.uid>0){
      setOpen(true);
    }
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
        <IconButton color="primary" aria-label="Add">
          <AddIcon onClick={handleOpen}/>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle align="center">Log what you achieve today!</DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <FormControl>
                  <InputLabel id="dropdown-label">Select Your Activity</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <MenuItem value="Bench_Press">Bench Press</MenuItem>
                    <MenuItem value="Squat">Squat</MenuItem>
                    <MenuItem value="Deadlift">Deadlift</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField required={true}  type = 'text' name='weight' id ='weight' placeholder="Enter the weight in lb" 
                                // onBlur={userNameValidation} 
                                />
                  
                </FormControl>
                <FormControl>
                  <TextField required={true}  type = 'text' name='Reps' id ='Reps' placeholder="Enter the Reps" 
                                // onBlur={userNameValidation} 
                                />
                  <FormHelperText id='addHelpText'></FormHelperText>
                </FormControl>
                <FormControl>
                <Button variant='contained' color='primary' onClick={addaction}>Add</Button>
                  
                </FormControl>
              </Grid>
            </DialogContent>
          </Dialog>
        </IconButton>
    </div>
  )
}

export default addActivite

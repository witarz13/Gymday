import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';




const loginButton = (props) => {
    const [open, setOpen] = useState(false);
    const [userName,setUserName] = useState();
    const [pwd,setPwd] = useState();
    const [userNameIn,setUserNameIn]=useState(false);
    const [pwdIn,setPwdIn] = useState(false);
    const [userProfile, setUserProfile] = useState({username:'Guest',likes:'0',style:'extreme',login:false});
    
    const sendloginback =(data)=>{
        props.update(data)
    }
   

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function getUserName(){
        setUserName(document.getElementById('login_userName').value);
        setUserNameIn(true);   
    };
    function getPwd(){
        setPwd(document.getElementById('login_pwd').value);
        setPwdIn(true);   
    };
    function handleSubmitBtn() {
        if(userNameIn==false){
            document.getElementById('login_userName_msg').innerHTML="Plase Enter your username";
            document.getElementById('login_userName_msg').style.color='red';
        }
        if (pwdIn==false){
            document.getElementById('login_pwd_msg').innerHTML="Plase Enter your Password";
            document.getElementById('login_pwd_msg').style.color='red';
        }
        if (userNameIn && pwdIn){
            const requestOptions ={
                method:"POST",
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({
                    username: userName,
                    password: pwd,  
                })
            }
            fetch("/data/login",requestOptions).then((response)=> response.json())
                .then(data =>{
                    handleClose();
            
                    sendloginback(data);
                }).catch(error => {
                    document.getElementById('login_msg').innerHTML="username or password not match";
                    document.getElementById('login_msg').style.color='red';

                })}
            // fetch("/data/login",requestOptions).then((response)=>{
            //     if(response.ok){
            //         handleClose();
            //         sendloginback()
                    
            //     }
            //     else{
            //         document.getElementById('login_msg').innerHTML="username or password not match";
            //         document.getElementById('login_msg').style.color='red';
            //         }
            // })
        }
    

    return (
    <div>
        <Button variant='contained' color='primary' onClick={handleOpen}>Log In</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>User Log in</DialogTitle>
            <DialogContent>
                <Grid container direction="column">
                    <Grid item  align="center">
                        <FormControl component="fieldset">
                        <TextField required={true}  type = 'text' name='userName' id ='login_userName' placeholder="Enter your UserName" 
                            onBlur={getUserName} />
                        <FormHelperText id ='login_userName_msg'>Erter your User Name</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item  align="center">
                        <FormControl component="fieldset">
                        <TextField required={true} type = 'password' name='pwd' id ='login_pwd' placeholder="pleas enter your password"
                            onBlur={getPwd} />
                        <FormHelperText id ='login_pwd_msg'>Erter your Password</FormHelperText>
                        <FormHelperText id ='login_msg'></FormHelperText>
                        </FormControl>
                    </Grid>
                    </Grid>
            </DialogContent>
            <DialogActions>
                    <Button variant='contained' color='secondary' onClick={handleSubmitBtn}>Log In</Button>
                    <Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
            </DialogActions>
            
        </Dialog>
    </div>
  )
}

export default loginButton

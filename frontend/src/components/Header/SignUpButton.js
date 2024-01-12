import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const SignUpButton = () => {
    const [open, setOpen] = useState(false);
    const [userNameSave,setUserName] = useState('');
    const [pwdSave,setPWD] = useState('');
    const [emailSave,setEmail] = useState('');
    const [nameV, setNameV] = useState(false);
    const [pwdV,setPwdV] = useState(false);
    const [rpwdV,setRpwdV] = useState(false);
    const [emailV,setEmailV] = useState(false);
    const [selectedValue, setSelectedValue] = useState('aerobics'); 

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value); // 设置选中的值为所选的选项的值
    };
   
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    function allSet(){
        if (nameV && pwdV && rpwdV && emailV){
           return true;
        }
        else{return false;}
        
    }
    function userNameValidation(){
        let userName=document.getElementById('userName').value;        
        if(userName.length <6){
        document.getElementById('userNameMessage').innerHTML="UserName must more than 6 char";
        document.getElementById('userNameMessage').style.color='red';
        setNameV(false);
        }
        else if(userName.length>24){
        document.getElementById('userNameMessage').innerHTML="UserName must less than 24 char";
        document.getElementById('userNameMessage').style.color='red';
        setNameV(false);
        }
        else{
            document.getElementById('userNameMessage').innerHTML="Username vaild";
            document.getElementById('userNameMessage').style.color='green';
            setNameV(true);
            setUserName(userName);

        } 
        
    }   
    
    function pwdValidation(){
        let pwd=document.getElementById('pwd').value;
        var regex = /\d/;
        
        if(pwd.length <6){
        document.getElementById('passwordReq').innerHTML="Password must more than 6 char";
        document.getElementById('passwordReq').style.color='red';
        setPwdV(false);
        }
        else if(pwd.length>24){
        document.getElementById('passwordReq').innerHTML="Password must less than 24 char";
        document.getElementById('passwordReq').style.color='red';
        setPwdV(false);
        }
        else if(!(regex.test(pwd))){
        document.getElementById('passwordReq').innerHTML="Password must contain at least 1 number";
        document.getElementById('passwordReq').style.color='red';
        setPwdV(false);
        }
        else{
            document.getElementById('passwordReq').innerHTML="Password vaild";
            document.getElementById('passwordReq').style.color='green';
            setPwdV(true);
           
        } 
    }

    function rpwdValidation(){
        let pwd=document.getElementById('pwd').value;
        let rpwd=document.getElementById('rpwd').value;
        
        if(pwd===rpwd && pwdV == true){
            document.getElementById('rpwdMessage').innerHTML="The passwrods match";
            document.getElementById('rpwdMessage').style.color='green';
            setRpwdV(true);
            setPWD(pwd);
        }
        else{
            document.getElementById('rpwdMessage').innerHTML="The passwrod not match";
            document.getElementById('rpwdMessage').style.color='red';
            setRpwdV(false);
        }
        console.log(selectedValue)   
    }
    function emailValidation(){
        let email=document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(emailPattern.test(email)){
            setEmailV(true);
            setEmail(email);
            document.getElementById('EmailMsg').innerHTML="Email Formate correct ";
            document.getElementById('EmailMsg').style.color='green';
        }
        else{
            document.getElementById('EmailMsg').innerHTML="Invaild Email formate";
            document.getElementById('EmailMsg').style.color='red';
            setEmailV(false);
        }
    }
    function handleSubmitBtn(){
        
        if(allSet()){
            const requestOptions ={
                method:"POST",
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({
                    username: userNameSave,
                    password: pwdSave,
                    email: emailSave,
                })
            }
            fetch("/data/create",requestOptions).then((response)=>{
                if(response.ok){
                    window.alert("Your Your account has been created successfully. Please ensure the security of your password. be created");
                    handleClose();
                }
                else{
                    document.getElementById('finalMsg').innerHTML="Your username already be used."
                }
            }).then((data)=>console.log(data));
            // fetch("/data/create",requestOptions).then((response)=>response.json()).then((data)=>console.log(data))
            //     window.alert("Your Your account has been created successfully. Please ensure the security of your password. be created");
            //     handleClose();
            
            // else{
            //     document.getElementById('finalMsg').innerHTML="Your username already be used."
            // }
           
        }
        else{
            document.getElementById('finalMsg').innerHTML="Please check your input."

        }
        const requestOptions ={
            method:"POST",
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({
                username: userNameSave,
                style:selectedValue, 
            })
        }
        fetch("/data/createbasic",requestOptions).then((response)=>{
        }).then((data)=>console.log(data));
        
        
    }
        
    return (
    <div>
        <Button variant='contained' color='primary' onClick={handleOpen}>Sign Up</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle align="center">User Log in</DialogTitle>
            <DialogContent>
                <Grid container direction="column">
                    <Grid item  align="center">
                        <FormControl component="fieldset">
                        <TextField required={true}  type = 'text' name='userName' id ='userName' placeholder="Enter your UserName" 
                            onBlur={userNameValidation} />
                        <FormHelperText id="userNameMessage">Create your user name</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item  align="center">
                        <FormControl component="fieldset">
                        <TextField required={true} type='password'  name='pwd' id ='pwd' placeholder="Create your password" onBlur={pwdValidation}/>
                        <FormHelperText id="passwordReq">Password should between6-12 char and include at least 1 number</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item  align="center">
                        <FormControl component="fieldset">
                        <TextField required={true} type = 'password' name='rpwd' id ='rpwd' placeholder="pleas re-enter your password"
                            onBlur={rpwdValidation} />
                        <FormHelperText id='rpwdMessage'> Re-erter your Password</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item  align="center">
                        <FormControl component="fieldset">
                        <TextField required={true} type='email' id='email' placeholder='Enter your Email' onBlur={emailValidation}/>
                        <FormHelperText id="EmailMsg">Erter your Email</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid>
                    <FormControl component="fieldset" style={{ display: 'inline-block' }}>
                    <FormControlLabel
                        value="extreme" // 选项的值
                        control={<Radio />} // Radio 控件
                        label="Extreme" // 选项的文本标签
                        checked={selectedValue === 'extreme'} // 根据选中的值来确定是否选中
                        onChange={handleRadioChange} // 当选项改变时触发的回调函数
                    />

                    <FormControlLabel
                        value="aerobics"
                        control={<Radio />}
                        label="Aerobics"
                        checked={selectedValue === 'aerobics'}
                        onChange={handleRadioChange}
                    />

                    <FormControlLabel
                        value="anaerobic"
                        control={<Radio />}
                        label="Anaerobic"
                        checked={selectedValue === 'anaerobic'}
                        onChange={handleRadioChange}
                    />
                        </FormControl>
                    </Grid>
                    <Grid>
                    <FormControl component="fieldset">
                        <FormHelperText id="finalMsg"></FormHelperText>
                        </FormControl>
                    </Grid>
                   
                    
                    
                </Grid>
            </DialogContent>
            <DialogActions align="center">
                    <Button variant='contained' color='secondary' id='submitBtn' onClick={handleSubmitBtn} >Ok</Button>
                    <Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
            </DialogActions>
            
        </Dialog>
        
    </div>
    
  )
}

export default SignUpButton

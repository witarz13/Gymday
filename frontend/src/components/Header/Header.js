import React, { useState } from 'react'
import LoginButton from './loginButton'
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import SignUpButton from './SignUpButton'
import LogOutButton from './logOutButton'
import { Link } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
const Header = (props) => {


  return (
    <div className='header_name'>
        
        <Typography component="h2" variant='h2'>
        Welcome To {props.name} 's GYM
          </Typography> 
        <Grid container justify="flex-end">
          <Grid item xs={4} align="center">
            <Typography component="h3" id="sub_header_text" >Keep Work Out Anywhere</Typography>
            <Grid item xs={5} id='header_login_Section'>
            
            {props.logstate ? <p>{props.name}</p> : <SignUpButton /> }
            {props.logstate ? <LogOutButton update={props.update} /> :<LoginButton update={props.update} />}
            </Grid>
    
          </Grid>
        </Grid>      
    </div>
  )
}

export default Header

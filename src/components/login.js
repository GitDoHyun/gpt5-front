import React, { useEffect, useState } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useCookies } from "react-cookie";
import { BrowserRouter, Link ,useNavigate } from "react-router-dom";
import axios from "axios";

// import Regi from "./components/regi.js";


// 저작권
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [cookies, setCookies] = useCookies('');
  // checkbox
  const [saveEmail, setSaveEmail] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      });
   }


    function CheckHandler(){
      setSaveEmail(!saveEmail);
      if(!saveEmail === true && email !== ""){
          setCookies("user_email", email);
      }else{
          setCookies("user_email", '');
      }
    }


  function signin(){
      axios.post("http://localhost:3000/login", null, { params:{ "email":email, "pwd":pwd } })
      .then(function(resp){
          // alert(resp.data);
          if(resp.data !== null && resp.data !== ""){
              alert(resp.data.nickname + "님 환영합니다");                
              localStorage.setItem("login", JSON.stringify(resp.data));           
              history("/Home");     
          }else{
              alert("E-mail 또는 password를 확인하십시오");
          }
      })
      .catch(function(err){
          alert(err);
      })        
    }

    useEffect(function(){
        let user_email = cookies.user_email;
        if(user_email !== undefined && user_email !== ""){
            setEmail(user_email);
            setSaveEmail(true);
        }else{
            setEmail('');
            setSaveEmail(false);
        }
    }, [cookies]);



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">        
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              value={pwd}
              onChange={(e)=>setPwd(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" checked={saveEmail}
                      onChange={CheckHandler} color="primary" />}
              label="Remember me"
            />

            <Button type="submit" onClick={()=>signin()}
            fullWidth variant="contained" 
            sx={{ mt: 3, mb: 2 }}>Sign In</Button>

            <Grid container>
              {/* <BrowserRouter> */}
              <Grid item xs>
                {/* pwd 찾기 */}
                <Link href="#" variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item >
                <Link href="#" variant="body2">
                  Sign Up
                </Link>                
              </Grid>
              {/* </BrowserRouter> */}
            </Grid>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
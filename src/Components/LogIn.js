import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import userlogo from "../Images/userlogo.png";
// import urlshort from "../Images/urlshort.png";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { Redirect, Route, useHistory, useLocation } from "react-router";
import Home from "./Home";
// import { render } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn({ setPopup, setIflogin }) {
  const history = useHistory();

  const [loginf, setLoginf] = useState(false);
  const [errorf, setErrorf] = useState(false);

  // const [redirectf, setRedirectf] = useState(true);

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const classes = useStyles();

  const [ldata, setLdata] = useState({
    username: "",
    password: "",
  });

  const LogInData = (e) => {
    const data = { ...ldata };
    data[e.target.id] = e.target.value;
    setLdata(data);
    console.log("Login Object ", data);
    console.log(ldata);
  };

  const content = {
    content: {
      "Content-Type": "application/json",
    },
  };

  const loginData = (e) => {
        setErrorf(false);

    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/accounts/login/",
        {
          username: ldata.username,
          password: ldata.password,
        },
        content
      )
      .then(function (res) {
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("User", res.data.user);
        localStorage.setItem("IfLogged_in", true);
        setLoginf(true);
        setErrorf(false);
        setPopup(false);
        setIflogin(true);
      })
      .catch(function (error) {
        console.log(error);
        setErrorf(true);
        setLoginf(false);
      });

    setOpen(true);
  };

  // if (errorf === false && loginf === true) {
  //   setPopup(false);
  // }
  const location = useLocation().pathname;
  console.log("Current Path",location);

  // console.log("setLoginf", loginf);
  // console.log("setErrorf", errorf);

  return (
    <Grid
      container
      component='main'
      className='min-h-full pt-4 flex justify-center items-center bg-transparent backdrop-blur-3xl'
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className='flex justify-end p-0.5'>
          <button
            className='focus:outline-none bg-black text-white px-2 py-1 border-none shadow-md text-center rounded-sm'
            onClick={(e) => {
              setPopup(false);
            }}
          >
            Close
          </button>
        </div>
        <div className={classes.paper}>
          <img src={userlogo} className='h-16' />
          <h1 className='text-5xl pb-10'>Log in</h1>
          <form
            className={classes.form}
            noValidate
            method='POST'
            onSubmit={(e) => {
              loginData(e);
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoFocus
              onChange={(e) => LogInData(e)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => LogInData(e)}
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/sign-up' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>

          {errorf && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='error'>
                <AlertTitle>Error</AlertTitle>
                Username or Password is not correct.
              </Alert>
            </Snackbar>
          )}
          {errorf == false && (
            <div>
              {loginf == true &&
                (location === "/home" ?
                  (<Home />) :
                (
                  localStorage.removeItem("IfLogged_in"),
                    history.push({
                      pathname: "/home",
                      // state: {
                      //   redirectf: redirectf,
                      // }
                    })
                  ))}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

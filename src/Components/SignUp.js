import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [sError, setSError] = useState(false);
  const [successf, setSuccessf] = useState(false);

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const [signupdata, setSignupdata] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const SignupData = (e) => {
    const data = { ...signupdata };
    data[e.target.id] = e.target.value;
    setSignupdata(data);
  };

  const content = {
    content: {
      "Content-Type": "application/json",
    },
  };

  const onpost = (e) => {
    setSError(false);

    e.preventDefault();
    axios
      .post(
        "https://url-shortner-ssg.herokuapp.com/accounts/registration/",
        {
          first_name: signupdata.first_name,
          last_name: signupdata.last_name,
          username: signupdata.username,
          email: signupdata.email,
          password: signupdata.password,
        },
        content
      )
      .then(function (res) {
        setSuccessf(true);
        setSError(false);
        setSignupdata({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
        });
      })
      .catch(function (error) {
        setSError(true);
        setSuccessf(false);
      });
    setOpen(true);
  };

  return (
    <Container component='main' maxWidth='xs' className='-pt-16'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onpost(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='first_name'
                label='First Name'
                autoFocus
                value={signupdata.first_name}
                onChange={(e) => SignupData(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='last_name'
                label='Last Name'
                name='lastName'
                value={signupdata.last_name}
                autoComplete='lname'
                onChange={(e) => SignupData(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                value={signupdata.username}
                onChange={(e) => SignupData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={signupdata.email}
                onChange={(e) => SignupData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={signupdata.password}
                id='password'
                autoComplete='current-password'
                onChange={(e) => SignupData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I have understand and accepted all cradential.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* <Grid container justify='flex-end'>
            <Grid item>
              <Link href='pop'>Already have an account? Log in</Link>
            </Grid>
          </Grid> */}
        </form>

        {sError && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' className='-m-3'>
              <AlertTitle>Error</AlertTitle>
              Username or Email already exist.
            </Alert>
          </Snackbar>
        )}
        {successf && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              <AlertTitle>Successfully</AlertTitle>
              Signed Up.
            </Alert>
          </Snackbar>
        )}
      </div>
    </Container>
  );
}

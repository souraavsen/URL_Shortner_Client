import "../App.css";
import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AlertTitle } from "@material-ui/lab";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
// import { render } from "@testing-library/react";

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#79BAEC",
    color: "black",
    fontSize: 18,
    fontFamily: "serif",
    fontWeight: 900,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState("");
  const [copyf, setCopyf] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [mainurl, setMainurl] = useState("");
  const [shorturl, setShorturl] = useState("");

  const [editData, setEditData] = useState("");

  const [shortedurl, setShortedurl] = useState([]);

  const [tokenId, setTokenId] = useState("");
  const [login, setLogin] = useState(false);
  const [editId, setEditId] = useState(null);

  const refreshPage = () => {
    window.location.reload();
  };

  if (localStorage.getItem("IfLogged_in")) {
    refreshPage();
    localStorage.removeItem("IfLogged_in");
  }

  const content = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("Token")}`,
    },
  };

  useEffect(() => {
    setCopy(shorturl);
    if (localStorage.getItem("Token") !== null) {
      setTokenId(localStorage.getItem("Token"));
      setLogin(true);
    } else {
      setLogin(false);
    }
    axios
      .get("https://url-shortner-ssg.herokuapp.com/api/shortedurls/", content)
      .then(function (res) {
        setShortedurl(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [shortedurl][shorturl]);

  const CopyHandel = (e) => {
    setCopyf(false);
    setMainurl("");
    setShorturl("");
    setSuccess(false);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    {
      login
        ? axios
            .post(
              "https://url-shortner-ssg.herokuapp.com/api/shorturl/",
              {
                main_url: mainurl,
                short_url: shorturl,
              },
              content
            )
            .then(function (res) {
              setMainurl(res.data.main_url);
              setShorturl(res.data.short_url);
              setError(false);
              setSuccess(true);
            })
            .catch(function (error) {
              setError(true);
              setSuccess(false);
              setCopyf(false);
            })
        : axios
            .post("https://url-shortner-ssg.herokuapp.com/api/quickshort/", {
              main_url: mainurl,
              // Without Header
            })
            .then(function (res) {
              setMainurl(res.data.main_url);
              setShorturl(res.data.short_url);
              setSuccess(true);
            })
            .catch(function (error) {
              setError(true);
              setSuccess(true);
            });
    }
    setOpen(true);
    setCopyf(true);
  };

  const handleDelete = (id) => {
    axios.delete(
      `https://url-shortner-ssg.herokuapp.com/api/deleteshorturl/${id}/`,
      content
    );
    setShortedurl([...shortedurl].filter((itm) => itm.id != id));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    shortedurl.map((itm) => {
      if (itm.id === id) {
        axios
          .put(
            `https://url-shortner-ssg.herokuapp.com/api/editshorturl/${id}/`,
            {
              short_url: editData,
            },
            content
          )
          .then(function (res) {
            setShortedurl([
              ...shortedurl,
              (itm.short_url = res.data.short_url),
            ]);
          })
          .catch(function (error) {
            setError(true);
            setSuccess(false);
          });
      }
    });
    setEditId(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {/* <div className='bg-gray-200 w-screen flex justify-center items-center p-5'>
        {(localStorage.getItem("IfLogged_in")) && (<Alert
          className='w-96'
          action={
            <Button
              color='inherit'
              size='small'
              className='focus:outline-none flex justify-center items-center'
              onClick={() => window.location.reload(false)}
            >
              Reload
            </Button>
          }
        >
          You have to Reload
        </Alert>)}
      </div> */}

      <div className='min-h-screen bg-gray-200  flex flex-col justify-center sm:py-12'>
        <div className='flex flex-row  justify-center items-center'>
          <h1 className='text-4xl font-serif pb-16'>
            Keep Your Long URL Short
          </h1>
          {/* <Button
            className='focus:outline-none'
            variant='outlined'
            color='primary'
            startIcon={<EditIcon />}
            onClick={(e) => {}}
          >
            Customize
          </Button> */}
        </div>
        <form onSubmit={(e) => onsubmit(e)}>
          <div className='flex pb-20 justify-center items-center'>
            <div>
              <TextField
                required
                label='Your Long Url'
                type='text'
                id='main_url'
                placeholder='Long Url'
                style={{ width: "500px", backgroundColor: "#ffffff" }}
                variant='outlined'
                value={mainurl}
                onChange={(e) => {
                  setMainurl(e.target.value);
                }}
              />
            </div>
            {/* {login && ( */}
            <div className='ml-20 flex flex-row items-center'>
              {copyf ? (
                <TextField
                  id='short_url'
                  type='text'
                  placeholder='Short Name'
                  style={{ width: "250px", backgroundColor: "#ffffff" }}
                  variant='outlined'
                  value={shorturl}
                  onChange={(e) => {
                    setShorturl(e.target.value);
                  }}
                  // onChange={(e) => {
                  // setCopy(shorturl);
                  // setShorturl(e.target.value);
                  // }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              ) : (
                <TextField
                  id='short_url'
                  label='Short Url'
                  type='text'
                  style={{ width: "250px", backgroundColor: "#ffffff" }}
                  variant='outlined'
                  placeholder='Short Name'
                  // value={copy}
                  value={shorturl}
                  onChange={(e) => {
                    setShorturl(e.target.value);
                  }}
                  // onChange={(e) => {
                  //   setCopy(e.target.value);
                  //   setShorturl(e.target.value);
                  // }}
                  InputProps={{
                    readOnly: !login,
                  }}
                />
              )}

              {copyf && (
                <div className='ml-10'>
                  <CopyToClipboard text={copy}>
                    <Button
                      className='focus:outline-none'
                      variant='outlined'
                      size='small'
                      onClick={(e) => CopyHandel(e)}
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </div>
              )}
            </div>
            {/* )} */}

            <div>
              {error === true || success === true ? (
                <Button
                  className='focus:outline-none'
                  variant='contained'
                  color='secondary'
                  style={{ marginLeft: "100px" }}
                  // type='submit'
                  onClick={() => {
                    setMainurl("");
                    setShorturl("");
                    setError(false);
                    setSuccess(false);
                    setCopyf(false);
                  }}
                >
                  Cancle
                </Button>
              ) : (
                <Button
                  className='focus:outline-none'
                  variant='contained'
                  color='primary'
                  style={{ marginLeft: "100px" }}
                  type='submit'
                  // onClick={handleClick}
                >
                  Ok
                </Button>
              )}
            </div>
          </div>
        </form>

        {login && (
          <div className='home relative py-3 sm:max-w-xl sm:mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-bl from-blue-600 to-blue-400 shadow-lg transform -skew-y-6 sm:skew-y-3 sm:-rotate-6 sm:rounded-3xl'></div>
            <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
              <div className='max-w-25xl mx-auto'>
                <div className='flex flex-row items-center mb-10'>
                  <img src={logo} className='h-16 sm:h-12 ' />
                  <p className='text-4xl pl-5 font-serif'>Shorted Urls</p>
                </div>

                <table className='table-fixed  rounded-xl'>
                  <thead>
                    <tr className='bg-blue-400 rounded-lg'>
                      <th className=' p-3 text-2xl text-left border-4 mainurl bg-blue-400'>
                        Main Url
                      </th>
                      <th className=' p-3 text-2xl text-left border-4 shorturl bg-blue-400'>
                        Short Url
                      </th>
                      <th className=' p-3 text-left text-2xl border-4 bg-blue-400'>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {shortedurl.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className='bg-blue-50 text-left border-b-8'
                        >
                          <td className='flex flex-row mainurl'>
                            <span className='h-6 p-2 flex items-center sm:h-7'>
                              <svg
                                className='flex-shrink-0 h-5 w-5 text-blue-500'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </span>
                            {item.main_url}
                          </td>
                          <td className='shorturl'>
                            {editId === item.id ? (
                              <div>
                                <form
                                  onSubmit={(e) => {
                                    handleEdit(e, item.id);
                                  }}
                                >
                                  <input
                                    className='border-none bg-gray-400 text-lg placeholder-black'
                                    placeholder={item.short_url.split(
                                      "herokuapp.com/"
                                    )[1]}
                                    onChange={(e) => {
                                      setEditData(e.target.value);
                                    }}
                                  />
                                  <div className='flex justify-evenly items-start p-2'>
                                    <Button
                                      className='focus:outline-none w-24 '
                                      variant='contained'
                                      color='secondary'
                                      startIcon={<SaveIcon />}
                                      type='submit'
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      className='focus:outline-none w-24'
                                      variant='contained'
                                      color='primary'
                                      onClick={(e) => {
                                        setEditId(null);
                                      }}
                                    >
                                      Cancle
                                    </Button>
                                  </div>
                                </form>
                              </div>
                            ) : (
                              <input
                                className='border-none focus:outline-none bg-transparent'
                                value={item.short_url}
                                readOnly='true'
                              />
                            )}
                            {editId === null && (
                              <Button
                                className='gobtn focus:outline-none pl-5'
                                variant='outlined'
                                size='small'
                                href={item.short_url}
                                target='__blank'
                              >
                                Go
                              </Button>
                            )}
                          </td>
                          <td className='action flex justify-center items-center'>
                            {editId === null && (
                              <div className='flex my-auto justify-center items-center gap-5'>
                                <Button
                                  className='focus:outline-none'
                                  variant='outlined'
                                  color='primary'
                                  startIcon={<EditIcon />}
                                  onClick={() => {
                                    setEditId(item.id);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className=' focus:outline-none'
                                  variant='outlined'
                                  color='secondary'
                                  startIcon={<DeleteIcon />}
                                  onClick={() => {
                                    handleDelete(item.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                            {/* ) : ( */}
                            {/* <Button */}

                            {/* //     className='focus:outline-none w-24 '
                            //     variant='contained'
                            //     color='secondary'
                            //     startIcon={<SaveIcon />}
                            //     onClick={(e) => { */}
                            {/* //       setEditf(false);
                            //     }}
                            //   >
                            //     Save
                            //   </Button>
                            // ) */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {login &&
          (error ? (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='error'>
                <AlertTitle>Error</AlertTitle>
                Short Url name or Long Url already exists.
              </Alert>
            </Snackbar>
          ) : (
            success === true && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity='success'>
                  <AlertTitle>Successfull</AlertTitle>
                  {copyf ? "Shorted Url added To the List." : "Copied."}
                </Alert>
              </Snackbar>
            )
          ))}
      </div>
    </div>
  );
};

export default Home;

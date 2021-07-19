import { React, useEffect } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import urls from "../Images/urls.png";
import { Link, useHistory } from "react-router-dom";

const GetStarted = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      history.push({
        pathname: "/home",
      });
    }
  }, []);

  return (
    <div>
      <div className='getstarted min-h-screen flex justify-center items-center'>
        <img src={urls} className='mt-5'></img>
        <Link to='/home'>
          <Button
            variant='contained'
            disableElevation
            className='btn focus:outline-none text-lg h-16 w-52'
          >
            Let's Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;

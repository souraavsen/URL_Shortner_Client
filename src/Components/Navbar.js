import { React, useState, useEffect } from "react";
import "../App.css";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import LogIn from "./LogIn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Navbar = () => {
  const [popup, setPopup] = useState(false);
  const [iflogin, setIflogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setIflogin(true);
    }
  }, []);

  return (
    <header className='nav_main top-0 sticky shadow-xl z-20'>
      <div className=' text-black flex items-center justify-between w-10/12 mx-auto py-5 h-20'>
        <div className='text-4xl font-bold '>
          <Link to='/'>
            <div className='flex cursor-pointer justify-center items-center'>
              <img src={logo} className='h-16'></img>
              <h1>Url Shortner</h1>
            </div>
          </Link>
        </div>

        <div className=' nav flex items-center justify-between text-xl font-semibold'>
          <Link to='/home'>
            <div className='ml-10'>
              <div className='hover:text-blue-500 hover:shadow-sm transition delay-100 ease-in-out'>
                <div className='cursor-pointer '>
                  <h2>Home</h2>
                </div>
              </div>
            </div>
          </Link>

          {iflogin === false && (
            <Link to='/Sign-up'>
              <div className='ml-10'>
                <div className='hover:text-blue-500 hover:shadow-sm transition delay-100 ease-in-out'>
                  <div className='cursor-pointer'>
                    <h2>Sign Up</h2>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {iflogin ? (
            <div className='flex'>
              <div className='hover:text-blue-500 hover:shadow-sm transition delay-100 ease-in-out ml-10'>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    localStorage.clear();
                    setIflogin(false);
                  }}
                >
                  <h2>Log Out</h2>
                </div>
              </div>

              <div className='ml-10'>
                <div className='flex flex-row justify-center items-center'>
                  <AccountCircleIcon />
                  <p className='text-base ml-2'>
                    <span className='text-xl text-blue-400'>
                      {localStorage.getItem("User")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='ml-10'>
              <div className='hover:text-blue-500 hover:shadow-sm transition delay-100 ease-in-out'>
                <div
                  className='cursor-pointer'
                  onClick={(e) => {
                    setPopup(!popup);
                  }}
                >
                  <h2>Login</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        id='pop'
        isOpen={popup}
        ariaHideApp={false}
        className='pt-20'
        style={{
          overlay: {
            zIndex: 999,
          },
        }}
      >
        <LogIn setPopup={setPopup} setIflogin={setIflogin} />
      </Modal>
    </header>
  );
};

export default Navbar;

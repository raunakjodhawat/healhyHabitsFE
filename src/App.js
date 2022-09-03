/*global FB*/
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from './static/logo_white.png';
import './App.css';

const initFB = () => {
    window.fbAsyncInit = () => {
        FB.init({
            appId: process.env.FB_APP_SECRET,
            cookie: true,
            xfbml: true,
            version: 'v14.0'
        });
    };
}

const checkLoginStatus = (cb) => {
    // Session has not expired
    if ((localStorage.getItem("Session") && window.atob(localStorage.getItem("Session")) > (Date.now() - 86400))) {
        cb(null);
    } else {
        // Session has expired
        FB.getLoginStatus((response) => {
            if (response && response.status && response.status === 'connected') {
                cb(null);
            }
        });
    }
}

const logInFB = (cb) => {
    FB.login(function(response){
        if (response && response.status && response.status === 'connected') {
            localStorage.setItem("Session", window.btoa(Date.now()));
            cb(null);
        } else {
            cb("failed to login");
        }
    });
}

function App() {
    let navigate = useNavigate();
    if (typeof FB === 'undefined') {
        initFB();
    }
    checkLoginStatus((err) => {
        if (err === null) {
            navigate("/home");
        }
    });

    const logInUser = () => {
        logInFB((err) => {
            if (err === null) {
                navigate("/home");
            }
        });
    }
    return (
        <div className="app">
            <div className="app-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="app-login-button">
                <Button variant="outlined" onClick={logInUser}> Login with Facebook</Button>
            </div>
        </div>
    );
}

export default App;

/*global FB*/
import { useNavigate } from 'react-router-dom';
import logo from './static/logo_white.png';

import './App.css';

function App() {
    let navigate = useNavigate();
    window.fbAsyncInit = function () {
        FB.init({
            appId: process.env.FB_APP_SECRET,
            cookie: true,
            xfbml: true,
            version: 'v14.0'
        });

        FB.AppEvents.logPageView();
        FB.getLoginStatus(function (response) {
            if (response && response.status && response.status === 'connected') {
                navigate("/home");
            }
        });
    };
    return (
        <div className="app">
            <div className="app-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="app-login-button">
                <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="true" data-use-continue-as="true"></div>
            </div>
        </div>
    );
}

export default App;

/*global FB*/
import { useNavigate } from 'react-router-dom';
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
        <div className="App">
            <header className="App-header">
                <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="true" data-use-continue-as="true"></div>
            </header>
        </div>
    );
}

export default App;

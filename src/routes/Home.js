/*global FB*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate = useNavigate();
        
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState(0);
    window.fbAsyncInit = function () {
        FB.init({
            appId: process.env.FB_APP_SECRET,
            cookie: true,
            xfbml: true,
            version: 'v14.0'
        });

        FB.AppEvents.logPageView();
        FB.getLoginStatus(function (response) {
            console.log(response);
            if (
                !response ||
                (response && !response.status) || 
                (response && response.status && response.status !== 'connected')) {
                navigate("/");
            }
        });

        FB.api('/me', function(response) {
            setUsername(response.name);
            setUserId(response.id);
            console.log(userId);
        });
    };

    

    const onLogoutButtonClick = () => {
        FB.logout(function(response) {
            navigate("/");
        });
    }
    return (
        <div className="app">
            Hello, {userName}
            <button onClick={onLogoutButtonClick}>Logout</button>
        </div>
    );
}

export default Home;

/*global FB*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate = useNavigate();
    FB.getLoginStatus(function (response) {
        if (
            !response ||
            (response && !response.status) || 
            (response && response.status && response.status !== 'connected')) {
            navigate("/");
        }
    });
    const [userName, setUsername] = useState("");
    FB.api('/me', function(response) {
        setUsername(response.name);
    });

    const onLogoutButtonClick = () => {
        FB.logout(function(response) {
            navigate("/");
        });
    }
    return (
        <div className="App">
            <header className="App-header">
                Hello, {userName}
                <button onClick={onLogoutButtonClick}>Logout</button>
            </header>
        </div>
    );
}

export default Home;

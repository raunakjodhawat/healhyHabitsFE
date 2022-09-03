/*global FB*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FBModule } from '../utils/fb';

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
            } else {
                cb("redirect");
            }
        });
    }
}

const getUserNameAndID = (cb) => {
    FB.api('/me', (response) => {
        cb({name: response.name, userId: response.id});
    });
}

const logOutUser = (cb) => {
    if (localStorage.getItem("Session")) {
        localStorage.removeItem("Session");
    }
    FB.logout(() => {
        cb();
    });
}

function Home() {
    let navigate = useNavigate();
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState(0);

    if (typeof FB === 'undefined') {
        initFB();
    }
    checkLoginStatus((err) => {
        if (err !== null) {
            navigate("/");
        } else {
            getUserNameAndID((res) => {
                setUsername(res.name);
                setUserId(res.userId);
            })
        }
    });


    const onLogoutButtonClick = () => {
        logOutUser(() => {
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

import { Button } from '@mui/material';
import './Header.css';

function Header({ userName, onLogoutButtonClick }) {
    return (
        <div className="header">
            <div className="header-title-name">
                Hello, {userName}
            </div>
            <div className="header-logout-button">
                <Button variant="outlined" onClick={onLogoutButtonClick} color="error">Logout</Button>
            </div>
        </div>
    );
}

export default Header;
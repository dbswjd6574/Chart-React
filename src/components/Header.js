import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {

        let logo = {
            width:"77px",
            height:"27px",
            float:"left",
            background:"url('../image/logo.png') left top no-repeat",
            display:"inline-block",
            margin: "11px 0 0 50px"
        }

        return(
            <nav className="main_menu">
                <div className="nav-wrapper grey darken-3">
                    <div className="logo" style={logo}>
                    </div>
                    <ul className="center">
                        <li><Link to="/">DATA</Link></li>
                        <li><Link to="/">TYPE</Link></li>
                        <li><Link to="/sunburst">ANALYSIS</Link></li>
                        <li><Link to="/">REPORT</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
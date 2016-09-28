import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {

        return(
            <nav className="main_menu">
                <div className="nav-wrapper indigo darken-3">
                    <ul className="center">
                        <li><Link to="/drawChart">TESTCHART</Link></li>
                        <li><Link to="/dashBoard">DASHBOART</Link></li>
                        <li><Link to="/testComponent">TESTCOMPONENTS</Link></li>
                        <li><Link to="/condition">CONDITION</Link></li>
                        <li><Link to="/data"><i className="material-icons">data</i></Link></li>
                        <li><Link to="/analysis"><i className="material-icons">analysis</i></Link></li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;
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
                        <li><Link to="/data">DATA</Link></li>
                        <li><Link to="/analysis">ANALYSIS</Link></li>
                        <li><Link to="/chartGallery">CHART_GALLERY</Link></li>
                        <li><Link to="/trialVersion">TrialVersion</Link></li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;
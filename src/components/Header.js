import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {

        return(
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MAIN</Link>

                    <ul>
                        <li><Link to="/drawChart"><i className="material-icons">insert_chart</i></Link></li>
                        <li><Link to="/dashBoard"><i className="material-icons">dashboard</i></Link></li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;
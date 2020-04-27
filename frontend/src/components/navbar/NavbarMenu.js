import * as React from "react";

import {withRouter} from 'react-router-dom';
import {AuthContext} from "../authprovider/AuthProvider";
import Typography from "@material-ui/core/Typography";
import SimpleMenu from "./SimpleMenu";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
                <nav>
                    {this.context.currentUser ?
                        <>
                            <Typography>
                                Hi,{this.context.currentUser.name}!
                            </Typography>
                        </>
                        :
                        <></>
                    }
                    <SimpleMenu/>
                </nav>
        )
    }

}

Navbar.contextType = AuthContext;
export default withRouter(Navbar)
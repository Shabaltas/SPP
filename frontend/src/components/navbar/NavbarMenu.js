import * as React from "react";
import configs from "../../config.json";

import {Link, withRouter} from 'react-router-dom';
import {AuthContext} from "../authprovider/AuthProvider";
import Typography from "@material-ui/core/Typography";
import SimpleMenu from "./SimpleMenu";
import "./Navbar.css";

const routes = configs.routes;
class Navbar extends React.Component {
    create = () => {
        this.props.history.push(routes.tasksCreate);
    };

    tasks = () => {
        this.props.history.push(routes.tasks);
    };

    logout = () => this.context.logout();

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
import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import configs from "../../config.json";

import {Link, withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {AuthContext} from "../authprovider/AuthProvider";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

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
            <AppBar position='static'>
                <Toolbar>
                    <Button onClick={this.tasks}>
                        Tasks
                    </Button>
                    {this.context.currentUser ?
                        <>
                            <Button onClick={this.create}>
                                Create task
                            </Button>
                            <IconButton onClick={this.logout}>
                                <ExitToApp color='secondary'>
                                </ExitToApp>
                            </IconButton>
                            <Typography>
                                Hi,{this.context.currentUser.name}!
                            </Typography>
                        </>
                        :
                        <Link to={routes.login}>
                            <IconButton>
                                <ExitToApp color='action'/>
                            </IconButton>
                        </Link>
                    }
                </Toolbar>
            </AppBar>)

    }

}

Navbar.contextType = AuthContext;
export default withRouter(Navbar)
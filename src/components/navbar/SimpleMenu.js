import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import configs from "../../config";
import {AuthContext} from "../authprovider/AuthProvider";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp} from "@material-ui/icons";
import "./Navbar.css";

const routes = configs.routes;

class SimpleMenu extends React.Component{

    create = () => {
        this.props.history.push(routes.tasksCreate);
    };

    tasks = () => {
        this.props.history.push(routes.tasks);
    };

    login = () => {
        this.props.history.push(routes.login);
    };

    registration = () => {
        this.props.history.push(routes.registration);
    };

    logout = () => this.context.logout();

    render() {
        return (
            <Paper className='menu'>
                    {this.context.currentUser ?
                        <MenuList>
                            <MenuItem onClick={this.tasks}>Tasks</MenuItem>
                            <MenuItem onClick={this.create}>Create task</MenuItem>
                            <MenuItem>
                                <IconButton onClick={this.logout}>
                                    <ExitToApp color='secondary'/>
                                </IconButton>
                            </MenuItem>
                        </MenuList>
                        :
                        <MenuList>
                            <MenuItem onClick={this.tasks}>Tasks</MenuItem>
                            <MenuItem onClick={this.login}>Sign in</MenuItem>
                            <MenuItem onClick={this.registration}>Sign up</MenuItem>
                        </MenuList>
                    }
            </Paper>
        /*<div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    Toggle Menu Grow
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>*/
        );
    }
}

SimpleMenu.contextType = AuthContext;
export default withRouter(SimpleMenu);

import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import configs from "../../config";
import Registration from "../registration/Registration";
import {AuthContext} from "../authprovider/AuthProvider";
import Login from "../login/Login";
import TasksGrid from "../tasksGrid/TasksGrid";
import TaskEditor from "../taskEditor/TaskEditor";
import NavbarMenu from "../navbar/NavbarMenu";
import s from "./Content.module.css";

const routes = configs.routes;
class Content extends React.Component {
    render() {
        return (
            <div className={s.content}>
                <BrowserRouter>
                    <NavbarMenu/>
                    <div className={s.main}>
                        {this.context.currentUser ?
                            <Switch>
                                <Route exact path={routes.tasksCreate} component={TaskEditor}/>
                                <Route exact path={routes.tasks} component={TasksGrid}/>
                                <Route exact path={routes.login} component={Login}/>
                                <Route exact path={routes.registration} component={Registration}/>
                                <Redirect to={routes.tasks}/>
                            </Switch>
                            :
                            <Switch>
                                <Route exact path={routes.tasks} component={TasksGrid}/>
                                <Route exact path={routes.login} component={Login}/>
                                <Route exact path={routes.registration} component={Registration}/>
                                <Redirect to={routes.login}/>
                            </Switch>
                        }
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
Content.contextType = AuthContext;
export default Content;
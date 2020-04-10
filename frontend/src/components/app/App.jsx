import React from 'react';
import configs from "../../config";
import Content from "../content/Content";
import {AuthContext} from "../authprovider/AuthProvider";
import Header from "../header/Header";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="app-wrapper">
                <Header/>
                <Content/>
            </div>
        );
    }
}
App.contextType = AuthContext;
export default App;
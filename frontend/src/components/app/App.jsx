import React from 'react';
import Content from "../content/Content";
import {AuthContext} from "../authprovider/AuthProvider";
import Header from "../header/Header";
import "./App.css";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import configs from "../../config.json";
import {InMemoryCache} from "apollo-cache-inmemory";


const client = new ApolloClient({
    uri: configs.endpoints.graphql,
    cache: new InMemoryCache()
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="app-wrapper">
                    <Header/>
                    <Content/>
                </div>
            </ApolloProvider>
        );
    }
}
App.contextType = AuthContext;
export default App;
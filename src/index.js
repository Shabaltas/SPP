import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/App.jsx';
import AuthProvider from "./components/authprovider/AuthProvider.jsx";

ReactDOM.render(<AuthProvider><App/></AuthProvider>,
                document.getElementById('root'));
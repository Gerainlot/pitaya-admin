import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import {config} from "./config";
import Routers from "./routers";
import "antd/dist/antd.css";
import "./styles/common.scss";

let conf = config.prod
if (process.env.NODE_ENV === 'development') {
    conf = config.dev
}

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter basename={conf.basename}>
                    <Routers></Routers>
                </BrowserRouter>               
            </Provider>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import SaleOrderAddForm from "../../components/saleOrderAddForm";

class SaleOrderInfo extends Component {

    componentDidMount(){
      
    }
    
    render() {
        return (
            <Fragment>
                <SaleOrderAddForm></SaleOrderAddForm>
            </Fragment>
        )
    }
}
export default withRouter(SaleOrderInfo);
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import SaleOrderTable from "../../components/saleOrderTable";
import { defaultPagination } from "../../../../utils/pageParams";
import { actionCreators as saleOrderActionCreator } from "../../../../store/modules/sale_order";
import SearchFrom from "../../components/search_form"
import Http from '../../../../http/http';
import { api_sale_order_pay } from '../../../../api';



class SaleOrderList extends Component {
    componentDidMount(){
        //获取销售订单列表数据
        const { getSaleOrderTableData } = this.props;
        getSaleOrderTableData(defaultPagination())
    }

    doPayment(orderId) {
        Http.postJson(api_sale_order_pay,{id : orderId})
    }

    render() {
        const { saleOrderTableData, saleOrderTableDataPagination } = this.props;
        const { getSaleOrderTableData } = this.props;
        return (
            <Fragment>
                <SearchFrom></SearchFrom>
                <SaleOrderTable
                    tableData={saleOrderTableData.toJS()}
                    pagination={saleOrderTableDataPagination}
                    onChangeListData={getSaleOrderTableData}
                    onPay = {this.doPayment}
                ></SaleOrderTable>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    saleOrderTableData: state.getIn(["sale", "saleOrderTableData"]),
    saleOrderTableDataPagination: state.getIn(["sale", "saleOrderTableDataPagination"]),
})
const mapDispatchToProps = (dispatch) => ({
    //获取商品列表数据
    getSaleOrderTableData(params){
        dispatch(saleOrderActionCreator.querySaleOrderList(params))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderList);
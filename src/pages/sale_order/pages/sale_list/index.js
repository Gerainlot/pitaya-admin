import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import SaleOrderTable from "../../components/saleOrderTable";
import { saleOrderTableDataPageParams } from "../../../../utils/pageParams";
import { actionCreators as saleOrderActionCreator } from "../../../../store/modules/sale_order";


class SaleOrderList extends Component {
    componentDidMount(){
        //获取销售订单列表数据
        
        const { getSaleOrderTableData } = this.props;
        getSaleOrderTableData(saleOrderTableDataPageParams())
        console.log("获取销售订单列表数据...")
    }
    render() {
        const { saleOrderTableData, saleOrderTableDataPagination } = this.props;
        const { getSaleOrderTableData } = this.props;
        return (
            <Fragment>
                <Link to="/goodsmanage/addgoods">新增订单</Link>
                <SaleOrderTable
                    tableData={saleOrderTableData.toJS()}
                    pagination={saleOrderTableDataPagination}
                    onChangeListData={getSaleOrderTableData}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleOrderList));
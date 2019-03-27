import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import SaleOrderTable from "../../components/saleOrderTable";
import { defaultPagination } from "../../../../utils/pageParams";
import { actionCreators as saleOrderActionCreator } from "../../../../store/modules/sale_order";
import SearchFrom from "../../components/search_form"


class SaleOrderList extends Component {
    componentDidMount(){
        //获取销售订单列表数据
        const { getSaleOrderTableData } = this.props;
        getSaleOrderTableData(defaultPagination())
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
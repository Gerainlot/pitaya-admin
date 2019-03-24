import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import GoodsTable from "../components/goodsTable";
import { goodsTableDataPageParams } from "../../../utils/pageParams";
import { actionCreators as goodsActionCreators } from "../../../store/modules/goods";
import { Button } from 'antd';


class GoodsList extends Component {
    componentDidMount(){
        //获取商品列表数据
        const { getGoodsTableData } = this.props;
        getGoodsTableData(goodsTableDataPageParams())
    }
    render() {
        const { goodsTableData, goodsTableDataPagination } = this.props;
        const { getGoodsTableData } = this.props;
        return (
            <Fragment>
                <Link to="/goodsmanage/addgoods">
                    <Button type="primary">新增商品 </Button>
                </Link>
                <GoodsTable
                    tableData={goodsTableData.toJS()}
                    pagination={goodsTableDataPagination}
                    onChangeListData={getGoodsTableData}
                ></GoodsTable>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    goodsTableData: state.getIn(["goods", "goodsTableData"]),
    goodsTableDataPagination: state.getIn(["goods", "goodsTableDataPagination"]),
})
const mapDispatchToProps = (dispatch) => ({
    //获取商品列表数据
    getGoodsTableData(params){
        dispatch(goodsActionCreators.getGoodsTableData(params))
    },
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsList));
import React,{ Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import WrappedDynamicStockSet from '../components/goods_stock/stock_dynamic_form'
import { Button, Row, Col, Card } from "antd";
import { actionCreators as goodsActionCreators } from "../../../store/modules/goods";
import { actionCreators as supplierActionCreators } from "../../../store/modules/supplier";

class StockInfo extends Component {

    componentDidMount(){
        const {
            getGoodsBasicInfo,
            getGoodsStocks,
            getSupplierInfo,
        } = this.props;
        const {params} = this.props.match
        getGoodsBasicInfo(params.goodsId)
        getGoodsStocks(params.goodsId)
        getSupplierInfo(params.supplierId)
    }
    
    handleSave = ()=> {
        const {editStocks} = this.props
        this.stockForm.props.form.validateFieldsAndScroll((err, values) => {
            
            const {stocks} = values
            const stocksWithGoodsId = stocks.map(item => {
                if (!item.goodsId) {
                    item.goodsId = this.props.match.params.goodsId
                }
                return item
            })
            console.log("商品库存提交数据",stocksWithGoodsId)
            editStocks(stocksWithGoodsId)
        })
       
    }

    render() {
        return (
            <Card title="库存" style={{"marginTop":16}}>
                <WrappedDynamicStockSet 
                    wrappedComponentRef={(inst) => this.stockForm = inst}
                ></WrappedDynamicStockSet>
                <Row gutter={24}>
                    <Col offset={4} span={20}>
                        <Button type="primary" onClick={()=>{this.handleSave()}}>
                            {"保存"}
                        </Button>
                    </Col>
                </Row>
                
            </Card>
        )
    }
}
const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({

    getGoodsStocks(goodsId) {
        dispatch(goodsActionCreators.getGoodsStocksInfo(goodsId))
    },
    
    //获取商品基本信息
    getGoodsBasicInfo(goodsId){
        dispatch(goodsActionCreators.getGoodsBasicInfo(goodsId))
    },
    
    editStocks(params) {
        dispatch(goodsActionCreators.editStocks(params))
    },

    getSupplierInfo(supplierId) {
        dispatch(supplierActionCreators.querySupplierInfo(supplierId))
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockInfo));
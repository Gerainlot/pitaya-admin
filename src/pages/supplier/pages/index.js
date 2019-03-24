import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import SupplierTable from "../components/supplier_table";
import { defaultPagination } from "../../../utils/pageParams";
import { actionCreators } from "../../../store/modules/supplier";
import { Button} from 'antd';

class SupplierListPage extends Component {

    state = {
        visible: false,
        editable : false,
    };

    componentDidMount(){
        //获取销售订单列表数据
        const {querySupplierList } = this.props;
        querySupplierList(defaultPagination())
    }

    showModal = () => {
        this.setState({ visible: true });
    }
    
    handleCancel = () => {
        this.setState({ visible: false });
    }
    updateCancel = () => {
        this.setState({ editable: false });
    }
    
    handleCreate = () => {
        const form = this.formRef.props.form;
        
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onInfoChange = (id) => {
        
    }

    render() {
        const { suppliers, pagination } = this.props;
        const { querySpecificationList } = this.props;
        return (
            <Fragment>
                <Link to="/supplier/add">
                    <Button type="primary">添加供应商</Button>
                </Link>
                
                <SupplierTable
                    tableData={suppliers.toJS()}
                    pagination={pagination}
                    onChangeListData={querySpecificationList}
                    onInfoChange = {this.onInfoChange}
                />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    suppliers : state.getIn(["supplier","suppliers"]),
    pagination : state.getIn(["supplier", "supplierPagination"]),
})
const mapDispatchToProps = (dispatch) => ({
    querySupplierList(pagination){
        dispatch(actionCreators.querySupplierList(pagination))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(SupplierListPage);
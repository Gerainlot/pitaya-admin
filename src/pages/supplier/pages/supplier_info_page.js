import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {Row,Col,Button, Card} from 'antd'
import SupplierInfoForm from "../components/supplier_form";
import { actionCreators } from "../../../store/modules/supplier";

const supplier_add_route = "/supplier/add"

class SupplierInfoPage extends Component {

    componentDidMount(){
        const {querySupplierInfo} = this.props
        
        if (this.props.location.pathname !== supplier_add_route){
            // put request result supplier info into redux store
            console.log("this.props.location.pathname",this.props.location.pathname)
            querySupplierInfo(this.props.match.params.id)
        }

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
    
    handleSave = () => {
        const {createSupplier,updateSupplier} = this.props
        this.supplierInfoForm.props.form.validateFieldsAndScroll((err, values) => {
            console.log('handle create form datas ', this.newSupplier(values))
            if (this.props.location.pathname === supplier_add_route) {
                createSupplier(this.newSupplier(values))
            }else {
                updateSupplier(this.newSupplier(values))
            }
        })
    }

    newSupplier(values) {
        let supplier = {}
        supplier.id = values.id
        supplier.name = values.name
        supplier.address = values.address;
        supplier.contactName = values.contactName
        supplier.email = values.email
        supplier.license = values.license
        supplier.phoneNo = values.phoneNo
        supplier.warehouses = values.warehouses
        return supplier
    }

    saveFormRef = (formRef) => {
        this.supplierInfoForm = formRef;
    }

    render() {
        const {pathname} = this.props.location
        return (
            <Fragment>
                <SupplierInfoForm 
                    wrappedComponentRef={(inst) => this.supplierInfoForm = inst}
                />
                <Card style={{"marginTop":16}}>
                    <Row gutter={24}>
                        <Col offset={0} span={20}>
                            <Button type="primary" onClick={()=>{this.handleSave()}}>
                                {pathname === supplier_add_route? "新增" : "保存"}
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({

    querySupplierInfo(id) {
        dispatch(actionCreators.querySupplierInfo(id))
    },

    createSupplier(supplier) {
        dispatch(actionCreators.createSupplier(supplier))
    },

    updateSupplier(supplier) {
        dispatch(actionCreators.updateSupplier(supplier))
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(SupplierInfoPage);
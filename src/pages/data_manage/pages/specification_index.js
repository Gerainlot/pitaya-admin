import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import SpecTable from "../components/specificationTable";
import { specificationTableDataPageParams } from "../../../utils/pageParams";
import { actionCreators } from "../../../store/modules/specification";
import { Button,Form,Modal,Input } from 'antd';
import Http from '../../../http/http';

const Spec_create_url = "/manage/specification/create"
const Spec_update_url = "/manage/specification/update"

const SpecificationCreateForm = Form.create({ name: 'specification_add_modal' })(

    
    // eslint-disable-next-line
    class extends React.Component {

      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="新增一个规格属性"
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              {getFieldDecorator('id',{
                  
              })( <Input type="hidden" />)}
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入要定义的规格的名称:例如颜色、尺寸等!' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="排序">
                {getFieldDecorator('sortOrder')(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

  const SpecificationEditForm = Form.create({ name: 'specification_edit_modal' })(

    class extends React.Component {
      render() {
        const {visible, onCancel, onUpdate, form,specification}= this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="修改规格"
            okText="保存"
            onCancel={onCancel}
            onOk={onUpdate}
          >
            <Form layout="vertical">
              {getFieldDecorator('id',{
                  initialValue: specification?specification.id:0
              })( <Input type="hidden" />)}
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入要定义的规格的名称:例如颜色、尺寸等!' }],
                  initialValue: specification?specification.name:""
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="排序">
                {getFieldDecorator('sortOrder',{
                    initialValue: specification?specification.sortOrder:0
                })(<Input type="textarea" />)}
                
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

class SpecificationListPage extends Component {

    state = {
        visible: false,
        editable : false,
    };

    componentDidMount(){
        //获取销售订单列表数据
        const {querySpecificationList } = this.props;
        querySpecificationList(specificationTableDataPageParams())
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
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Http.postJson(Spec_create_url,values)
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    handleUpdate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Http.postJson(Spec_update_url,values)
            form.resetFields();
            this.setState({ editable: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onInfoChange = (id) => {
        console.log("ondetail click id = ",id)
        const {querySpecificationInfo } = this.props;
        querySpecificationInfo({"id":id})
        this.setState({editable:true})
    }

    render() {
        const { specifications, pagination,specificationInfo } = this.props;
        const { querySpecificationList } = this.props;
        return (
            <Fragment>
                <Button  type="primary" onClick={this.showModal}>添加规格</Button>
                <SpecTable
                    tableData={specifications.toJS()}
                    pagination={pagination}
                    onChangeListData={querySpecificationList}
                    onInfoChange = {this.onInfoChange}
                ></SpecTable>
                {/* 规格新增表单 */}
                <SpecificationCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                {/* 规格编辑表单 */}
                <SpecificationEditForm
                    wrappedComponentRef={this.saveFormRef}
                    specification = {specificationInfo.toJS()}
                    visible={this.state.editable}
                    onCancel={this.updateCancel}
                    onUpdate={this.handleUpdate}
                ></SpecificationEditForm>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    specificationInfo : state.getIn(["specification","specificationInfo"]),
    specifications: state.getIn(["specification", "specificationTableData"]),
    pagination: state.getIn(["specification", "specificationPagination"]),
})
const mapDispatchToProps = (dispatch) => ({
    querySpecificationList(params){
        dispatch(actionCreators.querySpecificationList(params))
    },
    querySpecificationInfo(params){
        dispatch(actionCreators.querySpecificationInfo(params))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(SpecificationListPage);
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import AttributeCategoryTable from "../components/attibute/attribute_category_table";
import { defaultPagination } from "../../../utils/pageParams";
import { actionCreators } from "../../../store/modules/attribute";
import { Button,Form,Modal,Input,Radio } from 'antd';
import Http from '../../../http/http';
import AttributeDrawer from '../components/attibute/attribute_drawer';

const attr_create_url = "/manage/attribute/create"

const AttributeCategoryCreateForm = Form.create({ name: 'AttributeCategory_add_modal' })(

    
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
            title="新增属性分类"
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入要定义的属性分类名称 eg.家具、家电' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="是否启用">
                {getFieldDecorator('enabled')(
                    <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="0">否</Radio>
                    </Radio.Group>
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

  const AttributeCreateForm = Form.create({ name: 'attribute_add_modal' })(

    class extends React.Component {

      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="新增属性"
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入要定义的属性' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              
            </Form>
          </Modal>
        );
      }
    }
  );

  const AttributeCategoryEditForm = Form.create({ name: 'AttributeCategory_edit_modal' })(

    class extends React.Component {
      render() {
        const {visible, onCancel, onUpdate, form,AttributeCategory}= this.props;
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
                  initialValue: AttributeCategory?AttributeCategory.id:0
              })( <Input type="hidden" />)}
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入要定义的规格的名称:例如颜色、尺寸等!' }],
                  initialValue: AttributeCategory?AttributeCategory.name:""
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="排序">
                {getFieldDecorator('sortOrder',{
                    initialValue: AttributeCategory?AttributeCategory.sortOrder:0
                })(<Input type="textarea" />)}
                
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

class AttributeCategoryListPage extends Component {

    state = {
        visible: false,
        editable : false,
        showDrawer : false,
        selectedCategoryId : 0,
        showAttributeCreateModal : false,
    };

    componentDidMount(){
        const {queryAttributeCategoryList } = this.props;
        queryAttributeCategoryList(defaultPagination())
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
    
    handleCategoryCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Http.postJson(attr_create_url,values)
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    handleAttributeCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Http.postJson(attr_create_url,{categoryId:this.state.selectedCategoryId,...values})
            form.resetFields();
            this.setState({ showAttributeCreateModal: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onDrawerClose = () => {
        this.setState({
            showDrawer : false
        })
    }

    handleShowDrawer = (id) => {
        this.props.quryAttributeList({categoryId:id,...defaultPagination()})
        this.setState({
            showDrawer : true,
            selectedCategoryId : id
        })
    }

    handleAttributePageChange = (page) => {
        this.props.quryAttributeList({categoryId:this.state.selectedCategoryId,...page})
    }

    onAddSubAttributeClick = (categoryId) => {
        this.setState({
            selectedCategoryId : categoryId,
            showAttributeCreateModal : true,
        })
    }

    closeAttributeModal = () => {
        this.setState({
            selectedCategoryId : 0,
            showAttributeCreateModal : false,
        })
    }

    render() {
        const { attributeCategoryList, pagination ,queryAttributeCategoryList,
            attributeTableData,attributePagination} = this.props;
        return (
            <Fragment>
                <Button  type="primary" onClick={this.showModal}>添加属性分类</Button>
                <AttributeCategoryTable
                    tableData={attributeCategoryList.toJS()}
                    pagination={pagination}
                    onChangeListData={queryAttributeCategoryList}
                    onInfoChange = {this.handleShowDrawer}
                    onAddClick = {this.onAddSubAttributeClick}
                ></AttributeCategoryTable>
                {/* 属性Category新增表单 */}
                <AttributeCategoryCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCategoryCreate}
                />
                {/* 属性新增表单 */}
                <AttributeCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.showAttributeCreateModal}
                    onCancel={this.closeAttributeModal}
                    onCreate={this.handleAttributeCreate}
                />
                {/* 规格编辑表单 */}
                {/* <AttributeCategoryEditForm
                    wrappedComponentRef={this.saveFormRef}
                    AttributeCategory = {AttributeCategoryInfo.toJS()}
                    visible={this.state.editable}
                    onCancel={this.updateCancel}
                    onUpdate={this.handleUpdate}
                ></AttributeCategoryEditForm> */}
                <AttributeDrawer 
                tableData={attributeTableData.toJS()} 
                pagination={attributePagination}
                visible={this.state.showDrawer}
                onChangeListData={this.handleAttributePageChange}
                onClose={this.onDrawerClose}/>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    attributeCategoryList: state.getIn(["attribute", "attributeCategoryTableData"]),
    pagination: state.getIn(["attribute", "attributeCategoryPagination"]),
    attributeTableData : state.getIn(["attribute", "attributeTableData"]),
    attributePagination : state.getIn(["attribute", "attributePagination"])
})
const mapDispatchToProps = (dispatch) => ({
    queryAttributeCategoryList(params){
        dispatch(actionCreators.queryAttributeCategoryList(params))
    },
    quryAttributeList(params){
        dispatch(actionCreators.queryAttributeList(params))
    },
   
})
export default connect(mapStateToProps, mapDispatchToProps)(AttributeCategoryListPage);
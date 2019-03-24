import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { defaultPagination } from "../../../utils/pageParams";
import { actionCreators } from "../../../store/modules/category";
import { Button,Form,Modal,Input,Radio } from 'antd';
import Http from '../../../http/http';
import CategoryTable from "../components/category/cat_table";

const attr_create_url = "/manage/attribute/create"

const AttributeCategoryCreateForm = Form.create({ name: 'AttributeCategory_add_modal' })(

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

  const CategoryCreateForm = Form.create({ name: 'category_create_modal' })(

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

const CategoryEditForm = Form.create({ name: 'category_edit_form' })(
    class extends React.Component {
      render() {
        
        const {
            isEdit,
            visible, 
            onCancel,
            onOk, 
            form,
            data,
            parent,
        }= this.props;
        
        if (parent) {
            console.log("分类编辑 parent",parent)
        }
        if (data) {
            console.log("分类编辑",data)
        }
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title={isEdit ? "修改分类" : "新增分类"}
            okText="保存"
            onCancel={onCancel}
            onOk={onOk}
          >
            <Form layout="vertical">
              {getFieldDecorator('id',{
                  initialValue: data ? data.id : 0
              })( <Input type="hidden" />)}
              {getFieldDecorator('parentId',{
                  initialValue: parent ? parent.id : 0
              })( <Input type="hidden" />)}
              {
                  parent.id && 
                  <Form.Item label="上级分类">
                    {getFieldDecorator('parentName', {
                    initialValue: parent.name,
                    })(
                    <Input/>
                    )}
                </Form.Item>
              }
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true}],
                  initialValue: data ? data.name : ""
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="文案图">
                {getFieldDecorator('wapBannerUrl',{
                    initialValue: data ? data.wapBannerUrl : ""
                })(<Input type="textarea" />)}
                
              </Form.Item>
              <Form.Item label="文案描述">
                {getFieldDecorator('frontName',{
                    initialValue: data ? data.frontName : ""
                })(<Input />)}
                
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

class CategoryIndexPage extends Component {

    state = {
        visible: false,
        editable : false,
        showDrawer : false,
        parentCategory :{}
    };

    componentDidMount(){
        const {queryTopCategories } = this.props;
        queryTopCategories()
    }

    addCategory = () => {
        this.setState({ visible: true ,isEdit : false});
    }

    editCategory = (categoryId) => {
        const {queryCategoryInfo} = this.props
        queryCategoryInfo(categoryId,false)
        this.setState({ visible: true ,isEdit : true});
    }

    addSubCategory = (parentId) => {
        const {queryCategoryInfo} = this.props
        queryCategoryInfo(parentId,true)
        this.setState(
            { 
                visible: true ,
                isEdit : false,
            }
        );
    }
    
    handleCancel = () => {
        console.log("取消操作")
        const {resetCategoryInfo,resetParentCategoryInfo} = this.props
        resetCategoryInfo()
        resetParentCategoryInfo()
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

   

    closeAttributeModal = () => {
        this.setState({
            selectedCategoryId : 0,
            showAttributeCreateModal : false,
        })
    }

    render() {
        const { 
            topCategories,
            categoryInfo,
            parentCategoryInfo,
        } = this.props;
        return (
            <Fragment>
                <Button type="primary" onClick={this.addCategory}>添加商品分类</Button>
                <CategoryTable
                    tableData={topCategories}
                    onInfoChange = {this.handleShowDrawer}
                    onAddClick = {this.addSubCategory}
                    onEdit = {this.editCategory}
                />
                <CategoryEditForm 
                    visible = {this.state.visible}
                    isEdit = {this.state.isEdit}
                    data = {categoryInfo}
                    parent = {parentCategoryInfo}
                    onCancel = {this.handleCancel}
                />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    topCategories: state.getIn(["category", "topCategories"]).toJS(),
    childrenCategories: state.getIn(["category", "childrenCategories"]).toJS(),
    categoryInfo : state.getIn(["category","info"]).toJS(),
    parentCategoryInfo : state.getIn(["category","parent"]).toJS()
})
const mapDispatchToProps = (dispatch) => ({
    queryTopCategories(params){
        dispatch(actionCreators.queryTopCategories(params))
    },
    
    queryChildrenCategories(params){
        dispatch(actionCreators.queryChildrenCategories(params))
    },

    queryCategoryInfo(categoryId,isParent) {
        dispatch(actionCreators.queryCategoryInfo(categoryId,isParent))
    },

    resetCategoryInfo() {
        dispatch(actionCreators.resetCategoryInfo(false))
    },

    resetParentCategoryInfo() {
        dispatch(actionCreators.resetCategoryInfo(true))
    }
   
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndexPage);
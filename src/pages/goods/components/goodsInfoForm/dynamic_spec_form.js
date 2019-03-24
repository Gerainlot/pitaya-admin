import {
    Form, Input, Icon, Button, Col, Row,Select,
  } from 'antd';
import React from "react"
import {api_specifications_all} from '../../../../apis/api'
import SpecificationAvatar from "./spec_picture_wall"
import Http from '../../../../http/http'
import { connect } from "react-redux";
import { actionCreators as goodsActionCreators } from "../../../../store/modules/goods";

class DynamicFieldSet extends React.Component {

  state = {
    allSpecifications : []
  }

  componentDidMount(){
    Http.get(api_specifications_all).then((data) => {
      this.setState({
        allSpecifications : data.data
      })
    })
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let goodsSpecs = form.getFieldValue('goodsSpecs');
    let pictures = form.getFieldValue("pictures")
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    const newGoodsSpecs = goodsSpecs.filter((item,index) => {
      return index !== k
    })
    // console.log("删除前为",goodsSpecs,"删除后:",newGoodsSpecs,"删除k:",k)
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key,index) => index !== k),
      goodsSpecs : newGoodsSpecs,
      pictures : pictures.filter((item,index) => {
        return index !== k
      })
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let goodsSpecs = form.getFieldValue('goodsSpecs');
    const nextKeys = keys.concat(goodsSpecs.length);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    goodsSpecs.push(this.newEmptySpecification())
    form.setFieldsValue({
      goodsSpecs: goodsSpecs,
    });
  }

  newEmptySpecification() {
    return {"id":0,"specificationId":0,"value":"","picUrl":null}
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    const {getGoodsSpecsForm} = this.props
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        getGoodsSpecsForm(values)
      }
    });
  }

  onUploaded = (key,pictureId,url) => {
    const { form } = this.props;
    const pictures = form.getFieldValue('pictures');
    pictures[key] = url
    form.setFieldsValue({
      pictures : pictures
    })
  }

  handleSpecificationChange = () => {

  }

  getFields = () => {
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const {goodsInfo} = this.props
      const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
          },
        };
      // 初始化中间变量 keys
      const initialGoodsSpecs = goodsInfo.specifications
      
      // if goods exists
      getFieldDecorator('goodsSpecs', { initialValue: initialGoodsSpecs ? initialGoodsSpecs : [] });
      
      getFieldDecorator('keys', { initialValue: initialGoodsSpecs ? initialGoodsSpecs.map((item,index) => {
        return index 
      }) : [] });
      let specificationPics = initialGoodsSpecs ? initialGoodsSpecs.map(item => {
        return item.picUrl
      }) : []
      getFieldDecorator("pictures",{initialValue : specificationPics})
      const keys = getFieldValue('keys');
      const goodsSpecs = getFieldValue("goodsSpecs")
      const pictures = getFieldValue("pictures")
      console.log("goodsSpecs 为 = ",goodsSpecs,"keys 为 ",keys)
      const formItems = keys.map((item, index) => (
      <Row gutter={24}>
      <Col span={6} key={item.id}>
          {getFieldDecorator(`specifications[${index}].id`, {
            initialValue : goodsSpecs ? goodsSpecs[index].id : 0,
          })}
        <Form.Item {...formItemLayout} label={'规格名称'} required={false}>
          {getFieldDecorator(`specifications[${index}].specificationId`, {
            initialValue : goodsSpecs ? goodsSpecs[index].specificationId : 0,
            validateTrigger : ['onChange', 'onBlur','onSelect'],
          })(
            <Select placeholder="请选择" >
                <Select.Option value={0}>请选择</Select.Option>
                {this.state.allSpecifications.map(element => {
                  return (
                    <Select.Option value={element.id}>{element.name}</Select.Option>
                  )
                })}
            </Select>
          )}
          
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item {...formItemLayout} label={'规格值'} required={false}>
          {getFieldDecorator(`specifications[${index}].value`, {
            initialValue : goodsSpecs ? goodsSpecs[index].value : "",
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入规格值",
            }],
          })(
            <Input placeholder="规格值" />
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item {...formItemLayout} label={'图片'} required={false}>
          {getFieldDecorator(`specifications[${index}].picUrl`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <SpecificationAvatar 
              index={index}
              url = {pictures ? pictures[index] : ""}
              onUploaded={this.onUploaded}/>
          )}
        </Form.Item>
      </Col>
      {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(index)}
            />
          ) : null}
      </Row>
      ));
      return formItems
  }

  render() {
    const formItems = this.getFields()
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
          {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
            <Icon type="plus" /> 添加规格
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
  
const WrappedDynamicFieldSet = Form.create(
  { 
    name: 'dynamic_form_item', //当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  }

)(DynamicFieldSet);

const mapStateToProps = (state) => ({
    goodsInfo: state.getIn(["goods", "goodsInfo","goods"]).toJS(),
})
const mapDispatchToProps = (dispatch) => ({
    //新增商品信息
    addGood(goods, callBack){
        dispatch(goodsActionCreators.goodsInfo)
    },
    //编辑商品信息
    updateGood(goods, callBack){
        dispatch(goodsActionCreators.updateGood(goods, callBack))
    },
    //删除图片
    deletePic(pictureId){
        dispatch(goodsActionCreators.deletePic(pictureId))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicFieldSet);

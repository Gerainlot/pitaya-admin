import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserInfoForm from "../../components/userInfoForm";
import { Button } from "antd";
import { actionCreators as userActionCreator } from "../../../../store/modules/user";


class UserInfo extends Component {
    componentDidMount(){
        const { getInfo } = this.props;
        getInfo(this.props.match.params.id)
    }
    //点击保存
    handleSave= ()=>{this.formRef.handleSubmit()}
    render() {
        const {userInfo} = this.props
        return (
            <Fragment>
                <UserInfoForm info={userInfo.toJS()}></UserInfoForm>
                {/* <Button onClick={()=>{this.handleSave()}}>{this.props.location.pathname === "/goodsmanage/addgoods"?"新增":"保存"}</Button> */}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    userInfo: state.getIn(["user","userInfoData"]),
})
const mapDispatchToProps = (dispatch) => ({
    getInfo(id){
        dispatch(userActionCreator.queryUserInfo({"id":id}))
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
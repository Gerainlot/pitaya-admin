import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserInfoForm from "../../components/userInfoForm";
import { actionCreators as userActionCreator } from "../../../../store/modules/user";


class UserInfo extends Component {
    componentDidMount(){
        const { getInfo,getAddresses } = this.props;
        getInfo(this.props.match.params.id)
        getAddresses(this.props.match.params.id)
    }
    
    render() {
        const {userInfo,userAddresses} = this.props
        return (
            <Fragment>
                <UserInfoForm info={userInfo.toJS()} addresses={userAddresses && userAddresses.toJS()}></UserInfoForm>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    userInfo: state.getIn(["user","userInfoData"]),
    userAddresses : state.getIn(["user","addressesData"])
})
const mapDispatchToProps = (dispatch) => ({
    getInfo(id){
        dispatch(userActionCreator.queryUserInfo({"id":id}))
    },
    getAddresses(userId){
        dispatch(userActionCreator.queryUserAddresses({"userId":userId}))
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
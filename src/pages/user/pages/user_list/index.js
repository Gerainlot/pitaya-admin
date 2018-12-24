import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import UserTable from "../../components/userTable";
import { userTableDataPageParams } from "../../../../utils/pageParams";
import { actionCreators as userActionCreator } from "../../../../store/modules/user";
import { Button } from 'antd';


class UserList extends Component {
    componentDidMount(){
        const { getUserTableData } = this.props;
        getUserTableData(userTableDataPageParams())
    }
    render() {
        const { userTableData, userTablePagination } = this.props;
        const { getUserTableData } = this.props;
        return (
            <Fragment>
                <Link to="/usermanage/add">
                    <Button type="primary">新增用户</Button>
                </Link>
                <UserTable
                    tableData={userTableData.toJS()}
                    pagination={userTablePagination}
                    onChangeListData={getUserTableData}
                ></UserTable>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    userTableData: state.getIn(["user", "userTableData"]),
    userTablePagination: state.getIn(["user", "userTablePagination"]),
})
const mapDispatchToProps = (dispatch) => ({
    //获取用户列表数据
    getUserTableData(params){
        dispatch(userActionCreator.queryUserList(params))
    },
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
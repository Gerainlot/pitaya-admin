import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from "antd";
import Left from '../components/left/left';
import Right from '../components/right/right';

class Layouts extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Left />
                <Right />
            </Layout>
        )
    }
}

export default withRouter(Layouts)


// const mapStateToProps = (state) => ({
//     user: state.getIn(["user, user"])
// })
// const mapDispatchToProps = (dispatch) => ({
//     //获取登录用户信息
//     getUserProfile(){
//         dispatch(userActionCreators.getUserProfile())
//     }
// })
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layouts));
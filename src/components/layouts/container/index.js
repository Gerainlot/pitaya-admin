import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from "antd";
import { connect } from "react-redux";
// import { actionCreators as userActionCreator } from "../../../store/modules/user"
import Left from '../components/left/left';
import Right from '../components/right/right';

class Layouts extends Component {

    componentDidMount() {
       
    }

    componentWillReceiveProps() {
       
    }

    render() {
        return  (
            <Layout style={{ minHeight: '100vh' }}>
                <Left />
                <Right />
            </Layout>
        ) 
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.getIn(["user","currentUser"]),
    
})
const mapDispatchToProps = (dispatch) => ({
   
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Layouts))


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
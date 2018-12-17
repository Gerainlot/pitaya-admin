import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Icon } from 'antd';
import style from "./index.module.scss";
import user from "../../assets/user.png";


class LayoutHeader extends Component {
    render (){
        const { currentUser } = this.props;
        return ( 
            <Layout.Header style={{ background: '#fff', padding: 0, boxShadow: "1px 0px 4px rgba(0, 21, 41, .25)" }} >
                {/* <Icon
                    className={style.trigger}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                /> */}
                <div className={style.rightContent}>
                    <Icon className={style.rightIcon} type="search" key="search" style={{fontSize: "16px"}}/>
                    <Icon className={style.rightIcon} type="bell" key="bell" style={{fontSize: "16px"}}/>
                    <span className={style.user}>
                        <span className={style.userLogo}>
                            <img src={user} alt="user"/>
                        </span>
                        <span>{currentUser?currentUser.get("name"):"未登录"}</span>
                    </span>
                </div>
            </Layout.Header>
        )
    }
}

export default withRouter(LayoutHeader);
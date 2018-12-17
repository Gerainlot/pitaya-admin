import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"; 
import { Layout, Menu, Icon } from "antd";
import logo from "../../assets/meican.png";
import MenuData from "../../assets/slideMenu";
import leftStyles from "./index.module.scss";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;



class Left extends Component {
    state = {
        collapsed: false,
        keys: []
    }

    //更新选中的菜单模块
    onSelect = ({ key }) =>{
        this.props.history.push(key)
    }
    //设置选中的菜单模块state
    selectKey = () =>{
        let keys = []
        keys.push(this.props.history.location.pathname)
        this.setState({keys:keys})
    }
    componentWillMount() {
        this.selectKey()
    }
    componentWillReceiveProps (nextProps){
        //判断URL进入的路由 选中菜单
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.selectKey()
        }
    }

    //更改侧边栏state是否显示
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    //设置侧边栏state是否显示
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Sider
                width={256}
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className={leftStyles.logo}>
                    <Link to="/home">
                        <img src={logo} alt="logo" />
                        <h1>Pitaya管理后台</h1>
                    </Link>
                </div>
                <Menu mode="inline" theme="dark" onSelect={this.onSelect} selectedKeys={this.state.keys}>
                    {MenuData.map((item, i)=>
                        item.list && item.list.length > 0 ?
                            <SubMenu 
                                key={item.key} 
                                title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                                {item.list.map((listItem, ii)=>
                                    <Menu.Item key={item.key+listItem.key}>
                                        <span>{listItem.title}</span>
                                    </Menu.Item>
                                )}
                            </SubMenu>
                            :
                            <Menu.Item key={item.key}>
                                <span><Icon type={item.icon} /><span>{item.title}</span></span>
                            </Menu.Item>
                    )}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Left);
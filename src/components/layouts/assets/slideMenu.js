// slide menu 模块路由配置
export default
[{
    key   : '/home',
    title : '首页',
    icon  : 'home'
},{
    key   : '/goodsmanage',
    title : '商品管理',
    icon  : 'user',
    list  : [{
        key   : '/goodslist',
        title : '商品列表'
    }]
}, {
    key   : '/suppliermanage',
    title : '供应商管理',
    icon  : 'team',
}, {
    key   : '/ordermanage',
    title : '订单管理',
    icon  : 'team',
}, {
    key   : '/usermanage',
    title : '用户管理',
    icon  : 'team',
}, {
    key   : '/staffmanage',
    title : '员工管理',
    icon  : 'team',
}, {
    key   : '/developconfig',
    title : '基础配置',
    icon  : 'team',
}]

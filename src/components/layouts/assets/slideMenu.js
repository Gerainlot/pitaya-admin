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
    key   : '/supplier/list',
    title : '供应商管理',
    icon  : 'team',
}, {
    key   : '/salemanage',
    title : '订单管理',
    icon  : 'team',
    list  : [{
        key   : '/list',
        title : '订单列表'
    }]
}, {
    key   : '/usermanage',
    title : '用户管理',
    icon  : 'team',
    list  : [{
        key   : '/list',
        title : '用户列表'
    }]
}, {
    key   : '/staffmanage',
    title : '员工管理',
    icon  : 'team',
}, {
    key   : '/developconfig',
    title : '基础配置',
    icon  : 'team',
},{
    key   : '/datamanage',
    title : '数据管理',
    icon  : 'team',
    list  : [{
        key   : '/specification',
        title : '规格管理',
        icon  : 'team',
    },{
        key   : '/attribute',
        title : '属性管理',
        icon  : 'team',
    },
    {
        key   : '/category',
        title : '商品分类',
        icon  : 'team',
    }]
}]

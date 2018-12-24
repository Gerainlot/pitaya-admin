import * as constants from './constants';
import Http from "../../../http/http";



//登录用户
export const loginUser = (params) => {
    let { user, password } = params;
    return (dispatch) => {
		Http.postJson('/manage/login', {
            user,
            password
        }).then((res) => {
			const result = res.data.token;
			result&&dispatch(updateCurrentUser(result))
		})
	}
}
//更新当前用户
export const updateCurrentUser = (value) => ({
	type: constants.updateCurrentUser,
	value
})
// //获取登录用户信息
// export const getUserProfile = () => {
//     return (dispatch) => {
// 		Http.get('self/profile', {}).then((res) => {
// 			const result = res.data.self;
// 			result&&dispatch(updateCurrentUser(result))
// 		})
// 	}
// }

//获取用户列表数据
export const queryUserList = (params) => {
    
    return (dispatch) => {
		Http.postJson('/manage/user/list', params).then((res) => {
            const result = res.data.items;
			result && dispatch(udpateUserStoreTableData(result))
		})
	}
}

export const queryUserInfo = (params) => {
    
    return (dispatch) => {
		Http.get('/manage/user/info', params).then((res) => {
            const result = res.data.user;
			result && dispatch(updateUserInfoData(result))
		})
	}
}

//更新redux中用户列表数据
export const udpateUserStoreTableData = (value) => ({
	type: constants.updateStoreUserTableData,
	value
})

//更新redux中用户详情数据
export const updateUserInfoData = (value) => ({
	type: constants.updateStoreUserInfoData,
	value
})
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

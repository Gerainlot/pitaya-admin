import LocalStorage from "./local_storage"; 

const accessTokenKey = "access_token"
const refreshTokenKey = "refresh_token"
const currentUserKey = "current_user"

class TokenManager {
    constructor() {
        this.storage = new LocalStorage()
    }

    getTokens() {
        const accessToken = this.storage.getItem(accessTokenKey)
        const refreshToken = this.storage.getItem(refreshTokenKey)
        return { accessToken, refreshToken }
    }

    setTokens(tokens) {
        this.storage.setItem(accessTokenKey, tokens.accessToken)
        this.storage.setItem(refreshTokenKey, tokens.refreshToken)
    }

    clearAccessToken() {
        this.storage.removeItem(accessTokenKey)
    }

    setAccessToken(token) {
        this.storage.setItem(accessTokenKey, token)
    }

    setRefreshToken(token) {
        this.storage.setItem(refreshTokenKey, token)
    }

    setUserInfo(token) {
        this.storage.setItem(currentUserKey,{name:token.name,phoneNo:token.phoneNo,email:token.email})
    }
}

export default new TokenManager()

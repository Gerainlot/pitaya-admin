import LocalStorage from "./localStorage"; 

const accessTokenKey = "m-at"
const refreshTokenKey = "m-rt"
const expireTimeKey = "m-ex" // 另一个共享 token 的项目的 key

export default class TokenManager {
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
        const now = new Date().getTime().toString()
        this.storage.setItem(expireTimeKey, now)
    }

    setAccessToken(token) {
        this.storage.setItem(accessTokenKey, token)
    }

    setRefreshToken(token) {
        this.storage.setItem(refreshTokenKey, token)
    }
}

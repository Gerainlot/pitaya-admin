export default class LocalStorage{
    constructor(){
        this.storage = window.localStorage;
    }
    getItem(key){
        const raw = this.storage.getItem(key)
        if (raw === null) {
            return null
        }
        try {
            return JSON.parse(raw)
        } catch (e) {

        }
        return raw
    }
    setItem(key, val) {
        this.storage.setItem(key, JSON.stringify(val))
    }

    removeItem(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }

    key(key) {
        this.storage.key(key)
    }
}
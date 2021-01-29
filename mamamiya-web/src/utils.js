class StringUtils {
    constructor() {}
    isBlank(str) {
        if (str == null || str == '') {
            return true
        } else {
            return false
        }
    }
}
class LoginIntecepter {
    str;
    constructor() {
        this.str = new StringUtils()
    }
    isLogin(obj) {
        let username = localStorage.getItem("username")
        let token = localStorage.getItem("token")
        console.log(obj);
        if (!this.str.isBlank(username) && !this.str.isBlank(token)) {

            obj.okHandle()
        } else {
            obj.failHandle()
        }
    }
}
export { StringUtils, LoginIntecepter }
import { extendObservable } from 'mobx';

class UserStrore {
    constructor(){
        extendObservable(this, {
            loading:true,
            isLoggedIn: false,
            username:''
        })
    }
}

export default new UserStrore();
import {RECEIVE_USERINFO} from "@/store/mutation-types";

export default {
    [RECEIVE_USERINFO](state,userInfo) {
        state.userInfo = userInfo
    }
}
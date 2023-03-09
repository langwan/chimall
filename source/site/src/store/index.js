import { atom, DefaultValue } from 'recoil'

const initUserState = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
    uid: null,
    nickName: null,
    token: null,
    isLogin: false
}

export const userState = atom({
    key: 'userState',
    default: initUserState(),
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                if (value instanceof DefaultValue) {
                    localStorage.removeItem('user')
                } else {
                    localStorage.setItem('user', JSON.stringify(value))
                }
            })
        }
    ]
})
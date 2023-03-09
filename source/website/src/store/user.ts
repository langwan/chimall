import { atom, DefaultValue } from 'recoil'
import { Storage } from '@/utils/storage'


export const userStorage = new Storage<UserStorageMapping>({
  prefix: 'user'
})

const initUserState = (): UserInfoState => {
  return userStorage.get("user") || ({
    uid: '',
    nickname: '',
    isLogin: false
  })

}
export const userState = atom({
  key: 'userState',
  default: initUserState(),
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        if (value instanceof DefaultValue) {
          userStorage.remove('user')
          console.log('remove')
        } else {
          console.log('set')
          userStorage.set('user', value)
        }
      })
    },
  ]
})
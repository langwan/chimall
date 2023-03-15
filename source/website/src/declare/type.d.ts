interface Login {
  phone: string;
  password: string;
}

interface Register {
  phone: string;
  password: string;
  nickname: string;
}

interface UserReqError {
  Phone?: string;
  Password?: string;
  Nickname?: string;
}

interface UserInfoState {
  uid: string,
  nickname: string,
  isLogin: boolean
}

interface UserStorageMapping {
  user: UserInfoState
  token: string
}

interface GoodRes {
  id: string
  name: string
  price: string
  originalPrice: string
  img: string
  dest: string
}

interface CartRes {
  goodsId: string
  numbers: number
}

interface HomePageRes {
  blocks: Record<string, GoodRes[]>
}
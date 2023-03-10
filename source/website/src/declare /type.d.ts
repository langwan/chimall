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

interface HomeGoodRes {
  id: string
  name: string
  price: string
  originalPrice: string
  img: string
  dest: string
}

interface HomePageRes {
  blocks: Record<string, HomeGoodRes[]>
}
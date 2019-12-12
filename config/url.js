import env from './env'

const DEV_URL = 'http://192.168.2.246:3000/mock' // 设备 dev'
const PRO_URL = ''

export default env === 'development' ? DEV_URL : PRO_URL

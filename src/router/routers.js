/**
 * @Author: dragon
 * @Date: 2019-06-20 21:22:40
 * @Desc: 各业务线路由集合
 */
import Login from './login'
import Home from './home'
import Common from './common'
import Fin from './fin'
import Sale from './sale'
import Dms from './dms'
import Cis from './cis'
import Iot from './iot'
import Opr from './opr'
import Ser from './ser'
import Tms from './tms'
import Components from './components' // 仅限开发环境
/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 * 注:children中的name与path必须保持一致 ace配置编码与这里children中的name一一对应
 */

export default [
  Login,
  ...Home,
  ...Common,
  ...Fin,
  ...Sale,
  ...Dms,
  ...Cis,
  ...Iot,
  ...Opr,
  ...Ser,
  ...Tms,
  ...Components
]

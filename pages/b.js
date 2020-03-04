
import {withRouter} from 'next/router'

const B = ({router})=> <span>这是B页面, 参数是{router.query.id}</span>
export default withRouter(B)
import Router from 'next/router'
import {withRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
const A= ({router})=>{
    const id = router.asPath.split(router.route)[1].substr(1)
    const goB = ({router})=> {
        
        Router.push(`/b?id=${id}`)
    }
    return <button onClick={goB}>跳转到b页面</button>
}

export default withRouter(A)
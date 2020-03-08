
import {withRouter} from 'next/router'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
// import moment from 'moment'
const Comp = dynamic(import('../components/comp'))
const Title = styled.h1 `
color: yellow;
font-size:40px;`
const B = ({router, name,time})=> (
    <> 
        <Title>This is Title {time}</Title>
        <span>这是B页面, 参数是{router.query.id} {name}</span>
        <style jsx>{`
           
            .link {
                color: red;
            }`}</style>
        <style jsx global>{`
            span {
                color: red;
            }`
        }</style>
    </>
)

// getInitialProps
// B.getInitialProps =()=> {
//     //这个方法所return 的内容都会作为B组件的props被获取
//     return{
//         name: 'charlie'
//     }
// }
//getInitialProps async
B.getInitialProps =async(ctx)=> {
    const moment = await import('moment')
    const promise = new Promise((resolve)=> {
        setTimeout(()=> {
            resolve({
                name: 'charlie',
                time: moment.default(Date.now()- 60*1000).fromNow()
            })
        },2000)
       
    })
    return await promise
}
export default withRouter(B)
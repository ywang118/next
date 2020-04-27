import Link from 'next/link'
import {useState,useCallback} from 'react'
import {Button, Layout,Icon,Input,Avatar} from 'antd'
import {GithubOutlined } from '@ant-design/icons'
const {Header, Content, Footer} = Layout
import Container from './Container'
const githubIconStyle = {
    color:'white',
    fontSize: 40,
    display: 'block',
    paddingTop: 10,
    marginRight: 20,
}
const footerStyle = {
    textAlign: 'center'
}

const Comp = ({color, children,style})=> <div style={{color, ...style }}>{children}</div>
export default ({children})=> {
    
    const [search,setSearch] = useState('')
    const handleSearchChange = (event)=> {
        setSearch(event.target.value)
    }
    const handelOnSearch = useCallback(()=> {},[])

    return (
        <Layout>
            <Header>
                <Container render = {<div className='header-inner'/>}>

                {/* header left: logo + search bar */}
                <div className ="header-left">
                    <div className="logo">
                        <GithubOutlined style={githubIconStyle}/>
                    </div> 
                    <div>
                        <Input.Search placeholder="search github" value={search} onChange={handleSearchChange} onSearch={handelOnSearch}/>
                    </div>  
                </div>
                
                {/* header right: user  */}
                <div className="header-right">
                    <div className="user">
                        <Avatar size={40} icon="user" />
                    </div>
                </div>
                
                </Container>
            </Header>
            <Content>
                <Container>
                    {children}
                </Container>    
            </Content>
            <Footer style={footerStyle}>
                Develope by lila @
                <a href="mailto:ywang0506@gmail.com">ywang0506@gmail.com</a>
            </Footer>  
            <style jsx>{`
                .header-inner {
                    display:flex;
                    justify-content: space-between;
                }   
                .header-left {
                    display: flex;
                    justify-content: flex-start;
                }
            `}
            </style>
            {/* add css on the whole page */}
            <style jsx global>{`
                #__next {
                    height: 100%
                }
                .ant-layout {
                    height: 100%
                }
                .ant-layout-header {
                    padding-left: 0;
                    padding-right: 0;
                }`}</style>
        </Layout>
    )
}
    

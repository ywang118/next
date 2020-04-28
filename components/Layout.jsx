import Link from 'next/link'
import getConfig from 'next/config'

import {useState,useCallback} from 'react'
import {Button, Layout,Icon,Input,Avatar,Tooltip,Dropdown, Menu} from 'antd'
import {GithubOutlined,SmileOutlined } from '@ant-design/icons'
const {Header, Content, Footer} = Layout
import Container from './Container'
const {publicRuntimeConfig} = getConfig()
import {connect} from 'react-redux'
import {logout} from '../store/store'
import {withRouter} from 'next/router'
import axios from 'axios'
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
const IndexLayout =({children,user, logout, router})=>{
    
    const [search,setSearch] = useState('')
    const handleSearchChange = (event)=> {
        setSearch(event.target.value)
    }
    const handelOnSearch = useCallback(()=> {},[])
    
    const handleLogout = useCallback(()=> {
        logout()
    },[logout])

    const handelGotoOAuth =(e)=>{
        e.preventDefault()
        axios.get(`/prepare-auth?url=${router.asPath}`)
          .then(resp => {
              if(resp.status === 200){
                  location.href = publicRuntimeConfig.OAUTH_URL
              } else {
                  console.log( `prepare-auth failed`, resp)
              }
          })
          .catch (err=> {
              console.log('prepare auth failed',err)
          })
    }
    const userDropDown = (
        <Menu>
            <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    log out
                </a>
            </Menu.Item>
        </Menu>
    )
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
                        {
                            user && user.id ? (
                                <Dropdown overlay={userDropDown}>
                                    <a href='/'>
                                        <Avatar size={40} src={user.avatar_url}/>
                                    </a>
                                </Dropdown>
                            ):(
                                <Tooltip title='click to log in'>
                                    <a href={publicRuntimeConfig.OAUTH_URL} onClick={handelGotoOAuth}>
                                        <SmileOutlined style={{fontSize: 40, paddingTop: 10,}} />
                                    </a>
                                </Tooltip>
                            )
                        }
                        
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
    
export default connect(function mapState(state) {
    return {
        user: state.user
    }
},function mapReducer(dispatch){
    return {
        logout: ()=> dispatch(logout())
    }
})(withRouter(IndexLayout))
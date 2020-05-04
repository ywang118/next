import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import React from 'react'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import initializeStore from '../store/store'
import withRedux from '../lib/with-redux'
import PageLoading from '../components/PageLoading'
import Router from 'next/router'
import Link from 'next/link'
class MyApp extends App {
    // App组件的getInitialProps比较特殊
    // 能拿到一些额外的参数
    // Component: 被包裹的组件
    state = {
      context: 'value',
      loading: false
    }
    startLoading = ()=> {
      this.setState({
        loading:true
      })
    }
    stopLoading =()=>{
      this.setState({
        loading: false
      })
    }
    componentDidMount(){
      Router.events.on('routeChangeStart',this.startLoading)
      Router.events.on('routeChangeComplete',this.stopLoading)
      Router.events.on('routeChangeError',this.stopLoading)
    }
    componentWillUnmount(){
      Router.events.off('routeChangeStart',this.startLoading)
      Router.events.off('routeChangeComplete',this.stopLoading)
      Router.events.off('routeChangeError',this.stopLoading)

    }
    static async getInitialProps(ctx) {
      const { Component } = ctx
      let pageProps = {}
  
      // 拿到Component上定义的getInitialProps
      if (Component.getInitialProps) {
        // 执行拿到返回结果`
        pageProps = await Component.getInitialProps(ctx)
      }
  
      // 返回给组件
      return {
        pageProps
      }
    }
  
    render() {
      const { Component, pageProps, reduxStore } = this.props
      return (
        <Container>
          <Provider store={reduxStore}>
            {this.state.loading ? <PageLoading /> :null }
            <Layout>
                <Link href='/'>
                  <a>Index</a>
                </Link>
                <Link href='/detail'>
                  <a>Detail</a>
                </Link>
                {/* 把pageProps解构后传递给组件 */}
                <Component {...pageProps} />
              
            </Layout>
          </Provider>
        </Container>
      )
    }
  }
  
  export default withRedux(MyApp)
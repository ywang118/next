// 处理github返回的auth code
const axios = require('axios')
const config = require('../config')

const { client_id, client_secret, request_token_url } = config.github

module.exports = (server) => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const { code } = ctx.query
      if (code) {
        // 获取Oauth鉴权信息
        const result = await axios({
          method: 'POST',
          url: request_token_url,
          data: {
            client_id,
            client_secret,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        })
        console.log(result.status, result.data)
       
        // github 可能会在status是200的情况下返回error信息
        if (result.status === 200 && (result.data && !result.data.error)) {
          ctx.session.githubAuth = result.data
        
          const { access_token, token_type } = result.data
          // 获取用户信息
          const { data: userInfo } = await axios({
            method: 'GET',
            url: 'https://api.github.com/user',
            headers: {
              'Authorization': `${token_type} ${access_token}`,
            },
          })
          console.log('userinfo', userInfo)
          ctx.session.userInfo = userInfo
          // 重定向到首页
          ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) ||'/')
          ctx.session.urlBeforeOAuth = ''
        } else {
          ctx.body = `request token failed ${result.data && result.data.error}`
        }
      } else {
        ctx.body = 'code not exist'
      }
    } else {
      await next()
    }
  })
  server.use(async(ctx,next)=>{
    const path = ctx.path
    const method = ctx.method
    if (path === '/logout' && method ==='POST'){
      ctx.session = null 
      ctx.body = `logout success`
    } else {
      await next()
    }
  })
  server.use(async(ctx,next)=> {
    const path = ctx.path
    const method = ctx.method
    if (path === '/prepare-auth' && method === 'GET'){
      const {url }= ctx.query
      ctx.session.urlBeforeOAuth = url
      ctx.body = 'ready'
    } else {
      await next()
    }
  })
}
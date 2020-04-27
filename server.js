const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const RedisSessionStore = require('./server/session-store')
const dev =process.env.NODE_ENV !=='production'
const app = next({dev})
const Redis = require('ioredis')
const handle = app.getRequestHandler()
const redis = new Redis()
const auth = require('./server/auth')
// 创建redis client 
const session = require('koa-session')
app.prepare().then(()=> {
    const server = new Koa()
    const router = new Router()
    
    server.keys = ['Lila developer Github App']
    const SESSION_CONFIG = {
        key: 'jid',
        store: new RedisSessionStore(redis),
        
    }
    server.use(session(SESSION_CONFIG,server))
    //配置处理github oauth 登录
    auth(server)
    // server.use(async(ctx,next)=> {
    //     if (ctx.cookies.get('jid')){
    //         ctx.session = {}
    //     }
    //     await next()
    // })
 


    router.get('/a/:id',async (ctx)=>{
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: {id}
        })
        ctx.respond = false
    })
    router.get('/a/:id',async (ctx)=>{
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: {id}
        })
        ctx.respond = false
    })
    router.get('/api/user/info',async (ctx)=>{
        const user = ctx.session.userInfo
        if (!user){
            ctx.status = 401
            ctx.body = 'Need login'
        } else{
            ctx.body = user
            ctx.set('Content-Type','application/json')
        }
        ctx.body = ctx.session.userInfo
    })
   
    server.use(router.routes())
    server.use(async(ctx,next)=> {
        
        ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.listen(3000, () => {
        // console.log('koa server listening on 3000')
    })
})




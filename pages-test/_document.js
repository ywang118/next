import Document, {Html,Head,Main,NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        // 劫持原本的renderPage函数并重写
        const originalRenderPage = ctx.renderPage
    
        try {
          ctx.renderPage = () =>
            originalRenderPage({
              // 根App组件
              enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
            })
          // 如果重写了getInitialProps 就要把这段逻辑重新实现
          const props = await Document.getInitialProps(ctx)
          return {
            ...props,
            styles: (
              <>
                {props.styles}
                {sheet.getStyleElement()}
              </>
            )
          }
        } finally {
          sheet.seal()
        }
      }
    render (){
        return(
        <Html>
            <Head>
            </Head>
            <body className = "test">
                <Main />
                <NextScript />
            </body>
        </Html>)
    }
}
export default MyDocument
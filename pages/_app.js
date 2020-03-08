import App, {Container} from 'next/app'
import Layout from '../components/Layout'
class Myapp extends App {
    static async getInitialProps({Component,ctx}){
        console.log('app init')
        let pageProps
        if (Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx)
            console.log('pageProps,',pageProps)
        }
        return {
            pageProps
        }
    }
    render (){
        const { Component,pageProps} = this.props
        
        return (
            <Container>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </Container>
        )
    }
}

export default Myapp
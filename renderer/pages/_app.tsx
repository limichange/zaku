import App from 'next/app'
import 'antd/dist/antd.css'

export default class IMApp extends App {
  componentDidCatch(error: any, errorInfo: any) {
    // This is needed to render errors correctly in development / production
    // todo
    // super.componentDidCatch(error, errorInfo)
  }

  componentDidMount() {
    console.log('app componentDidMount')
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

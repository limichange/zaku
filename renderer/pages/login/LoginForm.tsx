import electron from 'electron'
import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import ipc from '../../utils/ipc'

class LoginForm extends React.Component<any, any> {

	componentDidMount() {
		console.log(electron)
	}

	componentDidUpdate() {
		ipc.renderer.callMain('about-ready')
	}

	handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		this.props.form.validateFields(async (err: any, values: any) => {
			if (!err) {
				console.log('Received values of form: ', values)

				await ipc.renderer.callMain('createMainWin')
				electron.remote.getCurrentWindow().close()
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form onSubmit={this.handleSubmit} className='login-form'>
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名' }]
					})(
						<Input
							prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder='用户名'
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码' }]
					})(
						<Input
							prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
							type='password'
							placeholder='密码'
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true
					})(<Checkbox>自动登录</Checkbox>)}
					<a className='login-form-forgot' href=''>
						忘记密码
					</a>
					<br />
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'>
						登录
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default Form.create({ name: 'normal_login' })(LoginForm)

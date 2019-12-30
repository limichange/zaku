import LoginForm from './LoginForm'
import React from 'react'
import './index.less'

export default class LoginPage extends React.Component {
	render() {
		return (
			<div className='form'>
						<img src='/static/Icon.png' alt='logo' className="logo" />
				<LoginForm />
			</div>
		)
	}
}

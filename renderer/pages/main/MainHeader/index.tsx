import React from 'react'
import SearchInput from './SearchInput'
import UserAvatar from './UserAvatar'
import './index.less'

export default class MainHeader extends React.Component {
	render() {
		return (
			<div className='MainHeader'>
        <SearchInput />
        <UserAvatar />
			</div>
		)
	}
}

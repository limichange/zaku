import { Input, AutoComplete, Icon } from 'antd'
import React from 'react'
import './index.less'

export default class SearchInput extends React.Component {
	render() {
		return (
			<div className='SearchInput'>
				<AutoComplete
					className='certain-category-search'
					dropdownClassName='certain-category-search-dropdown'
					placeholder='搜索'
					style={{ width: '100%' }}>
					<Input
						suffix={<Icon type='search' className='certain-category-icon' />}
					/>
				</AutoComplete>
			</div>
		)
	}
}

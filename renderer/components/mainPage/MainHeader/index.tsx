import React from 'react'
import SearchInput from './SearchInput'
import UserAvatar from './UserAvatar'
import $style from './index.less'

export default class MainHeader extends React.Component {
  render() {
    return (
      <div className={$style.MainHeader}>
        <SearchInput />
        <UserAvatar />
      </div>
    )
  }
}

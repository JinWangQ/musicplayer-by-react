import React from 'react'
import './header.less'

class Header extends React.Component {
	render() {
		return (
			<div className="components-header row">
				<img src="/static/images/logo.png" width="40" alt="logo.png" className="-col-auto"/>
				<h1 className="caption">React Music Player</h1>
			</div>
		);
	}
}

export default Header;
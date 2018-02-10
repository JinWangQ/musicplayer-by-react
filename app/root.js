import React from 'react'
import Header from './components/header'
import Player from './page/player'
import {
	MUSIC_LIST
} from './config/musiclist'


class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMusicItem: MUSIC_LIST[0]
		};
	}
	componentDidMount() {
		$("#player").jPlayer({
			ready: function() {
				$(this).jPlayer("setMedia", {
					mp3: "http://jplayer.org/audio/mp3/Miaow-07-Bubble.mp3"
				}).jPlayer('play');
			},
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div>
				<Header />
				<Player currentMusicItem={this.state.currentMusicItem}></Player> 
			</div>

		);
	}
}

export default Root;
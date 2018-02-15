import React from 'react'
import Header from './components/header'
import Player from './page/player'
import Musiclist from './page/musiclist'
import {
	Route,
	Link,
	HashRouter,
	Switch
} from 'react-router-dom'
import {
	MUSIC_LIST
} from './config/musiclist'


class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			musicList: MUSIC_LIST,
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
			<HashRouter>
				<section>
					<Header/>
					<Switch>
	    				<Route exact path="/" render={() => <Player currentMusicItem={this.state.currentMusicItem}></Player> } />
						<Route path="/list" render={() => <Musiclist musicList={this.state.musicList}></Musiclist> } />					
					</Switch>
				</section>
			</HashRouter>
		);

	}

}

export default Root;
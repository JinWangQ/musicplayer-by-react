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
import Pubsub from 'pubsub-js'



class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			musicList: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]

		};
	}

	playMusic(musicItem) {
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: musicItem
		});
	}

	playNext(type = 'next') {
		let index = this.findMusicIndex();
		let newIndex = null;
		let musicListLength = this.state.musicList.length;
		if (type === 'next') {
			newIndex = (index + 1) % musicListLength;
		} else {
			newIndex = (index - 1 + musicListLength) % musicListLength;
		}

		this.playMusic(this.state.musicList[newIndex]);
	}
	findMusicIndex() {
		return this.state.musicList.indexOf(this.state.currentMusicItem);
	}

	componentDidMount() {

		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});

		this.playMusic(this.state.currentMusicItem);
		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		});
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item => {
					return item != musicItem;
				})
			});
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
			this.playNext();
		});
	}

	componentWillUnmount() {
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_MUSIC');
		$("player").unbind($.jPlayer.event.ended);
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');

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
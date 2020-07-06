import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import socketIOClient from 'socket.io-client';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/scss/bootstrap.scss';
import './index.scss';

// const ENDPOINT = process.env.REACT_APP_SERVER_URL;
// const ENDPOINT = "http://superfight-backend-superfight-backend.apps.us-west-1.starter.openshift-online.com/";
const ENDPOINT = "http://superfightbackend.us-east-2.elasticbeanstalk.com/";

// class Card {
// 	constructor(text, isChar, actions) {
// 		this.text = text;
// 		this.isChar = isChar;
// 		this.actions = actions;
// 	}
// }

class CardReact extends React.Component {
	constructor(props) {
		super(props);
		this.card = props.card;
		this.isChoosing = props.isChoosing;
		this.isFighter = props.isFighter;
		this.state = {
			isSelected: props.isSelected,
			isActionDone: false,
			isFighting: props.isFighting
		};
	}

	componentDidUpdate(prevProps) {
		const {isSelected, isFighting} = this.props;
		if (prevProps.isSelected !== isSelected) {
			this.setState({isSelected: isSelected});
		}
		if (prevProps.isFighting !== isFighting) {
			this.setState({isFighting: isFighting});
		}
	}

	handleClick(actions) {
		this.props.onClick(actions);
		this.setState({isActionDone: true});
	}

	render() {
		//this.state.isSelected = this.props.isSelected;
		const cardType = this.card.isChar ? ' char' : ' attr';
		const selected = (this.state.isSelected && this.isChoosing) ? ' selected' : '';
		const actionDone = (this.card.isActionCard && !this.state.isActionDone && !this.isChoosing && this.isFighter && this.state.isFighting) ? ' action-card' : '';
		const classes = 'sf-card' + cardType + selected + actionDone;
		const actions = this.card.actions ? this.card.actions : null;

		return (
			<li className={classes}>
				<button onClick={() => this.handleClick(actions)} disabled={!(this.isChoosing || (this.card.isActionCard && !this.state.isActionDone && this.isFighter && this.state.isFighting))}>{this.card.text}</button>
			</li>
		);
	}
}

class CardLineReact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: props.cards,
			isChoosing: props.isChoosing,
			selectedCard: null,
			isFighter: props.isFighter,
			isFighting: props.isFighting,
			isChosen: false,
			hasVoted: false,
			isWinner: null,
			centerCards: props.centerCards
		};
	}

	componentDidUpdate(prevProps) {
		const {cards, isFighter, isFighting, isChosen, hasVoted, isWinner} = this.props;
		if (prevProps.cards !== cards) {
			this.setState({cards: cards});
		}
		if (prevProps.isFighter !== isFighter) {
			this.setState({isFighter: isFighter});
		}
		if (prevProps.isFighting !== isFighting) {
			this.setState({isFighting: isFighting});
		}
		if (prevProps.isChosen !== isChosen) {
			this.setState({isChosen: isChosen});
		}
		if (prevProps.hasVoted !== hasVoted) {
			this.setState({hasVoted: hasVoted});
		}
		if (prevProps.isWinner !== isWinner) {
			this.setState({isWinner: isWinner});
		}
	}

	handleClick(cardIndex, actions) {
		this.setState({ selectedCard: cardIndex });
		this.props.selectCard(cardIndex);
		if(actions != null && this.props.runActions) this.props.runActions(actions);
	}

	render() {
		const cards = this.state.cards;
		const isChoosing = this.state.isChoosing;
		const isFighter = this.state.isFighter;
		const isFighting = this.state.isFighting;
		const isChosen = this.state.isChosen;
		const hasVoted = this.state.hasVoted;
		const isWinner = this.state.isWinner;
		const centerCards = this.state.centerCards;


		const cardList = cards.map((card, cardIndex) => {
			const isSelected = this.state.selectedCard === cardIndex ? true : false;
			return (
				<CardReact
					key={card.key}
					card={card}
					isFighter={isFighter}
					isChoosing={isChoosing}
					isFighting={isFighting}
					isSelected={isSelected}
					onClick={(actions) => this.handleClick(cardIndex, actions)}
				/>
			);
		});

		//console.log("cards:");
		//console.log(cards);
		const listMinWidth = cardList.length * 155;
		const listClasses = 'card-line' + (isChoosing || centerCards ? ' justify-content-center' : '');
		const selectorClasses = 'card-line-selection' + ((isFighting || hasVoted) ? '' : ' is-voting') + (isChosen ? ' is-chosen' : '') + (isWinner != null ? (isWinner ? ' is-winner' : ' is-loser') : '');

		return (
			<div className={selectorClasses}>
				<div className="card-line-select-button">
					<button onClick={() => this.props.handleVote()}>Vote</button>
				</div>
				<div className="cards-wrapper">
					<ul className={listClasses} style={{minWidth: listMinWidth}}>
						{cardList}
					</ul>
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player: props.player,
			game: props.game,
			isChoosing: true,
			selectedCharCard: null,
			selectedAttrCard: null,
			chooseTimer: props.chooseTimer,
			fightTimer: props.fightTimer,
			isFighting: true,
			votedFighter: null,
			hasVoted: false,
			winner: null,
			gameCount: props.gameCount
		};
	}

	componentDidUpdate(prevProps) {
		const {game, player, chooseTimer, fightTimer, isFighting, winner, gameCount} = this.props;
		if (prevProps.game !== game) {
			this.setState({game: game});
			let playerData;
			game.players.some((playerIter, i) => {
				if(playerIter.socketID == player.socketID) {
					playerData = playerIter;
					return true;
				}
				return false;
			});
			if (playerData) this.setState({hasVoted: playerData.hasVoted});
			if(playerData ? !playerData.hasVoted : false) this.setState({votedFighter: null});
			game.players.some((player) => {
				if(player.socketID == this.state.player.socketID) {
					this.setState({isChoosing: player.isChoosing});
					return true;
				}
				return false;
			});
		}
		if (prevProps.player !== player) {
			this.setState({player: player});
			this.setState({isChoosing: player.isChoosing});
		}
		if (prevProps.chooseTimer !== chooseTimer) {
			this.setState({chooseTimer: chooseTimer});
		}
		if (prevProps.fightTimer !== fightTimer) {
			this.setState({fightTimer: fightTimer});
		}
		if (prevProps.isFighting !== isFighting) {
			this.setState({isFighting: isFighting});
		}
		if (prevProps.winner !== winner) {
			this.setState({winner: winner});
		}
		if (prevProps.gameCount !== gameCount) {
			this.setState({gameCount: gameCount});
		}
	}

	handleCharSelection(cardIndex) {
		this.setState({selectedCharCard: cardIndex});
		this.props.setSelectedCharCard(cardIndex);
	}
	handleAttrSelection(cardIndex) {
		this.setState({selectedAttrCard: cardIndex});
		this.props.setSelectedAttrCard(cardIndex);
	}

	handleRunActions(actions) {
		this.props.handleRunActions(actions);
	}

	handleVote(fighterNum) {
		this.setState({votedFighter: fighterNum});
		this.props.handleVote(fighterNum);

	}

	chooseCards() {
		this.setState({isChoosing: false});
		this.props.chooseCards();
	}

	render() {
		const player = this.state.player;
		const game = this.state.game;
		//const handCards = this.state.player.charCards.concat(this.state.player.attrCards);
		const isChoosing = this.state.isChoosing;
		const isFighting = this.state.isFighting;
		const isFighter1 = game.fighters[0] != null ? (game.players[game.fighters[0]] != null ? (game.players[game.fighters[0]].socketID === player.socketID) : false) : false;
		const isFighter = isFighter1 || (game.fighters[1] != null ? (game.players[game.fighters[1]] != null ? (game.players[game.fighters[1]].socketID === player.socketID) : false) : false);
		const chooseTimer = this.state.chooseTimer;
		const fightTimer = this.state.fightTimer;
		const fighter1 = this.state.game.players[this.state.game.fighters[0]];
		const fighter2 = this.state.game.players[this.state.game.fighters[1]];
		const winner = this.state.winner;
		const isEndingRound = this.state.game.isEndingRound;
		const votedFighter = this.state.votedFighter;
		const hasVoted = this.state.hasVoted;
		const gameCount = this.state.gameCount;


		console.log("isFighter: " + isFighter + (isFighter ? (" ("+ (isFighter1 ? "1" : "2") + ")") : ""));
		console.log("game.players.length: " + game.players.length);
		console.log("game.players: ");
		console.log(game.players);
		//console.log("hand cards:");
		//console.log(handCards);

		let content = "";

		if(game.players.length <= 1) {
			//Alone in the room, wainting for players to join
			content = (
				<div className="game-board">
					<div className="card-desk">
						<h3 className="text-center game-message">You are the only player in this room. Waiting other players to join...</h3>
					</div>
				</div>
			);
		} else if(isFighter && isChoosing) {
			console.log("Is fighter and is choosing fighter cards");
			content = (
				<div className="game-board">
					<div className="timer">
						<span>Time to choose: {chooseTimer}s</span>
					</div>
					<div className="card-desk">
						<h3 className="text-center">Choose your cards:</h3>
						<CardLineReact
							key={1+(gameCount*10)}
							cards={this.state.player.charCards}
							isFighter={isFighter && isFighter1}
							isChoosing={true}
							isFighting={isFighting}
							selectCard={(cardIndex) => this.handleCharSelection(cardIndex)}
							/>
						<CardLineReact
							key={2+(gameCount*10)}
							cards={this.state.player.attrCards}
							isFighter={isFighter && !isFighter1}
							isChoosing={true}
							isFighting={isFighting}
							selectCard={(cardIndex) => this.handleAttrSelection(cardIndex)}
							/>
						<div className="choose-button">
							<button onClick={() => this.chooseCards()} className="btn btn-primary" disabled={(this.state.selectedCharCard == null || this.state.selectedAttrCard == null)}>Select cards</button>
						</div>
					</div>
				</div>
			);
		} else if(isFighter && !isChoosing && this.state.game.isChoosing) {
			console.log("Is fighter, chose fighter cards, but opponent didn't yet");
			content = (
				<div className="game-board">
					<div className="card-desk">
						<h3 className="text-center game-message">Wait for opponent to choose his/her cards.</h3>
					</div>
				</div>
			);

		} else if(isFighter && !this.state.game.isChoosing) {
			console.log("Is fighter and fight started");
			content = (
				<div className="card-desk">
					<div className="game-board">
						<div className="timer">
							{isFighting ? (<span>Time till voting: {fightTimer}s</span>) : ""}
						</div>
						<div className="card-desk">
							<h3>{winner != 0 ? (fighter1.socketID == player.socketID ? "Your cards:" : fighter1.username + "'s cards:") : (<span className="winner-msg">{fighter1.username} won the fight!</span>)}</h3>
							<CardLineReact
								key={3+(gameCount*10)}
								cards={fighter1.fighterCards}
								isFighter={isFighter && isFighter1}
								isChoosing={false}
								isChosen={votedFighter == 0}
								isFighting={isFighting}
								hasVoted={hasVoted}
								selectCard={(cardIndex) => this.handleCharSelection(cardIndex)}
								runActions={(actions) => this.props.handleRunActions(actions)}
								handleVote={() => this.handleVote(0)}
								isWinner={winner != null ? (winner == 0 ? true : false) : null}
								/>
							<h3>{winner != 1 ? (fighter2.socketID == player.socketID ? "Your cards:" : fighter2.username + "'s cards:") : (<span className="winner-msg">{fighter2.username} won the fight!</span>)}</h3>
							<CardLineReact
								key={4+(gameCount*10)}
								cards={fighter2.fighterCards}
								isFighter={isFighter && !isFighter1}
								isChoosing={false}
								isChosen={votedFighter == 1}
								isFighting={isFighting}
								hasVoted={hasVoted}
								selectCard={(cardIndex) => this.handleAttrSelection(cardIndex)}
								runActions={(actions) => this.props.handleRunActions(actions)}
								handleVote={() => this.handleVote(1)}
								isWinner={winner != null ? (winner == 1 ? true : false) : null}
								/>
						</div>
					</div>
				</div>
			);

		} else if(!isFighter && isEndingRound) {
			console.log("Is spectator and is waiting for the next round to start");
			content = (
				<div className="game-board">
					<div className="card-desk">
						<h3 className="text-center game-message">Wait till current round ends.</h3>
					</div>
				</div>
			);

		} else if(!isFighter && this.state.game.isChoosing) {
			console.log("Is spectator and is waiting for the fight to start");
			content = (
				<div className="game-board">
					<div className="card-desk">
						<h3 className="text-center game-message">Wait for fighters to choose their cards.</h3>
					</div>
				</div>
			);

		} else if(!isFighter && !this.state.game.isChoosing) {
			console.log("Is spectator and fight started");
			content = (
				<div className="game-board">
					<div className="timer">
						{isFighting ? (<span>Time till voting: {fightTimer}s</span>) : ""}
					</div>
					<div className="card-desk">
						<h3>{winner != 0 ? (fighter1.socketID == player.socketID ? "Your cards:" : fighter1.username + "'s cards:") : (<span className="winner-msg">{fighter1.username} won the fight!</span>)}</h3>
						<CardLineReact
							key={3+(gameCount*10)}
							cards={fighter1.fighterCards}
							isFighter={isFighter && isFighter1}
							isChoosing={false}
							isChosen={votedFighter == 0}
							isFighting={isFighting}
							hasVoted={hasVoted}
							selectCard={(cardIndex) => this.handleCharSelection(cardIndex)}
							handleVote={() => this.handleVote(0)}
							isWinner={winner != null ? (winner == 0 ? true : false) : null}
							/>
						<h3>{winner != 1 ? (fighter2.socketID == player.socketID ? "Your cards:" : fighter2.username + "'s cards:") : (<span className="winner-msg">{fighter2.username} won the fight!</span>)}</h3>
						<CardLineReact
							key={4+(gameCount*10)}
							cards={fighter2.fighterCards}
							isFighter={isFighter && !isFighter1}
							isChoosing={false}
							isChosen={votedFighter == 1}
							isFighting={isFighting}
							hasVoted={hasVoted}
							selectCard={(cardIndex) => this.handleAttrSelection(cardIndex)}
							handleVote={() => this.handleVote(1)}
							isWinner={winner != null ? (winner == 1 ? true : false) : null}
							/>
					</div>
				</div>
			);
		}

		return content;
	}
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			room: "",
			maxRound: 10,
			inputMinRound: 4,
			inputMaxRound: 54,
			maxPlayers: 5,
			isPrivate: true,
			loginError: "",
			tabSelected: 0
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleFindGame = this.handleFindGame.bind(this);
		this.handleCreateRoom = this.handleCreateRoom.bind(this);
		this.handleChangeTab = this.handleChangeTab.bind(this);
	}

	componentDidUpdate(prevProps) {
		const {loginError, room} = this.props;
		if (prevProps.loginError !== loginError) {
			this.setState({loginError: loginError});
		}
		if (prevProps.room !== room) {
			room = room.replace(/[^a-zA-Z0-9_\-]/g, "").trim();
			this.setState({room: room});
		}
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;
		let value = name === 'isPrivate' ? target.checked : target.value;

		if(name === "room") {
			value = value.replace(/[^a-zA-Z0-9_\- ]/g, "");

		} else if(name === "maxPlayers") {
			const inputMinRound = value - 1;
			const inputMaxRound = (value * 10) - 1;
			const maxRound = this.state.maxRound;
			this.setState({inputMinRound: inputMinRound, inputMaxRound: inputMaxRound});
			if(maxRound < inputMinRound) this.setState({maxRound: inputMinRound});
			if(maxRound > inputMaxRound) this.setState({maxRound: inputMaxRound});
		}

		console.log("changing state '" + name + "' to '" + value + "'");
		this.setState({
			[name]: value
		});
	}

	handleFindGame() {
		//event.preventDefault();
		this.props.findRoom(this.state.username, this.state.room);
	}

	handleCreateRoom() {
		//event.preventDefault();
		this.props.createRoom(this.state.username, this.state.room, this.state.maxRound, this.state.maxPlayers, this.state.isPrivate);
	}

	handleChangeTab(tabNum) {
		this.setState({tabSelected: tabNum});
		this.props.setLoginError("");
	}

	render() {
		const username = this.state.username;
		const room = this.state.room;
		const loginError = this.state.loginError;
		const tabSelected = this.state.tabSelected;
		const maxRound = this.state.maxRound;
		const maxPlayers = this.state.maxPlayers;
		const isPrivate = this.state.isPrivate;
		const inputMinRound = this.state.inputMinRound;
		const inputMaxRound = this.state.inputMaxRound;

		let formSelected = "";

		if(tabSelected == 0) {
			formSelected = (
				<form className="login-form">
					<h4>Find room</h4>
					<label>Username:</label>
					<input type="text" name="username" maxLength="25" value={username} onChange={(event) => this.handleChange(event)}/>
					<label>Room name:</label>
					<input type="text" name="room" maxLength="25" value={room} onChange={(event) => this.handleChange(event)} />
					<div className="form-tip">Leave blank to find a random room</div>
					<button type="button" onClick={this.handleFindGame}>Find game</button>
					<div className="error-msg">
						<span>{loginError}</span>
					</div>
				</form>
			);
		} else if(tabSelected == 1) {
			formSelected = (
				<form className="login-form">
					<h4>Create room</h4>
					<label>Username:</label>
					<input type="text" name="username" maxLength="25" value={username} onChange={(event) => this.handleChange(event)}/>
					<label>Room name:</label>
					<input type="text" name="room" maxLength="25" value={room} onChange={(event) => this.handleChange(event)} />
					<div className="form-tip">Required (at least 5 characters)</div>
					<div className="form-same-row">
						<label>Number of rounds:</label>
						<input type="number" name="maxRound" value={maxRound} min={inputMinRound} max={inputMaxRound} onChange={(event) => this.handleChange(event)} />
					</div>
					<div className="form-same-row">
						<label>Max players:</label>
						<input type="number" name="maxPlayers" value={maxPlayers} max="11" min="2" onChange={(event) => this.handleChange(event)} />
					</div>
					<div className="form-same-row">
						<input type="checkbox" name="isPrivate" checked={isPrivate} onChange={(event) => this.handleChange(event)} />
						<label>Is a private room</label>
					</div>
					<button type="button" onClick={this.handleCreateRoom} disabled={room.length < 5 ? true : false}>Create room</button>
					<div className="error-msg">
						<span>{loginError}</span>
					</div>
				</form>
			);
		}

		return (
			<div className="login-box">
				<div className="tabs">
					<button type="button" className={tabSelected === 0 ? 'form-tab selected-tab' : 'form-tab'} onClick={() => this.handleChangeTab(0)}>Find room</button>
					<button type="button" className={tabSelected === 1 ? 'form-tab selected-tab' : 'form-tab'} onClick={() => this.handleChangeTab(1)}>Create room</button>
				</div>
				{formSelected}
			</div>
		);
	}
}


class GameHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.username,
			room: props.room,
			roundCount: props.roundCount,
			maxRound: props.maxRound,
			nextGameTimer: props.nextGameTimer
		}
	}

	componentDidUpdate(prevProps) {
		const {username, room, roundCount, maxRound, nextGameTimer} = this.props;
		if (prevProps.username !== username) {
			this.setState({username: username});
		}
		if (prevProps.room !== room) {
			this.setState({room: room});
		}
		if (prevProps.roundCount !== roundCount) {
			this.setState({roundCount: roundCount});
		}
		if (prevProps.maxRound !== maxRound) {
			this.setState({maxRound: maxRound});
		}
		if (prevProps.nextGameTimer !== nextGameTimer) {
			this.setState({nextGameTimer: nextGameTimer});
		}
	}

	render() {
		const username = this.state.username;
		const room = this.state.room;
		const roundCount = this.state.roundCount;
		const maxRound = this.state.maxRound;
		const nextGameTimer = this.state.nextGameTimer;

		return (
			<div className="game-header">
				<div className="container-fluid container-md">
					<div className="header-content">
						<div className="row">
							<div className="col-sm-auto">
								<div className="logo">
									<h2>SUPERFIGHT</h2>
									<span>a game of absurd arguments</span>
								</div>
							</div>
							<div className="col-sm">
								<div className="game-info">
									<h3>Welcome,<br /> {username}</h3>
									{room !== '' ? (<span className="room-info">You are in room '<span className="font-weight-bold">{room}</span>'<br/></span>) : (<br/>)}
									<span className="round-info">{roundCount <= maxRound ? (roundCount + "/" + maxRound) : ("Game starts in " + nextGameTimer + "s")}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


class GameScoreboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			game: props.game,
			player: props.player,
			winnerPlayer: props.winnerPlayer,
			nextGameTimer: props.nextGameTimer
		}
	}

	componentDidUpdate(prevProps) {
		const {game, player, winner, nextGameTimer} = this.props;
		if (prevProps.game !== game) {
			this.setState({game: game});
		}
		if (prevProps.player !== player) {
			//this.setState({player: player});
		}
		if (prevProps.winner !== winner) {
			//this.setState({winner: winner});
		}
		if (prevProps.nextGameTimer !== nextGameTimer) {
			this.setState({nextGameTimer: nextGameTimer});
		}
	}

	render() {
		const game = this.state.game;
		const player = this.state.player;
		const winnerPlayer = this.state.winnerPlayer;
		const winnerCards = winnerPlayer ? winnerPlayer.fighterCards : [];
		const nextGameTimer = this.state.nextGameTimer;

		const scoreboard = game.players.sort((p1, p2) => {return p2.winCount - p1.winCount}).map((playerIter, i) => {
			const classes = (playerIter.socketID === player.socketID) ? "myself" : "";
			return (
				<tr key={playerIter.socketID} className={classes}>
					<td><span>{i+1}</span>{playerIter.username}</td>
					<td>{playerIter.winCount}</td>
				</tr>
			)
		});

		return (
			<div className="game-scoreboard">
				<div className="winner-cards">
					<h3><b>{winnerPlayer ? winnerPlayer.username : '?'}</b> is the super fighter!</h3>
					<CardLineReact
						cards={winnerCards}
						isFighter={false}
						isChoosing={false}
						isFighting={true}
						centerCards={true}
						/>
				</div>
				<div className="timer">
					<span>New game starts in {nextGameTimer}s</span>
				</div>
				<div className="scoreboard">
					<h4>Scoreboard</h4>
					<table>
						<thead>
							<tr>
								<th>
									Player
								</th>
								<th>
									Wins
								</th>
							</tr>
						</thead>
						<tbody>
							{scoreboard}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

// ========================================


function App() {
	const [isLogged, setLogged] = useState(false);
	const [username, setName] = useState("");
	const [room, setRoom] = useState("");
	const [loginError, setLoginError] = useState("");

	const [player, setPlayer] = useState({});
	const [game, setGame] = useState({});
	const [chooseTimer, setChooseTimer] = useState(60);
	const [fightTimer, setFightTimer] = useState(30);
	const [isFighting, setIsFighting] = useState(true);
	const [selectedCharCard, setSelectedCharCard] = useState(null);
	const [selectedAttrCard, setSelectedAttrCard] = useState(null);
	const [roundCount, setRoundCount] = useState(0);
	const [isFighter, setIsFighter] = useState(false);
	const [winner, setWinner] = useState(null);
	const [winnerPlayer, setWinnerPlayer] = useState(null);
	const [nextGameTimer, setNextGameTimer] = useState(60);

	const [gameCount, setGameCount] = useState(0);

	const [isPlayerListHidden, setPlayerListHidden] = useState(false);

	useEffect(() => {
		//document.title = 'Superfight';

		socket.on("setLoginError", (errorMsg) => {
			console.log("Login Error: " + errorMsg);
			setLogged(false);
			setLoginError(errorMsg);
		});

		socket.on("startGame", (newPlayer, newGame, newIsFighter, newGameCount) => {
			console.log("starting game");
			setLogged(true);
			setPlayer(newPlayer);
			setName(newPlayer.username);
			setGame(newGame);
			setRoom(newGame.roomName);
			setIsFighting(newGame.isFighting);
			setWinnerPlayer(null);
			setWinner(null);
			setIsFighter(false);
			setRoundCount(0);
			setSelectedCharCard(null);
			setSelectedAttrCard(null);
			setFightTimer(30);
			setChooseTimer(60);
			setNextGameTimer(60);
			setGameCount(newGameCount);
			setLoginError("");
			console.log('player set:');
			console.log(newPlayer);
			console.log('game set:');
			console.log(newGame);
			//console.log('isFighter set:' + isFighter);
			console.log('isFighting set: ' + newGame.isFighting);
			document.title = 'Superfight - ' + newGame.roomName;
			setRoundCount(newGame.roundCount);
			console.log('Round set to: ', newGame.roundCount);
		});

		socket.on("setGame", (newGame, newIsFighter = null, message = null) => {
			setGame(newGame);
			if(message != null) console.log("server says: " + message);
			//checkIsFighter(newGame);
			//if(newIsFighter != null) setIsFighter(newIsFighter);
			console.log('game set:');
			console.log(newGame);
			//console.log('isFighter set:' + newIsFighter);
		});

		socket.on("setPlayer", (newPlayer, newIsFighter = null) => {
			setPlayer(newPlayer);
			//if(newIsFighter != null) setIsFighter(newIsFighter);
			console.log('player set:');
			console.log(newPlayer);
			//console.log('isFighter set: ' + newIsFighter);
		});

		socket.on("setIsFighter", newIsFighter => {
			setIsFighter(newIsFighter);
			console.log('isFighter set: ' + newIsFighter);
		});

		socket.on("fightEnded", (newGame) => {
			console.log("ending fight");
			setGame(newGame);
			setIsFighting(newGame.isFighting);
			setFightTimer(30);
			console.log('game set:');
			console.log(newGame);
			console.log('isFighting set: ' + newGame.isFighting);
		});

		socket.on("startDrawRound", (newGame) => {
			console.log("starting draw round");
			setGame(newGame);
			setIsFighting(true);
			console.log('game set:');
			console.log(newGame);
			console.log('isFighting set: ' + true);
		});

		socket.on("informWinner", (fighterNum, newGame = null) => {
			console.log("Fighter " + fighterNum + " won the round");
			setWinner(fighterNum);
			console.log('winner set');
			if(newGame != null) {
				setGame(newGame);
				console.log('game set:');
				console.log(newGame);
			}

			// stop receiving game objects
			socket.removeListener('setGame');
		});

		socket.on("startNewRound", (newGame) => {
			console.log("starting a new round (" + game.roundCount + ")");
			setGame(newGame);
			setIsFighting(true);
			setWinner(null);
			console.log('game set:');
			console.log(newGame);
			console.log('isFighting set: ' + true);
			console.log('winner set: ' + null);
			setRoundCount(newGame.roundCount);
			console.log('Round set to: ', newGame.roundCount);

			// start receiving game objects again
			socket.on("setGame", (newGame, newIsFighter = null, message = null) => {
				setGame(newGame);
				if(message != null) console.log("server says: " + message);
				console.log('game set:');
				console.log(newGame);
			});
		});

		socket.on("setChooseTimer", chooseTimer => {
			setChooseTimer(chooseTimer);
			console.log('chooseTimer set:');
			console.log(chooseTimer);
		});

		socket.on("setFightTimer", fightTimer => {
			setFightTimer(fightTimer);
			console.log('fightTimer set:');
			console.log(fightTimer);
		});

		socket.on("setNextGameTimer", nextGameTimer => {
			setNextGameTimer(nextGameTimer);
			console.log('nextGameTimer set:');
			console.log(nextGameTimer);
		});

		socket.on("endGame", (winnerPlayer, newGame) => {
			console.log("Game ended. Winner: " + winnerPlayer.username);
			setRoundCount(newGame.maxRound);
			setGame(newGame);
			setWinnerPlayer(winnerPlayer);
			console.log('game set:');
			console.log(newGame);
			console.log('winner player set:');
			console.log(winnerPlayer);

			// start receiving game objects again
			socket.on("setGame", (newGame, newIsFighter = null, message = null) => {
				setGame(newGame);
				if(message != null) console.log("server says: " + message);
				console.log('game set:');
				console.log(newGame);
			});
		});

		return () => socket.disconnect();
		//return () => socket.removeAllListeners();
	}, []);


	useEffect(() => {
		socket.on("getSelectedCards", () => {
			console.log("on getSelectedCards");
			chooseCards();
			setSelectedCharCard(null);
			setSelectedAttrCard(null);
			setChooseTimer(60);
		});

		return () => socket.removeListener('getSelectedCards');

	}, [selectedCharCard, selectedAttrCard, isFighter, roundCount]);

	useDeepCompareEffect(() => {
		if(game.roomName){
			let fighter1Name = "-";
			let fighter2Name = "-";
			if(game.fighters[0] != null ? (game.players[game.fighters[0]] != null ? true : false) : false) fighter1Name = game.players[game.fighters[0]].username;
			if(game.fighters[1] != null ? (game.players[game.fighters[1]] != null ? true : false) : false) fighter2Name = game.players[game.fighters[1]].username;
			document.title = 'Superfight: ' + fighter1Name + " vs " + fighter2Name;
			console.log("Document title: " + document.title);
		}

	}, [game]);

	function findRoom(username, room) {
		setName(username);
		setRoom(room);
		//setLogged(true);
		console.log("Trying to join a room");
		socket.emit("joinRoom", username, room);
	}

	function createRoom(username, room, maxRound, maxPlayers, isPrivate) {
		setName(username);
		setRoom(room);
		// setLogged(true);
		console.log("Trying to create a room");
		socket.emit("createRoom", username, room, maxRound, maxPlayers, isPrivate);
	}

	function togglePlayerListHidden() {
		if(isPlayerListHidden) setPlayerListHidden(false);
		else setPlayerListHidden(true);
	}

	function chooseCards() {
		console.log("Cards were chosen");
		console.log("aaaaaaaaaaa");
		console.log(game);
		const isFighter = checkIsFighter(game);
		if(isFighter) {
			const auxSelectedCharCard = selectedCharCard ? selectedCharCard : 0;
			const auxSelectedAttrCard = selectedAttrCard ? selectedAttrCard : 0;
			console.log("sending: " + auxSelectedCharCard + ", " + auxSelectedAttrCard);
			socket.emit("chooseCards", auxSelectedCharCard, auxSelectedAttrCard);
		}
	}

	function checkIsFighter(game) {
		// console.log("checking for game: ", game);
		let auxIsFighter = false;
		if(game.fighters) {
			const isFighter2 = (game.fighters[1] != null) ? (game.players[game.fighters[1]].socketID == player.socketID) : false;
			console.log("is fighter 2: ", isFighter2);
			auxIsFighter = (game.players[game.fighters[0]].socketID == player.socketID) || isFighter2;
		}
		setIsFighter(auxIsFighter);
		console.log("isFighter checked: ", isFighter, " | auxIsFighter: ", auxIsFighter);
		return auxIsFighter;
	}

	function handleRunActions(actions) {
		console.log("Running card actions");
		socket.emit("runActions", actions);
	}

	function handleVote(fighterNum) {
		console.log("Sending vote in fighter " + fighterNum);
		socket.emit("votePlayer", fighterNum);
	}

	function playersList() {
		if(game.roomName) {
			console.log(":::: game: ", game);
			const fighter1 = game.fighters[0];
			const fighter2 = game.fighters[1];
			const nextFighter = game.nextFighter;

			const playersList = game.players.map((playerIter, i) => {
				let classes = fighter1 === i ? "fighter-1" : (fighter2 === i ? "fighter-2" : (nextFighter === i ? "next-fighter" : "nothing"));
				if(playerIter.socketID === player.socketID) classes += " myself";
				// console.log(playerIter.username + " hasVoted: " + playerIter.hasVoted);
				return (
					<tr key={playerIter.socketID} className={classes}>
						<td>{playerIter.winCount}</td>
						<td><span className={playerIter.hasVoted ? "has-voted" : ""}>{playerIter.username}</span></td>
					</tr>
				)
			});

			return(
				<div className={isPlayerListHidden ? "players-list hidden" : "players-list"}>
					<div className="header">
						<button onClick={() => togglePlayerListHidden()}>Players</button>
					</div>
					<div className="players-table">
						<table>
							<tbody>
								{playersList}
							</tbody>
						</table>
					</div>
				</div>
			)
		} else {
			return "";
		}
	}

	return (
		<div>
			<div className="body-wrapper">
				{(isLogged) ? (
					<GameHeader
						key={gameCount}
						room={room}
						username={username}
						roundCount={game.roundCount}
						maxRound={game.maxRound}
						nextGameTimer={nextGameTimer}
						/>
				) : ''}

				<div className="container">
					<div className="row">
						<div className="col">
							{playersList()}
							{(!isLogged) ? (
								<Login
									findRoom={(username, room) => findRoom(username, room)}
									createRoom={(username, roomName, maxRound, maxPlayers, isPrivate) => createRoom(username, roomName, maxRound, maxPlayers, isPrivate)}
									loginError={loginError}
									setLoginError={() => setLoginError()}
									/>

							) : ''}

							{(isLogged && game.roomName && player.socketID && (winnerPlayer == null)) ? (
								<Game
									key={gameCount}
									gameCount={gameCount}
									game={game}
									player={player}
									chooseTimer={chooseTimer}
									fightTimer={fightTimer}
									isFighting={isFighting}
									chooseCards={() => chooseCards()}
									setSelectedCharCard={selectedCharCard => setSelectedCharCard(selectedCharCard)}
									setSelectedAttrCard={selectedAttrCard => setSelectedAttrCard(selectedAttrCard)}
									handleRunActions={actions => handleRunActions(actions)}
									handleVote={(fighterNum) => handleVote(fighterNum)}
									winner={winner}
								/>
							) : ''}

							{(isLogged && game.roomName && player.socketID && (winnerPlayer != null)) ? (
								<GameScoreboard
									key={gameCount}
									game={game}
									player={player}
									winnerPlayer={winnerPlayer}
									nextGameTimer={nextGameTimer}
									/>
							) : ''}
						</div>
					</div>
				</div>
			</div>
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="footer-content">
								<div>Superfight is a really fun multiplayer card game, created by <a href="https://twitter.com/jack_dire">Jack Dire</a>. This is not an official project.<br />
								Official website: <a href="https://www.superfightgame.com/">https://www.superfightgame.com/</a></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const socket = socketIOClient(ENDPOINT);

ReactDOM.render(<App />, document.getElementById("root"));

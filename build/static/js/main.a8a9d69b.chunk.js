(this["webpackJsonpsuperfight-react"]=this["webpackJsonpsuperfight-react"]||[]).push([[0],{38:function(e,t,a){e.exports=a(39)},39:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a(33),r=a(34),o=a(3),i=a(4),l=a(5),c=a(7),m=a(6),h=a(0),u=a.n(h),d=a(35),g=a.n(d),f=a(37),p=a(36),E=a.n(p),C=(a(77),function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).card=e.card,n.isChoosing=e.isChoosing,n.isFighter=e.isFighter,n.state={isSelected:e.isSelected,isActionDone:!1,isFighting:e.isFighting},n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.isSelected,n=t.isFighting;e.isSelected!==a&&this.setState({isSelected:a}),e.isFighting!==n&&this.setState({isFighting:n})}},{key:"handleClick",value:function(e){this.props.onClick(e),this.setState({isActionDone:!0})}},{key:"render",value:function(){var e=this,t="sf-card"+(this.card.isChar?" char":" attr")+(this.state.isSelected&&this.isChoosing?" selected":"")+(this.card.isActionCard&&!this.state.isActionDone&&!this.isChoosing&&this.isFighter&&this.state.isFighting?" action-card":""),a=this.card.actions?this.card.actions:null;return u.a.createElement("li",{className:t},u.a.createElement("button",{onClick:function(){return e.handleClick(a)},disabled:!(this.isChoosing||this.card.isActionCard&&!this.state.isActionDone&&this.isFighter&&this.state.isFighting)},this.card.text))}}]),a}(u.a.Component)),v=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={cards:e.cards,isChoosing:e.isChoosing,selectedCard:null,isFighter:e.isFighter,isFighting:e.isFighting,isChosen:!1,hasVoted:!1,isWinner:null,centerCards:e.centerCards},n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.cards,n=t.isFighter,s=t.isFighting,r=t.isChosen,o=t.hasVoted,i=t.isWinner;e.cards!==a&&this.setState({cards:a}),e.isFighter!==n&&this.setState({isFighter:n}),e.isFighting!==s&&this.setState({isFighting:s}),e.isChosen!==r&&this.setState({isChosen:r}),e.hasVoted!==o&&this.setState({hasVoted:o}),e.isWinner!==i&&this.setState({isWinner:i})}},{key:"handleClick",value:function(e,t){this.setState({selectedCard:e}),this.props.selectCard(e),null!=t&&this.props.runActions&&this.props.runActions(t)}},{key:"render",value:function(){var e=this,t=this.state.cards,a=this.state.isChoosing,n=this.state.isFighter,s=this.state.isFighting,r=this.state.isChosen,o=this.state.hasVoted,i=this.state.isWinner,l=this.state.centerCards,c=t.map((function(t,r){var o=e.state.selectedCard===r;return u.a.createElement(C,{key:t.key,card:t,isFighter:n,isChoosing:a,isFighting:s,isSelected:o,onClick:function(t){return e.handleClick(r,t)}})})),m=155*c.length,h="card-line"+(a||l?" justify-content-center":""),d="card-line-selection"+(s||o?"":" is-voting")+(r?" is-chosen":"")+(null!=i?i?" is-winner":" is-loser":"");return u.a.createElement("div",{className:d},u.a.createElement("div",{className:"card-line-select-button"},u.a.createElement("button",{onClick:function(){return e.props.handleVote()}},"Vote")),u.a.createElement("div",{className:"cards-wrapper"},u.a.createElement("ul",{className:h,style:{minWidth:m}},c)))}}]),a}(u.a.Component),b=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={player:e.player,game:e.game,isChoosing:!0,selectedCharCard:null,selectedAttrCard:null,chooseTimer:e.chooseTimer,fightTimer:e.fightTimer,isFighting:!0,votedFighter:null,hasVoted:!1,winner:null,gameCount:e.gameCount},n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t,a=this,n=this.props,s=n.game,r=n.player,o=n.chooseTimer,i=n.fightTimer,l=n.isFighting,c=n.winner,m=n.gameCount;e.game!==s&&(this.setState({game:s}),s.players.some((function(e,a){return e.socketID==r.socketID&&(t=e,!0)})),t&&this.setState({hasVoted:t.hasVoted}),t&&!t.hasVoted&&this.setState({votedFighter:null}),s.players.some((function(e){return e.socketID==a.state.player.socketID&&(a.setState({isChoosing:e.isChoosing}),!0)})));e.player!==r&&(this.setState({player:r}),this.setState({isChoosing:r.isChoosing})),e.chooseTimer!==o&&this.setState({chooseTimer:o}),e.fightTimer!==i&&this.setState({fightTimer:i}),e.isFighting!==l&&this.setState({isFighting:l}),e.winner!==c&&this.setState({winner:c}),e.gameCount!==m&&this.setState({gameCount:m})}},{key:"handleCharSelection",value:function(e){this.setState({selectedCharCard:e}),this.props.setSelectedCharCard(e)}},{key:"handleAttrSelection",value:function(e){this.setState({selectedAttrCard:e}),this.props.setSelectedAttrCard(e)}},{key:"handleRunActions",value:function(e){this.props.handleRunActions(e)}},{key:"handleVote",value:function(e){this.setState({votedFighter:e}),this.props.handleVote(e)}},{key:"chooseCards",value:function(){this.setState({isChoosing:!1}),this.props.chooseCards()}},{key:"render",value:function(){var e=this,t=this.state.player,a=this.state.game,n=this.state.isChoosing,s=this.state.isFighting,r=null!=a.fighters[0]&&(null!=a.players[a.fighters[0]]&&a.players[a.fighters[0]].socketID===t.socketID),o=r||null!=a.fighters[1]&&(null!=a.players[a.fighters[1]]&&a.players[a.fighters[1]].socketID===t.socketID),i=this.state.chooseTimer,l=this.state.fightTimer,c=this.state.game.players[this.state.game.fighters[0]],m=this.state.game.players[this.state.game.fighters[1]],h=this.state.winner,d=this.state.game.isEndingRound,g=this.state.votedFighter,f=this.state.hasVoted,p=this.state.gameCount;console.log("isFighter: "+o+(o?" ("+(r?"1":"2")+")":"")),console.log("game.players.length: "+a.players.length),console.log("game.players: "),console.log(a.players);var E="";return a.players.length<=1?E=u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",{className:"text-center game-message"},"You are the only player in this room. Waiting other players to join..."))):o&&n?(console.log("Is fighter and is choosing fighter cards"),E=u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"timer"},u.a.createElement("span",null,"Time to choose: ",i,"s")),u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",{className:"text-center"},"Choose your cards:"),u.a.createElement(v,{key:1+10*p,cards:this.state.player.charCards,isFighter:o&&r,isChoosing:!0,isFighting:s,selectCard:function(t){return e.handleCharSelection(t)}}),u.a.createElement(v,{key:2+10*p,cards:this.state.player.attrCards,isFighter:o&&!r,isChoosing:!0,isFighting:s,selectCard:function(t){return e.handleAttrSelection(t)}}),u.a.createElement("div",{className:"choose-button"},u.a.createElement("button",{onClick:function(){return e.chooseCards()},className:"btn btn-primary",disabled:null==this.state.selectedCharCard||null==this.state.selectedAttrCard},"Select cards"))))):o&&!n&&this.state.game.isChoosing?(console.log("Is fighter, chose fighter cards, but opponent didn't yet"),E=u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",{className:"text-center game-message"},"Wait for opponent to choose his/her cards.")))):o&&!this.state.game.isChoosing?(console.log("Is fighter and fight started"),E=u.a.createElement("div",{className:"card-desk"},u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"timer"},s?u.a.createElement("span",null,"Time till voting: ",l,"s"):""),u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",null,0!=h?c.socketID==t.socketID?"Your cards:":c.username+"'s cards:":u.a.createElement("span",{className:"winner-msg"},c.username," won the fight!")),u.a.createElement(v,{key:3+10*p,cards:c.fighterCards,isFighter:o&&r,isChoosing:!1,isChosen:0==g,isFighting:s,hasVoted:f,selectCard:function(t){return e.handleCharSelection(t)},runActions:function(t){return e.props.handleRunActions(t)},handleVote:function(){return e.handleVote(0)},isWinner:null!=h?0==h:null}),u.a.createElement("h3",null,1!=h?m.socketID==t.socketID?"Your cards:":m.username+"'s cards:":u.a.createElement("span",{className:"winner-msg"},m.username," won the fight!")),u.a.createElement(v,{key:4+10*p,cards:m.fighterCards,isFighter:o&&!r,isChoosing:!1,isChosen:1==g,isFighting:s,hasVoted:f,selectCard:function(t){return e.handleAttrSelection(t)},runActions:function(t){return e.props.handleRunActions(t)},handleVote:function(){return e.handleVote(1)},isWinner:null!=h?1==h:null}))))):!o&&d?(console.log("Is spectator and is waiting for the next round to start"),E=u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",{className:"text-center game-message"},"Wait till current round ends.")))):!o&&this.state.game.isChoosing?(console.log("Is spectator and is waiting for the fight to start"),E=u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",{className:"text-center game-message"},"Wait for fighters to choose their cards.")))):o||this.state.game.isChoosing||(console.log("Is spectator and fight started"),E=u.a.createElement("div",{className:"game-board"},u.a.createElement("div",{className:"timer"},s?u.a.createElement("span",null,"Time till voting: ",l,"s"):""),u.a.createElement("div",{className:"card-desk"},u.a.createElement("h3",null,0!=h?c.socketID==t.socketID?"Your cards:":c.username+"'s cards:":u.a.createElement("span",{className:"winner-msg"},c.username," won the fight!")),u.a.createElement(v,{key:3+10*p,cards:c.fighterCards,isFighter:o&&r,isChoosing:!1,isChosen:0==g,isFighting:s,hasVoted:f,selectCard:function(t){return e.handleCharSelection(t)},handleVote:function(){return e.handleVote(0)},isWinner:null!=h?0==h:null}),u.a.createElement("h3",null,1!=h?m.socketID==t.socketID?"Your cards:":m.username+"'s cards:":u.a.createElement("span",{className:"winner-msg"},m.username," won the fight!")),u.a.createElement(v,{key:4+10*p,cards:m.fighterCards,isFighter:o&&!r,isChoosing:!1,isChosen:1==g,isFighting:s,hasVoted:f,selectCard:function(t){return e.handleAttrSelection(t)},handleVote:function(){return e.handleVote(1)},isWinner:null!=h?1==h:null})))),E}}]),a}(u.a.Component),y=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={username:"",room:"",maxRound:10,inputMinRound:4,inputMaxRound:54,maxPlayers:5,isPrivate:!0,loginError:"",tabSelected:0},n.handleChange=n.handleChange.bind(Object(o.a)(n)),n.handleFindGame=n.handleFindGame.bind(Object(o.a)(n)),n.handleCreateRoom=n.handleCreateRoom.bind(Object(o.a)(n)),n.handleChangeTab=n.handleChangeTab.bind(Object(o.a)(n)),n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.loginError,n=t.room;e.loginError!==a&&this.setState({loginError:a}),e.room!==n&&(Object(r.a)("room"),n=n.replace(/[^a-zA-Z0-9_\-]/g,"").trim(),this.setState({room:n}))}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n="isPrivate"===a?t.checked:t.value;if("room"===a)n=n.replace(/[^a-zA-Z0-9_\- ]/g,"");else if("maxPlayers"===a){var r=n-1,o=10*n-1,i=this.state.maxRound;this.setState({inputMinRound:r,inputMaxRound:o}),i<r&&this.setState({maxRound:r}),i>o&&this.setState({maxRound:o})}console.log("changing state '"+a+"' to '"+n+"'"),this.setState(Object(s.a)({},a,n))}},{key:"handleFindGame",value:function(){this.props.findRoom(this.state.username,this.state.room)}},{key:"handleCreateRoom",value:function(){this.props.createRoom(this.state.username,this.state.room,this.state.maxRound,this.state.maxPlayers,this.state.isPrivate)}},{key:"handleChangeTab",value:function(e){this.setState({tabSelected:e}),this.props.setLoginError("")}},{key:"render",value:function(){var e=this,t=this.state.username,a=this.state.room,n=this.state.loginError,s=this.state.tabSelected,r=this.state.maxRound,o=this.state.maxPlayers,i=this.state.isPrivate,l=this.state.inputMinRound,c=this.state.inputMaxRound,m="";return 0==s?m=u.a.createElement("form",{className:"login-form"},u.a.createElement("h4",null,"Find room"),u.a.createElement("label",null,"Username:"),u.a.createElement("input",{type:"text",name:"username",maxLength:"25",value:t,onChange:function(t){return e.handleChange(t)}}),u.a.createElement("label",null,"Room name:"),u.a.createElement("input",{type:"text",name:"room",maxLength:"25",value:a,onChange:function(t){return e.handleChange(t)}}),u.a.createElement("div",{className:"form-tip"},"Leave blank to find a random room"),u.a.createElement("button",{type:"button",onClick:this.handleFindGame},"Find game"),u.a.createElement("div",{className:"error-msg"},u.a.createElement("span",null,n))):1==s&&(m=u.a.createElement("form",{className:"login-form"},u.a.createElement("h4",null,"Create room"),u.a.createElement("label",null,"Username:"),u.a.createElement("input",{type:"text",name:"username",maxLength:"25",value:t,onChange:function(t){return e.handleChange(t)}}),u.a.createElement("label",null,"Room name:"),u.a.createElement("input",{type:"text",name:"room",maxLength:"25",value:a,onChange:function(t){return e.handleChange(t)}}),u.a.createElement("div",{className:"form-tip"},"Required (at least 5 characters)"),u.a.createElement("div",{className:"form-same-row"},u.a.createElement("label",null,"Number of rounds:"),u.a.createElement("input",{type:"number",name:"maxRound",value:r,min:l,max:c,onChange:function(t){return e.handleChange(t)}})),u.a.createElement("div",{className:"form-same-row"},u.a.createElement("label",null,"Max players:"),u.a.createElement("input",{type:"number",name:"maxPlayers",value:o,max:"11",min:"2",onChange:function(t){return e.handleChange(t)}})),u.a.createElement("div",{className:"form-same-row"},u.a.createElement("input",{type:"checkbox",name:"isPrivate",checked:i,onChange:function(t){return e.handleChange(t)}}),u.a.createElement("label",null,"Is a private room")),u.a.createElement("button",{type:"button",onClick:this.handleCreateRoom,disabled:a.length<5},"Create room"),u.a.createElement("div",{className:"error-msg"},u.a.createElement("span",null,n)))),u.a.createElement("div",{className:"login-box"},u.a.createElement("div",{className:"tabs"},u.a.createElement("button",{type:"button",className:0===s?"form-tab selected-tab":"form-tab",onClick:function(){return e.handleChangeTab(0)}},"Find room"),u.a.createElement("button",{type:"button",className:1===s?"form-tab selected-tab":"form-tab",onClick:function(){return e.handleChangeTab(1)}},"Create room")),m)}}]),a}(u.a.Component),k=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={username:e.username,room:e.room,roundCount:e.roundCount,maxRound:e.maxRound,nextGameTimer:e.nextGameTimer},n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.username,n=t.room,s=t.roundCount,r=t.maxRound,o=t.nextGameTimer;e.username!==a&&this.setState({username:a}),e.room!==n&&this.setState({room:n}),e.roundCount!==s&&this.setState({roundCount:s}),e.maxRound!==r&&this.setState({maxRound:r}),e.nextGameTimer!==o&&this.setState({nextGameTimer:o})}},{key:"render",value:function(){var e=this.state.username,t=this.state.room,a=this.state.roundCount,n=this.state.maxRound,s=this.state.nextGameTimer;return u.a.createElement("div",{className:"game-header"},u.a.createElement("div",{className:"container-fluid container-md"},u.a.createElement("div",{className:"header-content"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-sm-auto"},u.a.createElement("div",{className:"logo"},u.a.createElement("h2",null,"SUPERFIGHT"),u.a.createElement("span",null,"a game of absurd arguments"))),u.a.createElement("div",{className:"col-sm"},u.a.createElement("div",{className:"game-info"},u.a.createElement("h3",null,"Welcome,",u.a.createElement("br",null)," ",e),""!==t?u.a.createElement("span",{className:"room-info"},"You are in room '",u.a.createElement("span",{className:"font-weight-bold"},t),"'",u.a.createElement("br",null)):u.a.createElement("br",null),u.a.createElement("span",{className:"round-info"},a<=n?a+"/"+n:"Game starts in "+s+"s")))))))}}]),a}(u.a.Component),S=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={game:e.game,player:e.player,winnerPlayer:e.winnerPlayer,nextGameTimer:e.nextGameTimer},n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.game,n=(t.player,t.winner,t.nextGameTimer);e.game!==a&&this.setState({game:a}),e.player,e.winner,e.nextGameTimer!==n&&this.setState({nextGameTimer:n})}},{key:"render",value:function(){var e=this.state.game,t=this.state.player,a=this.state.winnerPlayer,n=a?a.fighterCards:[],s=this.state.nextGameTimer,r=e.players.sort((function(e,t){return t.winCount-e.winCount})).map((function(e,a){var n=e.socketID===t.socketID?"myself":"";return u.a.createElement("tr",{key:e.socketID,className:n},u.a.createElement("td",null,u.a.createElement("span",null,a+1),e.username),u.a.createElement("td",null,e.winCount))}));return u.a.createElement("div",{className:"game-scoreboard"},u.a.createElement("div",{className:"winner-cards"},u.a.createElement("h3",null,u.a.createElement("b",null,a?a.username:"?")," is the super fighter!"),u.a.createElement(v,{cards:n,isFighter:!1,isChoosing:!1,isFighting:!0,centerCards:!0})),u.a.createElement("div",{className:"timer"},u.a.createElement("span",null,"New game starts in ",s,"s")),u.a.createElement("div",{className:"scoreboard"},u.a.createElement("h4",null,"Scoreboard"),u.a.createElement("table",null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Player"),u.a.createElement("th",null,"Wins"))),u.a.createElement("tbody",null,r))))}}]),a}(u.a.Component);function N(){var e=Object(h.useState)(!1),t=Object(n.a)(e,2),a=t[0],s=t[1],r=Object(h.useState)(""),o=Object(n.a)(r,2),i=o[0],l=o[1],c=Object(h.useState)(""),m=Object(n.a)(c,2),d=m[0],g=m[1],p=Object(h.useState)(""),E=Object(n.a)(p,2),C=E[0],v=E[1],N=Object(h.useState)({}),F=Object(n.a)(N,2),O=F[0],x=F[1],w=Object(h.useState)({}),R=Object(n.a)(w,2),T=R[0],D=R[1],I=Object(h.useState)(60),G=Object(n.a)(I,2),V=G[0],A=G[1],P=Object(h.useState)(30),W=Object(n.a)(P,2),L=W[0],U=W[1],M=Object(h.useState)(!0),Y=Object(n.a)(M,2),J=Y[0],_=Y[1],z=Object(h.useState)(null),Z=Object(n.a)(z,2),q=Z[0],B=Z[1],H=Object(h.useState)(null),K=Object(n.a)(H,2),Q=K[0],X=K[1],$=Object(h.useState)(0),ee=Object(n.a)($,2),te=ee[0],ae=ee[1],ne=Object(h.useState)(!1),se=Object(n.a)(ne,2),re=se[0],oe=se[1],ie=Object(h.useState)(null),le=Object(n.a)(ie,2),ce=le[0],me=le[1],he=Object(h.useState)(null),ue=Object(n.a)(he,2),de=ue[0],ge=ue[1],fe=Object(h.useState)(60),pe=Object(n.a)(fe,2),Ee=pe[0],Ce=pe[1],ve=Object(h.useState)(0),be=Object(n.a)(ve,2),ye=be[0],ke=be[1],Se=Object(h.useState)(!1),Ne=Object(n.a)(Se,2),je=Ne[0],Fe=Ne[1];function Oe(){if(console.log("Cards were chosen"),console.log("aaaaaaaaaaa"),console.log(T),xe(T)){var e=q||0,t=Q||0;console.log("sending: "+e+", "+t),j.emit("chooseCards",e,t)}}function xe(e){var t=!1;if(e.fighters){var a=null!=e.fighters[1]&&e.players[e.fighters[1]].socketID==O.socketID;console.log("is fighter 2: ",a),t=e.players[e.fighters[0]].socketID==O.socketID||a}return oe(t),console.log("isFighter checked: ",re," | auxIsFighter: ",t),t}return Object(h.useEffect)((function(){return j.on("setLoginError",(function(e){console.log("Login Error: "+e),s(!1),v(e)})),j.on("startGame",(function(e,t,a,n){console.log("starting game"),s(!0),x(e),l(e.username),D(t),g(t.roomName),_(t.isFighting),ge(null),me(null),oe(!1),ae(0),B(null),X(null),U(30),A(60),Ce(60),ke(n),v(""),console.log("player set:"),console.log(e),console.log("game set:"),console.log(t),console.log("isFighting set: "+t.isFighting),document.title="Superfight - "+t.roomName,ae(t.roundCount),console.log("Round set to: ",t.roundCount)})),j.on("setGame",(function(e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;D(e),null!=t&&console.log("server says: "+t),console.log("game set:"),console.log(e)})),j.on("setPlayer",(function(e){x(e),console.log("player set:"),console.log(e)})),j.on("setIsFighter",(function(e){oe(e),console.log("isFighter set: "+e)})),j.on("fightEnded",(function(e){console.log("ending fight"),D(e),_(e.isFighting),U(30),console.log("game set:"),console.log(e),console.log("isFighting set: "+e.isFighting)})),j.on("startDrawRound",(function(e){console.log("starting draw round"),D(e),_(!0),console.log("game set:"),console.log(e),console.log("isFighting set: "+!0)})),j.on("informWinner",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.log("Fighter "+e+" won the round"),me(e),console.log("winner set"),null!=t&&(D(t),console.log("game set:"),console.log(t)),j.removeListener("setGame")})),j.on("startNewRound",(function(e){console.log("starting a new round ("+T.roundCount+")"),D(e),_(!0),me(null),console.log("game set:"),console.log(e),console.log("isFighting set: "+!0),console.log("winner set: null"),ae(e.roundCount),console.log("Round set to: ",e.roundCount),j.on("setGame",(function(e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;D(e),null!=t&&console.log("server says: "+t),console.log("game set:"),console.log(e)}))})),j.on("setChooseTimer",(function(e){A(e),console.log("chooseTimer set:"),console.log(e)})),j.on("setFightTimer",(function(e){U(e),console.log("fightTimer set:"),console.log(e)})),j.on("setNextGameTimer",(function(e){Ce(e),console.log("nextGameTimer set:"),console.log(e)})),j.on("endGame",(function(e,t){console.log("Game ended. Winner: "+e.username),ae(t.maxRound),D(t),ge(e),console.log("game set:"),console.log(t),console.log("winner player set:"),console.log(e),j.on("setGame",(function(e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;D(e),null!=t&&console.log("server says: "+t),console.log("game set:"),console.log(e)}))})),function(){return j.disconnect()}}),[]),Object(h.useEffect)((function(){return j.on("getSelectedCards",(function(){console.log("on getSelectedCards"),Oe(),B(null),X(null),A(60)})),function(){return j.removeListener("getSelectedCards")}}),[q,Q,re,te]),Object(f.a)((function(){if(T.roomName){var e="-",t="-";null!=T.fighters[0]&&null!=T.players[T.fighters[0]]&&(e=T.players[T.fighters[0]].username),null!=T.fighters[1]&&null!=T.players[T.fighters[1]]&&(t=T.players[T.fighters[1]].username),document.title="Superfight: "+e+" vs "+t,console.log("Document title: "+document.title)}}),[T]),u.a.createElement("div",null,u.a.createElement("div",{className:"body-wrapper"},a?u.a.createElement(k,{key:ye,room:d,username:i,roundCount:T.roundCount,maxRound:T.maxRound,nextGameTimer:Ee}):"",u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col"},function(){if(T.roomName){console.log(":::: game: ",T);var e=T.fighters[0],t=T.fighters[1],a=T.nextFighter,n=T.players.map((function(n,s){var r=e===s?"fighter-1":t===s?"fighter-2":a===s?"next-fighter":"nothing";return n.socketID===O.socketID&&(r+=" myself"),u.a.createElement("tr",{key:n.socketID,className:r},u.a.createElement("td",null,n.winCount),u.a.createElement("td",null,u.a.createElement("span",{className:n.hasVoted?"has-voted":""},n.username)))}));return u.a.createElement("div",{className:je?"players-list hidden":"players-list"},u.a.createElement("div",{className:"header"},u.a.createElement("button",{onClick:function(){Fe(!je)}},"Players")),u.a.createElement("div",{className:"players-table"},u.a.createElement("table",null,u.a.createElement("tbody",null,n))))}return""}(),a?"":u.a.createElement(y,{findRoom:function(e,t){return function(e,t){l(e),g(t),console.log("Trying to join a room"),j.emit("joinRoom",e,t)}(e,t)},createRoom:function(e,t,a,n,s){return function(e,t,a,n,s){l(e),g(t),console.log("Trying to create a room"),j.emit("createRoom",e,t,a,n,s)}(e,t,a,n,s)},loginError:C,setLoginError:function(){return v()}}),a&&T.roomName&&O.socketID&&null==de?u.a.createElement(b,{key:ye,gameCount:ye,game:T,player:O,chooseTimer:V,fightTimer:L,isFighting:J,chooseCards:function(){return Oe()},setSelectedCharCard:function(e){return B(e)},setSelectedAttrCard:function(e){return X(e)},handleRunActions:function(e){return function(e){console.log("Running card actions"),j.emit("runActions",e)}(e)},handleVote:function(e){return function(e){console.log("Sending vote in fighter "+e),j.emit("votePlayer",e)}(e)},winner:ce}):"",a&&T.roomName&&O.socketID&&null!=de?u.a.createElement(S,{key:ye,game:T,player:O,winnerPlayer:de,nextGameTimer:Ee}):"")))),u.a.createElement("div",{className:"footer"},u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col"},u.a.createElement("div",{className:"footer-content"},u.a.createElement("div",null,"Superfight is a really fun multiplayer card game, created by ",u.a.createElement("a",{href:"https://twitter.com/jack_dire"},"Jack Dire"),". This is not an official project.",u.a.createElement("br",null),"Official website: ",u.a.createElement("a",{href:"https://www.superfightgame.com/"},"https://www.superfightgame.com/"))))))))}var j=E()("http://superfight-backend-superfight-backend.apps.us-west-1.starter.openshift-online.com/");g.a.render(u.a.createElement(N,null),document.getElementById("root"))},74:function(e,t){},77:function(e,t,a){}},[[38,1,2]]]);
//# sourceMappingURL=main.a8a9d69b.chunk.js.map
// http://perplexingtech.weebly.com/game-dev-blog/using-states-in-phaserjs-javascript-game-developement

Game = {};

//////////////////////////////////

Game.Menu = function () {
};

Game.Menu.prototype = {
  preload: function () {

  },
  create: function () {
    this.text = game.add.text(80, 150, 'Pressione ESPACO para iniciar', {fill: '#ffffff'});
    this.button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.button.onDown.addOnce(this.startGame, this);
  },
  update: function () {

  },
  startGame: function () {
    game.state.start('play');
  }
};

//////////////////////////////////

Game.Play = function () {

}

Game.Play.prototype = {
  preload: function () {

  },
  
  create: function () {
    this.text = game.add.text(80, 250, 'Pressione ESC para voltar', {fill: '#ffffff'});
    this.button = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.button.onDown.addOnce(this.gameOver, this);
  },

  update: function () {

  },

  gameOver: function () {
    game.state.start('menu');
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add('menu', Game.Menu);
game.state.add('play', Game.Play);
game.state.start('menu');


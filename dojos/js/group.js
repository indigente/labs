game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('box1', 'assets/grama50.png');
  game.load.image('box2', 'assets/marca50.png');
}

function create() {
  game.add.text(0, 0, 
    'A: adicionar caixa\nS: mover todas as caixas\nD: destruir primeira caixa',
    { fill: '#ffffff' });

  boxGroup = game.add.group();
  adicionar();
  adicionar();

  game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(adicionar);
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(mover);
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(destruir);
}

function adicionar() {
  boxGroup.create(Math.random() * 800, Math.random() * 600, 'box2');
}

function mover() {
  boxGroup.forEach(function (box) {
    box.x += 20;
  });
}

function destruir() {
  if (boxGroup.length > 0) {
    boxGroup.getAt(0).destroy();
  }
}

function update() {
}
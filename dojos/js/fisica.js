// http://phaser.io/docs/2.6.2/Phaser.Physics.P2.html
// http://phaser.io/docs/2.6.2/Phaser.Physics.P2.Body.html

game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('image1', 'assets/grama50.png');
  game.load.image('image2', 'assets/circle50.png');
}

function create() {
  game.add.text(0, 0, 'Clique para atirar', {fill: '#ffffff'});
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 500;

  game.input.onDown.add(disparar);
}

function disparar() {
  var pos = game.input.mousePointer;
  var sprite = game.add.sprite(pos.x, pos.y, 'image1');
  
  game.physics.p2.enable(sprite);
  sprite.body.velocity.x = 1500;
  sprite.body.velocity.y = -1000;
  sprite.body.angularVelocity = Math.random() * 10;

  if (Math.random() < 0.5) {
    sprite.loadTexture('image2');
    sprite.body.setCircle(sprite.width / 2);
  }

  // ## outras propriedades:
  // game.physics.p2.restitution
  // sprite.body.fixedRotation
  // sprite.body.damping
  // sprite.body.kinematic / static / dynamic
  // sprite.body.force
  // sprite.body.onBeginContact
}

function update() {
}
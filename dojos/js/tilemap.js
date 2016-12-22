game = new Phaser.Game(600, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap('fase1', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('spritesheet', 'assets/spritesheet.png', 21, 21, -1, 2, 2);
}

function create() {
  map = game.add.tilemap('fase1');
  map.addTilesetImage('spritesheet', 'spritesheet');

  layerBackground = map.createLayer('background');
  layerBlocks = map.createLayer('blocks');

  layerBlocks.resizeWorld();

  // Opcional:
  inicializaFisica();
  ativaColisaoDoMapa();
  criaCaixaVoadora();
}

function inicializaFisica() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 500;
}

function ativaColisaoDoMapa() {
  map.setCollisionBetween(1, 899); // tile IDs
  game.physics.p2.convertTilemap(map, layerBlocks);
}

function criaCaixaVoadora() {
  caixa = game.add.sprite(0, 0, 'spritesheet');
  caixa.frame = 194;

  game.physics.p2.enable(caixa);
  caixa.body.velocity.x = 500;
}

function update() {
}
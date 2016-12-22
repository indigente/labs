game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('image', 'assets/grama50.png');
}

function create() {
  sprite = game.add.sprite(0, 50, 'image');
  sprite.speed = 0.5;
  sprite.direction = 1;

  addSlider(sprite, 'speed', 0.1, 2, 0.1);
  addSlider(sprite, 'y', 0, game.world.height - sprite.height);
}

function addSlider(obj, property, min, max, step) {
  var slider = document.createElement('input');
  slider.type = 'range';
  slider.value = obj[property];
  slider.min = min;
  slider.max = max;
  slider.step = step;

  var text = document.createElement('input');
  text.type = 'text';
  text.size = 6;
  text.value = obj[property];

  document.body.appendChild(slider);
  document.body.appendChild(text);

  slider.addEventListener('input', function (evt) {
    obj[property] = evt.target.value;
    text.value = evt.target.value;
  });
  text.addEventListener('input', function (evt) {
    obj[property] = evt.target.value;
    slider.value = evt.target.value;
  });
}

function update() {
  sprite.x += sprite.speed * sprite.direction * game.time.elapsed;

  if (sprite.x + sprite.width > game.world.width) {
    sprite.x = game.world.width - sprite.width;
    sprite.direction = -1;
  } else if (sprite.x < 0) {
    sprite.x = 0;
    sprite.direction = 1;
  }
}
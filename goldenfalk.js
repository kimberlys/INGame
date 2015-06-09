var game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});

var player,
cursors,
platforms;

function preload() {
	game.load.image('sky', 'sky.png');
	game.load.spritesheet('pow', 'cowthing.png', 64, 72);
	game.load.image ('grass', 'grass.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.world.setBounds (0, 0, 8000, game.world.height);
	game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');

	player = game.add.sprite(32, game.world.height - 100, 'pow');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 600;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	game.camera.follow(player);

	platforms = game.add.group();
	platforms.enableBody = true;

	platform(0, game.world.height - 32, game.world.width, 32);
	platform (100, 200, 200, 32);

	cursors = game.input.keyboard.createCursorKeys();

}

function platform(x, y, width, height){
	var ledge = new Phaser.TileSprite(game, x, y, width, height, 'grass');
	platforms.add(ledge);
	ledge.body.immovable = true;
}

var playerSpeed = 1000;
var jumpSpeed = 500;

function update() {
	game.physics.arcade.collide(player, platforms);
	player.body.velocity.x = 0;
	if (cursors.right.isDown) {
		player.body.velocity.x = playerSpeed;
		player.animations.play('right');
	} else if (cursors.left.isDown) {
		player.body.velocity.x = -playerSpeed;
		player.animations.play('left');
	}
	else{
		player.animations.stop();
		player.frame=4;
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -jumpSpeed;
	}
}
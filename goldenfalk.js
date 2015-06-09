var playerSpeed = 120;
var jumpSpeed = 500;
var inviahead = 300;
var game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});

var player, invi, bomberman,
cursors,
platforms;

function preload() {
	game.load.image('sky', 'sky.png');
	game.load.spritesheet('pow', 'cowthing.png', 64, 72);
	game.load.image ('grass', 'grass.png');
	game.load.image('invi', 'invisible.png',64,72);
	game.load.spritesheet('bomberman','dude.png',32,48);
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
	

	platforms = game.add.group();
	platforms.enableBody = true;

	platform(0, game.world.height - 32, game.world.width, 32);
	platform (100, 200, 200, 32);

	cursors = game.input.keyboard.createCursorKeys();
	invi=game.add.image(0, 0, 'invi')
	game.camera.follow(invi);

	bomberman=game.add.sprite(0, game.world.height - 100, 'bomberman')
	game.physics.arcade.enable(bomberman);
	bomberman.body.gravity.y = 600;
	bomberman.body.collideWorldBounds = true;


}

function platform(x, y, width, height){
	var ledge = new Phaser.TileSprite(game, x, y, width, height, 'grass');
	platforms.add(ledge);
	ledge.body.immovable = true;
}



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
	//camera is following invi
	//we want the camera to see ahead, therefore
	//position of invi to be in front of the cow 

	invi.position.x = player.position.x + inviahead;
	//Puts bomberman on grass
	game.physics.arcade.collide(bomberman, platforms);
	//bomberman speed
	bomberman.body.velocity.x = 100;

	//make bomberman and cow collide
	game.physics.arcade.collide(player, bomberman);
}
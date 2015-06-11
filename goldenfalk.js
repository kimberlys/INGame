// GAME VARIABLES

var playerSpeed = 150;
var playerStartX = 100; // this makes the player sprite positioned a little further into the canvas, so that player and enemy don't collide immediately
var enemyDistance = 5; // enemy will be slower than the player by this number
var jumpSpeed = 400;
var inviAhead = 300;

// GAME COMPONENTS

var player, 
	invi, 
	enemy, 
	car,
	wall, 
	giphy,
	cursors,
	background,
	gameOverImage,
	platforms;



var game = new Phaser.Game(1300, 450, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});

// GAME LOGIC

function preload() {
    game.load.image('giphy','giphy.gif')
	game.load.spritesheet('pow', 'smallroshida.png', 25, 50);
	game.load.image ('grass', 'grass.png');
	game.load.image('invi', 'invisible.png',64,72);
	// game.load.image('car', 'car.png',256,256);
	game.load.spritesheet('enemy','smallgolden.png',20,30);
	game.load.image('gameover','game_over.jpg',480,480);
	// game.load.image('wall','brickwall.png',480,480);
	game.load.image('background','background3.png',452,450);
	
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.world.setBounds (0, 0, 8000, game.world.height);
	game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

	player = game.add.sprite(playerStartX, game.world.height - 100, 'pow');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 600;
	player.body.collideWorldBounds = true;
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	
	

	platforms = game.add.group();
	platforms.enableBody = true;

	platform(0, game.world.height - 32, game.world.width, 32);
	platform (1500, 355, 90, 20);
	platform (1700, 355, 90, 20);
	platform (2200, 355, 90, 30);
    platform (2390, 340, 90, 30);
	platform (2500, 320, 110, 30);
	platform (2700, 300, 150, 30);
	platform (3100, 355, 90, 20);
	platform (3400, 355, 90, 30);
	platform (3500, 355, 90, 30);
	platform (3800, 355, 60, 20);
	platform (4200, 355, 60, 30);
	platform (4600, 355, 60, 30);
	platform (4700, 355, 60, 30);
	platform (4900, 355, 60, 20);
	platform (5100, 355, 60, 20);
	platform (5150, 355, 80, 20);
	platform (5400, 355, 60, 30);
	platform (6000, 355, 60, 30);
	platform (6300, 355, 60, 30);
	platform (6800, 355, 60, 30);
	platform (6900, 355, 80, 20);
	platform (7050, 300, 80, 20);
	platform (7170, 250, 100, 20);
	platform (7300, 1, 80, 90);
	platform (7300, 150, 80, 280);
	
	


	cursors = game.input.keyboard.createCursorKeys();
	invi=game.add.image(0, 0, 'invi')
	game.camera.follow(invi);

	enemy=game.add.sprite(0, game.world.height - 100, 'enemy')
	game.physics.arcade.enable(enemy);
	enemy.body.gravity.y = 600;
	enemy.body.collideWorldBounds = true;

	

	gameOverImage = game.add.image(0, 0, 'gameover');
	gameOverImage.visible = false;
	


}


function platform(x, y, width, height){
	var ledge = new Phaser.TileSprite(game, x, y, width, height, 'grass');
	platforms.add(ledge);
	ledge.body.immovable = true;
	
}

function update() {

	// if the player is not alive
	// then return, ie exit this function
	if (player.alive = false) return


	game.physics.arcade.collide(player, platforms);


	
	player.body.velocity.x = 0; // i'm setting ht player to stop horizontally 
	// if (player.body.velocity.x == 0) // i'm checking if the player is not moving

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
	invi.position.x = player.position.x + inviAhead;

	//Puts enemy on grass
	game.physics.arcade.collide(enemy, platforms);
	
	//enemy speed
	enemy.body.velocity.x = playerSpeed - enemyDistance;

	// check if enemy and player collide
	// if they collide, call the playerAndEnemyAreColliding function
	game.physics.arcade.collide(player, enemy, playerAndEnemyAreColliding, null, this);

}






function playerAndEnemyAreColliding (enemy, player) {

	console.log('playerAndEnemyAreColliding');

	gameOver();

}

function gameOver() {

	// display gameOverImage
	gameOverImage.visible = true;

	// gameOverImage to follow invi
	gameOverImage.position.x = invi.position.x

	// stop the game 
	player.kill();
	enemy.kill();

}

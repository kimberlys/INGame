var playerSpeed = 120;
var jumpSpeed = 500;
var inviahead = 300;


var player, 
	invi, 
	enemy, 
	car,
	wall, 
	giphy,
	cursors,
	platforms;



var game = new Phaser.Game(1300, 450, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});


function preload() {
    game.load.image('giphy','giphy.gif')
	game.load.spritesheet('pow', 'cowthing.png', 64, 72);
	game.load.image ('grass', 'grass.png');
	game.load.image('invi', 'invisible.png',64,72);
	game.load.image('car', 'Car.png',300,150);
	game.load.spritesheet('enemy','dude.png',32,48);
	game.load.image('gameover','game_over.jpg',480,480);
	game.load.image('wall','brickwall.png',480,480);
	
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.world.setBounds (0, 0, 8000, game.world.height);
	game.add.tileSprite(0, 0, game.world.width, game.world.height, 'wall');

	player = game.add.sprite(32, game.world.height - 100, 'pow');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 600;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	

	platforms = game.add.group();
	platforms.enableBody = true;

	platform(0, game.world.height - 32, game.world.width, 32);
	platform (300, 400, 300, 150);
	platform (300, 400, 300, 150);


	cursors = game.input.keyboard.createCursorKeys();
	invi=game.add.image(0, 0, 'invi')
	game.camera.follow(invi);

	enemy=game.add.sprite(0, game.world.height - 100, 'enemy')
	game.physics.arcade.enable(enemy);
	enemy.body.gravity.y = 600;
	enemy.body.collideWorldBounds = true;

	


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
	//Puts enemy on grass
	game.physics.arcade.collide(enemy, platforms);
	//enemy speed
	enemy.body.velocity.x = 100;

	//make enemy and cow collide
	game.physics.arcade.collide(player, enemy, collisionHandler, null, this);

	//  Run collision
    //game.physics.arcade.overlap(enemy, player, collisionHandler, null, this);
    
    //player.touching.left


	 //if (player,enemy=collide () < 1)
    //{
        //player.collide();
       
//function collisionHandler
      // if player+enemy collide[display:gameover]
        //the "click to restart" handler
     
    
	
	
	//if(player,enemy=collide){
		//display:gameover;
		//else} 
}




function collisionHandler (enemy, player) {







	console.log('collisionHandler')

    //  When a bullet hits an alien we kill them both
    /*bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        stateText.text = " You Won, \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }*/
}




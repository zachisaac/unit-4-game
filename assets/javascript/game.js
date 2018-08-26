//Player Picks A Character
//Set objects for all characters
var game = {
    characters: {
        'Obi-Wan Kenobi': {
            image: 'obi-wan-kenobi.jpeg',
            baseAttackPower: 8,
            healthPoint: 120,
        },
        'Luke Skywalker': {
            image: 'luke-skywalker.jpg',
            baseAttackPower: 5,
            healthPoint: 100,
        },
        'Darth Sidious': {
            image: 'darth-sidious.jpeg',
            baseAttackPower: 20,
            healthPoint: 150,
        },
        'Darth Maul': {
            image: 'darth-maul.jpeg',
            baseAttackPower: 25,
            healthPoint: 180,
        },
    },
    enemies: {},
    defender: {},
    userCharacter: {},
    gameOver: false,
    attackPower: 0,
    counterAttackPower: 0,
    userPickedCharacterName: "",
    userPickedDefenderName: "",

    // create HP and attack power randomly
    setUpAttackPowerAndHP: function() {

        for (var character in this.characters) {
            this.characters[character].baseAttackPower = Math.floor(Math.random() * (30 - 2) + 2);
            this.characters[character].healthPoint = Math.floor(Math.random() * (200 - 100) + 100);
        }
    },

    // add all characters to html
    addCharaters: function() {
        $("#enemiesHeader").hide();
        var i = 1;
        for (var character in this.characters) {
            var id = '#character' + i;
            var html = '<div class="characterName">' + character + '</div>';
            html += '<img src="assets/images/' + this.characters[character].image;
            html += '" class="characterImg" alt="' + character + '">';
            html += '<div class="characterHP">' + this.characters[character].healthPoint + '</div>';
            $(id).append(html);
            i++;
        };
    },

    // check game rules
    attack: function() {
        if (!this.gameOver) {
            if (jQuery.isEmptyObject(this.userCharacter)) {
                $("#info").html("Please choose your character.");
            } else if (jQuery.isEmptyObject(this.defender)) {
                $("#info").html("Please choose an Enemy.");
            } else {
                this.attackPower = this.attackPower + this.userCharacter.baseAttackPower;
                this.counterAttackPower = this.defender.baseAttackPower;
                this.fight();
            }
        }
    },

    // check user character and defender HP to see who wins
    fight: function() {
        this.attackDefender();
        if (this.defender.healthPoint <= 0) {
            this.printMessageAndClearObj();
        } else {
            this.attackUserCharacter();
            if (this.userCharacter.healthPoint <= 0) {
                $("#info").html("You been defeted.... GAME OVER!!!");
                this.gameOver = true;
            } else {
                this.printDamage();
            }
        }
    },

    // calculate and print defender damage
    attackDefender: function() {
        this.defender.healthPoint -= this.attackPower;
        $(".defenderHP").html(this.defender.healthPoint);
    },

    attackUserCharacter: function() {
        this.userCharacter.healthPoint -= this.counterAttackPower;
        $(".userCharacterHP").html(this.userCharacter.healthPoint);
    },

    // reset game
    resetGame: function() {  
        $("#userCharacter1").html('<img src="http://placehold.it/100x90/ffffff?text=Character">');
        $("#defender").html('<img src="http://placehold.it/100x90/000000?text=Defender">');          
        $("#charactersHeader").show();
        $("#info").empty();
        this.clearDiv(this.enemies, "enemy");
        
        this.enemies = {};
        this.userCharacter = {};
        this.defender = {};
        this.userPickedDefenderName = "";
        this.userPickedCharacterName = "";
        this.attackPower = 0;
        this.counterAttackPower = 0;
        this.addCharaters();
        this.gameOver = false;            
    },

    // create objects for enemies and user character 
    // and print them
    showUserCharacterAndEnemies: function() {
        this.createUserCharacterObj();
        this.createEnemiesObj(this.userPickedCharacterName);
        $("#charactersHeader").hide();
        this.clearDiv(this.characters, "character");
        this.displayUserCharacter();
        $("#enemiesHeader").show();
        this.displayEnemies();
    },

    // create object for defender, delete defender object
    // from enemies and print it.
    showDefender: function(defenderName) {
        if (this.userPickedDefenderName === "") {
            $("#info").empty();
            this.userPickedDefenderName = defenderName;
            this.clearDiv(this.enemies, "enemy");
            this.createDefenderObj();
            this.createEnemiesObj(this.userPickedDefenderName);
            this.displayEnemies();
            this.displayDefender();
        }
    },

    // create defender object
    createDefenderObj: function() {
        this.defender = jQuery.extend(true, {}, this.characters[this.userPickedDefenderName]);
    },

    // create enemies object
    createEnemiesObj: function(obj) {
        if (jQuery.isEmptyObject(this.enemies)) {
            this.enemies = jQuery.extend(true, {}, this.characters);
        }
        delete this.enemies[obj];
    },

    //create user character object
    createUserCharacterObj: function() {
        this.userCharacter = jQuery.extend(true, {}, this.characters[this.userPickedCharacterName]);
    },

    // print defender
    displayDefender: function() {
        var html = '<div class="defenderName">' + this.userPickedDefenderName + '</div>';
        html += '<img src="assets/images/' + this.defender.image;
        html += '" class="defenderImg" alt="' + this.userPickedDefenderName + '">';
        html += '<div class="defenderHP">' + this.defender.healthPoint + '</div>';
        $("#defender").html(html);
    },

    // print user character
    displayUserCharacter: function() {
        var html = '<div class="characterName">' + this.userPickedCharacterName + '</div>';
        html += '<img src="assets/images/' + this.userCharacter.image;
        html += '" class="characterImg" alt="' + this.userPickedCharacterName + '">';
        html += '<div class="userCharacterHP">' + this.userCharacter.healthPoint + '</div>';
        $("#userCharacter1").html(html);
    },

    // print enemies
    displayEnemies: function() {
        var i = 1;
        var enemyId = "";
        for (var enemyName in this.enemies) {
            enemyId = '#enemy' + i;
            var html = '<div class="enemyName">' + enemyName + '</div>';
            html += '<img src="assets/images/' + this.enemies[enemyName].image;
            html += '" class="enemyImg" alt="' + enemyName + '">';
            html += '<div class="enemyHP">' + this.enemies[enemyName].healthPoint + '</div>';
            $(enemyId).html(html);
            i++;
        }
    },

    // print user character and defender damage
    printDamage: function() {
        var html = 'You attacked ' + this.userPickedDefenderName;
        html += ' for ' + this.attackPower + ' damage.<br>';
        html += this.userPickedDefenderName + ' attacked you back for ';
        html += this.counterAttackPower + ' damage.';
        $("#info").html(html);
    },

    // print message and clear defender object
    printMessageAndClearObj: function() {
        var html = "You have defeted " + this.userPickedDefenderName;
        html += "!. You can choose to fight another enemy."
        $("#info").html(html);
        $("#defender").empty();
        this.defender = {};
        this.userPickedDefenderName = "";
        this.counterAttackPower = 0;
        if (jQuery.isEmptyObject(this.enemies)) {
            $("#info").html("You Won!!!!  GAME OVER!!!");
            this.gameOver = true;
        }
    },

    // clear all character holders
    clearDiv: function(obj, idName) {
        var id = "";
        for (var i = 1; i <= Object.keys(obj).length; i++) {
            id = "#" + idName + i;
            $(id).empty();
        }
    },

    // set up all event handlers
    setupEventHandlers: function() {
        var self = this;

        $(".characters").on('click', ".characterImg", function() {
            self.userPickedCharacterName = $(this).attr("alt");
            self.showUserCharacterAndEnemies();
        });

        $(".enemies").on('click', ".enemyImg", function() {
            self.showDefender($(this).attr("alt"));
        });

        $("#attack").on('click', function() {
            self.attack();
        });

        $("#reset").on('click', function() {
            self.resetGame();
            self.clearDiv(self.characters, "character");
            self.addCharaters();
        });

        $("#refresh").on('click', function() {
            self.resetGame();
            self.setUpAttackPowerAndHP();
            self.clearDiv(self.characters, "character");
            self.addCharaters();
        });
    }
} //end game object

$(document).ready(function() {
game.addCharaters();
game.setupEventHandlers();
});






//Characters are moved
//Player Attacks
//Outcome of attack

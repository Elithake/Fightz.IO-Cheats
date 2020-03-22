var gameMode = 0;

var canvasWIDTH = window.innerWidth;
var canvasHEIGHT = window.innerHeight;
var canvasWIDTHdiff, canvasHEIGHTdiff;

var WIDTH = 1440;
var HEIGHT = 760;

var mapWIDTH = 15000;
var mapHEIGHT = 15000;

var serverFPS = 12;
var FPS = 60;

var intervalTimer = 0;
var adTimer = 0,
	adTimer2 = 0;
var deathTimer = 0;
var deathTimerLimit = 0;

var mouseAngle, mouseDistance;

var typing = false;
var tToggle = true;

var canvas = document.getElementById("ctx");
canvas.width = WIDTH;
canvas.height = HEIGHT;

var finishLoading = 2;
var selectedSkin = 1;
var selectedBody = 1;
var urlCode = "";
var oldCoins = 0;
var levelRecord = 0;
var scoreRecord = 0;
var levelRecordThisGame = 0;
var scoreRecordThisGame = 0;
var firstLogin = 0;

var isHome = false;
var isPaused = false;

var videoAdStyle = 0;
var playingVideoAd = 0;

if (/localhost/.test(window.location.href)) {
	var cdnPath = "";
} else {
	var cdnPath = "https://playem.io/cache/fightzio/";
}

var debug = false;

var itemCode = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 2, 1, 2], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 11, 12, 1, 2, 3, 4, 5, 13, 14, 7, 8, 9, 10, 11, 12, 13, 14, 6, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 1, 2, 3, 4, 5, 1, 6, 7, 8, 9, 10, 11, 12, 36, 36, 37, 37, 38, 38]];

var itemPrice = [-1, 0, 0, 0, 0, 0, 10000, 10000, 100000, 50000, 100000, 10000, 0, 50000, 500000, 50000, 100000, 50000, 500000, 0, 0, 0, 0, 0, 500000, 500000, 0, 0, 0, 0, 10000, 100000, 500000, 500000, 0, 500000, 500000, 10000, 10000, 10000, 10000, 100000, 100000, 100000, 100000, 50000, 50000, 50000, 50000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 500000, 500000, 500000, 500000, 100000, 100000, 100000, 100000, 1500000, 1500000, 1500000, 1500000, 1000000, 1000000, 1000000, 1000000, 1500000, 1500000, 1500000, 1500000, 0, 500000, 500000, 500000, 500000, 0, 500000, 500000, 500000, 1000000, 1000000, 1000000, 1000000, 0, 0, 50000, 50000, 50000, 50000];

var socket = io();

if (/ref/.test(window.location.href)) {
	urlCode = "/?ref";
}

aiptag.cmd.player.push(function() {
	adplayer = new aipPlayer({
		AD_WIDTH: 960,
		AD_HEIGHT: 540,
		AD_FULLSCREEN: true,
		AD_CENTERPLAYER: false,
		LOADING_TEXT: "Loading...",
		PREROLL_ELEM: function() {
			return document.getElementById("preroll");
		},
		AIP_COMPLETE: function() {},
		AIP_REMOVE: function() {}
	});
});

var signDiv = document.getElementById("signDiv");

var signDivUsername = document.getElementById("signDiv-username");

var signDivEmail = document.getElementById("signDiv-email");

var signDivPassword = document.getElementById("signDiv-password");

var respawnButton = document.getElementById("respawnButton");

var respawn2Button = document.getElementById("respawn2Button");

var loadingButton = document.getElementById("loadingButton");

var serverNow;

if (/as/.test(window.location.href)) {
	serverNow = "as";
} else if (/ru/.test(window.location.href)) {
	serverNow = "ru";
} else if (/eu/.test(window.location.href)) {
	serverNow = "eu";
} else if (/na/.test(window.location.href)) {
	serverNow = "na";
} else {
	isHome = true;
}

if (serverNow == "as") {
	document.getElementById("server3").style.display = "inline";
	document.getElementById("newServer3").style.textDecoration = "underline";
} else if (serverNow == "ru") {
	document.getElementById("server4").style.display = "inline";
	document.getElementById("newServer4").style.textDecoration = "underline";
} else if (serverNow == "eu") {
	document.getElementById("server2").style.display = "inline";
	document.getElementById("newServer2").style.textDecoration = "underline";
} else if (serverNow == "na") {
	document.getElementById("server1").style.display = "inline";
	document.getElementById("newServer1").style.textDecoration = "underline";
}

if (isHome) {
	document.getElementById("menuDiv").style.display = "none";
	document.getElementById("serverDiv").style.display = "block";
}

if (!/fightz\.io/.test(document.referrer) && !isHome && !/party/.test(window.location.href)) {
	self.location = "https://fightz.io";
}

if (/serverRestarted/.test(window.location.href)) {
	self.location = /fightz.io/.test(document.referrer) ? document.referrer : "https://fightz.io";
} else if (window.top.location !== window.location) {
	displaySpawnMessage('Play on Fightz.io Official Site (<a href="https://fightz.io" target="_blank">https://fightz.io</a>) for NEW UPDATES!');
}

if (/serverRestarted/.test(document.referrer)) {
	displaySpawnMessage("Reconnected.");
}

var goToServer = function(host) {
	var rand = Math.random();
	if (/ref=google/.test(window.location.href)) {
		window.open("https://" + host + "-5.fightz.io/?ref=play", "_self");
		return;
	}
	if (rand < .5) {
		window.open("https://" + host + "-3.fightz.io", "_self");
	} else {
		window.open("https://" + host + "-3.fightz.io", "_self");
	}
	acceptCookieConsent();
};

var goToMode = function(mode) {
	if (/na/.test(window.location.href)) {
		server = "na";
	} else if (/eu/.test(window.location.href)) {
		server = "eu";
	} else if (/ru/.test(window.location.href)) {
		server = "ru";
	} else if (/as/.test(window.location.href)) {
		server = "as";
	}

	if (mode == "normal") {
		window.open("https://" + server + ".fightz.io", "_self");
	} else if (mode == "pvp") {
		window.open("https://" + server + "-3.fightz.io", "_self");
	} else if (mode == "team") {
		window.open("https://" + server + "-5.fightz.io", "_self");
	}
};

var playNow = function() {
	if (/ref=play/.test(window.location.href)) {
		socket.emit("signIn", {
			username: signDivUsername.value + "_"
		});
	} else if (window.location != window.parent.location) {
		socket.emit("signIn", {
			username: signDivUsername.value + "-"
		});
	} else {
		socket.emit("signIn", {
			username: signDivUsername.value
		});
	}
};

loginButton.onclick = function() {
	socket.emit("login", {
		email: signDivEmail.value,
		password: signDivPassword.value
	});
};

registerButton.onclick = function() {
	socket.emit("register", {
		email: signDivEmail.value,
		password: signDivPassword.value
	});
};

respawnButton.onclick = function() {
	respawnButton.style.display = "none";
	respawn2Button.style.display = "none";
	document.getElementById("respawnLoadingButton").style.display = "inline-block";
	gotoSection("home");
};

var loadImage = function(image) {
	if (image.src == "") {
		image.src = image.dataURL;
	}
};

var Img = {};
Img.other = {};
var other_images = ['tutorial.png', 'minimap.png', 'glow.png', 'shield1.png', 'lvlup.png', 'redFlag.png',
    'blueFlag.png', 'levelBackground.png', 'pet1.png', 'pet2.png', 'pet3.png', 'pet4.png',
    'tutorialAngle.png', 'stats.png', 'dashIcon.png'];
for (var i = 1; i <= other_images.length; i++) {
	Img.other[i] = new Image();
	Img.other[i].src = cdnPath + "client/img/" + other_images[i - 1];
}

Img.ride = {};
Img.ride[1] = new Image();
Img.ride[1].dataURL = cdnPath + "client/img/ride1.png";

Img.back = {};
for (var i = 1; i <= 12; i++) {
	Img.back[i] = new Image();
	Img.back[i].dataURL = cdnPath + "client/img/back" + i + ".png";
}

Img.skin = {};
for (var i = 1; i <= 38; i++) {
	Img.skin[i] = new Image();
	Img.skin[i].dataURL = cdnPath + "client/img/skin" + i + ".png";
}

Img.body = {};
for (var i = 1; i <= 38; i++) {
	Img.body[i] = new Image();
	Img.body[i].dataURL = cdnPath + "client/img/body" + i + ".png";
}

Img.decoration = {};
for (var i = 1; i <= 75; i++) {
	Img.decoration[i] = new Image();
	var path = cdnPath + "client/img/decoration" + i + ".png";
	if (i < 11 || (i > 14 && i < 69) || i > 73) {
		Img.decoration[i].dataURL = path;
	} else {
		Img.decoration[i].src = path;
	}
}

Img.mob = {};
for (var i = 1; i <= 57; i++) {
	Img.mob[i] = new Image();
	Img.mob[i].dataURL = cdnPath + "client/img/mob" + i + ".png";
}

Img.eye = {};
Img.eye[1] = new Image();
Img.eye[1].src = cdnPath + "client/img/eye.png";

Img.color = [, "#F2BA00", "#479924", "#007FAA", "#C40000", "#8948A8", "#F2F2F2"];

Img.hand = {};
for (var i = 1; i <= 6; i++) {
	Img.hand[i] = new Image();
	Img.hand[i].dataURL = cdnPath + "client/img/hand" + i + ".png";
}

Img.head = {};
for (var i = 1; i <= 6; i++) {
	Img.head[i] = new Image();
	Img.head[i].dataURL = cdnPath + "client/img/head" + i + ".png";
}

Img.food = {};
for (var i = 1; i <= 9; i++) {
	Img.food[i] = new Image();
	Img.food[i].dataURL = cdnPath + "client/img/" + (i = 5 ? "grave" : "food" + i) + ".png";
}

Img.weapon = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
for (var i = 1; i <= Img.weapon.length; i++) {
	for (var j = 1; j <= 17; j += 2) {
		var number;
		if (i - 1 == 0) {
			number = j.toString();
		} else if (i - 1 > 0) {
			number = (i - 1).toString();
			if (j < 10) {
				number = number.concat("0");
			}
			var secondHalf;
			if ((i > 3 && i < 14 && i != 10) && j == 17) {
				secondHalf = "15";
			} else if (i > 14 && i < 18) {
				secondHalf = j > 10 ? "01" : "1";
			} else {
				secondHalf = j;
			}
			number = number.concat(secondHalf);
		}

		Img.weapon[i][j] = new Image();
		Img.weapon[i][i].dataURL = cdnPath + "client/img/weapon" + number + ".png";
	}
}

Img.bullet = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
for (var i = 1; i <= Img.bullet.length; i++) {
	for (var j = 1; j <= 17; j += 2) {
		var number;
		if (i - 1 == 0) {
			number = j.toString();
		} else if (i - 1 > 0) {
			number = (i - 1).toString();
			if (j < 10) {
				number = number.concat("0");
			}
			var secondHalf;
			if ((i > 3 && i < 14 && i != 10) && j == 17) {
				secondHalf = "15";
			} else if (i > 14 && i < 18) {
				secondHalf = j > 10 ? "01" : "1";
			} else {
				secondHalf = j;
			}
			number = number.concat(secondHalf);
		}

		Img.bullet[i][j] = new Image();
		Img.bullet[i][i].dataURL = cdnPath + "client/img/bullet" + number + ".png";
	}
}

var Sound = {};

Sound.weapon = {};
var sounds = ['staff', 'sword', 'bow', 'tome', 'wand', 'crossbow',
    'dagger', 'blowgun', 'claw', 'orb', 'axe', 'shuriken',
    'scythe', 'spear', 'skull', 'icetome', 'naturestaff', 'amulet'];
for (var i = 1; i <= 18; i++) {
	Sound.weapon[i] = new Audio("client/sound/" + sounds[i] + ".mp3?v=1.1");
}

Sound.other = {};
Sound.other[0] = new Audio("client/sound/death.mp3?v=1.1");

var loadMusic = false;

Sound.music = {};

var soundVolume = .7;

var toggleSound = function() {
	if (soundVolume !== 0) {
		soundVolume = 0;
		document.getElementById("buttonSoundImage").src = cdnPath + "client/img/sound1.png";
	} else {
		soundVolume = .7;
		document.getElementById("buttonSoundImage").src = cdnPath + "client/img/sound2.png";
	}
};

var musicVolume = .7;

var toggleMusic = function() {
	if (musicVolume !== 0) {
		musicVolume = 0;
		document.getElementById("buttonMusicImage").src = cdnPath + "client/img/music1.png";
	} else {
		musicVolume = .7;
		document.getElementById("buttonMusicImage").src = cdnPath + "client/img/music2.png";
	}
};

var musicNumber = 0,
	music;

var manageMusic = function() {
	if (!loadMusic) {
		return;
	}
	music = Sound.music[musicNumber];
	if (playingVideoAd == 0) {
		music.volume = musicVolume;
	} else {
		music.volume = 0;
	}
	music.onended = function() {
		console.log(musicNumber);
		if (musicNumber < Object.keys(Sound.music).length - 1) {
			musicNumber++;
		} else {
			musicNumber = 0;
		}
		music = Sound.music[musicNumber];
	};
	music.play();
};

var isFullscreen = false;

var toggleFullscreen = function() {
	var body = document.documentElement;
	if (isFullscreen) {
		isFullscreen = false;
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	} else {
		isFullscreen = true;
		if (body.requestFullscreen) {
			body.requestFullscreen();
		} else if (body.mozRequestFullScreen) {
			body.mozRequestFullScreen();
		} else if (body.webkitRequestFullscreen) {
			body.webkitRequestFullscreen();
		} else if (body.msRequestFullscreen) {
			body.msRequestFullscreen();
		}
	}
};

var togglePause = function() {
	socket.emit("keyPress", {
		inputId: "pause",
		state: true
	});
	isPaused = true;
};

var managePause = function() {
	if (Player.list[selfId].animation == 2 && Player.list[selfId].map == 1) {
		document.getElementById("buttonPause").style.display = "inline-block";
	} else {
		document.getElementById("buttonPause").style.display = "none";
	}
};

var ctx = document.getElementById("ctx").getContext("2d");

var ctxFont = "";

function changeCtxFont(font) {
	if (ctxFont != font) {
		ctxFont = font;
		ctx.font = font;
	}
}

changeCtxFont("22px sans-serif");

function changeInnerHTML(node, text) {
	if (typeof text != "string") {
		text = text + "";
	}
	if (node.innerHTML != text) {
		node.innerHTML = text;
	}
}

var Player = function(data) {
	var entity = {};
	entity.id = data.a;
	entity.username = data.b;
	entity.map = data.f;
	entity.score = data.c;
	entity.level = data.d;
	entity.type = data.e;
	entity.skin = data.g;
	entity.body = data.h;
	entity.color = data.i;
	entity.back = data.m;
	entity.ride = data.n;
	entity.hpMax = data.j;
	entity.animation = data.k;
	entity.chatMessage = data.l;
	entity.isHere = 5 * FPS;
	entity.angle = 0;
	entity.scale = 1;
	if (Math.random() < .33) {
		entity.pet = 9;
	} else if (Math.random() > .5) {
		entity.pet = 10;
	} else {
		entity.pet = 11;
	}
	entity.update = function() {
		entity.isHere--;
		if (!entity.checkIsHere()) {
			return;
		}
		if (selfId == entity.id) {
			entity.updateStats();
		}
		if (!Player.leaderboardScore[2] || entity.score >= Player.leaderboardScore[2]) {
			entity.glow = 1;
		} else {
			entity.glow = 0;
		}
		if (!Player.leaderboardScore[9] || entity.score >= Player.leaderboardScore[9]) {
			entity.topTen = 1;
		} else {
			entity.topTen = 0;
		}
		if (Math.abs(entity.x - entity.newX) < 200 && Math.abs(entity.y - entity.newY) < 200) {
			entity.x += (entity.newX - entity.x) / (FPS / serverFPS);
			entity.y += (entity.newY - entity.y) / (FPS / serverFPS);
			if (entity.hp < entity.hpMax) {
				entity.hp += (entity.newHp - entity.hp) / (FPS / serverFPS);
			} else {
				entity.hp = entity.newHp;
			}
			if (Math.abs(entity.newAngle - entity.angle) > 180) {
				if (entity.newAngle > entity.angle) {
					entity.angle += 360;
				} else {
					entity.angle -= 360;
				}
			}
			if (Math.abs(entity.angle - entity.petAngle) > 180) {
				if (entity.angle > entity.petAngle) {
					entity.petAngle += 360;
				} else {
					entity.petAngle -= 360;
				}
			}
			entity.angle += (entity.newAngle - entity.angle) / (FPS / serverFPS);
			if (!entity.petIntervalRandom || entity.petIntervalRandom++ > FPS * 60) {
				entity.petAngleRandom = 45 - 90 * Math.random();
				entity.petIntervalRandom = 60 * FPS * Math.random();
			}
			entity.petNewAngle = entity.angle + entity.petAngleRandom;
			if (entity.petAngle < 9999) {
				entity.tempSign = (entity.petNewAngle - entity.petAngle) / Math.abs(entity.petNewAngle - entity.petAngle);
				entity.petAngle += entity.tempSign * Math.min(Math.abs(entity.petNewAngle - entity.petAngle), 30) / (FPS * 3 / serverFPS);
			} else {
				entity.petAngle = 0;
			}
			entity.score += (entity.newScore - entity.score) / (FPS / serverFPS);
			entity.score = Math.ceil(entity.score);
		} else {
			entity.x = entity.newX;
			entity.y = entity.newY;
			entity.angle = entity.newAngle;
			entity.petAngle = entity.newAngle;
			entity.score = entity.newScore;
		}
	};
	entity.getTutorialAngle = function() {
		var x, y;
		var ret = "hidden";
		if (entity.level < 11) {
			if (entity.level >= 9) {
				x = mapWIDTH * 4 / 6 - 600;
				y = mapHEIGHT - 600;
			} else if (entity.level >= 7) {
				x = mapWIDTH * 1 / 6 + 600;
				y = mapHEIGHT * 2 / 6 + 600;
			} else if (entity.level >= 5) {
				x = mapWIDTH * 5 / 6 - 600;
				y = mapHEIGHT * 4 / 6 - 600;
			} else if (entity.level >= 3) {
				x = mapWIDTH * 1 / 6 + 600;
				y = mapHEIGHT * 5 / 6 - 600;
			} else {
				x = mapWIDTH / 2;
				y = mapHEIGHT * 3.5 / 6;
			}
			ret = getAngleFromPoints(entity.x, entity.y, x, y);
			if (Math.abs(entity.x - x) < 400 && Math.abs(entity.y - y) < 400) {
				ret = "hidden";
			}
		}
		return ret;
	};
	entity.updateStats = function() {
		if (entity.level == entity.oldLevel && entity.type == entity.oldType) {
			return;
		}
		entity.oldLevel = entity.level;
		entity.oldType = entity.type;
		entity.statHp = 80 * Math.pow(1.1, entity.level - 1);
		entity.statSpd = (5 - (entity.level - 1) * .05) * 100;
		entity.statRange = 36;
		entity.statDmg = 10 * Math.pow(1.2, entity.level - 1);
		entity.statReload = 64 / FPS * 10 * 17 / 10;
		if (entity.type == 1) {
			entity.statDmg = entity.statDmg * 1.7 / 4 * 4;
			entity.statReload /= 1.6;
		} else if (entity.type == 2) {
			entity.statDmg = entity.statDmg / 3 * 3;
			entity.statRange /= 1.6;
			entity.statHp *= 1.4;
		} else if (entity.type == 3) {
			entity.statDmg = entity.statDmg * 1.2 / 2 / 1.5 * 2;
			entity.statRange *= 1.3;
			entity.statReload *= 1.5;
			entity.statHp *= 1.1;
		} else if (entity.type == 4) {
			entity.statDmg = entity.statDmg / 2 * 8;
			entity.statRange /= 1.5;
		} else if (entity.type == 5) {
			entity.statDmg = entity.statDmg * 1.7 / 7 * 7;
			entity.statRange = entity.statRange * 1.3;
			entity.statReload = entity.statReload / 1.1;
			entity.statHp /= 1.2;
		} else if (entity.type == 6) {
			entity.statDmg *= 2;
			entity.statRange *= 2.3;
			entity.statReload /= 2.2;
			entity.statHp /= 1.3;
		} else if (entity.type == 7) {
			entity.statDmg = entity.statDmg * 1.2 / 1.5 / 1.5 / 1.5;
			entity.statReload = entity.statReload * 1.5 * 1.5 * 1.5;
			entity.statRange /= 1.7;
		} else if (entity.type == 8) {
			entity.statDmg = entity.statDmg * 1.15 * 2 / 3 * 3;
			entity.statReload = entity.statReload / 2;
			entity.statRange = entity.statRange * 1.3;
			entity.statHp /= 1.3;
		} else if (entity.type == 9) {
			entity.statDmg = entity.statDmg * 1.3 * 1.2 * 2 / 4 * 4;
			entity.statReload = entity.statReload / 2;
			entity.statRange /= 1.7;
			entity.statHp /= 1.4;
		} else if (entity.type == 10) {
			entity.statDmg = entity.statDmg / 1.5 / 1.5 / 1.5 / 1.5 / 1.2;
			entity.statReload = entity.statReload * 1.5 * 1.5 * 1.5 * 1.5;
		} else if (entity.type == 11) {
			entity.statDmg *= 1.6;
			entity.statReload /= 1.7;
			entity.statRange /= 1.8;
			entity.statHp *= 1.3;
		} else if (entity.type == 12) {
			entity.statDmg *= 1.2;
			entity.statRange *= 2.3;
			entity.statReload /= 1.1;
			entity.statHp /= 1.3;
		} else if (entity.type == 13) {
			entity.statDmg = entity.statDmg * 1.2 * 1.5 / 7 * 7;
			entity.statReload = entity.statReload / 1.5;
			entity.statRange = entity.statRange * 1.2;
			entity.statHp *= 1.1;
		} else if (entity.type == 14) {
			entity.statDmg = entity.statDmg * 1.1 / 3 * 3;
			entity.statRange = entity.statRange / 1.1;
			entity.statHp *= 1.1;
			entity.statReload *= 1.1;
		} else if (entity.type == 15) {
			entity.statDmg *= 1.9;
			entity.statRange *= 2.2;
			entity.statReload /= 1.6;
		} else if (entity.type == 16) {
			entity.statDmg *= 3.6;
			entity.statRange *= 2.2;
			entity.statReload /= 3;
		} else if (entity.type == 17) {
			entity.statDmg *= 2.3;
			entity.statRange *= 2.2;
			entity.statReload /= 2.4;
		} else if (entity.type == 18) {
			entity.statDmg *= 2.2;
			entity.statRange *= 2.3;
			entity.statReload /= 2.2;
			entity.statHp /= 1.3;
		}
		entity.statHp = Math.floor(entity.statHp);
		entity.statSpd = Math.floor(entity.statSpd);
		entity.statRange = Math.floor(entity.statRange);
		entity.statDmg = Math.floor(entity.statDmg * Math.pow(.9166666666666667, entity.level - 1));
		entity.statReload = Math.floor(entity.statReload) / 10;
	};
	entity.draw = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		if (Player.list[selfId].map !== entity.map && Player.list[selfId].map !== 0 || entity.map == 0) {
			return;
		}
		var x = entity.x - Player.list[selfId].x + WIDTH / 2;
		var y = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(x > -500 && x < WIDTH + 500 && y > -500 && y < HEIGHT + 500)) {
			return;
		}
		if (entity.glow == 1) {
			drawRotatedImage(Img.other[3], x, y, 0);
		}
		if (entity.id == selfId) {
			entity.angle = mouseAngle;
		}
		if (entity.dash == 1) {
			if (entity.scale < 1.1) {
				entity.scale += .01;
			}
		} else {
			if (entity.scale > 1) {
				entity.scale -= .01;
			}
		}
		if (entity.type2 !== 0) {
			drawRotatedImage(Img.decoration[entity.type2], x, y, entity.angle);
		}
		if (entity.topTen == 1) {
			drawRotatedImage(Img.ride[entity.ride], x, y, entity.angle, entity.scale);
		}
		if (entity.level % 2 == 1) {
			drawRotatedImage(Img.weapon[entity.type][entity.level], x, y, entity.angle, entity.scale);
		} else {
			drawRotatedImage(Img.weapon[entity.type][entity.level - 1], x, y, entity.angle, entity.scale);
		}
		drawRotatedImage(Img.back[entity.back], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.hand[entity.color], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.body[entity.body], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.head[entity.color], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.skin[entity.skin], x, y, entity.angle, entity.scale);
		changeCtxFont("bold 18px sans-serif");
		ctx.textAlign = "center";
		if (tToggle) {
			var dx = 70 * entity.hp / entity.hpMax;
			ctx.fillStyle = "#FFF";
			ctx.fillRect(x - 35 + dx + 14, y + 60, 70 - dx, 10);
			if (selfId != entity.id && (gameMode == 0 && entity.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(entity.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (entity.level > Player.list[selfId].level && Math.abs(entity.level - Player.list[selfId].level) <= 7))) {
				ctx.fillStyle = "#D53C50";
			} else {
				ctx.fillStyle = "#19AD14";
			}
			ctx.fillRect(x - 35 + 14, y + 60, dx, 10);
			drawRotatedImage(Img.other[8], x - 35 - 14 + 14, y + 60 + 6, 0);
			ctx.fillStyle = "#F3F3F3";
			ctx.fillText(entity.level, x - 35 - 14 + 14, y + 60 + 12);
			ctx.fillText(entity.username, x, y - 60);
			if (entity.animation != 0) {
				if (entity.animation == 1) {
					if (selfId != entity.id && (gameMode == 0 && entity.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(entity.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (selfId == entity.id || entity.level > Player.list[selfId].level && Math.abs(entity.level - Player.list[selfId].level) <= 7))) {
						ctx.fillStyle = "#AD0000";
					} else {
						ctx.fillStyle = "#148910";
					}
				} else if (entity.animation == 2) {
					ctx.fillStyle = "#57AEBF";
				} else if (entity.animation == 4) {
					ctx.fillStyle = "#EFC700";
				}
				ctx.fillRect(x - 35 + 14, y + 60, dx, 10);
			}
		}
		if (entity.animation == 2) {
			drawRotatedImage(Img.other[4], x, y, 0);
		} else if (entity.animation == 4) {
			drawRotatedImage(Img.other[5], x, y, 0);
		}
	};
	entity.drawMessage = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		if (Player.list[selfId].map !== entity.map && Player.list[selfId].map !== 0 || entity.map == 0) {
			return;
		}
		var x = entity.x - Player.list[selfId].x + WIDTH / 2;
		var y = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(x > -500 && x < WIDTH + 500 && y > -500 && y < HEIGHT + 500)) {
			return;
		}
		if (entity.chatMessage !== "" && entity.chatMessage) {
			var width = ctx.measureText(entity.chatMessage).width;
			ctx.globalAlpha = .5;
			ctx.fillStyle = "#000";
			ctx.fillRect(x - width / 2 - 10, y - 80 - 40, width + 20, 30);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "#F3F3F3";
			ctx.fillText(entity.chatMessage, x, y - 100);
		}
	};
	entity.checkIsHere = function() {
		if (entity.isHere <= 0) {
			if (entity.id == selfId) {
				firstLogin = 0;
				loadPlayButton = 2;
				entity.map = 0;
				displaySpawnMessage("Cannot connect to server...");
				deathTimer = FPS * 2;
			} else if (entity.map == 1) {
				entity.map = 0;
			}
			return false;
		} else if (entity.id == selfId && loadPlayButton == 2) {
			loadPlayButton = 1;
			displaySpawnMessage("Reconnected.");
		}
		return true;
	};
	Player.list[entity.id] = entity;
	return entity;
};

Player.list = {};

Player.leaderboard = {};

var Bullet = function(data) {
	var entity = {};
	entity.id = data.a;
	entity.newX = data.b;
	entity.newY = data.c;
	entity.newAngle = data.d;
	entity.map = data.e;
	entity.type = data.f;
	entity.level = data.g;
	entity.playSoundAlready = 0;
	entity.angle = entity.newAngle;
	entity.isHere = 200;
	entity.update = function() {
		entity.isHere--;
		if (!entity.checkIsHere()) {
			return;
		}
		if (Math.abs(entity.x - entity.newX) < 200 && Math.abs(entity.y - entity.newY) < 200) {
			if (entity.playSoundAlready == 0) {
				var audio = Sound.weapon[entity.type];
				if (audio) {
					audio.currentTime = 0;
					audio.volume = soundVolume;
					audio.play();
				}
				entity.playSoundAlready = 1;
			}
			entity.x += (entity.newX - entity.x) / (FPS / serverFPS);
			entity.y += (entity.newY - entity.y) / (FPS / serverFPS);
			if (Math.abs(entity.newAngle - entity.angle) > 180) {
				if (entity.newAngle > entity.angle) {
					entity.angle += 360;
				} else {
					entity.angle -= 360;
				}
			}
			entity.angle += (entity.newAngle - entity.angle) / (FPS / serverFPS);
		} else {
			entity.x = entity.newX;
			entity.y = entity.newY;
			entity.angle = entity.newAngle;
		}
	};
	entity.draw = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		var x = entity.x - Player.list[selfId].x + WIDTH / 2;
		var y = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(x > -500 && x < WIDTH + 500 && y > -500 && y < HEIGHT + 500)) {
			return;
		}
		if (entity.level % 2 == 1) {
			drawRotatedImage(Img.bullet[entity.type][entity.level], x, y, entity.angle);
		} else {
			drawRotatedImage(Img.bullet[entity.type][entity.level - 1], x, y, entity.angle);
		}
	};
	entity.checkIsHere = function() {
		if (entity.isHere <= 0) {
			delete Bullet.list[entity.id];
			return false;
		}
		return true;
	};
	Bullet.list[entity.id] = entity;
	return entity;
};

Bullet.list = {};

function drawRotatedImage(img, x, y, angle, factor) {
	if (!img) {
		return;
	}
	loadImage(img);
	if (img.width == 0) {
		return;
	}
	if (!factor) {
		factor = 1;
	}
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(angle * Math.PI / 180);
	ctx.drawImage(img, -(img.width * factor / 2), -(img.height * factor / 2), img.width * factor, img.height * factor);
	ctx.restore();
}

function getAngleFromPoints(x1, y1, x2, y2) {
	var angle = Math.atan2(y2 - y1, x2 - x1);
	angle *= 180 / Math.PI;
	return angle;
}

function setCookie(name, value, days) {
	var date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
	document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/;domain=fightz.io";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = ca.length - 1; i >= 0; i--) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return "";
}

var Decoration = function(data) {
	var entity = {};
	entity.id = data.a;
	entity.x = data.b;
	entity.y = data.c;
	if (data.d) {
		entity.map = data.d;
	} else {
		entity.map = 1;
	}
	entity.type = data.e;
	entity.angle = data.f;
	entity.isHere = 200;
	if (entity.type == 2) {
		entity.isWater = true;
	}
	if (entity.y > mapHEIGHT / 3 && entity.y < mapHEIGHT * 2 / 3 && entity.x > mapWIDTH / 6 && entity.x < mapWIDTH / 3) {
		if (entity.type == 1) {
			entity.type = 17;
		} else if (entity.type == 2) {
			entity.type = 7;
		} else if (entity.type == 3) {
			entity.type = 6;
		} else if (entity.type == 36) {
			entity.type = 41;
		} else if (entity.type == 13) {
			entity.type = 73;
		}
	} else if (entity.y > mapHEIGHT / 2 && entity.y < mapHEIGHT * 5 / 6 && entity.x > 0 && entity.x < mapWIDTH * 1 / 6) {
		if (entity.type == 1) {
			entity.type = 17;
		} else if (entity.type == 2) {
			entity.type = 7;
		} else if (entity.type == 3) {
			entity.type = 6;
		} else if (entity.type == 36) {
			entity.type = 41;
		}
	} else if (entity.y > mapHEIGHT / 6 && entity.y < mapHEIGHT / 3 && entity.x > mapWIDTH / 2 && entity.x < mapWIDTH * 5 / 6) {
		if (entity.type == 1) {
			entity.type = 19;
		} else if (entity.type == 2) {
			entity.type = 5;
		} else if (entity.type == 3) {
			entity.type = 9;
		} else if (entity.type == 36) {
			entity.type = 36;
		} else if (entity.type == 13) {
			entity.type = 69;
		}
	} else if (entity.y > 0 && entity.y < mapHEIGHT / 6 && entity.x > mapWIDTH * 4 / 6 && entity.x < mapWIDTH) {
		if (entity.type == 1) {
			entity.type = 64;
		} else if (entity.type == 2) {
			entity.type = 65;
		} else if (entity.type == 3) {
			entity.type = 66;
		} else if (entity.type == 36) {
			entity.type = 36;
		}
	} else if (entity.y > mapHEIGHT * 2 / 6 && entity.y < mapHEIGHT * 4 / 6 && entity.x > mapWIDTH * 4 / 6 && entity.x < mapWIDTH * 5 / 6) {
		if (entity.type == 1) {
			entity.type = 21;
		} else if (entity.type == 2) {
			entity.type = 22;
		} else if (entity.type == 3) {
			entity.type = 20;
		} else if (entity.type == 36) {
			entity.type = 40;
		} else if (entity.type == 13) {
			entity.type = 71;
		}
	} else if (entity.y > mapHEIGHT * 4 / 6 && entity.y < mapHEIGHT * 5 / 6 && entity.x > mapWIDTH / 2 && entity.x < mapWIDTH * 5 / 6) {
		if (entity.type == 1) {
			entity.type = 8;
		} else if (entity.type == 2) {
			entity.type = 15;
		} else if (entity.type == 3) {
			entity.type = 16;
		} else if (entity.type == 36) {
			entity.type = 38;
		}
	} else if (entity.y > mapHEIGHT / 2 && entity.y < mapHEIGHT * 5 / 6 && entity.x > mapWIDTH * 5 / 6 && entity.x < mapWIDTH) {
		if (entity.type == 1) {
			entity.type = 8;
		} else if (entity.type == 2) {
			entity.type = 15;
		} else if (entity.type == 3) {
			entity.type = 16;
		} else if (entity.type == 36) {
			entity.type = 38;
		}
	} else if (entity.y > mapHEIGHT * 4 / 6 && entity.y < mapHEIGHT * 5 / 6 && entity.x > mapWIDTH / 6 && entity.x < mapWIDTH / 2) {
		if (entity.type == 1) {
			entity.type = 44;
		} else if (entity.type == 2) {
			entity.type = 45;
		} else if (entity.type == 3) {
			entity.type = 43;
		} else if (entity.type == 13) {
			entity.type = 72;
		}
	} else if (entity.y > mapHEIGHT * 5 / 6 && entity.y < mapHEIGHT && entity.x > 0 && entity.x < mapWIDTH * 2 / 6) {
		if (entity.type == 1) {
			entity.type = 44;
		} else if (entity.type == 2) {
			entity.type = 45;
		} else if (entity.type == 3) {
			entity.type = 43;
		}
	} else if (entity.y > mapHEIGHT * 2 / 6 && entity.y < mapHEIGHT / 2 && entity.x > mapWIDTH * 2 / 6 && entity.x < mapWIDTH * 4 / 6) {
		if (entity.type == 1) {
			entity.type = 25;
		} else if (entity.type == 2) {
			entity.type = 23;
		} else if (entity.type == 3) {
			entity.type = 24;
		} else if (entity.type == 36) {
			entity.type = 37;
		}
	} else if (entity.y > mapHEIGHT / 6 && entity.y < mapHEIGHT / 3 && entity.x > mapWIDTH / 6 && entity.x < mapWIDTH / 2) {
		if (entity.type == 1) {
			entity.type = 54;
		} else if (entity.type == 2) {
			entity.type = 53;
		} else if (entity.type == 3) {
			entity.type = 52;
		} else if (entity.type == 36) {
			entity.type = 39;
		}
	} else if (entity.y > mapHEIGHT / 6 && entity.y < mapHEIGHT / 2 && entity.x > 0 && entity.x < mapWIDTH / 6) {
		if (entity.type == 1) {
			entity.type = 48;
		} else if (entity.type == 2) {
			entity.type = 46;
		} else if (entity.type == 3) {
			entity.type = 47;
		}
	} else if (entity.y > 0 && entity.y < mapHEIGHT / 6 && entity.x > 0 && entity.x < mapWIDTH * 2 / 6) {
		if (entity.type == 1) {
			entity.type = 18;
		} else if (entity.type == 2) {
			entity.type = 4;
		} else if (entity.type == 3) {
			entity.type = 10;
		} else if (entity.type == 36) {
			entity.type = 39;
		}
	} else if (entity.y > 0 && entity.y < mapHEIGHT / 6 && entity.x > mapWIDTH * 2 / 6 && entity.x < mapWIDTH * 4 / 6) {
		if (entity.type == 1) {
			entity.type = 18;
		} else if (entity.type == 2) {
			entity.type = 4;
		} else if (entity.type == 3) {
			entity.type = 10;
		} else if (entity.type == 36) {
			entity.type = 39;
		}
	} else if (entity.y > mapHEIGHT / 6 && entity.y < mapHEIGHT / 2 && entity.x > mapWIDTH * 5 / 6 && entity.x < mapWIDTH) {
		if (entity.type == 1) {
			entity.type = 21;
		} else if (entity.type == 2) {
			entity.type = 22;
		} else if (entity.type == 3) {
			entity.type = 20;
		} else if (entity.type == 36) {
			entity.type = 40;
		}
	} else if (entity.y > mapHEIGHT * 5 / 6 && entity.y < mapHEIGHT && entity.x > mapWIDTH * 2 / 6 && entity.x < mapWIDTH * 4 / 6) {
		if (entity.type == 1) {
			entity.type = 57;
		} else if (entity.type == 2) {
			entity.type = 56;
		} else if (entity.type == 3) {
			entity.type = 55;
		} else if (entity.type == 13) {
			entity.type = 70;
		}
	} else if (entity.y > mapHEIGHT * 5 / 6 && entity.y < mapHEIGHT && entity.x > mapWIDTH * 4 / 6 && entity.x < mapWIDTH) {
		if (entity.type == 1) {
			entity.type = 51;
		} else if (entity.type == 2) {
			entity.type = 49;
		} else if (entity.type == 3) {
			entity.type = 50;
		}
	}
	entity.draw = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		var posX = entity.x - Player.list[selfId].x + WIDTH / 2;
		var posY = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(posX > -500 && posX < WIDTH + 500 && posY > -500 && posY < HEIGHT + 500)) {
			return;
		}
		drawRotatedImage(Img.decoration[entity.type], posX, posY, entity.angle);
		if (Player.list[selfId].level < 3) {
			if (entity.type == 11 || entity.type == 12 || entity.type == 14 || entity.type == 75) {
				drawRotatedImage(Img.other[15], posX, posY, 0);
			}
		}
	};
	entity.checkIsHere = function() {
		if (entity.isHere <= 0) {
			entity.x = -1e5;
			return false;
		}
		return true;
	};
	Decoration.list[entity.id] = entity;
	return entity;
};

Decoration.list = {};

var Food = function(data) {
	var entity = {};
	entity.id = data.a;
	entity.x = data.b;
	entity.y = data.c;
	if (data.d) {
		entity.map = data.d;
	} else {
		entity.map = 1;
	}
	entity.type = data.e;
	entity.isHere = 200;
	entity.playSoundAlready = 0;
	entity.draw = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		var x = entity.x - Player.list[selfId].x + WIDTH / 2;
		var y = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(x > -500 && x < WIDTH + 500 && y > -500 && y < HEIGHT + 500)) {
			return;
		}
		if (entity.playSoundAlready == 0 && entity.type == 5) {
			var sound = Sound.other[0];
			if (sound) {
				sound.currentTime = 0;
				sound.volume = soundVolume;
				sound.play();
			}
			entity.playSoundAlready = 1;
		}
		drawRotatedImage(Img.food[entity.type], x, y, 0);
	};
	entity.checkIsHere = function() {
		if (entity.isHere <= 0) {
			entity.x = -1e5;
			return false;
		}
		return true;
	};
	Food.list[entity.id] = entity;
	return entity;
};

Food.list = {};

var Mob = function(data) {
	var entity = {};
	entity.id = data.a;
	if (data.b) {
		entity.map = data.b;
	} else {
		entity.map = 1;
	}
	entity.type = data.c;
	entity.hpMax = data.d;
	entity.level = data.e;
	entity.update = function() {
		entity.isHere--;
		if (!entity.checkIsHere()) {
			return;
		}
		if (Math.abs(entity.x - entity.newX) < 200 && Math.abs(entity.y - entity.newY) < 200) {
			entity.x += (entity.newX - entity.x) / (FPS / serverFPS);
			entity.y += (entity.newY - entity.y) / (FPS / serverFPS);
			if (entity.hp < entity.hpMax) {
				entity.hp += (entity.newHp - entity.hp) / (FPS / serverFPS);
			} else {
				entity.hp = entity.newHp;
			}
			if (Math.abs(entity.newAngle - entity.angle) > 180) {
				if (entity.newAngle > entity.angle) {
					entity.angle += 360;
				} else {
					entity.angle -= 360;
				}
			}
			entity.angle += (entity.newAngle - entity.angle) / (FPS * 4 / serverFPS);
		} else {
			entity.x = entity.newX;
			entity.y = entity.newY;
			entity.angle = entity.newAngle;
		}
	};
	entity.draw = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		var posX = entity.x - Player.list[selfId].x + WIDTH / 2;
		var posY = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(posX > -500 && posX < WIDTH + 500 && posY > -500 && posY < HEIGHT + 500)) {
			return;
		}
		drawRotatedImage(Img.mob[entity.type], posX, posY, entity.angle);
		var width = 70 * entity.hp / entity.hpMax;
		ctx.fillStyle = "#FFF";
		ctx.fillRect(posX - 35 + width + 14, posY + Img.mob[entity.type].height / 2, 70 - width, 10);
		drawRotatedImage(Img.other[8], posX - 35 - 14 + 14, posY + Img.mob[entity.type].height / 2 + 6, 0);
		ctx.textAlign = "center";
		changeCtxFont("bold 18px sans-serif");
		ctx.fillStyle = "#F3F3F3";
		ctx.fillText(entity.level, posX - 35 - 14 + 14, posY + Img.mob[entity.type].height / 2 + 12);
		if (entity.level > Player.list[selfId].level) {
			ctx.fillStyle = "#D53C50";
		} else {
			ctx.fillStyle = "#19AD14";
		}
		ctx.fillRect(posX - 35 + 14, posY + Img.mob[entity.type].height / 2, width, 10);
		if (entity.animation != 0) {
			if (entity.animation == 1) {
				if (entity.level > Player.list[selfId].level) {
					ctx.fillStyle = "#AD0000";
				} else {
					ctx.fillStyle = "#148910";
				}
			}
			if (entity.animation == 1) {
				ctx.fillRect(posX - 35 + 14, posY + Img.mob[entity.type].height / 2, width, 10);
			}
		}
	};
	entity.checkIsHere = function() {
		if (entity.isHere <= 0) {
			entity.x = -1e5;
			return false;
		}
		return true;
	};
	Mob.list[entity.id] = entity;
	return entity;
};

Mob.list = {};

var NPC = function(data) {
	var entity = {};
	entity.id = data.a;
	entity.username = data.b;
	if (data.c) {
		entity.map = data.c;
	} else {
		entity.map = 1;
	}
	entity.score = data.d;
	entity.level = data.e;
	entity.type = data.f;
	entity.skin = data.g;
	entity.body = data.h;
	entity.color = data.i;
	entity.back = data.j;
	entity.ride = data.k;
	entity.scale = 1;
	entity.isHere = 200;
	if (Math.random() < .33) {
		entity.pet = 9;
	} else if (Math.random() > .5) {
		entity.pet = 10;
	} else {
		entity.pet = 11;
	}
	entity.update = function() {
		entity.isHere--;
		if (!entity.checkIsHere()) {
			return;
		}
		if (!Player.leaderboardScore[2] || entity.score >= Player.leaderboardScore[2]) {
			entity.glow = 1;
		} else {
			entity.glow = 0;
		}
		if (!Player.leaderboardScore[9] || entity.score >= Player.leaderboardScore[9]) {
			entity.topTen = 1;
		} else {
			entity.topTen = 0;
		}
		if (Math.abs(entity.x - entity.newX) < 200 && Math.abs(entity.y - entity.newY) < 200) {
			entity.x += (entity.newX - entity.x) / (FPS / serverFPS);
			entity.y += (entity.newY - entity.y) / (FPS / serverFPS);
			if (entity.hp < entity.hpMax) {
				entity.hp += (entity.newHp - entity.hp) / (FPS / serverFPS);
			} else {
				entity.hp = entity.newHp;
			}
			if (Math.abs(entity.newAngle - entity.angle) > 180) {
				if (entity.newAngle > entity.angle) {
					entity.angle += 360;
				} else {
					entity.angle -= 360;
				}
			}
			if (Math.abs(entity.angle - entity.petAngle) > 180) {
				if (entity.angle > entity.petAngle) {
					entity.petAngle += 360;
				} else {
					entity.petAngle -= 360;
				}
			}
			entity.angle += (entity.newAngle - entity.angle) / (FPS / serverFPS);
			if (!entity.petIntervalRandom || entity.petIntervalRandom++ > FPS * 60) {
				entity.petAngleRandom = 45 - 90 * Math.random();
				entity.petIntervalRandom = 60 * FPS * Math.random();
			}
			entity.petNewAngle = entity.angle + entity.petAngleRandom;
			if (entity.petAngle < 9999) {
				entity.tempSign = (entity.petNewAngle - entity.petAngle) / Math.abs(entity.petNewAngle - entity.petAngle);
				entity.petAngle += entity.tempSign * Math.min(Math.abs(entity.petNewAngle - entity.petAngle), 30) / (FPS * 3 / serverFPS);
			} else {
				entity.petAngle = 0;
			}
		} else {
			entity.x = entity.newX;
			entity.y = entity.newY;
			entity.angle = entity.newAngle;
			entity.petAngle = entity.newAngle;
		}
	};
	entity.draw = function() {
		if (!entity.checkIsHere()) {
			return;
		}
		var x = entity.x - Player.list[selfId].x + WIDTH / 2;
		var y = entity.y - Player.list[selfId].y + HEIGHT / 2;
		if (!(x > -500 && x < WIDTH + 500 && y > -500 && y < HEIGHT + 500)) {
			return;
		}
		if (entity.glow == 1) {
			drawRotatedImage(Img.other[3], x, y, 0);
		}
		if (entity.dash == 1 && entity.scale < 1.1) {
			entity.scale += .01;
		} else if (entity.scale > 1) {
			entity.scale -= .01;
		}
		if (entity.topTen == 1) {
			drawRotatedImage(Img.ride[entity.ride], x, y, entity.angle);
		}
		if (entity.level % 2 == 1) {
			drawRotatedImage(Img.weapon[entity.type][entity.level], x, y, entity.angle, entity.scale);
		} else {
			drawRotatedImage(Img.weapon[entity.type][entity.level - 1], x, y, entity.angle, entity.scale);
		}
		drawRotatedImage(Img.back[entity.back], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.hand[entity.color], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.body[entity.body], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.head[entity.color], x, y, entity.angle, entity.scale);
		drawRotatedImage(Img.skin[entity.skin], x, y, entity.angle, entity.scale);
		changeCtxFont("bold 18px sans-serif");
		ctx.textAlign = "center";
		if (tToggle) {
			var r = 70 * entity.hp / entity.hpMax;
			ctx.fillStyle = "#FFF";
			ctx.fillRect(x - 35 + r + 14, y + 60, 70 - r, 10);
			if (gameMode == 0 && entity.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(entity.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (selfId == entity.id || entity.level > Player.list[selfId].level && Math.abs(entity.level - Player.list[selfId].level) <= 7)) {
				ctx.fillStyle = "#D53C50";
			} else {
				ctx.fillStyle = "#19AD14";
			}
			ctx.fillRect(x - 35 + 14, y + 60, r, 10);
			drawRotatedImage(Img.other[8], x - 35 - 14 + 14, y + 60 + 6, 0);
			ctx.fillStyle = "#F3F3F3";
			ctx.fillText(entity.level, x - 35 - 14 + 14, y + 60 + 12);
			ctx.fillText(entity.username, x, y - 60);
			if (entity.animation != 0) {
				if (entity.animation == 1) {
					if (gameMode == 0 && entity.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(entity.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (selfId == entity.id || entity.level > Player.list[selfId].level && Math.abs(entity.level - Player.list[selfId].level) <= 7)) {
						ctx.fillStyle = "#AD0000";
					} else {
						ctx.fillStyle = "#148910";
					}
				} else if (entity.animation == 2) {
					ctx.fillStyle = "#57AEBF";
				} else if (entity.animation == 4) {
					ctx.fillStyle = "#EFC700";
				}
				ctx.fillRect(x - 35 + 14, y + 60, r, 10);
			}
		}
		if (entity.animation == 2) {
			drawRotatedImage(Img.other[4], x, y, 0);
		} else {
			if (entity.animation == 4) {
				drawRotatedImage(Img.other[5], x, y, 0);
			}
		}
	};
	entity.checkIsHere = function() {
		if (entity.isHere <= 0) {
			entity.x = -1e5;
			return false;
		}
		return true;
	};
	NPC.list[entity.id] = entity;
	return entity;
};

NPC.list = {};

var selfId = 0;

var loadPlayButton = 0;

socket.on("init", function(data) {
	if (debug == true) {
		console.log("Init: ");
		console.log(data);
	}
	if (data.selfId) {
		if (!selfId || selfId == data.selfId) {
			selfId = data.selfId;
		} else if (!isHome) {
			switchServerYet = 1;
			self.location = "https://fightz.io/?ref=serverRestarted";
		}
	}
	if (data.player) {
		for (var i = 0; i < data.player.length; i++) {
			new Player(data.player[i]);
		}
	}
	if (data.bullet) {}
	if (data.mob) {
		for (var i = 0; i < data.mob.length; i++) {
			new Mob(data.mob[i]);
		}
	}
	if (data.food) {
		for (var i = 0; i < data.food.length; i++) {
			new Food(data.food[i]);
		}
	}
	if (data.npc) {
		for (var i = 0; i < data.npc.length; i++) {
			new NPC(data.npc[i]);
		}
	}
	if (data.decoration) {
		for (var i = 0; i < data.decoration.length; i++) {
			new Decoration(data.decoration[i]);
		}
	}
	if (loadPlayButton == 0) {
		loadPlayButton = 1;
	}
});

var finishLoadingFunction = function() {
	if (finishLoading == 0) {
		return;
	}
	document.getElementById("signDiv-Loading").style.display = "none";
	document.getElementById("signDiv-signIn").style.display = "inline";
	finishLoading = 0;
	document.getElementById("signDiv-username").focus();
	if (spawnMessage.innerHTML == "Loading...") {
		spawnMessage.style.display = "none";
	}
	if (!/http:\/\/fightz.io/.test(window.location.href) && !/fightz.io/.test(document.referrer) && !/localhost/.test(window.location.href)) {
		if (Player.leaderboardScore[0] < 500) {
			displaySpawnMessage("Server is full, switching server...");
			self.location = "https://fightz.io" + urlCode;
		}
	}
	resizeCanvas();
	Sound.music[0] = new Audio("client/sound/music2.mp3?v=1.1");
	Sound.music[1] = new Audio("client/sound/music3.mp3?v=1.1");
	Sound.music[2] = new Audio("client/sound/music4.mp3?v=1.1");
	Sound.music[3] = new Audio("client/sound/music5.mp3?v=1.1");
	Sound.music[4] = new Audio("client/sound/music0.mp3?v=1.1");
	Sound.music[5] = new Audio("client/sound/music1.mp3?v=1.1");
	loadMusic = true;
};

setTimeout(function() {
	finishLoadingFunction();
}, 5000);

window.onload = function() {
	finishLoadingFunction();
};

window.onbeforeunload = function() {
	if (Player.list[selfId].score > 10 && switchServerYet == 0) {
		return "";
	}
};

socket.on("update", function(data) {
	if (debug == true) {
		console.log("Update: ");
		console.log(data);
	}
	if (!data) {
		return;
	}
	if (data.player) {
		for (player of Player.list) {
			if (player.id !== selfId) {
				player.newX = -100000;
			}
		}
		for (var i = 0; i < data.player.length; i++) {
			var playerMP = data.player[i];
			var player = Player.list[playerMP.a];
			if (player) {
				player.isHere = FPS * 5;
				player.map = 1;
				if (playerMP.b !== undefined) {
					player.newX = playerMP.b;
				}
				if (playerMP.c !== undefined) {
					player.newY = playerMP.c;
				}
				if (playerMP.d !== undefined) {
					player.newAngle = playerMP.d;
				}
				if (playerMP.e !== undefined) {
					player.email = playerMP.e;
				}
				if (playerMP.f !== undefined) {
					player.items = playerMP.f;
				}
				if (playerMP.g !== undefined) {
					player.coins = playerMP.g;
				}
				if (playerMP.h !== undefined) {
					player.username = playerMP.h;
				}
				if (playerMP.i !== undefined) {
					player.newHp = playerMP.i;
				}
				if (playerMP.j !== undefined) {
					player.hpMax = playerMP.j;
				}
				if (playerMP.k !== undefined) {
					player.newScore = playerMP.k;
				}
				if (playerMP.l !== undefined) {
					player.map = playerMP.l;
				}
				if (playerMP.m !== undefined) {
					player.level = playerMP.m;
				}
				if (playerMP.n !== undefined) {
					player.type = playerMP.n;
				}
				if (playerMP.o !== undefined) {
					player.animation = playerMP.o;
				}
				if (playerMP.p !== undefined) {
					player.chatMessage = playerMP.p;
				}
				if (playerMP.q !== undefined) {
					player.skin = playerMP.q;
				}
				if (playerMP.r !== undefined) {
					player.body = playerMP.r;
				}
				if (playerMP.s !== undefined) {
					player.color = playerMP.s;
				}
				if (playerMP.t !== undefined) {
					player.statusXpboost = playerMP.t;
				}
				if (playerMP.u !== undefined) {
					player.type2 = playerMP.u;
				}
				if (playerMP.v !== undefined) {
					player.team = playerMP.v;
				}
				if (playerMP.w !== undefined) {
					player.back = playerMP.w;
				}
				if (playerMP.x !== undefined) {
					player.ride = playerMP.x;
				}
				if (playerMP.y !== undefined) {
					player.dash = playerMP.y;
				}
			}
		}
	}
	if (data.bullet) {
		for (bullet of Bullet.list) {
			bullet.isHere = 0;
		}
		for (var i = 0; i < data.bullet.length; i++) {
			var bulletMP = data.bullet[i];
			var bullet = Bullet.list[bulletMP.a];
			if (bullet) {
				bullet.isHere = FPS * 5;
				if (bulletMP.b !== undefined) {
					bullet.newX = bulletMP.b;
				}
				if (bulletMP.c !== undefined) {
					bullet.newY = bulletMP.c;
				}
				if (bulletMP.d !== undefined) {
					bullet.newAngle = bulletMP.d;
				}
				if (bulletMP.e !== undefined) {
					bullet.map = bulletMP.e;
				}
				if (bulletMP.f !== undefined) {
					bullet.type = bulletMP.f;
				}
				if (bulletMP.g !== undefined) {
					bullet.level = bulletMP.g;
				}
			} else {
				new Bullet(bulletMP);
			}
		}
	}
	if (data.mob) {
		for (mob of Mob.list) {
			mob.isHere = 0;
		}
		for (var i = 0; i < data.mob.length; i++) {
			var mobMP = data.mob[i];
			var mob = Mob.list[mobMP.a];
			if (mob) {
				mob.isHere = FPS * 5;
				if (mobMP.b !== undefined) {
					mob.newX = mobMP.b;
				}
				if (mobMP.c !== undefined) {
					mob.newY = mobMP.c;
				}
				if (mobMP.d !== undefined) {
					mob.newAngle = mobMP.d;
				}
				if (mobMP.e !== undefined) {
					mob.newHp = mobMP.e;
				}
				if (mobMP.f !== undefined) {
					mob.animation = mobMP.f;
				}
			}
		}
	}
	if (data.food) {
		for (var i = 0; i < data.food.length; i++) {
			var food = Food.list[data.food[i].id];
			if (food) {
				food.isHere = FPS * 5;
			}
		}
	}
	if (data.npc) {
		for (npc of NPC.list) {
			npc.isHere = 0;
		}
		for (var i = 0; i < data.npc.length; i++) {
			var npcMP = data.npc[i];
			var t = NPC.list[data.npc[i].a];
			if (t) {
				t.isHere = FPS * 5;
				if (npcMP.b !== undefined) {
					t.newX = npcMP.b;
				}
				if (npcMP.c !== undefined) {
					t.newY = npcMP.c;
				}
				if (npcMP.d !== undefined) {
					t.newAngle = npcMP.d;
				}
				if (npcMP.e !== undefined) {
					t.newHp = npcMP.e;
				}
				if (npcMP.f !== undefined) {
					t.hpMax = npcMP.f;
				}
				if (npcMP.g !== undefined) {
					t.score = npcMP.g;
				}
				if (npcMP.h !== undefined) {
					t.level = npcMP.h;
				}
				if (npcMP.i !== undefined) {
					t.type = npcMP.i;
				}
				if (npcMP.j !== undefined) {
					t.animation = npcMP.j;
				}
				if (npcMP.k !== undefined) {
					t.skin = npcMP.k;
				}
				if (npcMP.l !== undefined) {
					t.body = npcMP.l;
				}
				if (npcMP.m !== undefined) {
					t.color = npcMP.m;
				}
				if (npcMP.n !== undefined) {
					t.team = npcMP.n;
				}
				if (npcMP.o !== undefined) {
					t.back = npcMP.o;
				}
				if (npcMP.p !== undefined) {
					t.ride = npcMP.p;
				}
				if (npcMP.q !== undefined) {
					t.dash = npcMP.q;
				}
			}
		}
	}
	if (data.decoration) {
		for (var i = 0; i < data.decoration.length; i++) {
			var food = Decoration.list[data.decoration[i].id];
			if (food) {
				food.isHere = FPS * 5;
			}
		}
	}
});

socket.on("remove", function(data) {
	if (debug == true) {
		console.log("Remove: ");
		console.log(data);
	}
	if (data.player) {
		for (var i = 0; i < data.player.length; i++) {
			delete Player.list[data.player[i]];
		}
	}
	if (data.bullet) {}
	if (data.mob) {
		for (var i = 0; i < data.mob.length; i++) {
			delete Mob.list[data.mob[i]];
		}
	}
	if (data.food) {
		for (var i = 0; i < data.food.length; i++) {
			delete Food.list[data.food[i]];
		}
	}
	if (data.npc) {
		for (var i = 0; i < data.npc.length; i++) {
			delete NPC.list[data.npc[i]];
		}
	}
	if (data.decoration) {
		for (var i = 0; i < data.decoration.length; i++) {
			delete Decoration.list[data.decoration[i]];
		}
	}
});

Player.leaderboardUsername = [];

socket.on("leaderboardUsername", function(data) {
	Player.leaderboardUsername = data;
	changeCtxFont("bold 15px sans-serif");
	for (var pos in Player.leaderboardUsername) {
		Player.leaderboardUsername[pos] = getEllipsis(Player.leaderboardUsername[pos], 100);
	}
});

Player.leaderboardScore = [];

socket.on("leaderboardScore", function(data) {
	Player.leaderboardScore = data;
});

Player.leaderboardTeam = [];

socket.on("leaderboardTeam", function(data) {
	Player.leaderboardTeam = data;
});

socket.on("gameMode", function(data) {
	gameMode = data;
	if (gameMode == 0) {
		document.getElementById("mode1").style.textDecoration = "underline";
		document.getElementById("modeButton").innerHTML = "Casual";
	} else if (gameMode == 1) {
		document.getElementById("mode2").style.textDecoration = "underline";
		document.getElementById("modeButton").innerHTML = "PVP";
	} else if (gameMode == 2) {
		document.getElementById("mode3").style.textDecoration = "underline";
		document.getElementById("modeButton").innerHTML = "Food";
	}
});

socket.on("signInResponse", function(data) {
	if (data.success) {
		gotoSection("game");
		isPaused = false;
		otherGameDivRefresh();
	} else {
		alert("Sign in unsuccessul.");
	}
});

socket.on("loginResponse", function(data) {
	if (data.success == "alreadyLogin") {
		displaySpawnMessage("Already login!");
	} else if (data.success == true) {
		displaySpawnMessage("Welcome Back!");
		setCookie("email", signDivEmail.value, 365);
		manageHighScore();
		document.getElementById("controlLogin").style.display = "none";
		document.getElementById("controlRegister").style.display = "none";
		openDiv("equip");
	} else {
		displaySpawnMessage("Wrong Email/Password!");
	}
});

socket.on("signUpResponse", function(data) {
	if (data.success == 1) {
		displaySpawnMessage("New Account Created!");
	} else if (data.success == 0) {
		displaySpawnMessage("Account already existed!");
	} else if (data.success == 2) {
		displaySpawnMessage("Email/Password too short!");
	}
});

socket.on("buySkinResponse", function(data) {
	if (data.success) {
		displaySpawnMessage("You bought a new item!");
	} else {
		displaySpawnMessage("Not enough coins!");
	}
});

var randomServer = Math.random();

var switchServerYet = 0;

socket.on("switchServer", function(data) {
	if (switchServerYet == 0 && !isHome) {
		switchServerYet = 1;
		console.log("Server Full: " + data.Playercount);
		displaySpawnMessage("Server is full, switching server...");
		if (/na/.test(window.location.href)) {
			if (/na\./.test(window.location.href)) {
				self.location = "https://na-2.fightz.io" + urlCode;
			} else if (/na-2\./.test(window.location.href)) {
				self.location = "https://na-3.fightz.io" + urlCode;
			} else if (/na-3\./.test(window.location.href)) {
				self.location = "https://na-4.fightz.io" + urlCode;
			} else if (/na-4\./.test(window.location.href)) {
				self.location = "https://na-5.fightz.io" + urlCode;
			} else if (/na-5\./.test(window.location.href)) {
				self.location = "https://na-6.fightz.io" + urlCode;
			} else if (/na-6\./.test(window.location.href)) {
				self.location = "https://na-7.fightz.io" + urlCode;
			} else if (/na-7\./.test(window.location.href)) {
				self.location = "https://na-8.fightz.io" + urlCode;
			} else {
				self.location = "https://eu.fightz.io";
			}
		} else if (/eu/.test(window.location.href)) {
			if (/eu\./.test(window.location.href)) {
				self.location = "https://eu-2.fightz.io" + urlCode;
			} else if (/eu-2\./.test(window.location.href)) {
				self.location = "https://eu-3.fightz.io" + urlCode;
			} else if (/eu-3\./.test(window.location.href)) {
				self.location = "https://eu-4.fightz.io" + urlCode;
			} else if (/eu-4\./.test(window.location.href)) {
				self.location = "https://eu-5.fightz.io" + urlCode;
			} else if (/eu-5\./.test(window.location.href)) {
				self.location = "https://eu-6.fightz.io" + urlCode;
			} else if (/eu-6\./.test(window.location.href)) {
				self.location = "https://eu-7.fightz.io" + urlCode;
			} else if (/eu-7\./.test(window.location.href)) {
				self.location = "https://eu-8.fightz.io" + urlCode;
			} else {
				self.location = "https://ru.fightz.io";
			}
		} else if (/ru/.test(window.location.href)) {
			if (/ru\./.test(window.location.href)) {
				self.location = "https://ru-2.fightz.io" + urlCode;
			} else if (/ru-2\./.test(window.location.href)) {
				self.location = "https://ru-3.fightz.io" + urlCode;
			} else if (/ru-3\./.test(window.location.href)) {
				self.location = "https://ru-4.fightz.io" + urlCode;
			} else if (/ru-4\./.test(window.location.href)) {
				self.location = "https://ru-5.fightz.io" + urlCode;
			} else if (/ru-5\./.test(window.location.href)) {
				self.location = "https://ru-6.fightz.io" + urlCode;
			} else if (/ru-6\./.test(window.location.href)) {
				self.location = "https://ru-7.fightz.io" + urlCode;
			} else if (/ru-7\./.test(window.location.href)) {
				self.location = "https://ru-8.fightz.io" + urlCode;
			} else {
				self.location = "https://as.fightz.io";
			}
		} else if (/as/.test(window.location.href)) {
			if (/as\./.test(window.location.href)) {
				self.location = "https://as-2.fightz.io" + urlCode;
			} else if (/as-2\./.test(window.location.href)) {
				self.location = "https://as-3.fightz.io" + urlCode;
			} else if (/as-3\./.test(window.location.href)) {
				self.location = "https://as-4.fightz.io" + urlCode;
			} else if (/as-4\./.test(window.location.href)) {
				self.location = "https://as-5.fightz.io" + urlCode;
			} else if (/as-5\./.test(window.location.href)) {
				self.location = "https://as-6.fightz.io" + urlCode;
			} else if (/as-6\./.test(window.location.href)) {
				self.location = "https://as-7.fightz.io" + urlCode;
			} else if (/as-7\./.test(window.location.href)) {
				self.location = "https://as-8.fightz.io" + urlCode;
			} else {
				self.location = "https://na.fightz.io";
			}
		}
	}
});

var displaySpawnMessage = function(html) {
	spawnMessage.style.display = "block";
	spawnMessage.innerHTML = html;
	spawnMessage.style.backgroundColor = "#B7494D";
	setTimeout(function() {
		spawnMessage.style.backgroundColor = "#A32326";
	}, 100);
};

var drawMap = function() {
	var localPlayer = Player.list[selfId];
	var x = WIDTH / 2 - localPlayer.x;
	var y = HEIGHT / 2 - localPlayer.y;
	ctx.fillStyle = "#1A4C38";
	ctx.fillRect(x + mapWIDTH / 2 + mapWIDTH / 6, y + mapHEIGHT * 2 / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
	ctx.fillStyle = "#AE8255";
	ctx.fillRect(x + mapWIDTH / 6, y + mapHEIGHT * 2 / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
	ctx.fillStyle = "#382106";
	ctx.fillRect(x + mapWIDTH / 6, y + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#3F3F3F";
	ctx.fillRect(x + mapWIDTH / 2, y + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#7A972C";
	ctx.fillRect(x + mapWIDTH / 6, y + mapHEIGHT / 2 + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#B2B2B2";
	ctx.fillRect(x + mapWIDTH / 2, y + mapHEIGHT / 2 + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#664E1E";
	ctx.fillRect(x + mapWIDTH / 3, y + mapHEIGHT / 3, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#738853";
	ctx.fillRect(x + mapWIDTH / 3, y + mapHEIGHT / 2, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#1A4C38";
	ctx.fillRect(x + mapWIDTH * 5 / 6, y + mapHEIGHT / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
	ctx.fillStyle = "#B2B2B2";
	ctx.fillRect(x + mapWIDTH * 5 / 6, y + mapHEIGHT / 2, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
	ctx.fillStyle = "#2F3F3A";
	ctx.fillRect(x, y + mapHEIGHT / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
	ctx.fillStyle = "#AE8255";
	ctx.fillRect(x, y + mapHEIGHT / 2, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
	ctx.fillStyle = "#7C3131";
	ctx.fillRect(x, y, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#7C3131";
	ctx.fillRect(x + mapWIDTH * 2 / 6, y, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#353F17";
	ctx.fillRect(x + mapWIDTH * 4 / 6, y, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#7A972C";
	ctx.fillRect(x, y + mapHEIGHT * 5 / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#8299B2";
	ctx.fillRect(x + mapWIDTH * 2 / 6, y + mapHEIGHT * 5 / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#317C7C";
	ctx.fillRect(x + mapWIDTH * 4 / 6, y + mapHEIGHT * 5 / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
	ctx.fillStyle = "#FFF";
	ctx.globalAlpha = .05;
	ctx.fillRect(x, y, mapWIDTH, mapHEIGHT);
	ctx.globalAlpha = 1;
};

var drawLines = function() {
	ctx.globalAlpha = .05;
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#000";
	var len;
	if (WIDTH > HEIGHT) {
		len = WIDTH + 70;
	} else {
		len = HEIGHT + 70;
	}
	for (var i = 0; i < len; i += 70) {
		ctx.beginPath();
		ctx.moveTo(-entity.x % 70 + i, 0);
		ctx.lineTo(-entity.x % 70 + i, HEIGHT);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, -entity.y % 70 + i);
		ctx.lineTo(WIDTH, -entity.y % 70 + i);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
};

var leaderboardHeight, lvlPercentage, nextLvlScore;

var drawLeaderboard = function() {
	if (Player.list[selfId].score < 20) {
		drawRotatedImage(Img.other[1], WIDTH / 2, HEIGHT / 2 - 140, 0);
	}
	if (Player.leaderboardUsername.length < 10) {
		leaderboardHeight = Player.leaderboardUsername.length * 20 + 60;
	} else {
		leaderboardHeight = 260;
	}
	ctx.globalAlpha = .7;
	ctx.fillStyle = "#333";
	ctx.fillRect(WIDTH - 230, 10, 220, leaderboardHeight);
	ctx.globalAlpha = 1;
	changeCtxFont("bold 24px sans-serif");
	ctx.textAlign = "left";
	ctx.fillStyle = "#F3F3F3";
	ctx.fillText("Leaderboard", WIDTH - 195, 40);
	changeCtxFont("bold 15px sans-serif");
	for (var pos = 0; pos < Player.leaderboardUsername.length && pos < 10; pos++) {
		ctx.fillText(pos + 1 + ". " + Player.leaderboardUsername[pos], WIDTH - 210, 20 * pos + 70);
		ctx.textAlign = "right";
		ctx.fillText(correctToSigFig(Player.leaderboardScore[pos]), WIDTH - 20 - 10, 20 * pos + 70);
		ctx.textAlign = "left";
	}
	nextLvlScore = Math.floor(300 * Math.pow(1.5, Player.list[selfId].level - 1) - 225);
	if (Player.list[selfId].level < 18) {
		lvlPercentage = Math.floor((Player.list[selfId].score - 300 * Math.pow(1.5, Player.list[selfId].level - 2) + 225) * 100 / (300 * (Math.pow(1.5, Player.list[selfId].level - 1) - Math.pow(1.5, Player.list[selfId].level - 2))));
	} else {
		lvlPercentage = 100;
		nextLvlScore = "-";
	}
	if (lvlPercentage < 0) {
		lvlPercentage = 0;
	}
	var width = WIDTH * .6 * lvlPercentage / 100;
	ctx.globalAlpha = .7;
	ctx.fillStyle = "#333";
	ctx.fillRect(WIDTH / 2 - WIDTH * .3 + width, HEIGHT - 20 - 10, WIDTH * .6 - width, 20);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#EFC700";
	ctx.fillRect(WIDTH / 2 - WIDTH * .3, HEIGHT - 20 - 10, width, 20);
	ctx.fillStyle = "#FFF";
	ctx.textAlign = "center";
	changeCtxFont("bold 22px sans-serif");
	if (Player.list[selfId].statusXpboost == 0) {
		ctx.fillText("Score: " + Player.list[selfId].score + "  Level: " + Player.list[selfId].level + " (" + lvlPercentage + "%) ", WIDTH / 2, HEIGHT - 20 - 20);
		if (document.getElementById("buttonXpboostImage").style.display == "none") {
			document.getElementById("buttonXpboostImage").style.display = "inline";
			document.getElementById("buttonPauseImage").style.display = "none";
		}
	} else {
		ctx.fillText("Score: " + Player.list[selfId].score + " (x2)  Level: " + Player.list[selfId].level + " (" + lvlPercentage + "%) ", WIDTH / 2, HEIGHT - 20 - 20);
		if (document.getElementById("buttonPauseImage").style.display == "none") {
			document.getElementById("buttonPauseImage").style.display = "inline";
			document.getElementById("buttonXpboostImage").style.display = "none";
		}
	}
	ctx.textAlign = "left";
	drawRotatedImage(Img.other[2], WIDTH - 160 + 75, HEIGHT - 160 + 75 - 60, 0);
	drawRotatedImage(Img.other[14], WIDTH - 160 - 80, HEIGHT - 160 + 75 - 60, 0, .2);
	changeCtxFont("bold 15px sans-serif");
	ctx.fillStyle = "#FFF";
	ctx.fillText(Player.list[selfId].statHp, WIDTH - 160 - 60, HEIGHT - 160 - 40);
	ctx.fillText(Player.list[selfId].statDmg, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 30);
	ctx.fillText(Player.list[selfId].statReload, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 60);
	ctx.fillText(Player.list[selfId].statRange, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 90);
	ctx.fillText(Player.list[selfId].statSpd, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 120);
	ctx.fillStyle = "#333";
	ctx.beginPath();
	ctx.arc(WIDTH - 155 + 140 * Player.list[selfId].x / mapWIDTH, HEIGHT - 155 - 60 + 140 * Player.list[selfId].y / mapHEIGHT, 5.5, 0, 2 * Math.PI);
	ctx.fillStyle = "#FFF";
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#333";
	ctx.stroke();
	for (mob of Mob.list) {
		if (mob.type == 27 || mob.type == 23 || mob.type == 48 || mob.type == 49 || mob.type == 8 || mob.type == 51 || mob.type == 52 || mob.type == 53 || mob.type == 54 || mob.type == 56 || mob.type == 57) {
			ctx.beginPath();
			ctx.arc(WIDTH - 155 + 140 * mob.x / mapWIDTH, HEIGHT - 155 - 60 + 140 * mob.y / mapHEIGHT, 5.5, 0, 2 * Math.PI);
			ctx.fillStyle = "#159699";
			ctx.fill();
			ctx.lineWidth = 5;
			ctx.strokeStyle = "#333";
			ctx.stroke();
		}
	}
};

document.onmousedown = function(event) {
	if (Player.list[selfId] && Player.list[selfId].map != 0) {
		if (event.button < 2) {
			inputAttack(true);
		}
		if (event.button >= 2) {
			inputDash(true);
		}
	}
};

document.onmouseup = function(event) {
	if (Player.list[selfId] && Player.list[selfId].map != 0) {
		if (event.button < 2) {
			inputAttack(false);
		}
		if (event.button >= 2) {
			inputDash(false);
		}
	}
};

document.onkeydown = function(event) {
	if (!typing) {
		if (event.keyCode === 87) {
			inputAttack(true);
		} else if (event.keyCode === 32) {
			inputDash(true);
		}
	}
};

document.onkeyup = function(event) {
	if (event.keyCode === 87) {
		inputAttack(false);
	} else if (event.keyCode === 32) {
		inputDash(false);
	} else if (event.keyCode === 13) {
		inputChat();
	} else if (event.keyCode === 80 && !typing) {
		tFunction();
	}
};

var attackStatus = false;

var inputAttack = function(state) {
	if (state !== attackStatus) {
		socket.emit("keyPress", {
			inputId: "leftButton",
			state: state
		});
		attackStatus = state;
	}
};

var dashStatus = false;

var inputDash = function(state) {
	if (state !== dashStatus) {
		socket.emit("keyPress", {
			inputId: "rightButton",
			state: state
		});
		dashStatus = state;
	}
};

var inputChat = function() {
	if (Player.list[selfId].map != 0) {
		if (!typing) {
			typing = true;
			document.getElementById("chatContainer").innerHTML = '<input id="chatMessage" type="text" placeholder="Enter Message" maxlength="30" style="z-index:999; position: fixed; top: ' + (canvasHEIGHT / 2 + 80) + "px; left:" + (canvasWIDTH / 2 - 90) + 'px; width:180; height:40px; background-color: rgba(0, 0, 0, .6); color:#FFF; font-size:18px" onblur="this.focus()"></input>';
			document.getElementById("chatMessage").focus();
		} else if (document.getElementById("chatMessage")) {
			typing = false;
			socket.emit("keyPress", {
				inputId: "chatMessage",
				state: document.getElementById("chatMessage").value
			});
			document.getElementById("chatMessage").onblur = "";
			document.getElementById("chatContainer").innerHTML = "";
		}
	}
};

var tFunction = function() {
	if (Player.list[selfId].map != 0) {
		tToggle = !tToggle;
	}
};

var getDistance = function(x1, x2, y1, y2) {
	return Math.pow(x1 - y1, 2) + Math.pow(x2 - y2, 2);
};

var angleStatus = 0;

var distanceStatus = 0;

document.ontouchmove = function(event) {
	var pageX = event.touches[0].pageX;
	var pageY = event.touches[0].pageY;
	if (event.touches[0].clientX > 110) {
		if (Player.list[selfId] && Player.list[selfId].map != 0) {
			var y = -startX + pageX;
			var x = -startY + pageY;
			mouseAngle = Math.atan2(x, y) / Math.PI * 180;
			mouseDistance = 1;
		}
	}
};

var startX, startY, mobileControl = false;

document.ontouchstart = function(event) {
	mobileControl = true;
	var x = event.touches[0].pageX;
	var y = event.touches[0].pageY;
	if (event.targetTouches.length < 2 && event.touches[0].clientX > 110) {
		if (Player.list[selfId] && Player.list[selfId].map != 0) {
			startX = x;
			startY = y;
		}
	}
};

document.ontouchend = function(e) {
	mouseDistance = 0;
};

document.onmousemove = function(event) {
	if (mobileControl || event.clientX < 110 && event.clientY > window.innerHeight - 310) {
		return;
	}
	if (Player.list[selfId] && Player.list[selfId].map != 0) {
		var x = -canvasWIDTH / 2 + event.clientX;
		var y = -canvasHEIGHT / 2 + event.clientY;
		mouseAngle = Math.atan2(y, x) / Math.PI * 180;
		mouseDistance = 1;
		if (getDistance(x, y, 0, 0) < canvasWIDTH * canvasWIDTH / 324) {
			mouseDistance = 1 * (getDistance(x, y, 0, 0) / (canvasWIDTH * canvasWIDTH / 324));
		} else {
			mouseDistance = 1;
		}
	}
};

var resizeCanvas = function() {
	canvasWIDTH = window.innerWidth;
	canvasHEIGHT = window.innerHeight;
	WIDTH = 1440;
	HEIGHT = 760;
	if (canvasWIDTH > canvasHEIGHT * (WIDTH / HEIGHT)) {
		canvasHEIGHTdiff = canvasWIDTH / (WIDTH / HEIGHT) - canvasHEIGHT;
		canvasWIDTHdiff = 0;
		canvasHEIGHT = canvasWIDTH / (WIDTH / HEIGHT);
	} else {
		canvasWIDTHdiff = canvasHEIGHT * (WIDTH / HEIGHT) - canvasWIDTH;
		canvasHEIGHTdiff = 0;
		canvasWIDTH = canvasHEIGHT * (WIDTH / HEIGHT);
	}
	WIDTH -= canvasWIDTHdiff * (WIDTH / canvasWIDTH);
	HEIGHT -= canvasHEIGHTdiff * (HEIGHT / canvasHEIGHT);
	canvas.style.width = "" + canvasWIDTH + "px";
	canvas.style.height = "" + canvasHEIGHT + "px";
	changeCtxFont("22px sans-serif");
	canvasWIDTH -= canvasWIDTHdiff;
	canvasHEIGHT -= canvasHEIGHTdiff;
	if (document.getElementById("chatMessage")) {
		document.getElementById("chatMessage").style.top = canvasHEIGHT / 2 + 80 + "px";
		document.getElementById("chatMessage").style.left = canvasWIDTH / 2 - 90 + "px";
	}
};

resizeCanvas();

window.addEventListener("resize", resizeCanvas());

var changeSkin = function(itemID) {
	socket.emit("useItem", {
		number: itemID
	});
};

var buySkin = function(skinID) {
	socket.emit("buySkin", {
		number: skinID
	});
};

function manageHighScore() {
	changeInnerHTML(document.getElementById("coinsText"), Player.list[selfId].coins);
	if (Player.list[selfId].coins == oldCoins) {
		changeInnerHTML(document.getElementById("coinsDisplay"), Player.list[selfId].coins);
	} else {
		changeInnerHTML(document.getElementById("coinsDisplay"), Player.list[selfId].coins + " (+" + (Player.list[selfId].coins - oldCoins) + ")");
	}
	changeInnerHTML(document.getElementById("scoreRecordDisplay"), scoreRecord);
	changeInnerHTML(document.getElementById("levelRecordDisplay"), levelRecord);
	changeInnerHTML(document.getElementById("scoreDisplay"), scoreRecordThisGame);
	changeInnerHTML(document.getElementById("levelDisplay"), levelRecordThisGame);
}

var itemNumber;

function manageShop() {
	changeInnerHTML(document.getElementById("coinsText"), Player.list[selfId].coins);
	for (var i = 1; i < itemCode[0].length; i++) {
		document.getElementById("skinButton" + i).style.display = "none";
		document.getElementById("buySkinButton" + i).style.display = "inline-block";
		if (itemPrice[i] == 0) {
			document.getElementById("skinButton" + i).style.display = "inline-block";
			document.getElementById("buySkinButton" + i).style.display = "none";
		}
	}
	for (item of Player.list[selfId].items) {
		itemNumber = item;
		document.getElementById("skinButton" + itemNumber).style.display = "inline-block";
		document.getElementById("buySkinButton" + itemNumber).style.display = "none";
	}
	for (var i = 1; i <= itemCode[0].length; i++) {
		if (itemCode[0][i] == 1 && itemCode[1][i] == Player.list[selfId].skin) {
			document.getElementById("skinButton" + i).className = "skinButtonSelected";
		} else if (itemCode[0][i] == 1) {
			document.getElementById("skinButton" + i).className = "skinButton";
		}
	}
	for (var i = 1; i <= itemCode[0].length; i++) {
		if (itemCode[0][i] == 2 && itemCode[1][i] == Player.list[selfId].body) {
			document.getElementById("skinButton" + i).className = "skinButtonSelected";
		} else if (itemCode[0][i] == 2) {
			document.getElementById("skinButton" + i).className = "skinButton";
		}
	}
	for (var i = 1; i <= itemCode[0].length; i++) {
		if (itemCode[0][i] == 3 && itemCode[1][i] == Player.list[selfId].color) {
			document.getElementById("skinButton" + i).className = "skinButtonSelected";
		} else if (itemCode[0][i] == 3) {
			document.getElementById("skinButton" + i).className = "skinButton";
		}
	}
	for (var i = 1; i <= itemCode[0].length; i++) {
		if (itemCode[0][i] == 4 && itemCode[1][i] == Player.list[selfId].back) {
			document.getElementById("skinButton" + i).className = "skinButtonSelected";
		} else if (itemCode[0][i] == 4) {
			document.getElementById("skinButton" + i).className = "skinButton";
		}
	}
	for (var i = 1; i <= itemCode[0].length; i++) {
		if (itemCode[0][i] == 5 && itemCode[1][i] == Player.list[selfId].ride) {
			document.getElementById("skinButton" + i).className = "skinButtonSelected";
		} else if (itemCode[0][i] == 5) {
			document.getElementById("skinButton" + i).className = "skinButton";
		}
	}
}

var currentSection = "home";

var gotoSection = function(section) {
	document.getElementById("homeDiv").style.display = "none";
	document.getElementById("respawnDiv").style.display = "none";
	document.getElementById("menuDiv").style.display = "none";
	currentSection = section;
	if (section == "respawn") {
		document.getElementById("homeDiv").style.display = "block";
		document.getElementById("respawnDiv").style.display = "block";
		document.getElementById("respawnButton").style.display = "none";
		document.getElementById("respawnLoadingButton").style.display = "inline-block";
		setTimeout(function() {
			document.getElementById("respawnButton").style.display = "inline-block";
			document.getElementById("respawnLoadingButton").style.display = "none";
		}, 1000);
		immediate_refresh(1);
		immediate_refresh(2);
		immediate_refresh(3);
		if (firstLogin == 1) {
			displaySpawnMessage("You'll spawn with +" + Player.list[selfId].newScore + " score!");
			scoreRecordThisGame = 0;
			levelRecordThisGame = 0;
		}
		document.getElementById("controlContainer").style.display = "none";
		if (typing == true) {
			changeInnerHTML(document.getElementById("chatContainer"), "");
			typing = false;
		}
	} else if (section == "home") {
		document.getElementById("homeDiv").style.display = "block";
		document.getElementById("menuDiv").style.display = "block";
		if (Player.list[selfId].email == "") {
			displaySpawnMessage("Login to save Coins, Score and use Shop!");
		}
	} else if (section == "game") {
		oldCoins = Player.list[selfId].coins;
		respawnButton.style.display = "inline-block";
		respawn2Button.style.display = "inline-block";
		tToggle = true;
		attackStatus = false;
		dashStatus = false;
		Player.list[selfId].map = 1;
		firstLogin = 1;
		finishLoading = 0;
	}
};

function getEllipsis(command, width) {
	for (var i = command.length; i >= 0; i--) {
		if (ctx.measureText(command.substring(0, i)).width < width) {
			if (i < command.length) {
				command = command.substring(0, i) + "...";
			}
			return command;
		}
	}
}

function correctToSigFig(value) {
	var input = value,
		count = 0,
		len = 3;
	while (input >= 1) {
		input /= 10;
		count++;
	}
	if (count >= len) {
		value = Math.floor(value / Math.pow(10, count - len));
		value *= Math.pow(10, count - len);
	}
	if (count > 9) {
		value = value / Math.pow(10, 9) + "B";
	} else if (count > 6) {
		value = value / Math.pow(10, 6) + "M";
	} else if (count > 3) {
		value = value / Math.pow(10, 3) + "K";
	}
	return value;
}

if (getCookie("username") !== "") {
	signDivUsername.value = getCookie("username");
}

if (getCookie("selectedSkin") !== "") {
	changeSkin(getCookie("selectedSkin"));
}

if (getCookie("selectedBody") !== "") {
	changeSkin(getCookie("selectedBody"));
}

if (getCookie("levelRecord") !== "") {
	levelRecord = getCookie("levelRecord");
}

if (getCookie("scoreRecord") !== "") {
	scoreRecord = getCookie("scoreRecord");
}

if (getCookie("email") !== "") {
	signDivEmail.value = getCookie("email");
}

function animate() {
	intervalTimer++;
	requestAnimationFrame(animate);
	if (!selfId) {
		return;
	}
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	for (player of Player.list) {
		player.update();
	}
	for (npc of NPC.list) {
		npc.update();
	}
	for (mob of Mob.list) {
		mob.update();
	}
	for (bullet of Bullet.list) {
		bullet.update();
	}
	if (intervalTimer % (FPS * 60) == 0) {
		if (Player.list[selfId].map == 0) {
			ga("send", "event", "Fightz.io", "menu", "menu");
		} else {
			ga("send", "event", "Fightz.io", "play", "play");
		}
	}
	if (intervalTimer % (FPS * 60) == 0) {
		if (Math.random() < 1) {
			deathTimerLimit = 0;
		} else {
			deathTimerLimit = FPS * 1;
		}
	}
	if (intervalTimer % FPS == 0) {
		manageMusic();
	}
	if (intervalTimer % 8 == 1) {
		managePause();
		manageHighScore();
	}
	if (intervalTimer % 4 == 0 && Player.list[selfId].map == 0) {
		manageShop();
	}
	if (spawnMessage.innerHTML == "Reconnected." && Player.list[selfId].score >= 1e3) {
		changeInnerHTML(spawnMessage, "Server Restarted. You'll spawn with +" + Player.list[selfId].score + " score!");
	}
	if (Player.list[selfId].map == 0 && finishLoading == 0) {
		adTimer2++;
		if (adTimer2 >= 7 * FPS) {
			adTimer2 = 0;
			if (!isHome) {
				if (currentSection == "respawn") {
					immediate_refresh(1);
					immediate_refresh(2);
				} else if (currentSection == "home") {
					immediate_refresh(3);
				}
			}
		}
	} else {
		adTimer2 = 0;
	}
	if (intervalTimer % 4 == 0 && Player.list[selfId].map !== 0) {
		if (Math.abs(angleStatus - mouseAngle) > 1 || Math.abs(distanceStatus - mouseDistance) > .1) {
			socket.emit("keyPress", {
				inputId: "angle",
				state: mouseAngle
			});
			socket.emit("keyPress", {
				inputId: "mouseDistance",
				state: mouseDistance
			});
			angleStatus = mouseAngle;
			distanceStatus = mouseDistance;
		}
	}
	drawMap();
	for (decoration of Decoration.list) {
		if (decoration.isWater) {
			decoration.draw();
		}
	}
	drawLines();
	for (decoration of Decoration.list) {
		if (!decoration.isWater) {
			decoration.draw();
		}
	}
	for (food of Food.list) {
		food.draw();
	}
	for (mob of Mob.list) {
		mob.draw();
	}
	for (npc of NPC.list) {
		npc.draw();
	}
	for (player of Player.list) {
		if (player.id != selfId && player.dash == 0) {
			player.draw();
		}
	}
	if (Player.list[selfId].dash == 0) {
		Player.list[selfId].draw();
	}
	for (player of Player.list) {
		if (player.id != selfId && player.dash == 1) {
			player.draw();
		}
	}
	if (Player.list[selfId].dash == 1) {
		Player.list[selfId].draw();
	}
	for (bullet of Bullet.list) {
		bullet.draw();
	}
	for (player of Player.list) {
		player.drawMessage();
	}
	if (!(Player.list[selfId].score <= scoreRecord)) {
		scoreRecord = Player.list[selfId].score;
		levelRecord = Player.list[selfId].level;
		setCookie("scoreRecord", scoreRecord, 365);
		setCookie("levelRecord", levelRecord, 365);
	}
	if (!(Player.list[selfId].score <= scoreRecordThisGame)) {
		scoreRecordThisGame = Player.list[selfId].score;
		levelRecordThisGame = Player.list[selfId].level;
	}
	if (Player.list[selfId].map !== 0) {
		drawLeaderboard();
		document.getElementById("homeDiv").style.display = "none";
		document.getElementById("controlContainer").style.display = "block";
	} else if (document.getElementById("homeDiv").style.display == "none" && deathTimer++ >= deathTimerLimit) {
		deathTimer = 0;
		gotoSection("respawn");
	}
}

animate();

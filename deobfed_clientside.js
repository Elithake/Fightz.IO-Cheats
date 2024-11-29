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
var adTimer = 0, adTimer2 = 0;
var deathTimer = 0;
var deathTimerLimit = 0;
var mouseAngle, mouseDistance;
var typing = false;
var tToggle = true;
var canvas = document.getElementById('ctx');
canvas.width = WIDTH;
canvas.height = HEIGHT;
var finishLoading = 2;
var selectedSkin = 1;
var selectedBody = 1;
var urlCode = '';
var oldCoins = 9607858;
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
    var cdnPath = '';
} else {
    var cdnPath = 'https://playem.io/cache/fightzio/';
}
;
var debug = false;
var itemCode = [
        [
            0,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            2,
            2,
            2,
            2,
            2,
            2,
            1,
            1,
            3,
            3,
            3,
            3,
            3,
            1,
            1,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            3,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            4,
            4,
            4,
            4,
            4,
            5,
            4,
            4,
            4,
            4,
            4,
            4,
            4,
            1,
            2,
            1,
            2,
            1,
            2
        ],
        [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            1,
            2,
            3,
            4,
            5,
            6,
            11,
            12,
            1,
            2,
            3,
            4,
            5,
            13,
            14,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            6,
            15,
            15,
            16,
            16,
            17,
            17,
            18,
            18,
            19,
            19,
            20,
            20,
            21,
            21,
            22,
            22,
            23,
            23,
            24,
            24,
            25,
            25,
            26,
            26,
            27,
            27,
            28,
            28,
            29,
            29,
            30,
            30,
            31,
            31,
            32,
            32,
            33,
            33,
            34,
            34,
            35,
            35,
            1,
            2,
            3,
            4,
            5,
            1,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            36,
            36,
            37,
            37,
            38,
            38
        ]
    ];
var itemPrice = [
        -1,
        0,
        0,
        0,
        0,
        0,
        10000,
        10000,
        100000,
        50000,
        100000,
        10000,
        0,
        50000,
        500000,
        50000,
        100000,
        50000,
        500000,
        0,
        0,
        0,
        0,
        0,
        500000,
        500000,
        0,
        0,
        0,
        0,
        10000,
        100000,
        500000,
        500000,
        0,
        500000,
        500000,
        10000,
        10000,
        10000,
        10000,
        100000,
        100000,
        100000,
        100000,
        50000,
        50000,
        50000,
        50000,
        1000000,
        1000000,
        1000000,
        1000000,
        1000000,
        1000000,
        1000000,
        1000000,
        500000,
        500000,
        500000,
        500000,
        100000,
        100000,
        100000,
        100000,
        1500000,
        1500000,
        1500000,
        1500000,
        1000000,
        1000000,
        1000000,
        1000000,
        1500000,
        1500000,
        1500000,
        1500000,
        0,
        500000,
        500000,
        500000,
        500000,
        0,
        500000,
        500000,
        500000,
        1000000,
        1000000,
        1000000,
        1000000,
        0,
        0,
        50000,
        50000,
        50000,
        50000
    ];
var socket = io();
if (/ref/.test(window.location.href)) {
    urlCode = '/?ref';
}
;
aiptag.cmd.player.push(function () {
    adplayer = new aipPlayer({
        AD_WIDTH: 960,
        AD_HEIGHT: 540,
        AD_FULLSCREEN: true,
        AD_CENTERPLAYER: false,
        LOADING_TEXT: 'Loading...',
        PREROLL_ELEM: function () {
            return document.getElementById('preroll');
        },
        AIP_COMPLETE: function (_0xcaa5x29) {
        },
        AIP_REMOVE: function () {
        }
    });
});
var signDiv = document.getElementById('signDiv');
var signDivUsername = document.getElementById('signDiv-username');
var signDivEmail = document.getElementById('signDiv-email');
var signDivPassword = document.getElementById('signDiv-password');
var respawnButton = document.getElementById('respawnButton');
var respawn2Button = document.getElementById('respawn2Button');
var loadingButton = document.getElementById('loadingButton');
var serverNow;
if (/as\./.test(window.location.href) || /as-2/.test(window.location.href) || /as-3/.test(window.location.href) || /as-4/.test(window.location.href) || /as-5/.test(window.location.href) || /as-6/.test(window.location.href) || /as-7/.test(window.location.href) || /as-8/.test(window.location.href)) {
    serverNow = 'as';
} else {
    if (/ru\./.test(window.location.href) || /ru-2/.test(window.location.href) || /ru-3/.test(window.location.href) || /ru-4/.test(window.location.href) || /ru-5/.test(window.location.href) || /ru-6/.test(window.location.href) || /ru-7/.test(window.location.href) || /ru-8/.test(window.location.href)) {
        serverNow = 'ru';
    } else {
        if (/eu\./.test(window.location.href) || /eu-2/.test(window.location.href) || /eu-3/.test(window.location.href) || /eu-4/.test(window.location.href) || /eu-5/.test(window.location.href) || /eu-6/.test(window.location.href) || /eu-7/.test(window.location.href) || /eu-8/.test(window.location.href)) {
            serverNow = 'eu';
        } else {
            if (/na\./.test(window.location.href) || /na-2/.test(window.location.href) || /na-3/.test(window.location.href) || /na-4/.test(window.location.href) || /na-5/.test(window.location.href) || /na-6/.test(window.location.href) || /na-7/.test(window.location.href) || /na-8/.test(window.location.href)) {
                serverNow = 'na';
            } else {
                isHome = true;
            }
        }
    }
}
;
if (serverNow == 'as') {
    document.getElementById('server3').style.display = 'inline';
    document.getElementById('newServer3').style.textDecoration = 'underline';
} else {
    if (serverNow == 'ru') {
        document.getElementById('server4').style.display = 'inline';
        document.getElementById('newServer4').style.textDecoration = 'underline';
    } else {
        if (serverNow == 'eu') {
            document.getElementById('server2').style.display = 'inline';
            document.getElementById('newServer2').style.textDecoration = 'underline';
        } else {
            if (serverNow == 'na') {
                document.getElementById('server1').style.display = 'inline';
                document.getElementById('newServer1').style.textDecoration = 'underline';
            }
        }
    }
}
;
if (isHome) {
    document.getElementById('menuDiv').style.display = 'none';
    document.getElementById('serverDiv').style.display = 'block';
}
;
if (!/fightz\.io/.test(document.referrer) && !isHome && !/party/.test(window.location.href)) {
    self.location = 'https://fightz.io';
}
;
if (/serverRestarted/.test(window.location.href)) {
    if (/fightz.io/.test(document.referrer)) {
        self.location = document.referrer;
    } else {
        self.location = 'https://fightz.io';
    }
} else {
    if (window.top.location !== window.location) {
        displaySpawnMessage('Play on Fightz.io Official Site (<a href="https://fightz.io" target="_blank">https://fightz.io</a>) for NEW UPDATES!');
    }
}
;
if (/serverRestarted/.test(document.referrer)) {
    displaySpawnMessage('Reconnected.');
}
;
var goToServer = function (_0xcaa5x33) {
    var _0xcaa5x34 = Math.random();
    if (/ref=google/.test(window.location.href)) {
        window.open('https://' + _0xcaa5x33 + '-5.fightz.io/?ref=play', '_self');
        return;
    }
    ;
    if (_0xcaa5x34 < 0.5) {
        window.open('https://' + _0xcaa5x33 + '-3.fightz.io', '_self');
    } else {
        window.open('https://' + _0xcaa5x33 + '-3.fightz.io', '_self');
    }
    ;
    acceptCookieConsent();
};
var goToMode = function (_0xcaa5x36) {
    var _0xcaa5x34 = Math.random();
    if (/na/.test(window.location.href)) {
        server = 'na';
    } else {
        if (/eu/.test(window.location.href)) {
            server = 'eu';
        } else {
            if (/ru/.test(window.location.href)) {
                server = 'ru';
            } else {
                if (/as/.test(window.location.href)) {
                    server = 'as';
                }
            }
        }
    }
    ;
    if (_0xcaa5x36 == 'normal') {
        window.open('https://' + server + '.fightz.io', '_self');
    } else {
        if (_0xcaa5x36 == 'pvp') {
            window.open('https://' + server + '-3.fightz.io', '_self');
        } else {
            if (_0xcaa5x36 == 'team') {
                window.open('https://' + server + '-5.fightz.io', '_self');
            }
        }
    }
};
var playNow = function () {
    if (/ref=play/.test(window.location.href)) {
        socket.emit('signIn', { username: signDivUsername.value + '_' });
    } else {
        if (window.location != window.parent.location) {
            socket.emit('signIn', { username: signDivUsername.value + '-' });
        } else {
            socket.emit('signIn', { username: signDivUsername.value });
        }
    }
};
loginButton.onclick = function () {
    socket.emit('login', {
        email: signDivEmail.value,
        password: signDivPassword.value
    });
};
registerButton.onclick = function () {
    socket.emit('register', {
        email: signDivEmail.value,
        password: signDivPassword.value
    });
};
respawnButton.onclick = function () {
    respawnButton.style.display = 'none';
    respawn2Button.style.display = 'none';
    document.getElementById('respawnLoadingButton').style.display = 'inline-block';
    gotoSection('home');
};
var loadImage = function (_0xcaa5x39) {
    if (_0xcaa5x39.src == '') {
        _0xcaa5x39.src = _0xcaa5x39.dataURL;
    }
};
var Img = {};
Img.other = {};
Img.other[1] = new Image();
Img.other[1].src = cdnPath + 'client/img/tutorial.png?v=1.1';
Img.other[2] = new Image();
Img.other[2].src = cdnPath + 'client/img/minimap.png?v=1.1';
Img.other[3] = new Image();
Img.other[3].dataURL = cdnPath + 'client/img/glow.png';
Img.other[4] = new Image();
Img.other[4].src = cdnPath + 'client/img/shield1.png';
Img.other[5] = new Image();
Img.other[5].dataURL = cdnPath + 'client/img/lvlup.png';
Img.other[6] = new Image();
Img.other[6].dataURL = cdnPath + 'client/img/redFlag.png';
Img.other[7] = new Image();
Img.other[7].dataURL = cdnPath + 'client/img/blueFlag.png';
Img.other[8] = new Image();
Img.other[8].src = cdnPath + 'client/img/levelBackground.png';
Img.other[9] = new Image();
Img.other[9].src = cdnPath + 'client/img/pet1.png?v=2.1';
Img.other[10] = new Image();
Img.other[10].src = cdnPath + 'client/img/pet2.png?v=2.1';
Img.other[11] = new Image();
Img.other[11].src = cdnPath + 'client/img/pet3.png?v=2.1';
Img.other[12] = new Image();
Img.other[12].src = cdnPath + 'client/img/pet4.png?v=2.1';
Img.other[13] = new Image();
Img.other[13].src = cdnPath + 'client/img/tutorialAngle.png?v=2.1';
Img.other[14] = new Image();
Img.other[14].src = cdnPath + 'client/img/stats.png';
Img.other[15] = new Image();
Img.other[15].src = cdnPath + 'client/img/dashIcon.png';
Img.ride = {};
Img.ride[1] = new Image();
Img.ride[1].dataURL = cdnPath + 'client/img/ride1.png';
Img.back = {};
Img.back[1] = new Image();
Img.back[1].dataURL = cdnPath + 'client/img/back1.png';
Img.back[2] = new Image();
Img.back[2].dataURL = cdnPath + 'client/img/back2.png';
Img.back[3] = new Image();
Img.back[3].dataURL = cdnPath + 'client/img/back3.png';
Img.back[4] = new Image();
Img.back[4].dataURL = cdnPath + 'client/img/back4.png';
Img.back[5] = new Image();
Img.back[5].dataURL = cdnPath + 'client/img/back5.png';
Img.back[6] = new Image();
Img.back[6].dataURL = cdnPath + 'client/img/back6.png';
Img.back[7] = new Image();
Img.back[7].dataURL = cdnPath + 'client/img/back7.png';
Img.back[8] = new Image();
Img.back[8].dataURL = cdnPath + 'client/img/back8.png';
Img.back[9] = new Image();
Img.back[9].dataURL = cdnPath + 'client/img/back9.png?v=1.1';
Img.back[10] = new Image();
Img.back[10].dataURL = cdnPath + 'client/img/back10.png?v=1.1';
Img.back[11] = new Image();
Img.back[11].dataURL = cdnPath + 'client/img/back11.png?v=1.1';
Img.back[12] = new Image();
Img.back[12].dataURL = cdnPath + 'client/img/back12.png?v=1.1';
Img.skin = {};
Img.skin[1] = new Image();
Img.skin[1].dataURL = cdnPath + 'client/img/skin1.png';
Img.skin[2] = new Image();
Img.skin[2].dataURL = cdnPath + 'client/img/skin2.png';
Img.skin[3] = new Image();
Img.skin[3].dataURL = cdnPath + 'client/img/skin3.png';
Img.skin[4] = new Image();
Img.skin[4].dataURL = cdnPath + 'client/img/skin4.png';
Img.skin[5] = new Image();
Img.skin[5].dataURL = cdnPath + 'client/img/skin5.png';
Img.skin[6] = new Image();
Img.skin[6].dataURL = cdnPath + 'client/img/skin6.png';
Img.skin[7] = new Image();
Img.skin[7].dataURL = cdnPath + 'client/img/skin7.png';
Img.skin[8] = new Image();
Img.skin[8].dataURL = cdnPath + 'client/img/skin8.png';
Img.skin[9] = new Image();
Img.skin[9].dataURL = cdnPath + 'client/img/skin9.png';
Img.skin[10] = new Image();
Img.skin[10].dataURL = cdnPath + 'client/img/skin10.png';
Img.skin[11] = new Image();
Img.skin[11].dataURL = cdnPath + 'client/img/skin11.png';
Img.skin[12] = new Image();
Img.skin[12].dataURL = cdnPath + 'client/img/skin12.png';
Img.skin[13] = new Image();
Img.skin[13].dataURL = cdnPath + 'client/img/skin13.png';
Img.skin[14] = new Image();
Img.skin[14].dataURL = cdnPath + 'client/img/skin14.png';
Img.skin[15] = new Image();
Img.skin[15].dataURL = cdnPath + 'client/img/skin15.png';
Img.skin[16] = new Image();
Img.skin[16].dataURL = cdnPath + 'client/img/skin16.png';
Img.skin[17] = new Image();
Img.skin[17].dataURL = cdnPath + 'client/img/skin17.png';
Img.skin[18] = new Image();
Img.skin[18].dataURL = cdnPath + 'client/img/skin18.png';
Img.skin[19] = new Image();
Img.skin[19].dataURL = cdnPath + 'client/img/skin19.png';
Img.skin[20] = new Image();
Img.skin[20].dataURL = cdnPath + 'client/img/skin20.png';
Img.skin[21] = new Image();
Img.skin[21].dataURL = cdnPath + 'client/img/skin21.png';
Img.skin[22] = new Image();
Img.skin[22].dataURL = cdnPath + 'client/img/skin22.png';
Img.skin[23] = new Image();
Img.skin[23].dataURL = cdnPath + 'client/img/skin23.png';
Img.skin[24] = new Image();
Img.skin[24].dataURL = cdnPath + 'client/img/skin24.png';
Img.skin[25] = new Image();
Img.skin[25].dataURL = cdnPath + 'client/img/skin25.png';
Img.skin[26] = new Image();
Img.skin[26].dataURL = cdnPath + 'client/img/skin26.png';
Img.skin[27] = new Image();
Img.skin[27].dataURL = cdnPath + 'client/img/skin27.png';
Img.skin[28] = new Image();
Img.skin[28].dataURL = cdnPath + 'client/img/skin28.png';
Img.skin[29] = new Image();
Img.skin[29].dataURL = cdnPath + 'client/img/skin29.png';
Img.skin[30] = new Image();
Img.skin[30].dataURL = cdnPath + 'client/img/skin30.png';
Img.skin[31] = new Image();
Img.skin[31].dataURL = cdnPath + 'client/img/skin31.png';
Img.skin[32] = new Image();
Img.skin[32].dataURL = cdnPath + 'client/img/skin32.png';
Img.skin[33] = new Image();
Img.skin[33].dataURL = cdnPath + 'client/img/skin33.png';
Img.skin[34] = new Image();
Img.skin[34].dataURL = cdnPath + 'client/img/skin34.png';
Img.skin[35] = new Image();
Img.skin[35].dataURL = cdnPath + 'client/img/skin35.png';
Img.skin[36] = new Image();
Img.skin[36].dataURL = cdnPath + 'client/img/skin36.png';
Img.skin[37] = new Image();
Img.skin[37].dataURL = cdnPath + 'client/img/skin37.png';
Img.skin[38] = new Image();
Img.skin[38].dataURL = cdnPath + 'client/img/skin38.png';
Img.body = {};
Img.body[1] = new Image();
Img.body[1].dataURL = cdnPath + 'client/img/body1.png';
Img.body[2] = new Image();
Img.body[2].dataURL = cdnPath + 'client/img/body2.png';
Img.body[3] = new Image();
Img.body[3].dataURL = cdnPath + 'client/img/body3.png';
Img.body[4] = new Image();
Img.body[4].dataURL = cdnPath + 'client/img/body4.png';
Img.body[5] = new Image();
Img.body[5].dataURL = cdnPath + 'client/img/body5.png';
Img.body[6] = new Image();
Img.body[6].dataURL = cdnPath + 'client/img/body6.png';
Img.body[7] = new Image();
Img.body[7].dataURL = cdnPath + 'client/img/body7.png';
Img.body[8] = new Image();
Img.body[8].dataURL = cdnPath + 'client/img/body8.png';
Img.body[9] = new Image();
Img.body[9].dataURL = cdnPath + 'client/img/body9.png';
Img.body[10] = new Image();
Img.body[10].dataURL = cdnPath + 'client/img/body10.png';
Img.body[11] = new Image();
Img.body[11].dataURL = cdnPath + 'client/img/body11.png';
Img.body[12] = new Image();
Img.body[12].dataURL = cdnPath + 'client/img/body12.png';
Img.body[13] = new Image();
Img.body[13].dataURL = cdnPath + 'client/img/body13.png';
Img.body[14] = new Image();
Img.body[14].dataURL = cdnPath + 'client/img/body14.png?v=1.1';
Img.body[15] = new Image();
Img.body[15].dataURL = cdnPath + 'client/img/body15.png';
Img.body[16] = new Image();
Img.body[16].dataURL = cdnPath + 'client/img/body16.png';
Img.body[17] = new Image();
Img.body[17].dataURL = cdnPath + 'client/img/body17.png';
Img.body[18] = new Image();
Img.body[18].dataURL = cdnPath + 'client/img/body18.png';
Img.body[19] = new Image();
Img.body[19].dataURL = cdnPath + 'client/img/body19.png';
Img.body[20] = new Image();
Img.body[20].dataURL = cdnPath + 'client/img/body20.png';
Img.body[21] = new Image();
Img.body[21].dataURL = cdnPath + 'client/img/body21.png';
Img.body[22] = new Image();
Img.body[22].dataURL = cdnPath + 'client/img/body22.png';
Img.body[23] = new Image();
Img.body[23].dataURL = cdnPath + 'client/img/body23.png';
Img.body[24] = new Image();
Img.body[24].dataURL = cdnPath + 'client/img/body24.png';
Img.body[25] = new Image();
Img.body[25].dataURL = cdnPath + 'client/img/body25.png';
Img.body[26] = new Image();
Img.body[26].dataURL = cdnPath + 'client/img/body26.png';
Img.body[27] = new Image();
Img.body[27].dataURL = cdnPath + 'client/img/body27.png';
Img.body[28] = new Image();
Img.body[28].dataURL = cdnPath + 'client/img/body28.png';
Img.body[29] = new Image();
Img.body[29].dataURL = cdnPath + 'client/img/body29.png';
Img.body[30] = new Image();
Img.body[30].dataURL = cdnPath + 'client/img/body30.png';
Img.body[31] = new Image();
Img.body[31].dataURL = cdnPath + 'client/img/body31.png';
Img.body[32] = new Image();
Img.body[32].dataURL = cdnPath + 'client/img/body32.png';
Img.body[33] = new Image();
Img.body[33].dataURL = cdnPath + 'client/img/body33.png';
Img.body[34] = new Image();
Img.body[34].dataURL = cdnPath + 'client/img/body34.png';
Img.body[35] = new Image();
Img.body[35].dataURL = cdnPath + 'client/img/body35.png';
Img.body[36] = new Image();
Img.body[36].dataURL = cdnPath + 'client/img/body36.png';
Img.body[37] = new Image();
Img.body[37].dataURL = cdnPath + 'client/img/body37.png';
Img.body[38] = new Image();
Img.body[38].dataURL = cdnPath + 'client/img/body38.png';
Img.decoration = {};
Img.decoration[1] = new Image();
Img.decoration[1].dataURL = cdnPath + 'client/img/decoration1.png';
Img.decoration[2] = new Image();
Img.decoration[2].dataURL = cdnPath + 'client/img/decoration2.png';
Img.decoration[3] = new Image();
Img.decoration[3].dataURL = cdnPath + 'client/img/decoration3.png';
Img.decoration[4] = new Image();
Img.decoration[4].dataURL = cdnPath + 'client/img/decoration4.png';
Img.decoration[5] = new Image();
Img.decoration[5].dataURL = cdnPath + 'client/img/decoration5.png';
Img.decoration[6] = new Image();
Img.decoration[6].dataURL = cdnPath + 'client/img/decoration6.png';
Img.decoration[7] = new Image();
Img.decoration[7].dataURL = cdnPath + 'client/img/decoration7.png';
Img.decoration[8] = new Image();
Img.decoration[8].dataURL = cdnPath + 'client/img/decoration8.png';
Img.decoration[9] = new Image();
Img.decoration[9].dataURL = cdnPath + 'client/img/decoration9.png';
Img.decoration[10] = new Image();
Img.decoration[10].dataURL = cdnPath + 'client/img/decoration10.png';
Img.decoration[11] = new Image();
Img.decoration[11].src = cdnPath + 'client/img/decoration11.png';
Img.decoration[12] = new Image();
Img.decoration[12].src = cdnPath + 'client/img/decoration12.png';
Img.decoration[13] = new Image();
Img.decoration[13].src = cdnPath + 'client/img/decoration13.png?v1.1';
Img.decoration[14] = new Image();
Img.decoration[14].src = cdnPath + 'client/img/decoration14.png';
Img.decoration[15] = new Image();
Img.decoration[15].dataURL = cdnPath + 'client/img/decoration15.png';
Img.decoration[16] = new Image();
Img.decoration[16].dataURL = cdnPath + 'client/img/decoration16.png';
Img.decoration[17] = new Image();
Img.decoration[17].dataURL = cdnPath + 'client/img/decoration17.png';
Img.decoration[18] = new Image();
Img.decoration[18].dataURL = cdnPath + 'client/img/decoration18.png';
Img.decoration[19] = new Image();
Img.decoration[19].dataURL = cdnPath + 'client/img/decoration19.png';
Img.decoration[20] = new Image();
Img.decoration[20].dataURL = cdnPath + 'client/img/decoration20.png';
Img.decoration[21] = new Image();
Img.decoration[21].dataURL = cdnPath + 'client/img/decoration21.png';
Img.decoration[22] = new Image();
Img.decoration[22].dataURL = cdnPath + 'client/img/decoration22.png';
Img.decoration[23] = new Image();
Img.decoration[23].dataURL = cdnPath + 'client/img/decoration23.png';
Img.decoration[24] = new Image();
Img.decoration[24].dataURL = cdnPath + 'client/img/decoration24.png?v=1.1';
Img.decoration[25] = new Image();
Img.decoration[25].dataURL = cdnPath + 'client/img/decoration25.png?v=1.1';
Img.decoration[26] = new Image();
Img.decoration[26].dataURL = cdnPath + 'client/img/decoration26.png';
Img.decoration[27] = new Image();
Img.decoration[27].dataURL = cdnPath + 'client/img/decoration27.png';
Img.decoration[28] = new Image();
Img.decoration[28].dataURL = cdnPath + 'client/img/decoration28.png';
Img.decoration[29] = new Image();
Img.decoration[29].dataURL = cdnPath + 'client/img/decoration29.png';
Img.decoration[30] = new Image();
Img.decoration[30].dataURL = cdnPath + 'client/img/decoration30.png';
Img.decoration[31] = new Image();
Img.decoration[31].dataURL = cdnPath + 'client/img/decoration31.png';
Img.decoration[32] = new Image();
Img.decoration[32].dataURL = cdnPath + 'client/img/decoration32.png';
Img.decoration[33] = new Image();
Img.decoration[33].dataURL = cdnPath + 'client/img/decoration33.png';
Img.decoration[34] = new Image();
Img.decoration[34].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[35] = new Image();
Img.decoration[35].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[36] = new Image();
Img.decoration[36].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[37] = new Image();
Img.decoration[37].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[38] = new Image();
Img.decoration[38].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[39] = new Image();
Img.decoration[39].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[40] = new Image();
Img.decoration[40].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[41] = new Image();
Img.decoration[41].dataURL = cdnPath + 'client/img/decoration34.png';
Img.decoration[42] = new Image();
Img.decoration[42].dataURL = cdnPath + 'client/img/decoration42.png';
Img.decoration[43] = new Image();
Img.decoration[43].dataURL = cdnPath + 'client/img/decoration43.png';
Img.decoration[44] = new Image();
Img.decoration[44].dataURL = cdnPath + 'client/img/decoration44.png';
Img.decoration[45] = new Image();
Img.decoration[45].dataURL = cdnPath + 'client/img/decoration45.png';
Img.decoration[46] = new Image();
Img.decoration[46].dataURL = cdnPath + 'client/img/decoration46.png';
Img.decoration[47] = new Image();
Img.decoration[47].dataURL = cdnPath + 'client/img/decoration47.png?v=1.1';
Img.decoration[48] = new Image();
Img.decoration[48].dataURL = cdnPath + 'client/img/decoration48.png?v=1.1';
Img.decoration[49] = new Image();
Img.decoration[49].dataURL = cdnPath + 'client/img/decoration49.png';
Img.decoration[50] = new Image();
Img.decoration[50].dataURL = cdnPath + 'client/img/decoration50.png?v=1.1';
Img.decoration[51] = new Image();
Img.decoration[51].dataURL = cdnPath + 'client/img/decoration51.png';
Img.decoration[52] = new Image();
Img.decoration[52].dataURL = cdnPath + 'client/img/decoration52.png';
Img.decoration[53] = new Image();
Img.decoration[53].dataURL = cdnPath + 'client/img/decoration53.png';
Img.decoration[54] = new Image();
Img.decoration[54].dataURL = cdnPath + 'client/img/decoration54.png';
Img.decoration[55] = new Image();
Img.decoration[55].dataURL = cdnPath + 'client/img/decoration55.png';
Img.decoration[56] = new Image();
Img.decoration[56].dataURL = cdnPath + 'client/img/decoration56.png';
Img.decoration[57] = new Image();
Img.decoration[57].dataURL = cdnPath + 'client/img/decoration57.png';
Img.decoration[58] = new Image();
Img.decoration[58].dataURL = cdnPath + 'client/img/decoration58.png';
Img.decoration[59] = new Image();
Img.decoration[59].dataURL = cdnPath + 'client/img/decoration59.png';
Img.decoration[60] = new Image();
Img.decoration[60].dataURL = cdnPath + 'client/img/decoration60.png';
Img.decoration[61] = new Image();
Img.decoration[61].dataURL = cdnPath + 'client/img/decoration61.png';
Img.decoration[62] = new Image();
Img.decoration[62].dataURL = cdnPath + 'client/img/decoration62.png';
Img.decoration[63] = new Image();
Img.decoration[63].dataURL = cdnPath + 'client/img/decoration63.png?v=1.1';
Img.decoration[64] = new Image();
Img.decoration[64].dataURL = cdnPath + 'client/img/decoration64.png';
Img.decoration[65] = new Image();
Img.decoration[65].dataURL = cdnPath + 'client/img/decoration65.png';
Img.decoration[66] = new Image();
Img.decoration[66].dataURL = cdnPath + 'client/img/decoration66.png';
Img.decoration[67] = new Image();
Img.decoration[67].dataURL = cdnPath + 'client/img/decoration67.png?v=1.1';
Img.decoration[68] = new Image();
Img.decoration[68].dataURL = cdnPath + 'client/img/decoration68.png?v=1.1';
Img.decoration[69] = new Image();
Img.decoration[69].src = cdnPath + 'client/img/decoration69.png?v=1.1';
Img.decoration[70] = new Image();
Img.decoration[70].src = cdnPath + 'client/img/decoration70.png?v=1.1';
Img.decoration[71] = new Image();
Img.decoration[71].src = cdnPath + 'client/img/decoration71.png?v=1.1';
Img.decoration[72] = new Image();
Img.decoration[72].src = cdnPath + 'client/img/decoration72.png?v=1.1';
Img.decoration[73] = new Image();
Img.decoration[73].src = cdnPath + 'client/img/decoration73.png?v=1.1';
Img.decoration[74] = new Image();
Img.decoration[74].dataURL = cdnPath + 'client/img/decoration74.png?v=1.2';
Img.decoration[75] = new Image();
Img.decoration[75].dataURL = cdnPath + 'client/img/decoration75.png';
Img.mob = {};
Img.mob[1] = new Image();
Img.mob[1].dataURL = cdnPath + 'client/img/mob1.png';
Img.mob[2] = new Image();
Img.mob[2].dataURL = cdnPath + 'client/img/mob2.png';
Img.mob[3] = new Image();
Img.mob[3].dataURL = cdnPath + 'client/img/mob3.png';
Img.mob[4] = new Image();
Img.mob[4].dataURL = cdnPath + 'client/img/mob4.png';
Img.mob[5] = new Image();
Img.mob[5].dataURL = cdnPath + 'client/img/mob5.png';
Img.mob[6] = new Image();
Img.mob[6].dataURL = cdnPath + 'client/img/mob6.png';
Img.mob[7] = new Image();
Img.mob[7].dataURL = cdnPath + 'client/img/mob7.png';
Img.mob[8] = new Image();
Img.mob[8].dataURL = cdnPath + 'client/img/mob8.png';
Img.mob[9] = new Image();
Img.mob[9].dataURL = cdnPath + 'client/img/mob9.png';
Img.mob[10] = new Image();
Img.mob[10].dataURL = cdnPath + 'client/img/mob10.png';
Img.mob[11] = new Image();
Img.mob[11].dataURL = cdnPath + 'client/img/mob11.png';
Img.mob[12] = new Image();
Img.mob[12].dataURL = cdnPath + 'client/img/mob12.png';
Img.mob[13] = new Image();
Img.mob[13].dataURL = cdnPath + 'client/img/mob13.png';
Img.mob[14] = new Image();
Img.mob[14].dataURL = cdnPath + 'client/img/mob14.png?v=1.1';
Img.mob[15] = new Image();
Img.mob[15].dataURL = cdnPath + 'client/img/mob15.png';
Img.mob[16] = new Image();
Img.mob[16].dataURL = cdnPath + 'client/img/mob16.png';
Img.mob[17] = new Image();
Img.mob[17].dataURL = cdnPath + 'client/img/mob17.png';
Img.mob[18] = new Image();
Img.mob[18].dataURL = cdnPath + 'client/img/mob18.png';
Img.mob[19] = new Image();
Img.mob[19].dataURL = cdnPath + 'client/img/mob19.png';
Img.mob[20] = new Image();
Img.mob[20].dataURL = cdnPath + 'client/img/mob20.png';
Img.mob[21] = new Image();
Img.mob[21].dataURL = cdnPath + 'client/img/mob21.png';
Img.mob[22] = new Image();
Img.mob[22].dataURL = cdnPath + 'client/img/mob22.png?v=1.1';
Img.mob[23] = new Image();
Img.mob[23].dataURL = cdnPath + 'client/img/mob23.png';
Img.mob[24] = new Image();
Img.mob[24].dataURL = cdnPath + 'client/img/mob24.png';
Img.mob[25] = new Image();
Img.mob[25].dataURL = cdnPath + 'client/img/mob25.png';
Img.mob[26] = new Image();
Img.mob[26].dataURL = cdnPath + 'client/img/mob26.png';
Img.mob[27] = new Image();
Img.mob[27].dataURL = cdnPath + 'client/img/mob27.png';
Img.mob[28] = new Image();
Img.mob[28].dataURL = cdnPath + 'client/img/mob28.png';
Img.mob[29] = new Image();
Img.mob[29].dataURL = cdnPath + 'client/img/mob29.png';
Img.mob[30] = new Image();
Img.mob[30].dataURL = cdnPath + 'client/img/mob30.png';
Img.mob[31] = new Image();
Img.mob[31].dataURL = cdnPath + 'client/img/mob31.png';
Img.mob[32] = new Image();
Img.mob[32].dataURL = cdnPath + 'client/img/mob32.png';
Img.mob[33] = new Image();
Img.mob[33].dataURL = cdnPath + 'client/img/mob33.png?v=1.1';
Img.mob[34] = new Image();
Img.mob[34].dataURL = cdnPath + 'client/img/mob34.png';
Img.mob[35] = new Image();
Img.mob[35].dataURL = cdnPath + 'client/img/mob35.png';
Img.mob[36] = new Image();
Img.mob[36].dataURL = cdnPath + 'client/img/mob36.png';
Img.mob[37] = new Image();
Img.mob[37].dataURL = cdnPath + 'client/img/mob37.png';
Img.mob[38] = new Image();
Img.mob[38].dataURL = cdnPath + 'client/img/mob38.png';
Img.mob[39] = new Image();
Img.mob[39].dataURL = cdnPath + 'client/img/mob39.png';
Img.mob[40] = new Image();
Img.mob[40].dataURL = cdnPath + 'client/img/mob40.png';
Img.mob[41] = new Image();
Img.mob[41].dataURL = cdnPath + 'client/img/mob41.png';
Img.mob[42] = new Image();
Img.mob[42].dataURL = cdnPath + 'client/img/mob42.png';
Img.mob[43] = new Image();
Img.mob[43].dataURL = cdnPath + 'client/img/mob43.png';
Img.mob[44] = new Image();
Img.mob[44].dataURL = cdnPath + 'client/img/mob44.png';
Img.mob[45] = new Image();
Img.mob[45].dataURL = cdnPath + 'client/img/mob45.png';
Img.mob[46] = new Image();
Img.mob[46].dataURL = cdnPath + 'client/img/mob46.png?v=1.1';
Img.mob[47] = new Image();
Img.mob[47].dataURL = cdnPath + 'client/img/mob47.png?v=1.1';
Img.mob[48] = new Image();
Img.mob[48].dataURL = cdnPath + 'client/img/mob48.png';
Img.mob[49] = new Image();
Img.mob[49].dataURL = cdnPath + 'client/img/mob49.png';
Img.mob[50] = new Image();
Img.mob[50].dataURL = cdnPath + 'client/img/mob50.png';
Img.mob[51] = new Image();
Img.mob[51].dataURL = cdnPath + 'client/img/mob51.png';
Img.mob[52] = new Image();
Img.mob[52].dataURL = cdnPath + 'client/img/mob52.png';
Img.mob[53] = new Image();
Img.mob[53].dataURL = cdnPath + 'client/img/mob53.png';
Img.mob[54] = new Image();
Img.mob[54].dataURL = cdnPath + 'client/img/mob54.png';
Img.mob[55] = new Image();
Img.mob[55].dataURL = cdnPath + 'client/img/mob55.png';
Img.mob[56] = new Image();
Img.mob[56].dataURL = cdnPath + 'client/img/mob56.png';
Img.mob[57] = new Image();
Img.mob[57].dataURL = cdnPath + 'client/img/mob57.png?v=1.1';
Img.eye = {};
Img.eye[1] = new Image();
Img.eye[1].src = cdnPath + 'client/img/eye.png';
Img.color = [
    ,
    '#F2BA00',
    '#479924',
    '#007FAA',
    '#C40000',
    '#8948A8',
    '#F2F2F2'
];
Img.hand = {};
Img.hand[1] = new Image();
Img.hand[1].dataURL = cdnPath + 'client/img/hand1.png';
Img.hand[2] = new Image();
Img.hand[2].dataURL = cdnPath + 'client/img/hand2.png';
Img.hand[3] = new Image();
Img.hand[3].dataURL = cdnPath + 'client/img/hand3.png';
Img.hand[4] = new Image();
Img.hand[4].dataURL = cdnPath + 'client/img/hand4.png';
Img.hand[5] = new Image();
Img.hand[5].dataURL = cdnPath + 'client/img/hand5.png';
Img.hand[6] = new Image();
Img.hand[6].dataURL = cdnPath + 'client/img/hand6.png';
Img.head = {};
Img.head[1] = new Image();
Img.head[1].dataURL = cdnPath + 'client/img/head1.png';
Img.head[2] = new Image();
Img.head[2].dataURL = cdnPath + 'client/img/head2.png';
Img.head[3] = new Image();
Img.head[3].dataURL = cdnPath + 'client/img/head3.png';
Img.head[4] = new Image();
Img.head[4].dataURL = cdnPath + 'client/img/head4.png';
Img.head[5] = new Image();
Img.head[5].dataURL = cdnPath + 'client/img/head5.png';
Img.head[6] = new Image();
Img.head[6].dataURL = cdnPath + 'client/img/head6.png';
Img.food = {};
Img.food[1] = new Image();
Img.food[1].dataURL = cdnPath + 'client/img/food1.png';
Img.food[2] = new Image();
Img.food[2].dataURL = cdnPath + 'client/img/food2.png';
Img.food[3] = new Image();
Img.food[3].dataURL = cdnPath + 'client/img/food3.png';
Img.food[4] = new Image();
Img.food[4].dataURL = cdnPath + 'client/img/food4.png';
Img.food[5] = new Image();
Img.food[5].dataURL = cdnPath + 'client/img/grave.png';
Img.food[6] = new Image();
Img.food[6].dataURL = cdnPath + 'client/img/food6.png';
Img.food[7] = new Image();
Img.food[7].dataURL = cdnPath + 'client/img/food7.png';
Img.food[8] = new Image();
Img.food[8].dataURL = cdnPath + 'client/img/food8.png';
Img.food[9] = new Image();
Img.food[9].dataURL = cdnPath + 'client/img/food9.png';
Img.weapon = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
Img.weapon[1][1] = new Image();
Img.weapon[1][1].dataURL = cdnPath + 'client/img/weapon1.png';
Img.weapon[1][3] = new Image();
Img.weapon[1][3].dataURL = cdnPath + 'client/img/weapon3.png';
Img.weapon[1][5] = new Image();
Img.weapon[1][5].dataURL = cdnPath + 'client/img/weapon5.png';
Img.weapon[1][7] = new Image();
Img.weapon[1][7].dataURL = cdnPath + 'client/img/weapon7.png';
Img.weapon[1][9] = new Image();
Img.weapon[1][9].dataURL = cdnPath + 'client/img/weapon9.png';
Img.weapon[1][11] = new Image();
Img.weapon[1][11].dataURL = cdnPath + 'client/img/weapon11.png';
Img.weapon[1][13] = new Image();
Img.weapon[1][13].dataURL = cdnPath + 'client/img/weapon13.png';
Img.weapon[1][15] = new Image();
Img.weapon[1][15].dataURL = cdnPath + 'client/img/weapon15.png';
Img.weapon[1][17] = new Image();
Img.weapon[1][17].dataURL = cdnPath + 'client/img/weapon17.png';
Img.weapon[2][1] = new Image();
Img.weapon[2][1].dataURL = cdnPath + 'client/img/weapon101.png';
Img.weapon[2][3] = new Image();
Img.weapon[2][3].dataURL = cdnPath + 'client/img/weapon103.png';
Img.weapon[2][5] = new Image();
Img.weapon[2][5].dataURL = cdnPath + 'client/img/weapon105.png';
Img.weapon[2][7] = new Image();
Img.weapon[2][7].dataURL = cdnPath + 'client/img/weapon107.png';
Img.weapon[2][9] = new Image();
Img.weapon[2][9].dataURL = cdnPath + 'client/img/weapon109.png';
Img.weapon[2][11] = new Image();
Img.weapon[2][11].dataURL = cdnPath + 'client/img/weapon111.png';
Img.weapon[2][13] = new Image();
Img.weapon[2][13].dataURL = cdnPath + 'client/img/weapon113.png';
Img.weapon[2][15] = new Image();
Img.weapon[2][15].dataURL = cdnPath + 'client/img/weapon115.png';
Img.weapon[2][17] = new Image();
Img.weapon[2][17].dataURL = cdnPath + 'client/img/weapon117.png';
Img.weapon[3][1] = new Image();
Img.weapon[3][1].dataURL = cdnPath + 'client/img/weapon201.png';
Img.weapon[3][3] = new Image();
Img.weapon[3][3].dataURL = cdnPath + 'client/img/weapon203.png';
Img.weapon[3][5] = new Image();
Img.weapon[3][5].dataURL = cdnPath + 'client/img/weapon205.png';
Img.weapon[3][7] = new Image();
Img.weapon[3][7].dataURL = cdnPath + 'client/img/weapon207.png';
Img.weapon[3][9] = new Image();
Img.weapon[3][9].dataURL = cdnPath + 'client/img/weapon209.png';
Img.weapon[3][11] = new Image();
Img.weapon[3][11].dataURL = cdnPath + 'client/img/weapon211.png';
Img.weapon[3][13] = new Image();
Img.weapon[3][13].dataURL = cdnPath + 'client/img/weapon213.png';
Img.weapon[3][15] = new Image();
Img.weapon[3][15].dataURL = cdnPath + 'client/img/weapon215.png';
Img.weapon[3][17] = new Image();
Img.weapon[3][17].dataURL = cdnPath + 'client/img/weapon217.png';
Img.weapon[4][1] = new Image();
Img.weapon[4][1].dataURL = cdnPath + 'client/img/weapon301.png';
Img.weapon[4][3] = new Image();
Img.weapon[4][3].dataURL = cdnPath + 'client/img/weapon303.png';
Img.weapon[4][5] = new Image();
Img.weapon[4][5].dataURL = cdnPath + 'client/img/weapon305.png';
Img.weapon[4][7] = new Image();
Img.weapon[4][7].dataURL = cdnPath + 'client/img/weapon307.png';
Img.weapon[4][9] = new Image();
Img.weapon[4][9].dataURL = cdnPath + 'client/img/weapon309.png';
Img.weapon[4][11] = new Image();
Img.weapon[4][11].dataURL = cdnPath + 'client/img/weapon311.png';
Img.weapon[4][13] = new Image();
Img.weapon[4][13].dataURL = cdnPath + 'client/img/weapon313.png';
Img.weapon[4][15] = new Image();
Img.weapon[4][15].dataURL = cdnPath + 'client/img/weapon315.png';
Img.weapon[4][17] = new Image();
Img.weapon[4][17].dataURL = cdnPath + 'client/img/weapon315.png';
Img.weapon[5][1] = new Image();
Img.weapon[5][1].dataURL = cdnPath + 'client/img/weapon401.png';
Img.weapon[5][3] = new Image();
Img.weapon[5][3].dataURL = cdnPath + 'client/img/weapon403.png';
Img.weapon[5][5] = new Image();
Img.weapon[5][5].dataURL = cdnPath + 'client/img/weapon405.png';
Img.weapon[5][7] = new Image();
Img.weapon[5][7].dataURL = cdnPath + 'client/img/weapon407.png';
Img.weapon[5][9] = new Image();
Img.weapon[5][9].dataURL = cdnPath + 'client/img/weapon409.png';
Img.weapon[5][11] = new Image();
Img.weapon[5][11].dataURL = cdnPath + 'client/img/weapon411.png';
Img.weapon[5][13] = new Image();
Img.weapon[5][13].dataURL = cdnPath + 'client/img/weapon413.png';
Img.weapon[5][15] = new Image();
Img.weapon[5][15].dataURL = cdnPath + 'client/img/weapon415.png';
Img.weapon[5][17] = new Image();
Img.weapon[5][17].dataURL = cdnPath + 'client/img/weapon415.png';
Img.weapon[6][1] = new Image();
Img.weapon[6][1].dataURL = cdnPath + 'client/img/weapon501.png';
Img.weapon[6][3] = new Image();
Img.weapon[6][3].dataURL = cdnPath + 'client/img/weapon503.png';
Img.weapon[6][5] = new Image();
Img.weapon[6][5].dataURL = cdnPath + 'client/img/weapon505.png';
Img.weapon[6][7] = new Image();
Img.weapon[6][7].dataURL = cdnPath + 'client/img/weapon507.png';
Img.weapon[6][9] = new Image();
Img.weapon[6][9].dataURL = cdnPath + 'client/img/weapon509.png';
Img.weapon[6][11] = new Image();
Img.weapon[6][11].dataURL = cdnPath + 'client/img/weapon511.png';
Img.weapon[6][13] = new Image();
Img.weapon[6][13].dataURL = cdnPath + 'client/img/weapon513.png';
Img.weapon[6][15] = new Image();
Img.weapon[6][15].dataURL = cdnPath + 'client/img/weapon515.png';
Img.weapon[6][17] = new Image();
Img.weapon[6][17].dataURL = cdnPath + 'client/img/weapon515.png';
Img.weapon[7][1] = new Image();
Img.weapon[7][1].dataURL = cdnPath + 'client/img/weapon601.png';
Img.weapon[7][3] = new Image();
Img.weapon[7][3].dataURL = cdnPath + 'client/img/weapon603.png';
Img.weapon[7][5] = new Image();
Img.weapon[7][5].dataURL = cdnPath + 'client/img/weapon605.png';
Img.weapon[7][7] = new Image();
Img.weapon[7][7].dataURL = cdnPath + 'client/img/weapon607.png';
Img.weapon[7][9] = new Image();
Img.weapon[7][9].dataURL = cdnPath + 'client/img/weapon609.png';
Img.weapon[7][11] = new Image();
Img.weapon[7][11].dataURL = cdnPath + 'client/img/weapon611.png';
Img.weapon[7][13] = new Image();
Img.weapon[7][13].dataURL = cdnPath + 'client/img/weapon613.png';
Img.weapon[7][15] = new Image();
Img.weapon[7][15].dataURL = cdnPath + 'client/img/weapon615.png';
Img.weapon[7][17] = new Image();
Img.weapon[7][17].dataURL = cdnPath + 'client/img/weapon615.png';
Img.weapon[8][1] = new Image();
Img.weapon[8][1].dataURL = cdnPath + 'client/img/weapon701.png';
Img.weapon[8][3] = new Image();
Img.weapon[8][3].dataURL = cdnPath + 'client/img/weapon703.png';
Img.weapon[8][5] = new Image();
Img.weapon[8][5].dataURL = cdnPath + 'client/img/weapon705.png';
Img.weapon[8][7] = new Image();
Img.weapon[8][7].dataURL = cdnPath + 'client/img/weapon707.png';
Img.weapon[8][9] = new Image();
Img.weapon[8][9].dataURL = cdnPath + 'client/img/weapon709.png';
Img.weapon[8][11] = new Image();
Img.weapon[8][11].dataURL = cdnPath + 'client/img/weapon711.png';
Img.weapon[8][13] = new Image();
Img.weapon[8][13].dataURL = cdnPath + 'client/img/weapon713.png';
Img.weapon[8][15] = new Image();
Img.weapon[8][15].dataURL = cdnPath + 'client/img/weapon715.png';
Img.weapon[8][17] = new Image();
Img.weapon[8][17].dataURL = cdnPath + 'client/img/weapon715.png';
Img.weapon[9][1] = new Image();
Img.weapon[9][1].dataURL = cdnPath + 'client/img/weapon801.png';
Img.weapon[9][3] = new Image();
Img.weapon[9][3].dataURL = cdnPath + 'client/img/weapon803.png';
Img.weapon[9][5] = new Image();
Img.weapon[9][5].dataURL = cdnPath + 'client/img/weapon805.png';
Img.weapon[9][7] = new Image();
Img.weapon[9][7].dataURL = cdnPath + 'client/img/weapon807.png';
Img.weapon[9][9] = new Image();
Img.weapon[9][9].dataURL = cdnPath + 'client/img/weapon809.png';
Img.weapon[9][11] = new Image();
Img.weapon[9][11].dataURL = cdnPath + 'client/img/weapon811.png';
Img.weapon[9][13] = new Image();
Img.weapon[9][13].dataURL = cdnPath + 'client/img/weapon813.png';
Img.weapon[9][15] = new Image();
Img.weapon[9][15].dataURL = cdnPath + 'client/img/weapon815.png';
Img.weapon[9][17] = new Image();
Img.weapon[9][17].dataURL = cdnPath + 'client/img/weapon815.png';
Img.weapon[10][1] = new Image();
Img.weapon[10][1].dataURL = cdnPath + 'client/img/weapon901.png';
Img.weapon[10][3] = new Image();
Img.weapon[10][3].dataURL = cdnPath + 'client/img/weapon903.png';
Img.weapon[10][5] = new Image();
Img.weapon[10][5].dataURL = cdnPath + 'client/img/weapon905.png';
Img.weapon[10][7] = new Image();
Img.weapon[10][7].dataURL = cdnPath + 'client/img/weapon907.png';
Img.weapon[10][9] = new Image();
Img.weapon[10][9].dataURL = cdnPath + 'client/img/weapon909.png';
Img.weapon[10][11] = new Image();
Img.weapon[10][11].dataURL = cdnPath + 'client/img/weapon911.png';
Img.weapon[10][13] = new Image();
Img.weapon[10][13].dataURL = cdnPath + 'client/img/weapon913.png';
Img.weapon[10][15] = new Image();
Img.weapon[10][15].dataURL = cdnPath + 'client/img/weapon915.png';
Img.weapon[10][17] = new Image();
Img.weapon[10][17].dataURL = cdnPath + 'client/img/weapon917.png';
Img.weapon[11][1] = new Image();
Img.weapon[11][1].dataURL = cdnPath + 'client/img/weapon1001.png';
Img.weapon[11][3] = new Image();
Img.weapon[11][3].dataURL = cdnPath + 'client/img/weapon1003.png';
Img.weapon[11][5] = new Image();
Img.weapon[11][5].dataURL = cdnPath + 'client/img/weapon1005.png';
Img.weapon[11][7] = new Image();
Img.weapon[11][7].dataURL = cdnPath + 'client/img/weapon1007.png';
Img.weapon[11][9] = new Image();
Img.weapon[11][9].dataURL = cdnPath + 'client/img/weapon1009.png';
Img.weapon[11][11] = new Image();
Img.weapon[11][11].dataURL = cdnPath + 'client/img/weapon1011.png';
Img.weapon[11][13] = new Image();
Img.weapon[11][13].dataURL = cdnPath + 'client/img/weapon1013.png';
Img.weapon[11][15] = new Image();
Img.weapon[11][15].dataURL = cdnPath + 'client/img/weapon1015.png';
Img.weapon[11][17] = new Image();
Img.weapon[11][17].dataURL = cdnPath + 'client/img/weapon1015.png';
Img.weapon[12][1] = new Image();
Img.weapon[12][1].dataURL = cdnPath + 'client/img/weapon1101.png';
Img.weapon[12][3] = new Image();
Img.weapon[12][3].dataURL = cdnPath + 'client/img/weapon1103.png';
Img.weapon[12][5] = new Image();
Img.weapon[12][5].dataURL = cdnPath + 'client/img/weapon1105.png';
Img.weapon[12][7] = new Image();
Img.weapon[12][7].dataURL = cdnPath + 'client/img/weapon1107.png';
Img.weapon[12][9] = new Image();
Img.weapon[12][9].dataURL = cdnPath + 'client/img/weapon1109.png';
Img.weapon[12][11] = new Image();
Img.weapon[12][11].dataURL = cdnPath + 'client/img/weapon1111.png';
Img.weapon[12][13] = new Image();
Img.weapon[12][13].dataURL = cdnPath + 'client/img/weapon1113.png';
Img.weapon[12][15] = new Image();
Img.weapon[12][15].dataURL = cdnPath + 'client/img/weapon1115.png';
Img.weapon[12][17] = new Image();
Img.weapon[12][17].dataURL = cdnPath + 'client/img/weapon1115.png';
Img.weapon[13][1] = new Image();
Img.weapon[13][1].dataURL = cdnPath + 'client/img/weapon1201.png';
Img.weapon[13][3] = new Image();
Img.weapon[13][3].dataURL = cdnPath + 'client/img/weapon1203.png';
Img.weapon[13][5] = new Image();
Img.weapon[13][5].dataURL = cdnPath + 'client/img/weapon1205.png';
Img.weapon[13][7] = new Image();
Img.weapon[13][7].dataURL = cdnPath + 'client/img/weapon1207.png';
Img.weapon[13][9] = new Image();
Img.weapon[13][9].dataURL = cdnPath + 'client/img/weapon1209.png';
Img.weapon[13][11] = new Image();
Img.weapon[13][11].dataURL = cdnPath + 'client/img/weapon1211.png';
Img.weapon[13][13] = new Image();
Img.weapon[13][13].dataURL = cdnPath + 'client/img/weapon1213.png';
Img.weapon[13][15] = new Image();
Img.weapon[13][15].dataURL = cdnPath + 'client/img/weapon1215.png';
Img.weapon[13][17] = new Image();
Img.weapon[13][17].dataURL = cdnPath + 'client/img/weapon1215.png';
Img.weapon[14][1] = new Image();
Img.weapon[14][1].dataURL = cdnPath + 'client/img/weapon1301.png';
Img.weapon[14][3] = new Image();
Img.weapon[14][3].dataURL = cdnPath + 'client/img/weapon1303.png';
Img.weapon[14][5] = new Image();
Img.weapon[14][5].dataURL = cdnPath + 'client/img/weapon1305.png';
Img.weapon[14][7] = new Image();
Img.weapon[14][7].dataURL = cdnPath + 'client/img/weapon1307.png';
Img.weapon[14][9] = new Image();
Img.weapon[14][9].dataURL = cdnPath + 'client/img/weapon1309.png';
Img.weapon[14][11] = new Image();
Img.weapon[14][11].dataURL = cdnPath + 'client/img/weapon1311.png';
Img.weapon[14][13] = new Image();
Img.weapon[14][13].dataURL = cdnPath + 'client/img/weapon1313.png';
Img.weapon[14][15] = new Image();
Img.weapon[14][15].dataURL = cdnPath + 'client/img/weapon1315.png';
Img.weapon[14][17] = new Image();
Img.weapon[14][17].dataURL = cdnPath + 'client/img/weapon1317.png';
Img.weapon[15][1] = new Image();
Img.weapon[15][1].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][3] = new Image();
Img.weapon[15][3].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][5] = new Image();
Img.weapon[15][5].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][7] = new Image();
Img.weapon[15][7].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][9] = new Image();
Img.weapon[15][9].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][11] = new Image();
Img.weapon[15][11].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][13] = new Image();
Img.weapon[15][13].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][15] = new Image();
Img.weapon[15][15].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[15][17] = new Image();
Img.weapon[15][17].dataURL = cdnPath + 'client/img/weapon1401.png';
Img.weapon[16][1] = new Image();
Img.weapon[16][1].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][3] = new Image();
Img.weapon[16][3].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][5] = new Image();
Img.weapon[16][5].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][7] = new Image();
Img.weapon[16][7].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][9] = new Image();
Img.weapon[16][9].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][11] = new Image();
Img.weapon[16][11].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][13] = new Image();
Img.weapon[16][13].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][15] = new Image();
Img.weapon[16][15].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[16][17] = new Image();
Img.weapon[16][17].dataURL = cdnPath + 'client/img/weapon1501.png';
Img.weapon[17][1] = new Image();
Img.weapon[17][1].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][3] = new Image();
Img.weapon[17][3].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][5] = new Image();
Img.weapon[17][5].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][7] = new Image();
Img.weapon[17][7].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][9] = new Image();
Img.weapon[17][9].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][11] = new Image();
Img.weapon[17][11].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][13] = new Image();
Img.weapon[17][13].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][15] = new Image();
Img.weapon[17][15].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[17][17] = new Image();
Img.weapon[17][17].dataURL = cdnPath + 'client/img/weapon1601.png';
Img.weapon[18][1] = new Image();
Img.weapon[18][1].dataURL = cdnPath + 'client/img/weapon1701.png';
Img.weapon[18][3] = new Image();
Img.weapon[18][3].dataURL = cdnPath + 'client/img/weapon1703.png';
Img.weapon[18][5] = new Image();
Img.weapon[18][5].dataURL = cdnPath + 'client/img/weapon1705.png';
Img.weapon[18][7] = new Image();
Img.weapon[18][7].dataURL = cdnPath + 'client/img/weapon1707.png';
Img.weapon[18][9] = new Image();
Img.weapon[18][9].dataURL = cdnPath + 'client/img/weapon1709.png';
Img.weapon[18][11] = new Image();
Img.weapon[18][11].dataURL = cdnPath + 'client/img/weapon1711.png';
Img.weapon[18][13] = new Image();
Img.weapon[18][13].dataURL = cdnPath + 'client/img/weapon1713.png';
Img.weapon[18][15] = new Image();
Img.weapon[18][15].dataURL = cdnPath + 'client/img/weapon1715.png';
Img.weapon[18][17] = new Image();
Img.weapon[18][17].dataURL = cdnPath + 'client/img/weapon1717.png';
Img.bullet = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
Img.bullet[1][1] = new Image();
Img.bullet[1][1].dataURL = cdnPath + 'client/img/bullet1.png';
Img.bullet[1][3] = new Image();
Img.bullet[1][3].dataURL = cdnPath + 'client/img/bullet3.png';
Img.bullet[1][5] = new Image();
Img.bullet[1][5].dataURL = cdnPath + 'client/img/bullet5.png';
Img.bullet[1][7] = new Image();
Img.bullet[1][7].dataURL = cdnPath + 'client/img/bullet7.png';
Img.bullet[1][9] = new Image();
Img.bullet[1][9].dataURL = cdnPath + 'client/img/bullet9.png';
Img.bullet[1][11] = new Image();
Img.bullet[1][11].dataURL = cdnPath + 'client/img/bullet11.png';
Img.bullet[1][13] = new Image();
Img.bullet[1][13].dataURL = cdnPath + 'client/img/bullet13.png';
Img.bullet[1][15] = new Image();
Img.bullet[1][15].dataURL = cdnPath + 'client/img/bullet15.png';
Img.bullet[1][17] = new Image();
Img.bullet[1][17].dataURL = cdnPath + 'client/img/bullet17.png';
Img.bullet[2][1] = new Image();
Img.bullet[2][1].dataURL = cdnPath + 'client/img/bullet101.png';
Img.bullet[2][3] = new Image();
Img.bullet[2][3].dataURL = cdnPath + 'client/img/bullet103.png';
Img.bullet[2][5] = new Image();
Img.bullet[2][5].dataURL = cdnPath + 'client/img/bullet105.png';
Img.bullet[2][7] = new Image();
Img.bullet[2][7].dataURL = cdnPath + 'client/img/bullet107.png';
Img.bullet[2][9] = new Image();
Img.bullet[2][9].dataURL = cdnPath + 'client/img/bullet109.png';
Img.bullet[2][11] = new Image();
Img.bullet[2][11].dataURL = cdnPath + 'client/img/bullet111.png';
Img.bullet[2][13] = new Image();
Img.bullet[2][13].dataURL = cdnPath + 'client/img/bullet113.png';
Img.bullet[2][15] = new Image();
Img.bullet[2][15].dataURL = cdnPath + 'client/img/bullet115.png';
Img.bullet[2][17] = new Image();
Img.bullet[2][17].dataURL = cdnPath + 'client/img/bullet117.png';
Img.bullet[3][1] = new Image();
Img.bullet[3][1].dataURL = cdnPath + 'client/img/bullet201.png';
Img.bullet[3][3] = new Image();
Img.bullet[3][3].dataURL = cdnPath + 'client/img/bullet203.png';
Img.bullet[3][5] = new Image();
Img.bullet[3][5].dataURL = cdnPath + 'client/img/bullet205.png';
Img.bullet[3][7] = new Image();
Img.bullet[3][7].dataURL = cdnPath + 'client/img/bullet207.png';
Img.bullet[3][9] = new Image();
Img.bullet[3][9].dataURL = cdnPath + 'client/img/bullet209.png';
Img.bullet[3][11] = new Image();
Img.bullet[3][11].dataURL = cdnPath + 'client/img/bullet211.png';
Img.bullet[3][13] = new Image();
Img.bullet[3][13].dataURL = cdnPath + 'client/img/bullet213.png';
Img.bullet[3][15] = new Image();
Img.bullet[3][15].dataURL = cdnPath + 'client/img/bullet215.png';
Img.bullet[3][17] = new Image();
Img.bullet[3][17].dataURL = cdnPath + 'client/img/bullet217.png';
Img.bullet[4][1] = new Image();
Img.bullet[4][1].dataURL = cdnPath + 'client/img/bullet301.png';
Img.bullet[4][3] = new Image();
Img.bullet[4][3].dataURL = cdnPath + 'client/img/bullet303.png';
Img.bullet[4][5] = new Image();
Img.bullet[4][5].dataURL = cdnPath + 'client/img/bullet305.png';
Img.bullet[4][7] = new Image();
Img.bullet[4][7].dataURL = cdnPath + 'client/img/bullet307.png';
Img.bullet[4][9] = new Image();
Img.bullet[4][9].dataURL = cdnPath + 'client/img/bullet309.png';
Img.bullet[4][11] = new Image();
Img.bullet[4][11].dataURL = cdnPath + 'client/img/bullet311.png';
Img.bullet[4][13] = new Image();
Img.bullet[4][13].dataURL = cdnPath + 'client/img/bullet313.png';
Img.bullet[4][15] = new Image();
Img.bullet[4][15].dataURL = cdnPath + 'client/img/bullet315.png';
Img.bullet[4][17] = new Image();
Img.bullet[4][17].dataURL = cdnPath + 'client/img/bullet315.png';
Img.bullet[5][1] = new Image();
Img.bullet[5][1].dataURL = cdnPath + 'client/img/bullet401.png';
Img.bullet[5][3] = new Image();
Img.bullet[5][3].dataURL = cdnPath + 'client/img/bullet403.png';
Img.bullet[5][5] = new Image();
Img.bullet[5][5].dataURL = cdnPath + 'client/img/bullet405.png';
Img.bullet[5][7] = new Image();
Img.bullet[5][7].dataURL = cdnPath + 'client/img/bullet407.png';
Img.bullet[5][9] = new Image();
Img.bullet[5][9].dataURL = cdnPath + 'client/img/bullet409.png';
Img.bullet[5][11] = new Image();
Img.bullet[5][11].dataURL = cdnPath + 'client/img/bullet411.png';
Img.bullet[5][13] = new Image();
Img.bullet[5][13].dataURL = cdnPath + 'client/img/bullet413.png';
Img.bullet[5][15] = new Image();
Img.bullet[5][15].dataURL = cdnPath + 'client/img/bullet415.png';
Img.bullet[5][17] = new Image();
Img.bullet[5][17].dataURL = cdnPath + 'client/img/bullet415.png';
Img.bullet[6][1] = new Image();
Img.bullet[6][1].dataURL = cdnPath + 'client/img/bullet501.png';
Img.bullet[6][3] = new Image();
Img.bullet[6][3].dataURL = cdnPath + 'client/img/bullet503.png';
Img.bullet[6][5] = new Image();
Img.bullet[6][5].dataURL = cdnPath + 'client/img/bullet505.png';
Img.bullet[6][7] = new Image();
Img.bullet[6][7].dataURL = cdnPath + 'client/img/bullet507.png';
Img.bullet[6][9] = new Image();
Img.bullet[6][9].dataURL = cdnPath + 'client/img/bullet509.png';
Img.bullet[6][11] = new Image();
Img.bullet[6][11].dataURL = cdnPath + 'client/img/bullet511.png';
Img.bullet[6][13] = new Image();
Img.bullet[6][13].dataURL = cdnPath + 'client/img/bullet513.png';
Img.bullet[6][15] = new Image();
Img.bullet[6][15].dataURL = cdnPath + 'client/img/bullet515.png';
Img.bullet[6][17] = new Image();
Img.bullet[6][17].dataURL = cdnPath + 'client/img/bullet515.png';
Img.bullet[7][1] = new Image();
Img.bullet[7][1].dataURL = cdnPath + 'client/img/bullet601.png';
Img.bullet[7][3] = new Image();
Img.bullet[7][3].dataURL = cdnPath + 'client/img/bullet603.png';
Img.bullet[7][5] = new Image();
Img.bullet[7][5].dataURL = cdnPath + 'client/img/bullet605.png';
Img.bullet[7][7] = new Image();
Img.bullet[7][7].dataURL = cdnPath + 'client/img/bullet607.png';
Img.bullet[7][9] = new Image();
Img.bullet[7][9].dataURL = cdnPath + 'client/img/bullet609.png';
Img.bullet[7][11] = new Image();
Img.bullet[7][11].dataURL = cdnPath + 'client/img/bullet611.png';
Img.bullet[7][13] = new Image();
Img.bullet[7][13].dataURL = cdnPath + 'client/img/bullet613.png';
Img.bullet[7][15] = new Image();
Img.bullet[7][15].dataURL = cdnPath + 'client/img/bullet615.png';
Img.bullet[7][17] = new Image();
Img.bullet[7][17].dataURL = cdnPath + 'client/img/bullet615.png';
Img.bullet[8][1] = new Image();
Img.bullet[8][1].dataURL = cdnPath + 'client/img/bullet701.png';
Img.bullet[8][3] = new Image();
Img.bullet[8][3].dataURL = cdnPath + 'client/img/bullet703.png';
Img.bullet[8][5] = new Image();
Img.bullet[8][5].dataURL = cdnPath + 'client/img/bullet705.png';
Img.bullet[8][7] = new Image();
Img.bullet[8][7].dataURL = cdnPath + 'client/img/bullet707.png';
Img.bullet[8][9] = new Image();
Img.bullet[8][9].dataURL = cdnPath + 'client/img/bullet709.png';
Img.bullet[8][11] = new Image();
Img.bullet[8][11].dataURL = cdnPath + 'client/img/bullet711.png';
Img.bullet[8][13] = new Image();
Img.bullet[8][13].dataURL = cdnPath + 'client/img/bullet713.png';
Img.bullet[8][15] = new Image();
Img.bullet[8][15].dataURL = cdnPath + 'client/img/bullet715.png';
Img.bullet[8][17] = new Image();
Img.bullet[8][17].dataURL = cdnPath + 'client/img/bullet715.png';
Img.bullet[9][1] = new Image();
Img.bullet[9][1].dataURL = cdnPath + 'client/img/bullet801.png';
Img.bullet[9][3] = new Image();
Img.bullet[9][3].dataURL = cdnPath + 'client/img/bullet803.png';
Img.bullet[9][5] = new Image();
Img.bullet[9][5].dataURL = cdnPath + 'client/img/bullet805.png';
Img.bullet[9][7] = new Image();
Img.bullet[9][7].dataURL = cdnPath + 'client/img/bullet807.png';
Img.bullet[9][9] = new Image();
Img.bullet[9][9].dataURL = cdnPath + 'client/img/bullet809.png';
Img.bullet[9][11] = new Image();
Img.bullet[9][11].dataURL = cdnPath + 'client/img/bullet811.png';
Img.bullet[9][13] = new Image();
Img.bullet[9][13].dataURL = cdnPath + 'client/img/bullet813.png';
Img.bullet[9][15] = new Image();
Img.bullet[9][15].dataURL = cdnPath + 'client/img/bullet815.png';
Img.bullet[9][17] = new Image();
Img.bullet[9][17].dataURL = cdnPath + 'client/img/bullet815.png';
Img.bullet[10][1] = new Image();
Img.bullet[10][1].dataURL = cdnPath + 'client/img/bullet901.png';
Img.bullet[10][3] = new Image();
Img.bullet[10][3].dataURL = cdnPath + 'client/img/bullet903.png';
Img.bullet[10][5] = new Image();
Img.bullet[10][5].dataURL = cdnPath + 'client/img/bullet905.png';
Img.bullet[10][7] = new Image();
Img.bullet[10][7].dataURL = cdnPath + 'client/img/bullet907.png';
Img.bullet[10][9] = new Image();
Img.bullet[10][9].dataURL = cdnPath + 'client/img/bullet909.png';
Img.bullet[10][11] = new Image();
Img.bullet[10][11].dataURL = cdnPath + 'client/img/bullet911.png';
Img.bullet[10][13] = new Image();
Img.bullet[10][13].dataURL = cdnPath + 'client/img/bullet913.png';
Img.bullet[10][15] = new Image();
Img.bullet[10][15].dataURL = cdnPath + 'client/img/bullet915.png';
Img.bullet[10][17] = new Image();
Img.bullet[10][17].dataURL = cdnPath + 'client/img/bullet917.png';
Img.bullet[11][1] = new Image();
Img.bullet[11][1].dataURL = cdnPath + 'client/img/bullet1001.png';
Img.bullet[11][3] = new Image();
Img.bullet[11][3].dataURL = cdnPath + 'client/img/bullet1003.png';
Img.bullet[11][5] = new Image();
Img.bullet[11][5].dataURL = cdnPath + 'client/img/bullet1005.png';
Img.bullet[11][7] = new Image();
Img.bullet[11][7].dataURL = cdnPath + 'client/img/bullet1007.png';
Img.bullet[11][9] = new Image();
Img.bullet[11][9].dataURL = cdnPath + 'client/img/bullet1009.png';
Img.bullet[11][11] = new Image();
Img.bullet[11][11].dataURL = cdnPath + 'client/img/bullet1011.png';
Img.bullet[11][13] = new Image();
Img.bullet[11][13].dataURL = cdnPath + 'client/img/bullet1013.png';
Img.bullet[11][15] = new Image();
Img.bullet[11][15].dataURL = cdnPath + 'client/img/bullet1015.png';
Img.bullet[11][17] = new Image();
Img.bullet[11][17].dataURL = cdnPath + 'client/img/bullet1015.png';
Img.bullet[12][1] = new Image();
Img.bullet[12][1].dataURL = cdnPath + 'client/img/bullet1101.png';
Img.bullet[12][3] = new Image();
Img.bullet[12][3].dataURL = cdnPath + 'client/img/bullet1103.png';
Img.bullet[12][5] = new Image();
Img.bullet[12][5].dataURL = cdnPath + 'client/img/bullet1105.png';
Img.bullet[12][7] = new Image();
Img.bullet[12][7].dataURL = cdnPath + 'client/img/bullet1107.png';
Img.bullet[12][9] = new Image();
Img.bullet[12][9].dataURL = cdnPath + 'client/img/bullet1109.png';
Img.bullet[12][11] = new Image();
Img.bullet[12][11].dataURL = cdnPath + 'client/img/bullet1111.png';
Img.bullet[12][13] = new Image();
Img.bullet[12][13].dataURL = cdnPath + 'client/img/bullet1113.png';
Img.bullet[12][15] = new Image();
Img.bullet[12][15].dataURL = cdnPath + 'client/img/bullet1115.png';
Img.bullet[12][17] = new Image();
Img.bullet[12][17].dataURL = cdnPath + 'client/img/bullet1115.png';
Img.bullet[13][1] = new Image();
Img.bullet[13][1].dataURL = cdnPath + 'client/img/bullet1201.png';
Img.bullet[13][3] = new Image();
Img.bullet[13][3].dataURL = cdnPath + 'client/img/bullet1203.png';
Img.bullet[13][5] = new Image();
Img.bullet[13][5].dataURL = cdnPath + 'client/img/bullet1205.png';
Img.bullet[13][7] = new Image();
Img.bullet[13][7].dataURL = cdnPath + 'client/img/bullet1207.png';
Img.bullet[13][9] = new Image();
Img.bullet[13][9].dataURL = cdnPath + 'client/img/bullet1209.png';
Img.bullet[13][11] = new Image();
Img.bullet[13][11].dataURL = cdnPath + 'client/img/bullet1211.png';
Img.bullet[13][13] = new Image();
Img.bullet[13][13].dataURL = cdnPath + 'client/img/bullet1213.png';
Img.bullet[13][15] = new Image();
Img.bullet[13][15].dataURL = cdnPath + 'client/img/bullet1215.png';
Img.bullet[13][17] = new Image();
Img.bullet[13][17].dataURL = cdnPath + 'client/img/bullet1215.png';
Img.bullet[14][1] = new Image();
Img.bullet[14][1].dataURL = cdnPath + 'client/img/bullet1301.png';
Img.bullet[14][3] = new Image();
Img.bullet[14][3].dataURL = cdnPath + 'client/img/bullet1303.png';
Img.bullet[14][5] = new Image();
Img.bullet[14][5].dataURL = cdnPath + 'client/img/bullet1305.png';
Img.bullet[14][7] = new Image();
Img.bullet[14][7].dataURL = cdnPath + 'client/img/bullet1307.png';
Img.bullet[14][9] = new Image();
Img.bullet[14][9].dataURL = cdnPath + 'client/img/bullet1309.png';
Img.bullet[14][11] = new Image();
Img.bullet[14][11].dataURL = cdnPath + 'client/img/bullet1311.png';
Img.bullet[14][13] = new Image();
Img.bullet[14][13].dataURL = cdnPath + 'client/img/bullet1313.png';
Img.bullet[14][15] = new Image();
Img.bullet[14][15].dataURL = cdnPath + 'client/img/bullet1315.png';
Img.bullet[14][17] = new Image();
Img.bullet[14][17].dataURL = cdnPath + 'client/img/bullet1317.png';
Img.bullet[15][1] = new Image();
Img.bullet[15][1].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][3] = new Image();
Img.bullet[15][3].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][5] = new Image();
Img.bullet[15][5].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][7] = new Image();
Img.bullet[15][7].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][9] = new Image();
Img.bullet[15][9].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][11] = new Image();
Img.bullet[15][11].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][13] = new Image();
Img.bullet[15][13].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][15] = new Image();
Img.bullet[15][15].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[15][17] = new Image();
Img.bullet[15][17].dataURL = cdnPath + 'client/img/bullet1401.png';
Img.bullet[16][1] = new Image();
Img.bullet[16][1].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][3] = new Image();
Img.bullet[16][3].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][5] = new Image();
Img.bullet[16][5].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][7] = new Image();
Img.bullet[16][7].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][9] = new Image();
Img.bullet[16][9].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][11] = new Image();
Img.bullet[16][11].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][13] = new Image();
Img.bullet[16][13].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][15] = new Image();
Img.bullet[16][15].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[16][17] = new Image();
Img.bullet[16][17].dataURL = cdnPath + 'client/img/bullet1501.png';
Img.bullet[17][1] = new Image();
Img.bullet[17][1].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][3] = new Image();
Img.bullet[17][3].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][5] = new Image();
Img.bullet[17][5].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][7] = new Image();
Img.bullet[17][7].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][9] = new Image();
Img.bullet[17][9].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][11] = new Image();
Img.bullet[17][11].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][13] = new Image();
Img.bullet[17][13].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][15] = new Image();
Img.bullet[17][15].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[17][17] = new Image();
Img.bullet[17][17].dataURL = cdnPath + 'client/img/bullet1601.png';
Img.bullet[18][1] = new Image();
Img.bullet[18][1].dataURL = cdnPath + 'client/img/bullet1701.png';
Img.bullet[18][3] = new Image();
Img.bullet[18][3].dataURL = cdnPath + 'client/img/bullet1703.png?v=1.1';
Img.bullet[18][5] = new Image();
Img.bullet[18][5].dataURL = cdnPath + 'client/img/bullet1705.png';
Img.bullet[18][7] = new Image();
Img.bullet[18][7].dataURL = cdnPath + 'client/img/bullet1707.png';
Img.bullet[18][9] = new Image();
Img.bullet[18][9].dataURL = cdnPath + 'client/img/bullet1709.png';
Img.bullet[18][11] = new Image();
Img.bullet[18][11].dataURL = cdnPath + 'client/img/bullet1711.png';
Img.bullet[18][13] = new Image();
Img.bullet[18][13].dataURL = cdnPath + 'client/img/bullet1713.png';
Img.bullet[18][15] = new Image();
Img.bullet[18][15].dataURL = cdnPath + 'client/img/bullet1715.png';
Img.bullet[18][17] = new Image();
Img.bullet[18][17].dataURL = cdnPath + 'client/img/bullet1717.png';
var Sound = {};
Sound.weapon = {};
Sound.weapon[1] = new Audio('client/sound/staff.mp3?v=1.1');
Sound.weapon[2] = new Audio('client/sound/sword.mp3?v=1.1');
Sound.weapon[3] = new Audio('client/sound/bow.mp3?v=1.1');
Sound.weapon[4] = new Audio('client/sound/tome.mp3?v=1.1');
Sound.weapon[5] = new Audio('client/sound/wand.mp3?v=1.1');
Sound.weapon[6] = new Audio('client/sound/crossbow.mp3?v=1.1');
Sound.weapon[7] = new Audio('client/sound/dagger.mp3?v=1.1');
Sound.weapon[8] = new Audio('client/sound/blowgun.mp3?v=1.1');
Sound.weapon[9] = new Audio('client/sound/claw.mp3?v=1.1');
Sound.weapon[10] = new Audio('client/sound/orb.mp3?v=1.1');
Sound.weapon[11] = new Audio('client/sound/axe.mp3?v=1.1');
Sound.weapon[12] = new Audio('client/sound/shuriken.mp3?v=1.1');
Sound.weapon[13] = new Audio('client/sound/scythe.mp3?v=1.1');
Sound.weapon[14] = new Audio('client/sound/spear.mp3?v=1.1');
Sound.weapon[15] = new Audio('client/sound/skull.mp3?v=1.1');
Sound.weapon[16] = new Audio('client/sound/icetome.mp3?v=1.1');
Sound.weapon[17] = new Audio('client/sound/naturestaff.mp3?v=1.1');
Sound.weapon[18] = new Audio('client/sound/amulet.mp3?v=1.1');
Sound.other = {};
Sound.other[0] = new Audio('client/sound/death.mp3?v=1.1');
var loadMusic = false;
Sound.music = {};
var soundVolume = 0.7;
var toggleSound = function () {
    if (soundVolume !== 0) {
        soundVolume = 0;
        document.getElementById('buttonSoundImage').src = cdnPath + 'client/img/sound1.png';
    } else {
        soundVolume = 0.7;
        document.getElementById('buttonSoundImage').src = cdnPath + 'client/img/sound2.png';
    }
};
var musicVolume = 0.7;
var toggleMusic = function () {
    if (musicVolume !== 0) {
        musicVolume = 0;
        document.getElementById('buttonMusicImage').src = cdnPath + 'client/img/music1.png';
    } else {
        musicVolume = 0.7;
        document.getElementById('buttonMusicImage').src = cdnPath + 'client/img/music2.png';
    }
};
var musicNumber = 0, music;
var manageMusic = function () {
    if (!loadMusic) {
        return;
    }
    ;
    music = Sound.music[musicNumber];
    if (playingVideoAd == 0) {
        music.volume = musicVolume;
    } else {
        music.volume = 0;
    }
    ;
    music.onended = function () {
        console.log(musicNumber);
        if (musicNumber < Object.keys(Sound.music).length - 1) {
            musicNumber++;
        } else {
            musicNumber = 0;
        }
        ;
        music = Sound.music[musicNumber];
    };
    music.play();
};
var isFullscreen = false;
var toggleFullscreen = function () {
    var _0xcaa5x46 = document.documentElement;
    if (isFullscreen == false) {
        isFullscreen = true;
        if (_0xcaa5x46.requestFullscreen) {
            _0xcaa5x46.requestFullscreen();
        } else {
            if (_0xcaa5x46.mozRequestFullScreen) {
                _0xcaa5x46.mozRequestFullScreen();
            } else {
                if (_0xcaa5x46.webkitRequestFullscreen) {
                    _0xcaa5x46.webkitRequestFullscreen();
                } else {
                    if (_0xcaa5x46.msRequestFullscreen) {
                        _0xcaa5x46.msRequestFullscreen();
                    }
                }
            }
        }
    } else {
        isFullscreen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else {
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else {
                if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else {
                    if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }
        }
    }
};
var togglePause = function () {
    socket.emit('keyPress', {
        inputId: 'pause',
        state: true
    });
    isPaused = true;
};
var managePause = function () {
    if (Player.list[selfId].animation == 2 && Player.list[selfId].map == 1) {
        document.getElementById('buttonPause').style.display = 'inline-block';
    } else {
        document.getElementById('buttonPause').style.display = 'none';
    }
};
var ctx = document.getElementById('ctx').getContext('2d');
var ctxFont = '';
function changeCtxFont(_0xcaa5x4c) {
    if (ctxFont != _0xcaa5x4c) {
        ctxFont = _0xcaa5x4c;
        ctx.font = _0xcaa5x4c;
    }
}
changeCtxFont('22px sans-serif');
function changeInnerHTML(_0xcaa5x4e, _0xcaa5x4c) {
    if (typeof _0xcaa5x4c != 'string') {
        _0xcaa5x4c = _0xcaa5x4c + '';
    }
    ;
    if (_0xcaa5x4e.innerHTML != _0xcaa5x4c) {
        _0xcaa5x4e.innerHTML = _0xcaa5x4c;
    }
}
var Player = function (_0xcaa5x50) {
    var _0xcaa5x51 = {};
    _0xcaa5x51.id = _0xcaa5x50.a;
    _0xcaa5x51.username = _0xcaa5x50.b;
    _0xcaa5x51.map = _0xcaa5x50.f;
    _0xcaa5x51.score = _0xcaa5x50.c;
    _0xcaa5x51.level = _0xcaa5x50.d;
    _0xcaa5x51.type = _0xcaa5x50.e;
    _0xcaa5x51.skin = _0xcaa5x50.g;
    _0xcaa5x51.body = _0xcaa5x50.h;
    _0xcaa5x51.color = _0xcaa5x50.i;
    _0xcaa5x51.back = _0xcaa5x50.m;
    _0xcaa5x51.ride = _0xcaa5x50.n;
    _0xcaa5x51.hpMax = _0xcaa5x50.j;
    _0xcaa5x51.animation = _0xcaa5x50.k;
    _0xcaa5x51.chatMessage = _0xcaa5x50.l;
    _0xcaa5x51.isHere = 5 * FPS;
    _0xcaa5x51.angle = 0;
    _0xcaa5x51.scale = 1;
    if (Math.random() < 0.33) {
        _0xcaa5x51.pet = 9;
    } else {
        if (Math.random() > 0.5) {
            _0xcaa5x51.pet = 10;
        } else {
            _0xcaa5x51.pet = 11;
        }
    }
    ;
    _0xcaa5x51.update = function () {
        _0xcaa5x51.isHere--;
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        if (selfId == _0xcaa5x51.id) {
            _0xcaa5x51.updateStats();
        }
        ;
        if (!Player.leaderboardScore[2] || _0xcaa5x51.score >= Player.leaderboardScore[2]) {
            _0xcaa5x51.glow = 1;
        } else {
            _0xcaa5x51.glow = 0;
        }
        ;
        if (!Player.leaderboardScore[9] || _0xcaa5x51.score >= Player.leaderboardScore[9]) {
            _0xcaa5x51.topTen = 1;
        } else {
            _0xcaa5x51.topTen = 0;
        }
        ;
        if (Math.abs(_0xcaa5x51.x - _0xcaa5x51.newX) < 200 && Math.abs(_0xcaa5x51.y - _0xcaa5x51.newY) < 200) {
            _0xcaa5x51.x += (_0xcaa5x51.newX - _0xcaa5x51.x) / (FPS / serverFPS);
            _0xcaa5x51.y += (_0xcaa5x51.newY - _0xcaa5x51.y) / (FPS / serverFPS);
            if (_0xcaa5x51.hp < _0xcaa5x51.hpMax) {
                _0xcaa5x51.hp += (_0xcaa5x51.newHp - _0xcaa5x51.hp) / (FPS / serverFPS);
            } else {
                _0xcaa5x51.hp = _0xcaa5x51.newHp;
            }
            ;
            if (Math.abs(_0xcaa5x51.newAngle - _0xcaa5x51.angle) > 180) {
                if (_0xcaa5x51.newAngle > _0xcaa5x51.angle) {
                    _0xcaa5x51.angle += 360;
                } else {
                    _0xcaa5x51.angle -= 360;
                }
            }
            ;
            if (Math.abs(_0xcaa5x51.angle - _0xcaa5x51.petAngle) > 180) {
                if (_0xcaa5x51.angle > _0xcaa5x51.petAngle) {
                    _0xcaa5x51.petAngle += 360;
                } else {
                    _0xcaa5x51.petAngle -= 360;
                }
            }
            ;
            _0xcaa5x51.angle += (_0xcaa5x51.newAngle - _0xcaa5x51.angle) / (FPS / serverFPS);
            if (!_0xcaa5x51.petIntervalRandom || _0xcaa5x51.petIntervalRandom++ > FPS * 60) {
                _0xcaa5x51.petAngleRandom = 45 - 90 * Math.random();
                _0xcaa5x51.petIntervalRandom = 60 * FPS * Math.random();
            }
            ;
            _0xcaa5x51.petNewAngle = _0xcaa5x51.angle + _0xcaa5x51.petAngleRandom;
            if (_0xcaa5x51.petAngle < 9999) {
                _0xcaa5x51.tempSign = (_0xcaa5x51.petNewAngle - _0xcaa5x51.petAngle) / Math.abs(_0xcaa5x51.petNewAngle - _0xcaa5x51.petAngle);
                _0xcaa5x51.petAngle += _0xcaa5x51.tempSign * Math.min(Math.abs(_0xcaa5x51.petNewAngle - _0xcaa5x51.petAngle), 30) / (FPS * 3 / serverFPS);
            } else {
                _0xcaa5x51.petAngle = 0;
            }
            ;
            _0xcaa5x51.score += (_0xcaa5x51.newScore - _0xcaa5x51.score) / (FPS / serverFPS);
            _0xcaa5x51.score = Math.ceil(_0xcaa5x51.score);
        } else {
            _0xcaa5x51.x = _0xcaa5x51.newX;
            _0xcaa5x51.y = _0xcaa5x51.newY;
            _0xcaa5x51.angle = _0xcaa5x51.newAngle;
            _0xcaa5x51.petAngle = _0xcaa5x51.newAngle;
            _0xcaa5x51.score = _0xcaa5x51.newScore;
        }
    };
    _0xcaa5x51.getTutorialAngle = function () {
        var _0xcaa5x52, _0xcaa5x53;
        var _0xcaa5x54 = 'hidden';
        if (_0xcaa5x51.level < 11) {
            if (_0xcaa5x51.level >= 9) {
                _0xcaa5x52 = mapWIDTH * 4 / 6 - 600;
                _0xcaa5x53 = mapHEIGHT - 600;
            } else {
                if (_0xcaa5x51.level >= 7) {
                    _0xcaa5x52 = mapWIDTH * 1 / 6 + 600;
                    _0xcaa5x53 = mapHEIGHT * 2 / 6 + 600;
                } else {
                    if (_0xcaa5x51.level >= 5) {
                        _0xcaa5x52 = mapWIDTH * 5 / 6 - 600;
                        _0xcaa5x53 = mapHEIGHT * 4 / 6 - 600;
                    } else {
                        if (_0xcaa5x51.level >= 3) {
                            _0xcaa5x52 = mapWIDTH * 1 / 6 + 600;
                            _0xcaa5x53 = mapHEIGHT * 5 / 6 - 600;
                        } else {
                            _0xcaa5x52 = mapWIDTH / 2;
                            _0xcaa5x53 = mapHEIGHT * 3.5 / 6;
                        }
                    }
                }
            }
            ;
            _0xcaa5x54 = getAngleFromPoints(_0xcaa5x51.x, _0xcaa5x51.y, _0xcaa5x52, _0xcaa5x53);
            if (Math.abs(_0xcaa5x51.x - _0xcaa5x52) < 400 && Math.abs(_0xcaa5x51.y - _0xcaa5x53) < 400) {
                _0xcaa5x54 = 'hidden';
            }
        }
        ;
        return _0xcaa5x54;
    };
    _0xcaa5x51.updateStats = function () {
        if (_0xcaa5x51.level == _0xcaa5x51.oldLevel && _0xcaa5x51.type == _0xcaa5x51.oldType) {
            return;
        }
        ;
        _0xcaa5x51.oldLevel = _0xcaa5x51.level;
        _0xcaa5x51.oldType = _0xcaa5x51.type;
        _0xcaa5x51.statHp = 80 * Math.pow(1.1, _0xcaa5x51.level - 1);
        _0xcaa5x51.statSpd = (5 - (_0xcaa5x51.level - 1) * 0.05) * 100;
        _0xcaa5x51.statRange = 36;
        _0xcaa5x51.statDmg = 10 * Math.pow(1.2, _0xcaa5x51.level - 1);
        _0xcaa5x51.statReload = 64 / FPS * 10 * 17 / 10;
        if (_0xcaa5x51.type == 1) {
            _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.7 / 4 * 4;
            _0xcaa5x51.statReload /= 1.6;
        } else {
            if (_0xcaa5x51.type == 2) {
                _0xcaa5x51.statDmg = _0xcaa5x51.statDmg / 3 * 3;
                _0xcaa5x51.statRange /= 1.6;
                _0xcaa5x51.statHp *= 1.4;
            } else {
                if (_0xcaa5x51.type == 3) {
                    _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.2 / 2 / 1.5 * 2;
                    _0xcaa5x51.statRange *= 1.3;
                    _0xcaa5x51.statReload *= 1.5;
                    _0xcaa5x51.statHp *= 1.1;
                } else {
                    if (_0xcaa5x51.type == 4) {
                        _0xcaa5x51.statDmg = _0xcaa5x51.statDmg / 2 * 8;
                        _0xcaa5x51.statRange /= 1.5;
                    } else {
                        if (_0xcaa5x51.type == 5) {
                            _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.7 / 7 * 7;
                            _0xcaa5x51.statRange = _0xcaa5x51.statRange * 1.3;
                            _0xcaa5x51.statReload = _0xcaa5x51.statReload / 1.1;
                            _0xcaa5x51.statHp /= 1.2;
                        } else {
                            if (_0xcaa5x51.type == 6) {
                                _0xcaa5x51.statDmg *= 2;
                                _0xcaa5x51.statRange *= 2.3;
                                _0xcaa5x51.statReload /= 2.2;
                                _0xcaa5x51.statHp /= 1.3;
                            } else {
                                if (_0xcaa5x51.type == 7) {
                                    _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.2 / 1.5 / 1.5 / 1.5;
                                    _0xcaa5x51.statReload = _0xcaa5x51.statReload * 1.5 * 1.5 * 1.5;
                                    _0xcaa5x51.statRange /= 1.7;
                                } else {
                                    if (_0xcaa5x51.type == 8) {
                                        _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.15 * 2 / 3 * 3;
                                        _0xcaa5x51.statReload = _0xcaa5x51.statReload / 2;
                                        _0xcaa5x51.statRange = _0xcaa5x51.statRange * 1.3;
                                        _0xcaa5x51.statHp /= 1.3;
                                    } else {
                                        if (_0xcaa5x51.type == 9) {
                                            _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.3 * 1.2 * 2 / 4 * 4;
                                            _0xcaa5x51.statReload = _0xcaa5x51.statReload / 2;
                                            _0xcaa5x51.statRange /= 1.7;
                                            _0xcaa5x51.statHp /= 1.4;
                                        } else {
                                            if (_0xcaa5x51.type == 10) {
                                                _0xcaa5x51.statDmg = _0xcaa5x51.statDmg / 1.5 / 1.5 / 1.5 / 1.5 / 1.2;
                                                _0xcaa5x51.statReload = _0xcaa5x51.statReload * 1.5 * 1.5 * 1.5 * 1.5;
                                            } else {
                                                if (_0xcaa5x51.type == 11) {
                                                    _0xcaa5x51.statDmg *= 1.6;
                                                    _0xcaa5x51.statReload /= 1.7;
                                                    _0xcaa5x51.statRange /= 1.8;
                                                    _0xcaa5x51.statHp *= 1.3;
                                                } else {
                                                    if (_0xcaa5x51.type == 12) {
                                                        _0xcaa5x51.statDmg *= 1.2;
                                                        _0xcaa5x51.statRange *= 2.3;
                                                        _0xcaa5x51.statReload /= 1.1;
                                                        _0xcaa5x51.statHp /= 1.3;
                                                    } else {
                                                        if (_0xcaa5x51.type == 13) {
                                                            _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.2 * 1.5 / 7 * 7;
                                                            _0xcaa5x51.statReload = _0xcaa5x51.statReload / 1.5;
                                                            _0xcaa5x51.statRange = _0xcaa5x51.statRange * 1.2;
                                                            _0xcaa5x51.statHp *= 1.1;
                                                        } else {
                                                            if (_0xcaa5x51.type == 14) {
                                                                _0xcaa5x51.statDmg = _0xcaa5x51.statDmg * 1.1 / 3 * 3;
                                                                _0xcaa5x51.statRange = _0xcaa5x51.statRange / 1.1;
                                                                _0xcaa5x51.statHp *= 1.1;
                                                                _0xcaa5x51.statReload *= 1.1;
                                                            } else {
                                                                if (_0xcaa5x51.type == 15) {
                                                                    _0xcaa5x51.statDmg *= 1.9;
                                                                    _0xcaa5x51.statRange *= 2.2;
                                                                    _0xcaa5x51.statReload /= 1.6;
                                                                } else {
                                                                    if (_0xcaa5x51.type == 16) {
                                                                        _0xcaa5x51.statDmg *= 3.6;
                                                                        _0xcaa5x51.statRange *= 2.2;
                                                                        _0xcaa5x51.statReload /= 3;
                                                                    } else {
                                                                        if (_0xcaa5x51.type == 17) {
                                                                            _0xcaa5x51.statDmg *= 2.3;
                                                                            _0xcaa5x51.statRange *= 2.2;
                                                                            _0xcaa5x51.statReload /= 2.4;
                                                                        } else {
                                                                            if (_0xcaa5x51.type == 18) {
                                                                                _0xcaa5x51.statDmg *= 2.2;
                                                                                _0xcaa5x51.statRange *= 2.3;
                                                                                _0xcaa5x51.statReload /= 2.2;
                                                                                _0xcaa5x51.statHp /= 1.3;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        ;
        _0xcaa5x51.statHp = Math.floor(_0xcaa5x51.statHp);
        _0xcaa5x51.statSpd = Math.floor(_0xcaa5x51.statSpd);
        _0xcaa5x51.statRange = Math.floor(_0xcaa5x51.statRange);
        _0xcaa5x51.statDmg = Math.floor(_0xcaa5x51.statDmg * Math.pow(0.9166666666666667, _0xcaa5x51.level - 1));
        _0xcaa5x51.statReload = Math.floor(_0xcaa5x51.statReload) / 10;
    };
    _0xcaa5x51.draw = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        if (Player.list[selfId].map !== _0xcaa5x51.map && Player.list[selfId].map !== 0 || _0xcaa5x51.map == 0) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        if (_0xcaa5x51.glow == 1) {
            drawRotatedImage(Img.other[3], _0xcaa5x55, _0xcaa5x56, 0);
        }
        ;
        if (_0xcaa5x51.id == selfId) {
            _0xcaa5x51.angle = mouseAngle;
        }
        ;
        if (_0xcaa5x51.dash == 1) {
            if (_0xcaa5x51.scale < 1.1) {
                _0xcaa5x51.scale += 0.01;
            }
        } else {
            if (_0xcaa5x51.scale > 1) {
                _0xcaa5x51.scale -= 0.01;
            }
        }
        ;
        if (_0xcaa5x51.type2 !== 0) {
            drawRotatedImage(Img.decoration[_0xcaa5x51.type2], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle);
        }
        ;
        if (_0xcaa5x51.topTen == 1) {
            drawRotatedImage(Img.ride[_0xcaa5x51.ride], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        }
        ;
        if (_0xcaa5x51.level % 2 == 1) {
            drawRotatedImage(Img.weapon[_0xcaa5x51.type][_0xcaa5x51.level], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        } else {
            drawRotatedImage(Img.weapon[_0xcaa5x51.type][_0xcaa5x51.level - 1], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        }
        ;
        drawRotatedImage(Img.back[_0xcaa5x51.back], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.hand[_0xcaa5x51.color], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.body[_0xcaa5x51.body], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.head[_0xcaa5x51.color], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.skin[_0xcaa5x51.skin], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        changeCtxFont('bold 18px sans-serif');
        ctx.textAlign = 'center';
        if (tToggle) {
            var _0xcaa5x57 = 70 * _0xcaa5x51.hp / _0xcaa5x51.hpMax;
            ctx.fillStyle = '#FFF';
            ctx.fillRect(_0xcaa5x55 - 35 + _0xcaa5x57 + 14, _0xcaa5x56 + 60, 70 - _0xcaa5x57, 10);
            if (selfId != _0xcaa5x51.id && (gameMode == 0 && _0xcaa5x51.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (_0xcaa5x51.level > Player.list[selfId].level && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7))) {
                ctx.fillStyle = '#D53C50';
            } else {
                ctx.fillStyle = '#19AD14';
            }
            ;
            ctx.fillRect(_0xcaa5x55 - 35 + 14, _0xcaa5x56 + 60, _0xcaa5x57, 10);
            drawRotatedImage(Img.other[8], _0xcaa5x55 - 35 - 14 + 14, _0xcaa5x56 + 60 + 6, 0);
            ctx.fillStyle = '#F3F3F3';
            ctx.fillText(_0xcaa5x51.level, _0xcaa5x55 - 35 - 14 + 14, _0xcaa5x56 + 60 + 12);
            ctx.fillText(_0xcaa5x51.username, _0xcaa5x55, _0xcaa5x56 - 60);
            if (_0xcaa5x51.animation != 0) {
                if (_0xcaa5x51.animation == 1) {
                    if (selfId != _0xcaa5x51.id && (gameMode == 0 && _0xcaa5x51.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (selfId == _0xcaa5x51.id || _0xcaa5x51.level > Player.list[selfId].level && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7))) {
                        ctx.fillStyle = '#AD0000';
                    } else {
                        ctx.fillStyle = '#148910';
                    }
                } else {
                    if (_0xcaa5x51.animation == 2) {
                        ctx.fillStyle = '#57AEBF';
                    } else {
                        if (_0xcaa5x51.animation == 4) {
                            ctx.fillStyle = '#EFC700';
                        }
                    }
                }
                ;
                ctx.fillRect(_0xcaa5x55 - 35 + 14, _0xcaa5x56 + 60, _0xcaa5x57, 10);
            }
        }
        ;
        if (_0xcaa5x51.animation == 2) {
            drawRotatedImage(Img.other[4], _0xcaa5x55, _0xcaa5x56, 0);
        } else {
            if (_0xcaa5x51.animation == 4) {
                drawRotatedImage(Img.other[5], _0xcaa5x55, _0xcaa5x56, 0);
            }
        }
    };
    _0xcaa5x51.drawMessage = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        if (Player.list[selfId].map !== _0xcaa5x51.map && Player.list[selfId].map !== 0 || _0xcaa5x51.map == 0) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        if (_0xcaa5x51.chatMessage !== '' && _0xcaa5x51.chatMessage) {
            var _0xcaa5x58 = ctx.measureText(_0xcaa5x51.chatMessage).width;
            var _0xcaa5x59 = ctx.measureText(_0xcaa5x51.chatMessage).height;
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = '#000';
            ctx.fillRect(_0xcaa5x55 - _0xcaa5x58 / 2 - 10, _0xcaa5x56 - 80 - 40, _0xcaa5x58 + 20, 30);
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#F3F3F3';
            ctx.fillText(_0xcaa5x51.chatMessage, _0xcaa5x55, _0xcaa5x56 - 100);
        }
    };
    _0xcaa5x51.checkIsHere = function () {
        if (_0xcaa5x51.isHere <= 0) {
            if (_0xcaa5x51.id == selfId) {
                firstLogin = 0;
                loadPlayButton = 2;
                _0xcaa5x51.map = 0;
                displaySpawnMessage('Cannot connect to server...');
                deathTimer = FPS * 2;
            } else {
                if (_0xcaa5x51.map == 1) {
                    _0xcaa5x51.map = 0;
                }
            }
            ;
            return false;
        } else {
            if (_0xcaa5x51.id == selfId && loadPlayButton == 2) {
                loadPlayButton = 1;
                displaySpawnMessage('Reconnected.');
            }
        }
        ;
        return true;
    };
    Player.list[_0xcaa5x51.id] = _0xcaa5x51;
    return _0xcaa5x51;
};
Player.list = {};
Player.leaderboard = {};
var Bullet = function (_0xcaa5x50) {
    var _0xcaa5x51 = {};
    _0xcaa5x51.id = _0xcaa5x50.a;
    _0xcaa5x51.newX = _0xcaa5x50.b;
    _0xcaa5x51.newY = _0xcaa5x50.c;
    _0xcaa5x51.newAngle = _0xcaa5x50.d;
    _0xcaa5x51.map = _0xcaa5x50.e;
    _0xcaa5x51.type = _0xcaa5x50.f;
    _0xcaa5x51.level = _0xcaa5x50.g;
    _0xcaa5x51.playSoundAlready = 0;
    _0xcaa5x51.angle = _0xcaa5x51.newAngle;
    _0xcaa5x51.isHere = 200;
    _0xcaa5x51.update = function () {
        _0xcaa5x51.isHere--;
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        if (Math.abs(_0xcaa5x51.x - _0xcaa5x51.newX) < 200 && Math.abs(_0xcaa5x51.y - _0xcaa5x51.newY) < 200) {
            if (_0xcaa5x51.playSoundAlready == 0) {
                var _0xcaa5x5b = Sound.weapon[_0xcaa5x51.type];
                if (_0xcaa5x5b) {
                    _0xcaa5x5b.currentTime = 0;
                    _0xcaa5x5b.volume = soundVolume;
                    _0xcaa5x5b.play();
                }
                ;
                _0xcaa5x51.playSoundAlready = 1;
            }
            ;
            _0xcaa5x51.x += (_0xcaa5x51.newX - _0xcaa5x51.x) / (FPS / serverFPS);
            _0xcaa5x51.y += (_0xcaa5x51.newY - _0xcaa5x51.y) / (FPS / serverFPS);
            if (Math.abs(_0xcaa5x51.newAngle - _0xcaa5x51.angle) > 180) {
                if (_0xcaa5x51.newAngle > _0xcaa5x51.angle) {
                    _0xcaa5x51.angle += 360;
                } else {
                    _0xcaa5x51.angle -= 360;
                }
            }
            ;
            _0xcaa5x51.angle += (_0xcaa5x51.newAngle - _0xcaa5x51.angle) / (FPS / serverFPS);
        } else {
            _0xcaa5x51.x = _0xcaa5x51.newX;
            _0xcaa5x51.y = _0xcaa5x51.newY;
            _0xcaa5x51.angle = _0xcaa5x51.newAngle;
        }
    };
    _0xcaa5x51.draw = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        if (_0xcaa5x51.level % 2 == 1) {
            drawRotatedImage(Img.bullet[_0xcaa5x51.type][_0xcaa5x51.level], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle);
        } else {
            drawRotatedImage(Img.bullet[_0xcaa5x51.type][_0xcaa5x51.level - 1], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle);
        }
    };
    _0xcaa5x51.checkIsHere = function () {
        if (_0xcaa5x51.isHere <= 0) {
            delete Bullet.list[_0xcaa5x51.id];
            return false;
        }
        ;
        return true;
    };
    Bullet.list[_0xcaa5x51.id] = _0xcaa5x51;
    return _0xcaa5x51;
};
Bullet.list = {};
function drawRotatedImage(_0xcaa5x39, _0xcaa5x55, _0xcaa5x56, _0xcaa5x5d, _0xcaa5x5e) {
    if (!_0xcaa5x39) {
        return;
    }
    ;
    loadImage(_0xcaa5x39);
    if (_0xcaa5x39.width == 0) {
        return;
    }
    ;
    if (!_0xcaa5x5e) {
        _0xcaa5x5e = 1;
    }
    ;
    ctx.save();
    ctx.translate(_0xcaa5x55, _0xcaa5x56);
    ctx.rotate(_0xcaa5x5d * Math.PI / 180);
    ctx.drawImage(_0xcaa5x39, -(_0xcaa5x39.width * _0xcaa5x5e / 2), -(_0xcaa5x39.height * _0xcaa5x5e / 2), _0xcaa5x39.width * _0xcaa5x5e, _0xcaa5x39.height * _0xcaa5x5e);
    ctx.restore();
}
function getAngleFromPoints(_0xcaa5x60, _0xcaa5x61, _0xcaa5x62, _0xcaa5x63) {
    var _0xcaa5x5d = Math.atan2(_0xcaa5x63 - _0xcaa5x61, _0xcaa5x62 - _0xcaa5x60);
    _0xcaa5x5d *= 180 / Math.PI;
    return _0xcaa5x5d;
}
function setCookie(_0xcaa5x65, _0xcaa5x66, _0xcaa5x67) {
    var _0xcaa5x68 = new Date();
    _0xcaa5x68.setTime(_0xcaa5x68.getTime() + _0xcaa5x67 * 24 * 60 * 60 * 1000);
    var _0xcaa5x69 = 'expires=' + _0xcaa5x68.toUTCString();
    document.cookie = _0xcaa5x65 + '=' + _0xcaa5x66 + ';' + _0xcaa5x69 + ';path=/;domain=fightz.io';
}
function getCookie(_0xcaa5x65) {
    var _0xcaa5x6b = _0xcaa5x65 + '=';
    var _0xcaa5x6c = document.cookie.split(';');
    for (var _0xcaa5x6d = _0xcaa5x6c.length - 1; _0xcaa5x6d >= 0; _0xcaa5x6d--) {
        var _0xcaa5x6e = _0xcaa5x6c[_0xcaa5x6d];
        while (_0xcaa5x6e.charAt(0) == ' ') {
            _0xcaa5x6e = _0xcaa5x6e.substring(1);
        }
        ;
        if (_0xcaa5x6e.indexOf(_0xcaa5x6b) == 0) {
            return _0xcaa5x6e.substring(_0xcaa5x6b.length, _0xcaa5x6e.length);
        }
    }
    ;
    return '';
}
var Decoration = function (_0xcaa5x50) {
    var _0xcaa5x51 = {};
    _0xcaa5x51.id = _0xcaa5x50.a;
    _0xcaa5x51.x = _0xcaa5x50.b;
    _0xcaa5x51.y = _0xcaa5x50.c;
    if (_0xcaa5x50.d) {
        _0xcaa5x51.map = _0xcaa5x50.d;
    } else {
        _0xcaa5x51.map = 1;
    }
    ;
    _0xcaa5x51.type = _0xcaa5x50.e;
    _0xcaa5x51.angle = _0xcaa5x50.f;
    _0xcaa5x51.isHere = 200;
    if (_0xcaa5x51.type == 2) {
        _0xcaa5x51.isWater = true;
    }
    ;
    if (_0xcaa5x51.y > mapHEIGHT / 3 && _0xcaa5x51.y < mapHEIGHT * 2 / 3 && _0xcaa5x51.x > mapWIDTH / 6 && _0xcaa5x51.x < mapWIDTH / 3) {
        if (_0xcaa5x51.type == 1) {
            _0xcaa5x51.type = 17;
        } else {
            if (_0xcaa5x51.type == 2) {
                _0xcaa5x51.type = 7;
            } else {
                if (_0xcaa5x51.type == 3) {
                    _0xcaa5x51.type = 6;
                } else {
                    if (_0xcaa5x51.type == 36) {
                        _0xcaa5x51.type = 41;
                    } else {
                        if (_0xcaa5x51.type == 13) {
                            _0xcaa5x51.type = 73;
                        }
                    }
                }
            }
        }
    } else {
        if (_0xcaa5x51.y > mapHEIGHT / 2 && _0xcaa5x51.y < mapHEIGHT * 5 / 6 && _0xcaa5x51.x > 0 && _0xcaa5x51.x < mapWIDTH * 1 / 6) {
            if (_0xcaa5x51.type == 1) {
                _0xcaa5x51.type = 17;
            } else {
                if (_0xcaa5x51.type == 2) {
                    _0xcaa5x51.type = 7;
                } else {
                    if (_0xcaa5x51.type == 3) {
                        _0xcaa5x51.type = 6;
                    } else {
                        if (_0xcaa5x51.type == 36) {
                            _0xcaa5x51.type = 41;
                        }
                    }
                }
            }
        } else {
            if (_0xcaa5x51.y > mapHEIGHT / 6 && _0xcaa5x51.y < mapHEIGHT / 3 && _0xcaa5x51.x > mapWIDTH / 2 && _0xcaa5x51.x < mapWIDTH * 5 / 6) {
                if (_0xcaa5x51.type == 1) {
                    _0xcaa5x51.type = 19;
                } else {
                    if (_0xcaa5x51.type == 2) {
                        _0xcaa5x51.type = 5;
                    } else {
                        if (_0xcaa5x51.type == 3) {
                            _0xcaa5x51.type = 9;
                        } else {
                            if (_0xcaa5x51.type == 36) {
                                _0xcaa5x51.type = 36;
                            } else {
                                if (_0xcaa5x51.type == 13) {
                                    _0xcaa5x51.type = 69;
                                }
                            }
                        }
                    }
                }
            } else {
                if (_0xcaa5x51.y > 0 && _0xcaa5x51.y < mapHEIGHT / 6 && _0xcaa5x51.x > mapWIDTH * 4 / 6 && _0xcaa5x51.x < mapWIDTH) {
                    if (_0xcaa5x51.type == 1) {
                        _0xcaa5x51.type = 64;
                    } else {
                        if (_0xcaa5x51.type == 2) {
                            _0xcaa5x51.type = 65;
                        } else {
                            if (_0xcaa5x51.type == 3) {
                                _0xcaa5x51.type = 66;
                            } else {
                                if (_0xcaa5x51.type == 36) {
                                    _0xcaa5x51.type = 36;
                                }
                            }
                        }
                    }
                } else {
                    if (_0xcaa5x51.y > mapHEIGHT * 2 / 6 && _0xcaa5x51.y < mapHEIGHT * 4 / 6 && _0xcaa5x51.x > mapWIDTH * 4 / 6 && _0xcaa5x51.x < mapWIDTH * 5 / 6) {
                        if (_0xcaa5x51.type == 1) {
                            _0xcaa5x51.type = 21;
                        } else {
                            if (_0xcaa5x51.type == 2) {
                                _0xcaa5x51.type = 22;
                            } else {
                                if (_0xcaa5x51.type == 3) {
                                    _0xcaa5x51.type = 20;
                                } else {
                                    if (_0xcaa5x51.type == 36) {
                                        _0xcaa5x51.type = 40;
                                    } else {
                                        if (_0xcaa5x51.type == 13) {
                                            _0xcaa5x51.type = 71;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (_0xcaa5x51.y > mapHEIGHT * 4 / 6 && _0xcaa5x51.y < mapHEIGHT * 5 / 6 && _0xcaa5x51.x > mapWIDTH / 2 && _0xcaa5x51.x < mapWIDTH * 5 / 6) {
                            if (_0xcaa5x51.type == 1) {
                                _0xcaa5x51.type = 8;
                            } else {
                                if (_0xcaa5x51.type == 2) {
                                    _0xcaa5x51.type = 15;
                                } else {
                                    if (_0xcaa5x51.type == 3) {
                                        _0xcaa5x51.type = 16;
                                    } else {
                                        if (_0xcaa5x51.type == 36) {
                                            _0xcaa5x51.type = 38;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (_0xcaa5x51.y > mapHEIGHT / 2 && _0xcaa5x51.y < mapHEIGHT * 5 / 6 && _0xcaa5x51.x > mapWIDTH * 5 / 6 && _0xcaa5x51.x < mapWIDTH) {
                                if (_0xcaa5x51.type == 1) {
                                    _0xcaa5x51.type = 8;
                                } else {
                                    if (_0xcaa5x51.type == 2) {
                                        _0xcaa5x51.type = 15;
                                    } else {
                                        if (_0xcaa5x51.type == 3) {
                                            _0xcaa5x51.type = 16;
                                        } else {
                                            if (_0xcaa5x51.type == 36) {
                                                _0xcaa5x51.type = 38;
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (_0xcaa5x51.y > mapHEIGHT * 4 / 6 && _0xcaa5x51.y < mapHEIGHT * 5 / 6 && _0xcaa5x51.x > mapWIDTH / 6 && _0xcaa5x51.x < mapWIDTH / 2) {
                                    if (_0xcaa5x51.type == 1) {
                                        _0xcaa5x51.type = 44;
                                    } else {
                                        if (_0xcaa5x51.type == 2) {
                                            _0xcaa5x51.type = 45;
                                        } else {
                                            if (_0xcaa5x51.type == 3) {
                                                _0xcaa5x51.type = 43;
                                            } else {
                                                if (_0xcaa5x51.type == 36) {
                                                } else {
                                                    if (_0xcaa5x51.type == 13) {
                                                        _0xcaa5x51.type = 72;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (_0xcaa5x51.y > mapHEIGHT * 5 / 6 && _0xcaa5x51.y < mapHEIGHT && _0xcaa5x51.x > 0 && _0xcaa5x51.x < mapWIDTH * 2 / 6) {
                                        if (_0xcaa5x51.type == 1) {
                                            _0xcaa5x51.type = 44;
                                        } else {
                                            if (_0xcaa5x51.type == 2) {
                                                _0xcaa5x51.type = 45;
                                            } else {
                                                if (_0xcaa5x51.type == 3) {
                                                    _0xcaa5x51.type = 43;
                                                } else {
                                                    if (_0xcaa5x51.type == 36) {
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (_0xcaa5x51.y > mapHEIGHT * 2 / 6 && _0xcaa5x51.y < mapHEIGHT / 2 && _0xcaa5x51.x > mapWIDTH * 2 / 6 && _0xcaa5x51.x < mapWIDTH * 4 / 6) {
                                            if (_0xcaa5x51.type == 1) {
                                                _0xcaa5x51.type = 25;
                                            } else {
                                                if (_0xcaa5x51.type == 2) {
                                                    _0xcaa5x51.type = 23;
                                                } else {
                                                    if (_0xcaa5x51.type == 3) {
                                                        _0xcaa5x51.type = 24;
                                                    } else {
                                                        if (_0xcaa5x51.type == 36) {
                                                            _0xcaa5x51.type = 37;
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (_0xcaa5x51.y > mapHEIGHT / 6 && _0xcaa5x51.y < mapHEIGHT / 3 && _0xcaa5x51.x > mapWIDTH / 6 && _0xcaa5x51.x < mapWIDTH / 2) {
                                                if (_0xcaa5x51.type == 1) {
                                                    _0xcaa5x51.type = 54;
                                                } else {
                                                    if (_0xcaa5x51.type == 2) {
                                                        _0xcaa5x51.type = 53;
                                                    } else {
                                                        if (_0xcaa5x51.type == 3) {
                                                            _0xcaa5x51.type = 52;
                                                        } else {
                                                            if (_0xcaa5x51.type == 36) {
                                                                _0xcaa5x51.type = 39;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (_0xcaa5x51.y > mapHEIGHT / 6 && _0xcaa5x51.y < mapHEIGHT / 2 && _0xcaa5x51.x > 0 && _0xcaa5x51.x < mapWIDTH / 6) {
                                                    if (_0xcaa5x51.type == 1) {
                                                        _0xcaa5x51.type = 48;
                                                    } else {
                                                        if (_0xcaa5x51.type == 2) {
                                                            _0xcaa5x51.type = 46;
                                                        } else {
                                                            if (_0xcaa5x51.type == 3) {
                                                                _0xcaa5x51.type = 47;
                                                            } else {
                                                                if (_0xcaa5x51.type == 36) {
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (_0xcaa5x51.y > 0 && _0xcaa5x51.y < mapHEIGHT / 6 && _0xcaa5x51.x > 0 && _0xcaa5x51.x < mapWIDTH * 2 / 6) {
                                                        if (_0xcaa5x51.type == 1) {
                                                            _0xcaa5x51.type = 18;
                                                        } else {
                                                            if (_0xcaa5x51.type == 2) {
                                                                _0xcaa5x51.type = 4;
                                                            } else {
                                                                if (_0xcaa5x51.type == 3) {
                                                                    _0xcaa5x51.type = 10;
                                                                } else {
                                                                    if (_0xcaa5x51.type == 36) {
                                                                        _0xcaa5x51.type = 39;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        if (_0xcaa5x51.y > 0 && _0xcaa5x51.y < mapHEIGHT / 6 && _0xcaa5x51.x > mapWIDTH * 2 / 6 && _0xcaa5x51.x < mapWIDTH * 4 / 6) {
                                                            if (_0xcaa5x51.type == 1) {
                                                                _0xcaa5x51.type = 18;
                                                            } else {
                                                                if (_0xcaa5x51.type == 2) {
                                                                    _0xcaa5x51.type = 4;
                                                                } else {
                                                                    if (_0xcaa5x51.type == 3) {
                                                                        _0xcaa5x51.type = 10;
                                                                    } else {
                                                                        if (_0xcaa5x51.type == 36) {
                                                                            _0xcaa5x51.type = 39;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                            if (_0xcaa5x51.y > mapHEIGHT / 6 && _0xcaa5x51.y < mapHEIGHT / 2 && _0xcaa5x51.x > mapWIDTH * 5 / 6 && _0xcaa5x51.x < mapWIDTH) {
                                                                if (_0xcaa5x51.type == 1) {
                                                                    _0xcaa5x51.type = 21;
                                                                } else {
                                                                    if (_0xcaa5x51.type == 2) {
                                                                        _0xcaa5x51.type = 22;
                                                                    } else {
                                                                        if (_0xcaa5x51.type == 3) {
                                                                            _0xcaa5x51.type = 20;
                                                                        } else {
                                                                            if (_0xcaa5x51.type == 36) {
                                                                                _0xcaa5x51.type = 40;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            } else {
                                                                if (_0xcaa5x51.y > mapHEIGHT * 5 / 6 && _0xcaa5x51.y < mapHEIGHT && _0xcaa5x51.x > mapWIDTH * 2 / 6 && _0xcaa5x51.x < mapWIDTH * 4 / 6) {
                                                                    if (_0xcaa5x51.type == 1) {
                                                                        _0xcaa5x51.type = 57;
                                                                    } else {
                                                                        if (_0xcaa5x51.type == 2) {
                                                                            _0xcaa5x51.type = 56;
                                                                        } else {
                                                                            if (_0xcaa5x51.type == 3) {
                                                                                _0xcaa5x51.type = 55;
                                                                            } else {
                                                                                if (_0xcaa5x51.type == 36) {
                                                                                } else {
                                                                                    if (_0xcaa5x51.type == 13) {
                                                                                        _0xcaa5x51.type = 70;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (_0xcaa5x51.y > mapHEIGHT * 5 / 6 && _0xcaa5x51.y < mapHEIGHT && _0xcaa5x51.x > mapWIDTH * 4 / 6 && _0xcaa5x51.x < mapWIDTH) {
                                                                        if (_0xcaa5x51.type == 1) {
                                                                            _0xcaa5x51.type = 51;
                                                                        } else {
                                                                            if (_0xcaa5x51.type == 2) {
                                                                                _0xcaa5x51.type = 49;
                                                                            } else {
                                                                                if (_0xcaa5x51.type == 3) {
                                                                                    _0xcaa5x51.type = 50;
                                                                                } else {
                                                                                    if (_0xcaa5x51.type == 36) {
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;
    _0xcaa5x51.draw = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        drawRotatedImage(Img.decoration[_0xcaa5x51.type], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle);
        if (Player.list[selfId].level < 3) {
            if (_0xcaa5x51.type == 11 || _0xcaa5x51.type == 12 || _0xcaa5x51.type == 14 || _0xcaa5x51.type == 75) {
                drawRotatedImage(Img.other[15], _0xcaa5x55, _0xcaa5x56, 0);
            }
        }
    };
    _0xcaa5x51.checkIsHere = function () {
        if (_0xcaa5x51.isHere <= 0) {
            _0xcaa5x51.x = -100000;
            return false;
        }
        ;
        return true;
    };
    Decoration.list[_0xcaa5x51.id] = _0xcaa5x51;
    return _0xcaa5x51;
};
Decoration.list = {};
var Food = function (_0xcaa5x50) {
    var _0xcaa5x51 = {};
    _0xcaa5x51.id = _0xcaa5x50.a;
    _0xcaa5x51.x = _0xcaa5x50.b;
    _0xcaa5x51.y = _0xcaa5x50.c;
    if (_0xcaa5x50.d) {
        _0xcaa5x51.map = _0xcaa5x50.d;
    } else {
        _0xcaa5x51.map = 1;
    }
    ;
    _0xcaa5x51.type = _0xcaa5x50.e;
    _0xcaa5x51.isHere = 200;
    _0xcaa5x51.playSoundAlready = 0;
    _0xcaa5x51.draw = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        if (_0xcaa5x51.playSoundAlready == 0 && _0xcaa5x51.type == 5) {
            var _0xcaa5x5b = Sound.other[0];
            if (_0xcaa5x5b) {
                _0xcaa5x5b.currentTime = 0;
                _0xcaa5x5b.volume = soundVolume;
                _0xcaa5x5b.play();
            }
            ;
            _0xcaa5x51.playSoundAlready = 1;
        }
        ;
        drawRotatedImage(Img.food[_0xcaa5x51.type], _0xcaa5x55, _0xcaa5x56, 0);
    };
    _0xcaa5x51.checkIsHere = function () {
        if (_0xcaa5x51.isHere <= 0) {
            _0xcaa5x51.x = -100000;
            return false;
        }
        ;
        return true;
    };
    Food.list[_0xcaa5x51.id] = _0xcaa5x51;
    return _0xcaa5x51;
};
Food.list = {};
var Mob = function (_0xcaa5x50) {
    var _0xcaa5x51 = {};
    _0xcaa5x51.id = _0xcaa5x50.a;
    if (_0xcaa5x50.b) {
        _0xcaa5x51.map = _0xcaa5x50.b;
    } else {
        _0xcaa5x51.map = 1;
    }
    ;
    _0xcaa5x51.type = _0xcaa5x50.c;
    _0xcaa5x51.hpMax = _0xcaa5x50.d;
    _0xcaa5x51.level = _0xcaa5x50.e;
    _0xcaa5x51.update = function () {
        _0xcaa5x51.isHere--;
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        if (Math.abs(_0xcaa5x51.x - _0xcaa5x51.newX) < 200 && Math.abs(_0xcaa5x51.y - _0xcaa5x51.newY) < 200) {
            _0xcaa5x51.x += (_0xcaa5x51.newX - _0xcaa5x51.x) / (FPS / serverFPS);
            _0xcaa5x51.y += (_0xcaa5x51.newY - _0xcaa5x51.y) / (FPS / serverFPS);
            if (_0xcaa5x51.hp < _0xcaa5x51.hpMax) {
                _0xcaa5x51.hp += (_0xcaa5x51.newHp - _0xcaa5x51.hp) / (FPS / serverFPS);
            } else {
                _0xcaa5x51.hp = _0xcaa5x51.newHp;
            }
            ;
            if (Math.abs(_0xcaa5x51.newAngle - _0xcaa5x51.angle) > 180) {
                if (_0xcaa5x51.newAngle > _0xcaa5x51.angle) {
                    _0xcaa5x51.angle += 360;
                } else {
                    _0xcaa5x51.angle -= 360;
                }
            }
            ;
            _0xcaa5x51.angle += (_0xcaa5x51.newAngle - _0xcaa5x51.angle) / (FPS * 4 / serverFPS);
        } else {
            _0xcaa5x51.x = _0xcaa5x51.newX;
            _0xcaa5x51.y = _0xcaa5x51.newY;
            _0xcaa5x51.angle = _0xcaa5x51.newAngle;
        }
    };
    _0xcaa5x51.draw = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        drawRotatedImage(Img.mob[_0xcaa5x51.type], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle);
        var _0xcaa5x57 = 70 * _0xcaa5x51.hp / _0xcaa5x51.hpMax;
        ctx.fillStyle = '#FFF';
        ctx.fillRect(_0xcaa5x55 - 35 + _0xcaa5x57 + 14, _0xcaa5x56 + Img.mob[_0xcaa5x51.type].height / 2, 70 - _0xcaa5x57, 10);
        drawRotatedImage(Img.other[8], _0xcaa5x55 - 35 - 14 + 14, _0xcaa5x56 + Img.mob[_0xcaa5x51.type].height / 2 + 6, 0);
        ctx.textAlign = 'center';
        changeCtxFont('bold 18px sans-serif');
        ctx.fillStyle = '#F3F3F3';
        ctx.fillText(_0xcaa5x51.level, _0xcaa5x55 - 35 - 14 + 14, _0xcaa5x56 + Img.mob[_0xcaa5x51.type].height / 2 + 12);
        if (_0xcaa5x51.level > Player.list[selfId].level) {
            ctx.fillStyle = '#D53C50';
        } else {
            ctx.fillStyle = '#19AD14';
        }
        ;
        ctx.fillRect(_0xcaa5x55 - 35 + 14, _0xcaa5x56 + Img.mob[_0xcaa5x51.type].height / 2, _0xcaa5x57, 10);
        if (_0xcaa5x51.animation != 0) {
            if (_0xcaa5x51.animation == 1) {
                if (_0xcaa5x51.level > Player.list[selfId].level) {
                    ctx.fillStyle = '#AD0000';
                } else {
                    ctx.fillStyle = '#148910';
                }
            }
            ;
            if (_0xcaa5x51.animation == 1) {
                ctx.fillRect(_0xcaa5x55 - 35 + 14, _0xcaa5x56 + Img.mob[_0xcaa5x51.type].height / 2, _0xcaa5x57, 10);
            }
        }
    };
    _0xcaa5x51.checkIsHere = function () {
        if (_0xcaa5x51.isHere <= 0) {
            _0xcaa5x51.x = -100000;
            return false;
        }
        ;
        return true;
    };
    Mob.list[_0xcaa5x51.id] = _0xcaa5x51;
    return _0xcaa5x51;
};
Mob.list = {};
var NPC = function (_0xcaa5x50) {
    var _0xcaa5x51 = {};
    _0xcaa5x51.id = _0xcaa5x50.a;
    _0xcaa5x51.username = _0xcaa5x50.b;
    if (_0xcaa5x50.c) {
        _0xcaa5x51.map = _0xcaa5x50.c;
    } else {
        _0xcaa5x51.map = 1;
    }
    ;
    _0xcaa5x51.score = _0xcaa5x50.d;
    _0xcaa5x51.level = _0xcaa5x50.e;
    _0xcaa5x51.type = _0xcaa5x50.f;
    _0xcaa5x51.skin = _0xcaa5x50.g;
    _0xcaa5x51.body = _0xcaa5x50.h;
    _0xcaa5x51.color = _0xcaa5x50.i;
    _0xcaa5x51.back = _0xcaa5x50.j;
    _0xcaa5x51.ride = _0xcaa5x50.k;
    _0xcaa5x51.scale = 1;
    _0xcaa5x51.isHere = 200;
    if (Math.random() < 0.33) {
        _0xcaa5x51.pet = 9;
    } else {
        if (Math.random() > 0.5) {
            _0xcaa5x51.pet = 10;
        } else {
            _0xcaa5x51.pet = 11;
        }
    }
    ;
    _0xcaa5x51.update = function () {
        _0xcaa5x51.isHere--;
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        if (!Player.leaderboardScore[2] || _0xcaa5x51.score >= Player.leaderboardScore[2]) {
            _0xcaa5x51.glow = 1;
        } else {
            _0xcaa5x51.glow = 0;
        }
        ;
        if (!Player.leaderboardScore[9] || _0xcaa5x51.score >= Player.leaderboardScore[9]) {
            _0xcaa5x51.topTen = 1;
        } else {
            _0xcaa5x51.topTen = 0;
        }
        ;
        if (Math.abs(_0xcaa5x51.x - _0xcaa5x51.newX) < 200 && Math.abs(_0xcaa5x51.y - _0xcaa5x51.newY) < 200) {
            _0xcaa5x51.x += (_0xcaa5x51.newX - _0xcaa5x51.x) / (FPS / serverFPS);
            _0xcaa5x51.y += (_0xcaa5x51.newY - _0xcaa5x51.y) / (FPS / serverFPS);
            if (_0xcaa5x51.hp < _0xcaa5x51.hpMax) {
                _0xcaa5x51.hp += (_0xcaa5x51.newHp - _0xcaa5x51.hp) / (FPS / serverFPS);
            } else {
                _0xcaa5x51.hp = _0xcaa5x51.newHp;
            }
            ;
            if (Math.abs(_0xcaa5x51.newAngle - _0xcaa5x51.angle) > 180) {
                if (_0xcaa5x51.newAngle > _0xcaa5x51.angle) {
                    _0xcaa5x51.angle += 360;
                } else {
                    _0xcaa5x51.angle -= 360;
                }
            }
            ;
            if (Math.abs(_0xcaa5x51.angle - _0xcaa5x51.petAngle) > 180) {
                if (_0xcaa5x51.angle > _0xcaa5x51.petAngle) {
                    _0xcaa5x51.petAngle += 360;
                } else {
                    _0xcaa5x51.petAngle -= 360;
                }
            }
            ;
            _0xcaa5x51.angle += (_0xcaa5x51.newAngle - _0xcaa5x51.angle) / (FPS / serverFPS);
            if (!_0xcaa5x51.petIntervalRandom || _0xcaa5x51.petIntervalRandom++ > FPS * 60) {
                _0xcaa5x51.petAngleRandom = 45 - 90 * Math.random();
                _0xcaa5x51.petIntervalRandom = 60 * FPS * Math.random();
            }
            ;
            _0xcaa5x51.petNewAngle = _0xcaa5x51.angle + _0xcaa5x51.petAngleRandom;
            if (_0xcaa5x51.petAngle < 9999) {
                _0xcaa5x51.tempSign = (_0xcaa5x51.petNewAngle - _0xcaa5x51.petAngle) / Math.abs(_0xcaa5x51.petNewAngle - _0xcaa5x51.petAngle);
                _0xcaa5x51.petAngle += _0xcaa5x51.tempSign * Math.min(Math.abs(_0xcaa5x51.petNewAngle - _0xcaa5x51.petAngle), 30) / (FPS * 3 / serverFPS);
            } else {
                _0xcaa5x51.petAngle = 0;
            }
        } else {
            _0xcaa5x51.x = _0xcaa5x51.newX;
            _0xcaa5x51.y = _0xcaa5x51.newY;
            _0xcaa5x51.angle = _0xcaa5x51.newAngle;
            _0xcaa5x51.petAngle = _0xcaa5x51.newAngle;
        }
    };
    _0xcaa5x51.draw = function () {
        if (!_0xcaa5x51.checkIsHere()) {
            return;
        }
        ;
        var _0xcaa5x55 = _0xcaa5x51.x - Player.list[selfId].x + WIDTH / 2;
        var _0xcaa5x56 = _0xcaa5x51.y - Player.list[selfId].y + HEIGHT / 2;
        if (!(_0xcaa5x55 > -500 && _0xcaa5x55 < WIDTH + 500 && _0xcaa5x56 > -500 && _0xcaa5x56 < HEIGHT + 500)) {
            return;
        }
        ;
        if (_0xcaa5x51.glow == 1) {
            drawRotatedImage(Img.other[3], _0xcaa5x55, _0xcaa5x56, 0);
        }
        ;
        if (_0xcaa5x51.dash == 1) {
            if (_0xcaa5x51.scale < 1.1) {
                _0xcaa5x51.scale += 0.01;
            }
        } else {
            if (_0xcaa5x51.scale > 1) {
                _0xcaa5x51.scale -= 0.01;
            }
        }
        ;
        if (_0xcaa5x51.topTen == 1) {
            drawRotatedImage(Img.ride[_0xcaa5x51.ride], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle);
        }
        ;
        if (_0xcaa5x51.level % 2 == 1) {
            drawRotatedImage(Img.weapon[_0xcaa5x51.type][_0xcaa5x51.level], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        } else {
            drawRotatedImage(Img.weapon[_0xcaa5x51.type][_0xcaa5x51.level - 1], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        }
        ;
        drawRotatedImage(Img.back[_0xcaa5x51.back], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.hand[_0xcaa5x51.color], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.body[_0xcaa5x51.body], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.head[_0xcaa5x51.color], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        drawRotatedImage(Img.skin[_0xcaa5x51.skin], _0xcaa5x55, _0xcaa5x56, _0xcaa5x51.angle, _0xcaa5x51.scale);
        changeCtxFont('bold 18px sans-serif');
        ctx.textAlign = 'center';
        if (tToggle) {
            var _0xcaa5x57 = 70 * _0xcaa5x51.hp / _0xcaa5x51.hpMax;
            ctx.fillStyle = '#FFF';
            ctx.fillRect(_0xcaa5x55 - 35 + _0xcaa5x57 + 14, _0xcaa5x56 + 60, 70 - _0xcaa5x57, 10);
            if (gameMode == 0 && _0xcaa5x51.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (selfId == _0xcaa5x51.id || _0xcaa5x51.level > Player.list[selfId].level && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7)) {
                ctx.fillStyle = '#D53C50';
            } else {
                ctx.fillStyle = '#19AD14';
            }
            ;
            ctx.fillRect(_0xcaa5x55 - 35 + 14, _0xcaa5x56 + 60, _0xcaa5x57, 10);
            drawRotatedImage(Img.other[8], _0xcaa5x55 - 35 - 14 + 14, _0xcaa5x56 + 60 + 6, 0);
            ctx.fillStyle = '#F3F3F3';
            ctx.fillText(_0xcaa5x51.level, _0xcaa5x55 - 35 - 14 + 14, _0xcaa5x56 + 60 + 12);
            ctx.fillText(_0xcaa5x51.username, _0xcaa5x55, _0xcaa5x56 - 60);
            if (_0xcaa5x51.animation != 0) {
                if (_0xcaa5x51.animation == 1) {
                    if (gameMode == 0 && _0xcaa5x51.y <= mapHEIGHT / 6 || gameMode == 1 && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7 || gameMode == 2 && (selfId == _0xcaa5x51.id || _0xcaa5x51.level > Player.list[selfId].level && Math.abs(_0xcaa5x51.level - Player.list[selfId].level) <= 7)) {
                        ctx.fillStyle = '#AD0000';
                    } else {
                        ctx.fillStyle = '#148910';
                    }
                } else {
                    if (_0xcaa5x51.animation == 2) {
                        ctx.fillStyle = '#57AEBF';
                    } else {
                        if (_0xcaa5x51.animation == 4) {
                            ctx.fillStyle = '#EFC700';
                        }
                    }
                }
                ;
                ctx.fillRect(_0xcaa5x55 - 35 + 14, _0xcaa5x56 + 60, _0xcaa5x57, 10);
            }
        }
        ;
        if (_0xcaa5x51.animation == 2) {
            drawRotatedImage(Img.other[4], _0xcaa5x55, _0xcaa5x56, 0);
        } else {
            if (_0xcaa5x51.animation == 4) {
                drawRotatedImage(Img.other[5], _0xcaa5x55, _0xcaa5x56, 0);
            }
        }
    };
    _0xcaa5x51.checkIsHere = function () {
        if (_0xcaa5x51.isHere <= 0) {
            _0xcaa5x51.x = -100000;
            return false;
        }
        ;
        return true;
    };
    NPC.list[_0xcaa5x51.id] = _0xcaa5x51;
    return _0xcaa5x51;
};
NPC.list = {};
var selfId = 0;
var loadPlayButton = 0;
socket.on('init', function (_0xcaa5x75) {
    if (debug == true) {
        console.log('Init: ');
        console.log(_0xcaa5x75);
    }
    ;
    if (_0xcaa5x75.selfId) {
        if (!selfId || selfId == _0xcaa5x75.selfId) {
            selfId = _0xcaa5x75.selfId;
        } else {
            if (isHome == false) {
                switchServerYet = 1;
                self.location = 'https://fightz.io/?ref=serverRestarted';
            }
        }
    }
    ;
    if (_0xcaa5x75.player) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.player.length; _0xcaa5x6d++) {
            new Player(_0xcaa5x75.player[_0xcaa5x6d]);
        }
    }
    ;
    if (_0xcaa5x75.bullet) {
    }
    ;
    if (_0xcaa5x75.mob) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.mob.length; _0xcaa5x6d++) {
            new Mob(_0xcaa5x75.mob[_0xcaa5x6d]);
        }
    }
    ;
    if (_0xcaa5x75.food) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.food.length; _0xcaa5x6d++) {
            new Food(_0xcaa5x75.food[_0xcaa5x6d]);
        }
    }
    ;
    if (_0xcaa5x75.npc) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.npc.length; _0xcaa5x6d++) {
            new NPC(_0xcaa5x75.npc[_0xcaa5x6d]);
        }
    }
    ;
    if (_0xcaa5x75.decoration) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.decoration.length; _0xcaa5x6d++) {
            new Decoration(_0xcaa5x75.decoration[_0xcaa5x6d]);
        }
    }
    ;
    if (loadPlayButton == 0) {
        loadPlayButton = 1;
    }
});
var finishLoadingFunction = function () {
    if (finishLoading == 0) {
        return;
    }
    ;
    document.getElementById('signDiv-Loading').style.display = 'none';
    document.getElementById('signDiv-signIn').style.display = 'inline';
    finishLoading = 0;
    document.getElementById('signDiv-username').focus();
    if (spawnMessage.innerHTML == 'Loading...') {
        spawnMessage.style.display = 'none';
    }
    ;
    if (!/http:\/\/fightz.io/.test(window.location.href) && !/fightz.io/.test(document.referrer) && !/localhost/.test(window.location.href)) {
        if (Player.leaderboardScore[0] < 500) {
            displaySpawnMessage('Server is full, switching server...');
            self.location = 'https://fightz.io' + urlCode;
        }
    }
    ;
    resizeCanvas();
    Sound.music[0] = new Audio('client/sound/music2.mp3?v=1.1');
    Sound.music[1] = new Audio('client/sound/music3.mp3?v=1.1');
    Sound.music[2] = new Audio('client/sound/music4.mp3?v=1.1');
    Sound.music[3] = new Audio('client/sound/music5.mp3?v=1.1');
    Sound.music[4] = new Audio('client/sound/music0.mp3?v=1.1');
    Sound.music[5] = new Audio('client/sound/music1.mp3?v=1.1');
    loadMusic = true;
};
setTimeout(function () {
    finishLoadingFunction();
}, 5000);
window.onload = function () {
    finishLoadingFunction();
};
window.onbeforeunload = function () {
    if (Player.list[selfId].score > 10 && switchServerYet == 0) {
        return '';
    }
};
socket.on('update', function (_0xcaa5x75) {
    if (debug == true) {
        console.log('Update: ');
        console.log(_0xcaa5x75);
    }
    ;
    if (!_0xcaa5x75) {
        return;
    }
    ;
    if (_0xcaa5x75.player) {
        for (var _0xcaa5x6d in Player.list) {
            if (Player.list[_0xcaa5x6d].id !== selfId) {
                Player.list[_0xcaa5x6d].newX = -100000;
            }
        }
        ;
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.player.length; _0xcaa5x6d++) {
            var _0xcaa5x77 = _0xcaa5x75.player[_0xcaa5x6d];
            var _0xcaa5x78 = Player.list[_0xcaa5x77.a];
            if (_0xcaa5x78) {
                _0xcaa5x78.isHere = FPS * 5;
                _0xcaa5x78.map = 1;
                if (_0xcaa5x77.b !== undefined) {
                    _0xcaa5x78.newX = _0xcaa5x77.b;
                }
                ;
                if (_0xcaa5x77.c !== undefined) {
                    _0xcaa5x78.newY = _0xcaa5x77.c;
                }
                ;
                if (_0xcaa5x77.d !== undefined) {
                    _0xcaa5x78.newAngle = _0xcaa5x77.d;
                }
                ;
                if (_0xcaa5x77.e !== undefined) {
                    _0xcaa5x78.email = _0xcaa5x77.e;
                }
                ;
                if (_0xcaa5x77.f !== undefined) {
                    _0xcaa5x78.items = _0xcaa5x77.f;
                }
                ;
                if (_0xcaa5x77.g !== undefined) {
                    _0xcaa5x78.coins = _0xcaa5x77.g;
                }
                ;
                if (_0xcaa5x77.h !== undefined) {
                    _0xcaa5x78.username = _0xcaa5x77.h;
                }
                ;
                if (_0xcaa5x77.i !== undefined) {
                    _0xcaa5x78.newHp = _0xcaa5x77.i;
                }
                ;
                if (_0xcaa5x77.j !== undefined) {
                    _0xcaa5x78.hpMax = _0xcaa5x77.j;
                }
                ;
                if (_0xcaa5x77.k !== undefined) {
                    _0xcaa5x78.newScore = _0xcaa5x77.k;
                }
                ;
                if (_0xcaa5x77.l !== undefined) {
                    _0xcaa5x78.map = _0xcaa5x77.l;
                }
                ;
                if (_0xcaa5x77.m !== undefined) {
                    _0xcaa5x78.level = _0xcaa5x77.m;
                }
                ;
                if (_0xcaa5x77.n !== undefined) {
                    _0xcaa5x78.type = _0xcaa5x77.n;
                }
                ;
                if (_0xcaa5x77.o !== undefined) {
                    _0xcaa5x78.animation = _0xcaa5x77.o;
                }
                ;
                if (_0xcaa5x77.p !== undefined) {
                    _0xcaa5x78.chatMessage = _0xcaa5x77.p;
                }
                ;
                if (_0xcaa5x77.q !== undefined) {
                    _0xcaa5x78.skin = _0xcaa5x77.q;
                }
                ;
                if (_0xcaa5x77.r !== undefined) {
                    _0xcaa5x78.body = _0xcaa5x77.r;
                }
                ;
                if (_0xcaa5x77.s !== undefined) {
                    _0xcaa5x78.color = _0xcaa5x77.s;
                }
                ;
                if (_0xcaa5x77.t !== undefined) {
                    _0xcaa5x78.statusXpboost = _0xcaa5x77.t;
                }
                ;
                if (_0xcaa5x77.u !== undefined) {
                    _0xcaa5x78.type2 = _0xcaa5x77.u;
                }
                ;
                if (_0xcaa5x77.v !== undefined) {
                    _0xcaa5x78.team = _0xcaa5x77.v;
                }
                ;
                if (_0xcaa5x77.w !== undefined) {
                    _0xcaa5x78.back = _0xcaa5x77.w;
                }
                ;
                if (_0xcaa5x77.x !== undefined) {
                    _0xcaa5x78.ride = _0xcaa5x77.x;
                }
                ;
                if (_0xcaa5x77.y !== undefined) {
                    _0xcaa5x78.dash = _0xcaa5x77.y;
                }
            }
        }
    }
    ;
    if (_0xcaa5x75.bullet) {
        for (var _0xcaa5x6d in Bullet.list) {
            Bullet.list[_0xcaa5x6d].isHere = 0;
        }
        ;
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.bullet.length; _0xcaa5x6d++) {
            var _0xcaa5x77 = _0xcaa5x75.bullet[_0xcaa5x6d];
            var _0xcaa5x79 = Bullet.list[_0xcaa5x77.a];
            if (_0xcaa5x79) {
                _0xcaa5x79.isHere = FPS * 5;
                if (_0xcaa5x77.b !== undefined) {
                    _0xcaa5x79.newX = _0xcaa5x77.b;
                }
                ;
                if (_0xcaa5x77.c !== undefined) {
                    _0xcaa5x79.newY = _0xcaa5x77.c;
                }
                ;
                if (_0xcaa5x77.d !== undefined) {
                    _0xcaa5x79.newAngle = _0xcaa5x77.d;
                }
                ;
                if (_0xcaa5x77.e !== undefined) {
                    _0xcaa5x79.map = _0xcaa5x77.e;
                }
                ;
                if (_0xcaa5x77.f !== undefined) {
                    _0xcaa5x79.type = _0xcaa5x77.f;
                }
                ;
                if (_0xcaa5x77.g !== undefined) {
                    _0xcaa5x79.level = _0xcaa5x77.g;
                }
            } else {
                new Bullet(_0xcaa5x77);
            }
        }
    }
    ;
    if (_0xcaa5x75.mob) {
        for (var _0xcaa5x6d in Mob.list) {
            Mob.list[_0xcaa5x6d].isHere = 0;
        }
        ;
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.mob.length; _0xcaa5x6d++) {
            var _0xcaa5x77 = _0xcaa5x75.mob[_0xcaa5x6d];
            var _0xcaa5x7a = Mob.list[_0xcaa5x77.a];
            if (_0xcaa5x7a) {
                _0xcaa5x7a.isHere = FPS * 5;
                if (_0xcaa5x77.b !== undefined) {
                    _0xcaa5x7a.newX = _0xcaa5x77.b;
                }
                ;
                if (_0xcaa5x77.c !== undefined) {
                    _0xcaa5x7a.newY = _0xcaa5x77.c;
                }
                ;
                if (_0xcaa5x77.d !== undefined) {
                    _0xcaa5x7a.newAngle = _0xcaa5x77.d;
                }
                ;
                if (_0xcaa5x77.e !== undefined) {
                    _0xcaa5x7a.newHp = _0xcaa5x77.e;
                }
                ;
                if (_0xcaa5x77.f !== undefined) {
                    _0xcaa5x7a.animation = _0xcaa5x77.f;
                }
            }
        }
    }
    ;
    if (_0xcaa5x75.food) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.food.length; _0xcaa5x6d++) {
            var _0xcaa5x77 = _0xcaa5x75.food[_0xcaa5x6d];
            var _0xcaa5x7b = Food.list[_0xcaa5x75.food[_0xcaa5x6d].id];
            if (_0xcaa5x7b) {
                _0xcaa5x7b.isHere = FPS * 5;
            }
        }
    }
    ;
    if (_0xcaa5x75.npc) {
        for (var _0xcaa5x6d in NPC.list) {
            NPC.list[_0xcaa5x6d].isHere = 0;
        }
        ;
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.npc.length; _0xcaa5x6d++) {
            var _0xcaa5x77 = _0xcaa5x75.npc[_0xcaa5x6d];
            var _0xcaa5x7c = NPC.list[_0xcaa5x75.npc[_0xcaa5x6d].a];
            if (_0xcaa5x7c) {
                _0xcaa5x7c.isHere = FPS * 5;
                if (_0xcaa5x77.b !== undefined) {
                    _0xcaa5x7c.newX = _0xcaa5x77.b;
                }
                ;
                if (_0xcaa5x77.c !== undefined) {
                    _0xcaa5x7c.newY = _0xcaa5x77.c;
                }
                ;
                if (_0xcaa5x77.d !== undefined) {
                    _0xcaa5x7c.newAngle = _0xcaa5x77.d;
                }
                ;
                if (_0xcaa5x77.e !== undefined) {
                    _0xcaa5x7c.newHp = _0xcaa5x77.e;
                }
                ;
                if (_0xcaa5x77.f !== undefined) {
                    _0xcaa5x7c.hpMax = _0xcaa5x77.f;
                }
                ;
                if (_0xcaa5x77.g !== undefined) {
                    _0xcaa5x7c.score = _0xcaa5x77.g;
                }
                ;
                if (_0xcaa5x77.h !== undefined) {
                    _0xcaa5x7c.level = _0xcaa5x77.h;
                }
                ;
                if (_0xcaa5x77.i !== undefined) {
                    _0xcaa5x7c.type = _0xcaa5x77.i;
                }
                ;
                if (_0xcaa5x77.j !== undefined) {
                    _0xcaa5x7c.animation = _0xcaa5x77.j;
                }
                ;
                if (_0xcaa5x77.k !== undefined) {
                    _0xcaa5x7c.skin = _0xcaa5x77.k;
                }
                ;
                if (_0xcaa5x77.l !== undefined) {
                    _0xcaa5x7c.body = _0xcaa5x77.l;
                }
                ;
                if (_0xcaa5x77.m !== undefined) {
                    _0xcaa5x7c.color = _0xcaa5x77.m;
                }
                ;
                if (_0xcaa5x77.n !== undefined) {
                    _0xcaa5x7c.team = _0xcaa5x77.n;
                }
                ;
                if (_0xcaa5x77.o !== undefined) {
                    _0xcaa5x7c.back = _0xcaa5x77.o;
                }
                ;
                if (_0xcaa5x77.p !== undefined) {
                    _0xcaa5x7c.ride = _0xcaa5x77.p;
                }
                ;
                if (_0xcaa5x77.q !== undefined) {
                    _0xcaa5x7c.dash = _0xcaa5x77.q;
                }
            }
        }
    }
    ;
    if (_0xcaa5x75.decoration) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.decoration.length; _0xcaa5x6d++) {
            var _0xcaa5x77 = _0xcaa5x75.decoration[_0xcaa5x6d];
            var _0xcaa5x68 = Decoration.list[_0xcaa5x75.decoration[_0xcaa5x6d].id];
            if (_0xcaa5x68) {
                _0xcaa5x68.isHere = FPS * 5;
            }
        }
    }
});
socket.on('remove', function (_0xcaa5x75) {
    if (debug == true) {
        console.log('Remove: ');
        console.log(_0xcaa5x75);
    }
    ;
    if (_0xcaa5x75.player) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.player.length; _0xcaa5x6d++) {
            delete Player.list[_0xcaa5x75.player[_0xcaa5x6d]];
        }
    }
    ;
    if (_0xcaa5x75.bullet) {
    }
    ;
    if (_0xcaa5x75.mob) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.mob.length; _0xcaa5x6d++) {
            delete Mob.list[_0xcaa5x75.mob[_0xcaa5x6d]];
        }
    }
    ;
    if (_0xcaa5x75.food) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.food.length; _0xcaa5x6d++) {
            delete Food.list[_0xcaa5x75.food[_0xcaa5x6d]];
        }
    }
    ;
    if (_0xcaa5x75.npc) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.npc.length; _0xcaa5x6d++) {
            delete NPC.list[_0xcaa5x75.npc[_0xcaa5x6d]];
        }
    }
    ;
    if (_0xcaa5x75.decoration) {
        for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x75.decoration.length; _0xcaa5x6d++) {
            delete Decoration.list[_0xcaa5x75.decoration[_0xcaa5x6d]];
        }
    }
});
Player.leaderboardUsername = [];
socket.on('leaderboardUsername', function (_0xcaa5x75) {
    Player.leaderboardUsername = _0xcaa5x75;
    changeCtxFont('bold 15px sans-serif');
    for (var _0xcaa5x6d in Player.leaderboardUsername) {
        Player.leaderboardUsername[_0xcaa5x6d] = getEllipsis(Player.leaderboardUsername[_0xcaa5x6d], 100);
    }
});
Player.leaderboardScore = [];
socket.on('leaderboardScore', function (_0xcaa5x75) {
    Player.leaderboardScore = _0xcaa5x75;
});
Player.leaderboardTeam = [];
socket.on('leaderboardTeam', function (_0xcaa5x75) {
    Player.leaderboardTeam = _0xcaa5x75;
});
socket.on('gameMode', function (_0xcaa5x75) {
    gameMode = _0xcaa5x75;
    if (gameMode == 0) {
        document.getElementById('mode1').style.textDecoration = 'underline';
        document.getElementById('modeButton').innerHTML = 'Casual';
    } else {
        if (gameMode == 1) {
            document.getElementById('mode2').style.textDecoration = 'underline';
            document.getElementById('modeButton').innerHTML = 'PVP';
        } else {
            if (gameMode == 2) {
                document.getElementById('mode3').style.textDecoration = 'underline';
                document.getElementById('modeButton').innerHTML = 'Food';
            }
        }
    }
});
socket.on('signInResponse', function (_0xcaa5x75) {
    if (_0xcaa5x75.success) {
        gotoSection('game');
        isPaused = false;
        otherGameDivRefresh();
    } else {
        alert('Sign in unsuccessul.');
    }
});
socket.on('loginResponse', function (_0xcaa5x75) {
    if (_0xcaa5x75.success == 'alreadyLogin') {
        displaySpawnMessage('Already login!');
    } else {
        if (_0xcaa5x75.success == true) {
            displaySpawnMessage('Welcome Back!');
            setCookie('email', signDivEmail.value, 365);
            manageHighScore();
            document.getElementById('controlLogin').style.display = 'none';
            document.getElementById('controlRegister').style.display = 'none';
            openDiv('equip');
        } else {
            displaySpawnMessage('Wrong Email/Password!');
        }
    }
});
socket.on('signUpResponse', function (_0xcaa5x75) {
    if (_0xcaa5x75.success == 1) {
        displaySpawnMessage('New Account Created!');
    } else {
        if (_0xcaa5x75.success == 0) {
            displaySpawnMessage('Account already existed!');
        } else {
            if (_0xcaa5x75.success == 2) {
                displaySpawnMessage('Email/Password too short!');
            }
        }
    }
});
socket.on('buySkinResponse', function (_0xcaa5x75) {
    if (_0xcaa5x75.success) {
        displaySpawnMessage('You bought a new item!');
    } else {
        displaySpawnMessage('Not enough coins!');
    }
});
var randomServer = Math.random();
var switchServerYet = 0;
socket.on('switchServer', function (_0xcaa5x75) {
    if (switchServerYet == 0 && isHome == false) {
        switchServerYet = 1;
        console.log('Server Full: ' + _0xcaa5x75.Playercount);
        displaySpawnMessage('Server is full, switching server...');
        if (/na/.test(window.location.href)) {
            if (/na\./.test(window.location.href)) {
                self.location = 'https://na-2.fightz.io' + urlCode;
            } else {
                if (/na-2\./.test(window.location.href)) {
                    self.location = 'https://na-3.fightz.io' + urlCode;
                } else {
                    if (/na-3\./.test(window.location.href)) {
                        self.location = 'https://na-4.fightz.io' + urlCode;
                    } else {
                        if (/na-4\./.test(window.location.href)) {
                            self.location = 'https://na-5.fightz.io' + urlCode;
                        } else {
                            if (/na-5\./.test(window.location.href)) {
                                self.location = 'https://na-6.fightz.io' + urlCode;
                            } else {
                                if (/na-6\./.test(window.location.href)) {
                                    self.location = 'https://na-7.fightz.io' + urlCode;
                                } else {
                                    if (/na-7\./.test(window.location.href)) {
                                        self.location = 'https://na-8.fightz.io' + urlCode;
                                    } else {
                                        self.location = 'https://eu.fightz.io';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (/eu/.test(window.location.href)) {
                if (/eu\./.test(window.location.href)) {
                    self.location = 'https://eu-2.fightz.io' + urlCode;
                } else {
                    if (/eu-2\./.test(window.location.href)) {
                        self.location = 'https://eu-3.fightz.io' + urlCode;
                    } else {
                        if (/eu-3\./.test(window.location.href)) {
                            self.location = 'https://eu-4.fightz.io' + urlCode;
                        } else {
                            if (/eu-4\./.test(window.location.href)) {
                                self.location = 'https://eu-5.fightz.io' + urlCode;
                            } else {
                                if (/eu-5\./.test(window.location.href)) {
                                    self.location = 'https://eu-6.fightz.io' + urlCode;
                                } else {
                                    if (/eu-6\./.test(window.location.href)) {
                                        self.location = 'https://eu-7.fightz.io' + urlCode;
                                    } else {
                                        if (/eu-7\./.test(window.location.href)) {
                                            self.location = 'https://eu-8.fightz.io' + urlCode;
                                        } else {
                                            self.location = 'https://ru.fightz.io';
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (/ru/.test(window.location.href)) {
                    if (/ru\./.test(window.location.href)) {
                        self.location = 'https://ru-2.fightz.io' + urlCode;
                    } else {
                        if (/ru-2\./.test(window.location.href)) {
                            self.location = 'https://ru-3.fightz.io' + urlCode;
                        } else {
                            if (/ru-3\./.test(window.location.href)) {
                                self.location = 'https://ru-4.fightz.io' + urlCode;
                            } else {
                                if (/ru-4\./.test(window.location.href)) {
                                    self.location = 'https://ru-5.fightz.io' + urlCode;
                                } else {
                                    if (/ru-5\./.test(window.location.href)) {
                                        self.location = 'https://ru-6.fightz.io' + urlCode;
                                    } else {
                                        if (/ru-6\./.test(window.location.href)) {
                                            self.location = 'https://ru-7.fightz.io' + urlCode;
                                        } else {
                                            if (/ru-7\./.test(window.location.href)) {
                                                self.location = 'https://ru-8.fightz.io' + urlCode;
                                            } else {
                                                self.location = 'https://as.fightz.io';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (/as/.test(window.location.href)) {
                        if (/as\./.test(window.location.href)) {
                            self.location = 'https://as-2.fightz.io' + urlCode;
                        } else {
                            if (/as-2\./.test(window.location.href)) {
                                self.location = 'https://as-3.fightz.io' + urlCode;
                            } else {
                                if (/as-3\./.test(window.location.href)) {
                                    self.location = 'https://as-4.fightz.io' + urlCode;
                                } else {
                                    if (/as-4\./.test(window.location.href)) {
                                        self.location = 'https://as-5.fightz.io' + urlCode;
                                    } else {
                                        if (/as-5\./.test(window.location.href)) {
                                            self.location = 'https://as-6.fightz.io' + urlCode;
                                        } else {
                                            if (/as-6\./.test(window.location.href)) {
                                                self.location = 'https://as-7.fightz.io' + urlCode;
                                            } else {
                                                if (/as-7\./.test(window.location.href)) {
                                                    self.location = 'https://as-8.fightz.io' + urlCode;
                                                } else {
                                                    self.location = 'https://na.fightz.io';
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (/as/.test(window.location.href)) {
                            if (/as\./.test(window.location.href)) {
                                self.location = 'https://as-2.fightz.io' + urlCode;
                            } else {
                                if (/as-2\./.test(window.location.href)) {
                                    self.location = 'https://as-3.fightz.io' + urlCode;
                                } else {
                                    if (/as-3\./.test(window.location.href)) {
                                        self.location = 'https://as-4.fightz.io' + urlCode;
                                    } else {
                                        if (/as-4\./.test(window.location.href)) {
                                            self.location = 'https://as-5.fightz.io' + urlCode;
                                        } else {
                                            if (/as-5\./.test(window.location.href)) {
                                                self.location = 'https://as-6.fightz.io' + urlCode;
                                            } else {
                                                if (/as-6\./.test(window.location.href)) {
                                                    self.location = 'https://as-7.fightz.io' + urlCode;
                                                } else {
                                                    if (/as-7\./.test(window.location.href)) {
                                                        self.location = 'https://as-8.fightz.io' + urlCode;
                                                    } else {
                                                        self.location = 'https://na.fightz.io';
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
var displaySpawnMessage = function (_0xcaa5x80) {
    spawnMessage.style.display = 'block';
    spawnMessage.innerHTML = _0xcaa5x80;
    spawnMessage.style.backgroundColor = '#B7494D';
    setTimeout(function () {
        spawnMessage.style.backgroundColor = '#A32326';
    }, 100);
};
var drawMap = function () {
    var _0xcaa5x82 = Player.list[selfId];
    var _0xcaa5x55 = WIDTH / 2 - _0xcaa5x82.x;
    var _0xcaa5x56 = HEIGHT / 2 - _0xcaa5x82.y;
    ctx.fillStyle = '#1A4C38';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 2 + mapWIDTH / 6, _0xcaa5x56 + mapHEIGHT * 2 / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
    ctx.fillStyle = '#AE8255';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 6, _0xcaa5x56 + mapHEIGHT * 2 / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
    ctx.fillStyle = '#382106';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 6, _0xcaa5x56 + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#3F3F3F';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 2, _0xcaa5x56 + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#7A972C';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 6, _0xcaa5x56 + mapHEIGHT / 2 + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#B2B2B2';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 2, _0xcaa5x56 + mapHEIGHT / 2 + mapHEIGHT / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#664E1E';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 3, _0xcaa5x56 + mapHEIGHT / 3, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#738853';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH / 3, _0xcaa5x56 + mapHEIGHT / 2, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#1A4C38';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH * 5 / 6, _0xcaa5x56 + mapHEIGHT / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
    ctx.fillStyle = '#B2B2B2';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH * 5 / 6, _0xcaa5x56 + mapHEIGHT / 2, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
    ctx.fillStyle = '#2F3F3A';
    ctx.fillRect(_0xcaa5x55, _0xcaa5x56 + mapHEIGHT / 6, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
    ctx.fillStyle = '#AE8255';
    ctx.fillRect(_0xcaa5x55, _0xcaa5x56 + mapHEIGHT / 2, mapWIDTH / 6 + 1, mapHEIGHT / 3 + 1);
    ctx.fillStyle = '#7C3131';
    ctx.fillRect(_0xcaa5x55, _0xcaa5x56, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#7C3131';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH * 2 / 6, _0xcaa5x56, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#353F17';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH * 4 / 6, _0xcaa5x56, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#7A972C';
    ctx.fillRect(_0xcaa5x55, _0xcaa5x56 + mapHEIGHT * 5 / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#8299B2';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH * 2 / 6, _0xcaa5x56 + mapHEIGHT * 5 / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#317C7C';
    ctx.fillRect(_0xcaa5x55 + mapWIDTH * 4 / 6, _0xcaa5x56 + mapHEIGHT * 5 / 6, mapWIDTH / 3 + 1, mapHEIGHT / 6 + 1);
    ctx.fillStyle = '#FFF';
    ctx.globalAlpha = 0.05;
    ctx.fillRect(_0xcaa5x55, _0xcaa5x56, mapWIDTH, mapHEIGHT);
    ctx.globalAlpha = 1;
};
var drawLines = function () {
    var _0xcaa5x82 = Player.list[selfId];
    var _0xcaa5x55 = WIDTH / 2 - _0xcaa5x82.x;
    var _0xcaa5x56 = HEIGHT / 2 - _0xcaa5x82.y;
    ctx.globalAlpha = 0.05;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    var _0xcaa5x84;
    if (WIDTH > HEIGHT) {
        _0xcaa5x84 = WIDTH + 70;
    } else {
        _0xcaa5x84 = HEIGHT + 70;
    }
    ;
    for (var _0xcaa5x6d = 0; _0xcaa5x6d < _0xcaa5x84; _0xcaa5x6d += 70) {
        ctx.beginPath();
        ctx.moveTo(-_0xcaa5x82.x % 70 + _0xcaa5x6d, 0);
        ctx.lineTo(-_0xcaa5x82.x % 70 + _0xcaa5x6d, HEIGHT);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -_0xcaa5x82.y % 70 + _0xcaa5x6d);
        ctx.lineTo(WIDTH, -_0xcaa5x82.y % 70 + _0xcaa5x6d);
        ctx.stroke();
    }
    ;
    ctx.globalAlpha = 1;
};
var leaderboardHeight, lvlPercentage, nextLvlScore;
var drawLeaderboard = function () {
    if (Player.list[selfId].score < 20) {
        drawRotatedImage(Img.other[1], WIDTH / 2, HEIGHT / 2 - 140, 0);
    }
    ;
    if (Player.leaderboardUsername.length < 10) {
        leaderboardHeight = Player.leaderboardUsername.length * 20 + 60;
    } else {
        leaderboardHeight = 260;
    }
    ;
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#333';
    ctx.fillRect(WIDTH - 230, 10, 220, leaderboardHeight);
    ctx.globalAlpha = 1;
    changeCtxFont('bold 24px sans-serif');
    ctx.textAlign = 'left';
    ctx.fillStyle = '#F3F3F3';
    ctx.fillText('Leaderboard', WIDTH - 195, 40);
    changeCtxFont('bold 15px sans-serif');
    for (var _0xcaa5x6d = 0; _0xcaa5x6d < Player.leaderboardUsername.length && _0xcaa5x6d < 10; _0xcaa5x6d++) {
        ctx.fillText(_0xcaa5x6d + 1 + '. ' + Player.leaderboardUsername[_0xcaa5x6d], WIDTH - 210, 20 * _0xcaa5x6d + 70);
        ctx.textAlign = 'right';
        ctx.fillText(correctToSigFig(Player.leaderboardScore[_0xcaa5x6d]), WIDTH - 20 - 10, 20 * _0xcaa5x6d + 70);
        ctx.textAlign = 'left';
    }
    ;
    nextLvlScore = Math.floor(300 * Math.pow(1.5, Player.list[selfId].level - 1) - 225);
    if (Player.list[selfId].level < 18) {
        lvlPercentage = Math.floor((Player.list[selfId].score - 300 * Math.pow(1.5, Player.list[selfId].level - 2) + 225) * 100 / (300 * (Math.pow(1.5, Player.list[selfId].level - 1) - Math.pow(1.5, Player.list[selfId].level - 2))));
    } else {
        lvlPercentage = 100;
        nextLvlScore = '-';
    }
    ;
    if (lvlPercentage < 0) {
        lvlPercentage = 0;
    }
    ;
    var _0xcaa5x89 = WIDTH * 0.6 * lvlPercentage / 100;
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#333';
    ctx.fillRect(WIDTH / 2 - WIDTH * 0.3 + _0xcaa5x89, HEIGHT - 20 - 10, WIDTH * 0.6 - _0xcaa5x89, 20);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#EFC700';
    ctx.fillRect(WIDTH / 2 - WIDTH * 0.3, HEIGHT - 20 - 10, _0xcaa5x89, 20);
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    changeCtxFont('bold 22px sans-serif');
    if (Player.list[selfId].statusXpboost == 0) {
        ctx.fillText('Score: ' + Player.list[selfId].score + '  Level: ' + Player.list[selfId].level + ' (' + lvlPercentage + '%) ', WIDTH / 2, HEIGHT - 20 - 20);
        if (document.getElementById('buttonXpboostImage').style.display == 'none') {
            document.getElementById('buttonXpboostImage').style.display = 'inline';
            document.getElementById('buttonPauseImage').style.display = 'none';
        }
    } else {
        ctx.fillText('Score: ' + Player.list[selfId].score + ' (x2)  Level: ' + Player.list[selfId].level + ' (' + lvlPercentage + '%) ', WIDTH / 2, HEIGHT - 20 - 20);
        if (document.getElementById('buttonPauseImage').style.display == 'none') {
            document.getElementById('buttonPauseImage').style.display = 'inline';
            document.getElementById('buttonXpboostImage').style.display = 'none';
        }
    }
    ;
    ctx.textAlign = 'left';
    drawRotatedImage(Img.other[2], WIDTH - 160 + 75, HEIGHT - 160 + 75 - 60, 0);
    drawRotatedImage(Img.other[14], WIDTH - 160 - 80, HEIGHT - 160 + 75 - 60, 0, 0.2);
    changeCtxFont('bold 15px sans-serif');
    ctx.fillStyle = '#FFF';
    ctx.fillText(Player.list[selfId].statHp, WIDTH - 160 - 60, HEIGHT - 160 - 40);
    ctx.fillText(Player.list[selfId].statDmg, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 30);
    ctx.fillText(Player.list[selfId].statReload, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 60);
    ctx.fillText(Player.list[selfId].statRange, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 90);
    ctx.fillText(Player.list[selfId].statSpd, WIDTH - 160 - 60, HEIGHT - 160 - 40 + 120);
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(WIDTH - 155 + 140 * Player.list[selfId].x / mapWIDTH, HEIGHT - 155 - 60 + 140 * Player.list[selfId].y / mapHEIGHT, 5.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFF';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#333';
    ctx.stroke();
    for (var _0xcaa5x6d in Mob.list) {
        if (Mob.list[_0xcaa5x6d].type == 27 || Mob.list[_0xcaa5x6d].type == 23 || Mob.list[_0xcaa5x6d].type == 48 || Mob.list[_0xcaa5x6d].type == 49 || Mob.list[_0xcaa5x6d].type == 8 || Mob.list[_0xcaa5x6d].type == 51 || Mob.list[_0xcaa5x6d].type == 52 || Mob.list[_0xcaa5x6d].type == 53 || Mob.list[_0xcaa5x6d].type == 54 || Mob.list[_0xcaa5x6d].type == 56 || Mob.list[_0xcaa5x6d].type == 57) {
            ctx.beginPath();
            ctx.arc(WIDTH - 155 + 140 * Mob.list[_0xcaa5x6d].x / mapWIDTH, HEIGHT - 155 - 60 + 140 * Mob.list[_0xcaa5x6d].y / mapHEIGHT, 5.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#159699';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#333';
            ctx.stroke();
        }
    }
};
document.onmousedown = function (_0xcaa5x8a) {
    if (Player.list[selfId] && Player.list[selfId].map != 0) {
        if (_0xcaa5x8a.button < 2) {
            inputAttack(true);
        }
        ;
        if (_0xcaa5x8a.button >= 2) {
            inputDash(true);
        }
    }
};
document.onmouseup = function (_0xcaa5x8a) {
    if (Player.list[selfId] && Player.list[selfId].map != 0) {
        if (_0xcaa5x8a.button < 2) {
            inputAttack(false);
        }
        ;
        if (_0xcaa5x8a.button >= 2) {
            inputDash(false);
        }
    }
};
document.onkeydown = function (_0xcaa5x8a) {
    if (!typing) {
        if (_0xcaa5x8a.keyCode === 87) {
            inputAttack(true);
        } else {
            if (_0xcaa5x8a.keyCode === 32) {
                inputDash(true);
            }
        }
    }
};
document.onkeyup = function (_0xcaa5x8a) {
    if (_0xcaa5x8a.keyCode === 87) {
        inputAttack(false);
    } else {
        if (_0xcaa5x8a.keyCode === 32) {
            inputDash(false);
        } else {
            if (_0xcaa5x8a.keyCode === 13) {
                inputChat();
            } else {
                if (_0xcaa5x8a.keyCode === 80 && !typing) {
                    tFunction();
                }
            }
        }
    }
};
var attackStatus = false;
var inputAttack = function (_0xcaa5x8d) {
    if (_0xcaa5x8d !== attackStatus) {
        socket.emit('keyPress', {
            inputId: 'leftButton',
            state: _0xcaa5x8d
        });
        attackStatus = _0xcaa5x8d;
    }
};
var dashStatus = false;
var inputDash = function (_0xcaa5x8d) {
    if (_0xcaa5x8d !== dashStatus) {
        socket.emit('keyPress', {
            inputId: 'rightButton',
            state: _0xcaa5x8d
        });
        dashStatus = _0xcaa5x8d;
    }
};
var inputChat = function () {
    if (Player.list[selfId].map != 0) {
        if (typing == false) {
            typing = true;
            document.getElementById('chatContainer').innerHTML = '<input id="chatMessage" type="text" placeholder="Enter Message" maxlength="30" style="z-index:999; position: fixed; top: ' + (canvasHEIGHT / 2 + 80) + 'px; left:' + (canvasWIDTH / 2 - 90) + 'px; width:180; height:40px; background-color: rgba(0, 0, 0, .6); color:#FFF; font-size:18px" onblur="this.focus()"></input>';
            document.getElementById('chatMessage').focus();
        } else {
            if (document.getElementById('chatMessage')) {
                typing = false;
                socket.emit('keyPress', {
                    inputId: 'chatMessage',
                    state: document.getElementById('chatMessage').value
                });
                document.getElementById('chatMessage').onblur = '';
                document.getElementById('chatContainer').innerHTML = '';
            }
        }
    }
};
var tFunction = function () {
    if (Player.list[selfId].map != 0) {
        if (tToggle == false) {
            tToggle = true;
        } else {
            tToggle = false;
        }
    }
};
var getDistance = function (_0xcaa5x60, _0xcaa5x61, _0xcaa5x62, _0xcaa5x63) {
    return Math.pow(_0xcaa5x60 - _0xcaa5x62, 2) + Math.pow(_0xcaa5x61 - _0xcaa5x63, 2);
};
var angleStatus = 0;
var distanceStatus = 0;
document.ontouchmove = function (_0xcaa5x8a) {
    var _0xcaa5x95 = _0xcaa5x8a.touches[0].pageX;
    var _0xcaa5x96 = _0xcaa5x8a.touches[0].pageY;
    if (_0xcaa5x8a.touches[0].clientX > 110) {
        if (Player.list[selfId] && Player.list[selfId].map != 0) {
            var _0xcaa5x55 = -startX + _0xcaa5x95;
            var _0xcaa5x56 = -startY + _0xcaa5x96;
            mouseAngle = Math.atan2(_0xcaa5x56, _0xcaa5x55) / Math.PI * 180;
            mouseDistance = 1;
        }
    }
};
var startX, startY, mobileControl = false;
document.ontouchstart = function (_0xcaa5x8a) {
    mobileControl = true;
    var _0xcaa5x95 = _0xcaa5x8a.touches[0].pageX;
    var _0xcaa5x96 = _0xcaa5x8a.touches[0].pageY;
    if (_0xcaa5x8a.targetTouches.length < 2 && _0xcaa5x8a.touches[0].clientX > 110) {
        if (Player.list[selfId] && Player.list[selfId].map != 0) {
            startX = _0xcaa5x95;
            startY = _0xcaa5x96;
        }
    }
};
document.ontouchend = function (_0xcaa5x8a) {
    mouseDistance = 0;
};
document.onmousemove = function (_0xcaa5x8a) {
    if (mobileControl || _0xcaa5x8a.clientX < 110 && _0xcaa5x8a.clientY > window.innerHeight - 310) {
        return;
    }
    ;
    if (Player.list[selfId] && Player.list[selfId].map != 0) {
        var _0xcaa5x55 = -canvasWIDTH / 2 + _0xcaa5x8a.clientX;
        var _0xcaa5x56 = -canvasHEIGHT / 2 + _0xcaa5x8a.clientY;
        mouseAngle = Math.atan2(_0xcaa5x56, _0xcaa5x55) / Math.PI * 180;
        mouseDistance = 1;
        if (getDistance(_0xcaa5x55, _0xcaa5x56, 0, 0) < canvasWIDTH * canvasWIDTH / 324) {
            mouseDistance = 1 * (getDistance(_0xcaa5x55, _0xcaa5x56, 0, 0) / (canvasWIDTH * canvasWIDTH / 324));
        } else {
            mouseDistance = 1;
        }
    }
};
var resizeCanvas = function () {
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
    ;
    WIDTH -= canvasWIDTHdiff * (WIDTH / canvasWIDTH);
    HEIGHT -= canvasHEIGHTdiff * (HEIGHT / canvasHEIGHT);
    canvas.style.width = '' + canvasWIDTH + 'px';
    canvas.style.height = '' + canvasHEIGHT + 'px';
    changeCtxFont('22px sans-serif');
    canvasWIDTH -= canvasWIDTHdiff;
    canvasHEIGHT -= canvasHEIGHTdiff;
    if (document.getElementById('chatMessage')) {
        document.getElementById('chatMessage').style.top = canvasHEIGHT / 2 + 80 + 'px';
        document.getElementById('chatMessage').style.left = canvasWIDTH / 2 - 90 + 'px';
    }
};
resizeCanvas();
window.addEventListener('resize', function () {
    resizeCanvas();
});
var changeSkin = function (_0xcaa5x9c) {
    socket.emit('useItem', { number: _0xcaa5x9c });
};
var buySkin = function (_0xcaa5x9c) {
    socket.emit('buySkin', { number: _0xcaa5x9c });
};
function manageHighScore() {
    changeInnerHTML(document.getElementById('coinsText'), Player.list[selfId].coins);
    if (Player.list[selfId].coins == oldCoins) {
        changeInnerHTML(document.getElementById('coinsDisplay'), Player.list[selfId].coins);
    } else {
        changeInnerHTML(document.getElementById('coinsDisplay'), Player.list[selfId].coins + ' (+' + (Player.list[selfId].coins - oldCoins) + ')');
    }
    ;
    changeInnerHTML(document.getElementById('scoreRecordDisplay'), scoreRecord);
    changeInnerHTML(document.getElementById('levelRecordDisplay'), levelRecord);
    changeInnerHTML(document.getElementById('scoreDisplay'), scoreRecordThisGame);
    changeInnerHTML(document.getElementById('levelDisplay'), levelRecordThisGame);
}
var itemNumber;
function manageShop() {
    changeInnerHTML(document.getElementById('coinsText'), Player.list[selfId].coins);
    for (var _0xcaa5x6d = 1; _0xcaa5x6d < itemCode[0].length; _0xcaa5x6d++) {
        document.getElementById('skinButton' + _0xcaa5x6d).style.display = 'none';
        document.getElementById('buySkinButton' + _0xcaa5x6d).style.display = 'inline-block';
        if (itemPrice[_0xcaa5x6d] == 0) {
            document.getElementById('skinButton' + _0xcaa5x6d).style.display = 'inline-block';
            document.getElementById('buySkinButton' + _0xcaa5x6d).style.display = 'none';
        }
    }
    ;
    for (_0xcaa5x6d in Player.list[selfId].items) {
        itemNumber = Player.list[selfId].items[_0xcaa5x6d];
        document.getElementById('skinButton' + itemNumber).style.display = 'inline-block';
        document.getElementById('buySkinButton' + itemNumber).style.display = 'none';
    }
    ;
    for (var _0xcaa5x6d = 1; _0xcaa5x6d <= itemCode[0].length; _0xcaa5x6d++) {
        if (itemCode[0][_0xcaa5x6d] == 1 && itemCode[1][_0xcaa5x6d] == Player.list[selfId].skin) {
            document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButtonSelected';
        } else {
            if (itemCode[0][_0xcaa5x6d] == 1) {
                document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButton';
            }
        }
    }
    ;
    for (var _0xcaa5x6d = 1; _0xcaa5x6d <= itemCode[0].length; _0xcaa5x6d++) {
        if (itemCode[0][_0xcaa5x6d] == 2 && itemCode[1][_0xcaa5x6d] == Player.list[selfId].body) {
            document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButtonSelected';
        } else {
            if (itemCode[0][_0xcaa5x6d] == 2) {
                document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButton';
            }
        }
    }
    ;
    for (var _0xcaa5x6d = 1; _0xcaa5x6d <= itemCode[0].length; _0xcaa5x6d++) {
        if (itemCode[0][_0xcaa5x6d] == 3 && itemCode[1][_0xcaa5x6d] == Player.list[selfId].color) {
            document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButtonSelected';
        } else {
            if (itemCode[0][_0xcaa5x6d] == 3) {
                document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButton';
            }
        }
    }
    ;
    for (var _0xcaa5x6d = 1; _0xcaa5x6d <= itemCode[0].length; _0xcaa5x6d++) {
        if (itemCode[0][_0xcaa5x6d] == 4 && itemCode[1][_0xcaa5x6d] == Player.list[selfId].back) {
            document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButtonSelected';
        } else {
            if (itemCode[0][_0xcaa5x6d] == 4) {
                document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButton';
            }
        }
    }
    ;
    for (var _0xcaa5x6d = 1; _0xcaa5x6d <= itemCode[0].length; _0xcaa5x6d++) {
        if (itemCode[0][_0xcaa5x6d] == 5 && itemCode[1][_0xcaa5x6d] == Player.list[selfId].ride) {
            document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButtonSelected';
        } else {
            if (itemCode[0][_0xcaa5x6d] == 5) {
                document.getElementById('skinButton' + _0xcaa5x6d).className = 'skinButton';
            }
        }
    }
}
var currentSection = 'home';
var gotoSection = function (_0xcaa5xa3) {
    document.getElementById('homeDiv').style.display = 'none';
    document.getElementById('respawnDiv').style.display = 'none';
    document.getElementById('menuDiv').style.display = 'none';
    currentSection = _0xcaa5xa3;
    if (_0xcaa5xa3 == 'respawn') {
        document.getElementById('homeDiv').style.display = 'block';
        document.getElementById('respawnDiv').style.display = 'block';
        document.getElementById('respawnButton').style.display = 'none';
        document.getElementById('respawnLoadingButton').style.display = 'inline-block';
        setTimeout(function () {
            document.getElementById('respawnButton').style.display = 'inline-block';
            document.getElementById('respawnLoadingButton').style.display = 'none';
        }, 1000);
        immediate_refresh(1);
        immediate_refresh(2);
        immediate_refresh(3);
        if (firstLogin == 1) {
            displaySpawnMessage('You\'ll spawn with +' + Player.list[selfId].newScore + ' score!');
            scoreRecordThisGame = 0;
            levelRecordThisGame = 0;
        }
        ;
        document.getElementById('controlContainer').style.display = 'none';
        if (typing == true) {
            changeInnerHTML(document.getElementById('chatContainer'), '');
            typing = false;
        }
    } else {
        if (_0xcaa5xa3 == 'home') {
            document.getElementById('homeDiv').style.display = 'block';
            document.getElementById('menuDiv').style.display = 'block';
            if (Player.list[selfId].email == '') {
                displaySpawnMessage('Login to save Coins, Score and use Shop!');
            }
        } else {
            if (_0xcaa5xa3 == 'game') {
                oldCoins = Player.list[selfId].coins;
                respawnButton.style.display = 'inline-block';
                respawn2Button.style.display = 'inline-block';
                tToggle = true;
                attackStatus = false;
                dashStatus = false;
                Player.list[selfId].map = 1;
                firstLogin = 1;
                finishLoading = 0;
            }
        }
    }
};
function getEllipsis(_0xcaa5x80, _0xcaa5xa5) {
    for (var _0xcaa5x6d = _0xcaa5x80.length; _0xcaa5x6d >= 0; _0xcaa5x6d--) {
        if (ctx.measureText(_0xcaa5x80.substring(0, _0xcaa5x6d)).width < _0xcaa5xa5) {
            if (_0xcaa5x6d < _0xcaa5x80.length) {
                _0xcaa5x80 = _0xcaa5x80.substring(0, _0xcaa5x6d) + '...';
            }
            ;
            return _0xcaa5x80;
        }
    }
}
function correctToSigFig(_0xcaa5x55) {
    var _0xcaa5xa7 = _0xcaa5x55, _0xcaa5xa8 = 0, _0xcaa5xa9 = 3;
    while (_0xcaa5xa7 >= 1) {
        _0xcaa5xa7 /= 10;
        _0xcaa5xa8++;
    }
    ;
    if (_0xcaa5xa8 >= _0xcaa5xa9) {
        _0xcaa5x55 = Math.floor(_0xcaa5x55 / Math.pow(10, _0xcaa5xa8 - _0xcaa5xa9));
        _0xcaa5x55 *= Math.pow(10, _0xcaa5xa8 - _0xcaa5xa9);
    }
    ;
    if (_0xcaa5xa8 > 9) {
        _0xcaa5x55 = _0xcaa5x55 / Math.pow(10, 9) + 'B';
    } else {
        if (_0xcaa5xa8 > 6) {
            _0xcaa5x55 = _0xcaa5x55 / Math.pow(10, 6) + 'M';
        } else {
            if (_0xcaa5xa8 > 3) {
                _0xcaa5x55 = _0xcaa5x55 / Math.pow(10, 3) + 'K';
            }
        }
    }
    ;
    return _0xcaa5x55;
}
if (getCookie('username') !== '') {
    signDivUsername.value = getCookie('username');
}
;
if (getCookie('selectedSkin') !== '') {
    changeSkin(getCookie('selectedSkin'));
}
;
if (getCookie('selectedBody') !== '') {
    changeSkin(getCookie('selectedBody'));
}
;
if (getCookie('levelRecord') !== '') {
    levelRecord = getCookie('levelRecord');
}
;
if (getCookie('scoreRecord') !== '') {
    scoreRecord = getCookie('scoreRecord');
}
;
if (getCookie('email') !== '') {
    signDivEmail.value = getCookie('email');
}
;
function animate() {
    intervalTimer++;
    requestAnimationFrame(animate);
    if (!selfId) {
        return;
    }
    ;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (var _0xcaa5x6d in Player.list) {
        Player.list[_0xcaa5x6d].update();
    }
    ;
    for (var _0xcaa5x6d in NPC.list) {
        NPC.list[_0xcaa5x6d].update();
    }
    ;
    for (var _0xcaa5x6d in Mob.list) {
        Mob.list[_0xcaa5x6d].update();
    }
    ;
    for (var _0xcaa5x6d in Bullet.list) {
        Bullet.list[_0xcaa5x6d].update();
    }
    ;
    if (intervalTimer % (FPS * 60) == 0) {
        if (Player.list[selfId].map == 0) {
            ga('send', 'event', 'Fightz.io', 'menu', 'menu');
        } else {
            ga('send', 'event', 'Fightz.io', 'play', 'play');
        }
    }
    ;
    if (intervalTimer % (FPS * 60) == 0) {
        if (Math.random() < 1) {
            deathTimerLimit = 0;
        } else {
            deathTimerLimit = FPS * 1;
        }
    }
    ;
    if (intervalTimer % FPS == 0) {
        manageMusic();
    }
    ;
    if (intervalTimer % 8 == 1) {
        managePause();
        manageHighScore();
    }
    ;
    if (intervalTimer % 4 == 0 && Player.list[selfId].map == 0) {
        manageShop();
    }
    ;
    if (spawnMessage.innerHTML == 'Reconnected.' && Player.list[selfId].score >= 1000) {
        changeInnerHTML(spawnMessage, 'Server Restarted. You\'ll spawn with +' + Player.list[selfId].score + ' score!');
    }
    ;
    if (Player.list[selfId].map == 0 && finishLoading == 0) {
        adTimer2++;
        if (adTimer2 >= 7 * FPS) {
            adTimer2 = 0;
            if (!isHome) {
                if (currentSection == 'respawn') {
                    immediate_refresh(1);
                    immediate_refresh(2);
                } else {
                    if (currentSection == 'home') {
                        immediate_refresh(3);
                    }
                }
            }
        }
    } else {
        adTimer2 = 0;
    }
    ;
    if (intervalTimer % 4 == 0 && Player.list[selfId].map !== 0) {
        if (Math.abs(angleStatus - mouseAngle) > 1 || Math.abs(distanceStatus - mouseDistance) > 0.1) {
            socket.emit('keyPress', {
                inputId: 'angle',
                state: mouseAngle
            });
            socket.emit('keyPress', {
                inputId: 'mouseDistance',
                state: mouseDistance
            });
            angleStatus = mouseAngle;
            distanceStatus = mouseDistance;
        }
    }
    ;
    drawMap();
    for (var _0xcaa5x6d in Decoration.list) {
        if (Decoration.list[_0xcaa5x6d].isWater) {
            Decoration.list[_0xcaa5x6d].draw();
        }
    }
    ;
    drawLines();
    for (var _0xcaa5x6d in Decoration.list) {
        if (!Decoration.list[_0xcaa5x6d].isWater) {
            Decoration.list[_0xcaa5x6d].draw();
        }
    }
    ;
    for (var _0xcaa5x6d in Food.list) {
        Food.list[_0xcaa5x6d].draw();
    }
    ;
    for (var _0xcaa5x6d in Mob.list) {
        Mob.list[_0xcaa5x6d].draw();
    }
    ;
    for (var _0xcaa5x6d in NPC.list) {
        NPC.list[_0xcaa5x6d].draw();
    }
    ;
    for (var _0xcaa5x6d in Player.list) {
        if (_0xcaa5x6d != selfId && Player.list[_0xcaa5x6d].dash == 0) {
            Player.list[_0xcaa5x6d].draw();
        }
    }
    ;
    if (Player.list[selfId].dash == 0) {
        Player.list[selfId].draw();
    }
    ;
    for (var _0xcaa5x6d in Player.list) {
        if (_0xcaa5x6d != selfId && Player.list[_0xcaa5x6d].dash == 1) {
            Player.list[_0xcaa5x6d].draw();
        }
    }
    ;
    if (Player.list[selfId].dash == 1) {
        Player.list[selfId].draw();
    }
    ;
    for (var _0xcaa5x6d in Bullet.list) {
        Bullet.list[_0xcaa5x6d].draw();
    }
    ;
    for (var _0xcaa5x6d in Player.list) {
        Player.list[_0xcaa5x6d].drawMessage();
    }
    ;
    if (!(Player.list[selfId].score <= scoreRecord)) {
        scoreRecord = Player.list[selfId].score;
        levelRecord = Player.list[selfId].level;
        setCookie('scoreRecord', scoreRecord, 365);
        setCookie('levelRecord', levelRecord, 365);
    }
    ;
    if (!(Player.list[selfId].score <= scoreRecordThisGame)) {
        scoreRecordThisGame = Player.list[selfId].score;
        levelRecordThisGame = Player.list[selfId].level;
    }
    ;
    if (Player.list[selfId].map !== 0) {
        drawLeaderboard();
        document.getElementById('homeDiv').style.display = 'none';
        document.getElementById('controlContainer').style.display = 'block';
    } else {
        if (document.getElementById('homeDiv').style.display == 'none' && deathTimer++ >= deathTimerLimit) {
            deathTimer = 0;
            gotoSection('respawn');
        }
    }
}
animate();
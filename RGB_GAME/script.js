//  contains Data Structure & how the RGB Generate
var change_player_score = (function () {

    // all the DOM name are here including player points & RGB colors container 
    var Data = {

        //these playerPoints, player-1 & player-2 all of their score is stored here
        playerPoints: {
            player_points_1: 0,
            player_points_2: 0
        },

        /*
        these colors array the RGB generator it will push their RGB has been generate, line 120-code
        I create these to get what is the correct RGB using Math random & to apply RGB to each card, Line 101-code 
        after the player change her turn all of the value of these array it will Delete using array
        splice method
        */
        colors: [],

        DOMname: {
            // container & cards DOM name
            wrapper: '.wrapper-',
            color: '.color-',
            score: '.score-',
            guess: '.Guess',
            position: 1,

            // Navigation bar DOM name
            player_1: '.Player_1',
            player_2: '.Player_2',
            score_1: '.MaxScore_1',
            score_2: '.MaxScore_2',
            UIscore_1: '.score-1',
            UIscore_2: '.score-2',

            // modal DOM name
            parent_modal: '.modal_container',
            image: '.img_ex',
            paragraph: '.para',
            border: '.border_width',
            modal_title: '.modal_title',
            modal_btn: '.modal_btn',
            backdrop: '.backdrop',
            exit_btn: '.exit',
            form: '.player_input',
            form_btn: '.form_btn',
            input_Player_1: '.input_1',
            input_Player_2: '.input_2',
            input_Score: '.input_3',
            textNode_modal: 'Players Info',

            // 3 button DOM name
            theme: '.Theme',
            changeScore: '.Change',
            reset_btn: '.Reset'
        },

        /*
        for the Max score
        but it will change the value 
        if the user decide for default Max score or change the Max score
        */
        Score: 0,
    };

    // it will return RGB every each call
    var generateColor = function () {
        var r, g, b, rgb;
        r = Math.floor(Math.random() * 255) + 1;
        g = Math.floor(Math.random() * 255) + 1;
        b = Math.floor(Math.random() * 255) + 1;
        rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        return rgb;
    }

    /*
     RGB Generator & Data structure are private
     so I return it their variable so that the global Scope have a access to the 
     private functions
    */
    return {

        // Data Structure
        getData: function () {
            return Data;
        },

        // RGB Generator
        getRGBcolor: function () {
            return generateColor();
        },

    }
})();

// these function is job to make a website interactive & apply RGB to each card and 1 correct color
var UIController = (function (CPS_Data) {
    // variable CPS_Data = change_player_score

    /* 
    these function it will generate number 0-5
    So that I can use to get random RGB in colors array and
    represent as a correct color
    */
    var CorrectColor = function () {

        var random = Math.floor(Math.random() * 6);

        return random;
    };

    /* 
    these function represent as a Customize loop
    instead I use multiple loop I can use these function as a main loop
    */
    var myForEach = function (arr, callBack) {
        for (var i = 0; i < arr.length; i++) {
            callBack(arr[i], i);
        }
    }


    /* 
    these function is to apply all RGB to each card and push to the Array colors 
    these 3 Parameters
    Data - to get the Dom name example - player-

    numData - it will concantination Data + numdAta,
    it will decide where should work this function example = player-1 it will apply RGB
    to each card after that numData it will change to 2
    numData contain 1 = player-1 it will change to 2 = player-2

    RGB - RGB generator function only, Line 64 - code
    */
    var applyColor = function (Data, numData, RGB) {

        // it will return an nodelist
        var card = document.querySelectorAll(Data + numData);

        // it will generate 6 random RGB color
        myForEach(card, function (current, index) {

            // all the RGB has been generated it will push to the colors array, line 19 - code
            CPS_Data.getData().colors.push(RGB());

            // after the 6 RGB push in the array I will use the array to apply as a backgroundColor to each card
            current.style.backgroundColor = CPS_Data.getData().colors[index];
        });
    }

    // Global Scope have a acces to the private function
    return {

        // applyColor
        getApplyColor: function (Data, numData, RGB) {
            applyColor(Data, numData, RGB);
        },

        /*
        it will return 1 RGB color represent correct Color
        using correct Color it will generate 0-5, line 102 - code
        and apply to
        the colors array index to get the 1 random RGB color
        */
        getCorrectColor: function () {
            return CPS_Data.getData().colors[CorrectColor()];
        },

        // myForEach Customize loop I can use these to others function
        getMyForEach: function (arr, callBack) {
            myForEach(arr, callBack)
        },
    }

    /*
    these change_player_score I can use her private Data structure & RGB generator
    because I return it
    line 2 - code
    */
})(change_player_score);

// these function is to make modal interactive & get the value of input inside the modal
var UIModal = (function (CPS_Data) {
    // variable CPS_Data = change_player_score

    var inDom = CPS_Data.getData().DOMname;

    // parent modal Container & backdrop
    var backdrop = document.querySelector(inDom.backdrop);
    var modal_container = document.querySelector(inDom.parent_modal);

    // div container of exit icon & modal_title
    var border = document.querySelector(inDom.border);

    // exit button icon in the modal
    var exit = document.querySelector(inDom.exit_btn);

    // the first modal contains these
    var modal_title = document.querySelector(inDom.modal_title);
    var modal_paragraph = document.querySelector(inDom.paragraph);
    var img = document.querySelector(inDom.image);

    // the first modal button
    var modal_btn = document.querySelector(inDom.modal_btn);

    // div container of input second modal & second modal button
    var form = document.querySelector(inDom.form);
    var form_btn = document.querySelector(inDom.form_btn);

    // Player name 1,2 & input Player name 1,2
    var player_1 = document.querySelector(inDom.player_1);
    var player_2 = document.querySelector(inDom.player_2);
    var input_Player_1 = document.querySelector(inDom.input_Player_1);
    var input_Player_2 = document.querySelector(inDom.input_Player_2);

    // Max score for player 1,2 & input for the max Score
    var Score_1 = document.querySelector(inDom.score_1);
    var Score_2 = document.querySelector(inDom.score_2);
    var inputScore = document.querySelector(inDom.input_Score);

    // the parent modal & backdrop it will remove to the website
    var removeModal = function () {
        backdrop.style.display = 'none';
        modal_container.style.display = 'none';
    }
    // it will get the max score and apply it to player 1,2 & add to data structure score, line 60 - code
    var getScore = function () {
        Score_1.textContent = inputScore.value;
        Score_2.textContent = inputScore.value;
        CPS_Data.getData().Score = inputScore.value;
    }

    // removeModal() & default input score which is 20
    var exit_btn = function () {
        exit.addEventListener('click', function () {
            removeModal();
            getScore();
        });
    }

    // if it's true it will execute second modal & second modal button event click
    modal_btn.addEventListener('click', function () {
        modal_title.style.display = 'none';

        modal_paragraph.style.display = 'none';

        img.style.display = "none";

        var heading = document.createElement('h1');

        var headingText = document.createTextNode(inDom.textNode_modal);

        heading.appendChild(headingText);

        border.appendChild(heading);

        this.style.display = 'none';

        form.style.display = 'block';

        // if it's true it will get the player name
        form_btn.addEventListener('click', function () {
            if (input_Player_1.value && input_Player_2.value) {
                player_1.textContent = input_Player_1.value;
                player_2.textContent = input_Player_2.value;
            } else if (input_Player_1.value || input_Player_2.value) {
                player_1.textContent = input_Player_1.value;
                player_2.textContent = input_Player_2.value;
            }

            getScore();
            removeModal();
        });
    });

    // if the user click exit icon it will get default Max score & player name 1,2
    exit_btn();

    /*
    these change_player_score I can use her private Data structure 
    because I return it
    line 2 - code
    */
})(change_player_score);

// these function is job, if the user click it will happen something
var controller = (function (UICrtl, CPS_Data) {
    // UI Crtl = UIController
    // CPS_Data = change_player_score

    var myDom = CPS_Data.getData();

    var inDom = CPS_Data.getData().DOMname;

    // it will be true these if the game have a winner
    var reset = document.querySelector(inDom.reset_btn)
    reset.disabled = true;

    //these function is to display the current score 
    var upDateDom = function () {
        document.querySelector(inDom.UIscore_1).textContent = myDom.playerPoints.player_points_1;
        document.querySelector(inDom.UIscore_2).textContent = myDom.playerPoints.player_points_2;
    }

    // these function is to make dark theme & white theme working
    var myTheme = function () {
        var isWhite = false;
        document.querySelector(inDom.theme).addEventListener('click', function () {
            if (isWhite) {
                document.querySelector('body').style.backgroundColor = '#f1f1f1';
                isWhite = false;
                this.textContent = 'Dark Theme';
            } else {
                document.querySelector('body').style.backgroundColor = '#202020';
                isWhite = true;
                this.textContent = 'White Theme';
            }
        });
    }

    /*
    these event click for Change Score button
    it will change the max score for each player but the button it will
    disable itself if the game has been started 
    */
    document.querySelector(inDom.changeScore).addEventListener('click', function () {

        var getNewScore = prompt('Changing score');

        document.querySelector(inDom.score_1).textContent = getNewScore;

        document.querySelector(inDom.score_2).textContent = getNewScore;

        myDom.Score = getNewScore;
    })


    /*
    these function is to Identify what the user clicked
    have 3 Parameters
    DataContainer - wrapper-
    Data - color-
    numdAta - for the current player, 1 = first player, 2 = second player
    default player = wrapper-1, color-1,
    */
    var cardClick = function (DataContainer, Data, numData) {
        /* 
        these card_container is to determine 
        which player should use event delegation
        */
        var card_container = document.querySelector(DataContainer + numData);

        // it will return the current player card
        var card = document.querySelectorAll(Data + numData);

        // it will display the hint RGB should they guess
        var getColor = UICrtl.getCorrectColor();
        var RGBhint = document.querySelector(inDom.guess);
        RGBhint.textContent = getColor;

        var deleteColorData = myDom.colors;

        // it will count how many card are not match to the hint RGB each card not match = -3
        var count = 0;

        //Event delegation for the current player
        card_container.addEventListener('click', function (e) {

            if (e.target.style.backgroundColor === getColor) {
                //after the user guessed the hint RGB

                // the value of colors array it will delete
                deleteColorData.splice(0, deleteColorData.length);

                // the correct card it will hidden
                UICrtl.getMyForEach(card, function (current, index) {
                    current.style.visibility = 'hidden';
                })

                // the current player her score in the Data Structure it will add 10 points
                myDom.playerPoints['player_points_' + inDom.position] += 10;

                // it will not work these if they click the correct color first
                // the current player her score in the Data Structuer will minus to the count
                myDom.playerPoints['player_points_' + inDom.position] += count;

                // after that it will update the display score
                upDateDom();

                // for animation
                setTimeout(function () {
                    UICrtl.getMyForEach(card, function (current, index) {
                        current.style.visibility = 'visible';
                        current.style.backgroundColor = 'peru';
                    });
                }, 600);

                // if it's true Change Score button disabled
                if (myDom.playerPoints['player_points_' + inDom.position] > 0 || myDom.playerPoints['player_points_' + inDom.position] < 0) {
                    document.querySelector(inDom.changeScore).disabled = true;
                }

                //if it's true the turn of a player it will change
                //if it's false the apply color function it will not work and the reset button disabled will be true
                if (myDom.playerPoints['player_points_' + inDom.position] < parseInt(myDom.Score)) {

                    //these one is to change the turn of a player
                    inDom.position === 1 ? inDom.position = 2 : inDom.position = 1;

                    // So the turn is change it will apply color function to that current player
                    UICrtl.getApplyColor(inDom.color, inDom.position, CPS_Data.getRGBcolor);

                    // So the turn is change it will apply the card click function to that current player
                    cardClick(inDom.wrapper, inDom.color, inDom.position);
                } else {

                    // YOU WIN animation
                    var letter = document.querySelectorAll('.letter_' + inDom.position);

                    UICrtl.getMyForEach(letter, function (current, index) {
                        current.style.display = 'block';
                    })

                    RGBhint.textContent = 'We have a Winner'

                    // reset button
                    reset.disabled = false;

                    // if it's true the website it will reload
                    reset.addEventListener('click', function () {
                        location.reload();
                    });
                }
            } else if (e.target.matches(Data + numData) && e.target.style.backgroundColor !== 'peru') {
                count -= 3;
                e.target.style.visibility = 'hidden';
            }
            /* 
            it will hidden the card are not match to the Hint RGB
            only if he clicked & it will count -3
            */
        });
    }

    return {
        /*
        these function it will execute all the modules 
        in the Global Scope
        */
        init: function () {

            //default player score from the Data structure, Line 8 - code
            upDateDom();

            // dark theme & white theme button function
            myTheme();

            //it will execute these function for default player =  color-1
            UICrtl.getApplyColor(inDom.color, inDom.position, CPS_Data.getRGBcolor);

            //it will execute these function for default player container for event delegation =  wrapper-1
            cardClick(inDom.wrapper, inDom.color, inDom.position);
        },
    }
    /*
   these UIController I can user her private functions becaused I return it, Line 94 - code

   these change_player_score I can use her private Data structure & RGB generator
   because I return it
   line 2 - code
   */
})(UIController, change_player_score);

// has been executed in the Global Scope
controller.init();
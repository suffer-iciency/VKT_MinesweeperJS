import * as minesweeperEventHandler from './minesweeperEventHandler.js';
export const DEFAULT_TILE_IMAGE_DIRECTORY = 'images/tiles';
export const DEFAULT_MENU_IMAGE_DIRECTORY = 'images/menu';


// The value is also the tile filename
export const TileState =
    {
        'COVERED': 'covered',
        'FLAGGED': 'flagged',
        'QUESTION_MARK': 'question_mark',
        'PRESSED_QUESTION_MARK': 'pressed_question_mark',
        'MINE': 'mine',
        'HIT_MINE': 'hitmine',
        'WRONG_MINE': 'wrongmine',
        'BLANK': 'blank',
        'NUMBER1': 'number1',
        'NUMBER2': 'number2',
        'NUMBER3': 'number3',
        'NUMBER4': 'number4',
        'NUMBER5': 'number5',
        'NUMBER6': 'number6',
        'NUMBER7': 'number7',
        'NUMBER8': 'number8'
    };

export const MenuState =
    {
        'WIN_FACE': 'win_face',
        'LOSE_FACE': 'lose_face',
        'SMILE': 'smile',
        'SMILE_PRESSED': 'smile_pressed',
        'TILE_PRESSED': 'tile_pressed',
        'MENU_NUMBER0': 'menu_number0',
        'MENU_NUMBER1': 'menu_number1',
        'MENU_NUMBER2': 'menu_number2',
        'MENU_NUMBER3': 'menu_number3',
        'MENU_NUMBER4': 'menu_number4',
        'MENU_NUMBER5': 'menu_number5',
        'MENU_NUMBER6': 'menu_number6',
        'MENU_NUMBER7': 'menu_number7',
        'MENU_NUMBER8': 'menu_number8',
        'MENU_NUMBER9': 'menu_number9'
    }

    export const MenuNumbers = {
    "0": "images/menu/menu_number0.png",
    "1": "images/menu/menu_number1.png",
    "2": "images/menu/menu_number2.png",
    "3": "images/menu/menu_number3.png",
    "4": "images/menu/menu_number4.png",
    "5": "images/menu/menu_number5.png",
    "6": "images/menu/menu_number6.png",
    "7": "images/menu/menu_number7.png",
    "8": "images/menu/menu_number8.png",
    "9": "images/menu/menu_number9.png"
}

export const Direction =
    {
        'TOP': 'top',
        'TOP_RIGHT': 'topright',
        'RIGHT': 'right',
        'BOTTOM_RIGHT': 'bottomright',
        'BOTTOM': 'bottom',
        'BOTTOM_LEFT': 'bottomleft',
        'LEFT': 'left',
        'TOP_LEFT': 'topleft',
        'CENTER': 'center'
    };

export const DifficultySettings =
    {
        default: {
            width: 10,
            height: 10,
            mineCount: 40
        },
        beginner:
            {
                width: 8,
                height: 8,
                mineCount: 10
            },
        intermediate:
            {
                width: 16,
                height: 16,
                mineCount: 40
            },
        expert:
            {
                width: 30,
                height: 16,
                mineCount: 99
            }
    };

export const Ids =
    {
        setupScreen:
            {
                id: 'setupScreenId',
                widthTextbox: 'widthTextboxId',
                heightTextbox: 'heightTextboxId',
                mineCountTextbox: 'mineCountTextboxId',
                beginnerRadio: 'beginnerRadioId',
                intermediateRadio: 'intermediateRadioId',
                expertRadio: 'expertRadioId',
                customRadio: 'customRadioId',
                defaultRadio: 'defaultRadioId',
                startButton: 'startButtonId'
            },
        gameScreen:
            {
                id: 'gameScreenId',
                statusBar:
                    {
                        resetButton: 'resetButtonId',
                        infoLabel: 'infoLabelId',
                        minesRemainingLabel: 'minesRemainingLabelId',
                        timerLabel: 'timerLabelId'
                    },
                mineField: 'mineFieldId'
            }
    };

let mineField =
    {
        width: 1,
        height: 1,
        mineCount: 1,
        firstClick: false,
        gameOver: false,
        startTime: null,
        grid: []
    };

setup(mineField);



/**
 * Setup.
 *
 * @param mineField Contains mine field data
 */
function setup(mineField) {
    // Setup the event listeners
    minesweeperEventHandler.setupMouseEventListeners();

    minesweeperEventHandler.setupKeyboardEventListeners();

    minesweeperEventHandler.setupUIEventListeners(mineField);

    // Setup to update timer
    function menuTimer() {
        let timeDifferenceInSeconds = Math.floor((new Date() - mineField.startTime) / 1000);
        let timerSeconds = Math.floor(timeDifferenceInSeconds % 999.1);
        timerSeconds = timerSeconds.toString().padStart(3, '0');
        timerSeconds = timerSeconds.split('').map((item) => {
            return "<img src='" + MenuNumbers[item] + "'>"
        }).join('');
        document.getElementById(Ids.gameScreen.statusBar.timerLabel).innerHTML = `${timerSeconds}`;
    }

let interval = setInterval(function () {
    if (mineField.startTime != null && !mineField.gameOver) {
        menuTimer()
    }
}, 1000)

}


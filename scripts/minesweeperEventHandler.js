import * as minesweeperUtilities from '../util/minesweeperUtilities.js';
import {isGridCleared} from "../util/minesweeperUtilities.js";

import {
    DEFAULT_MENU_IMAGE_DIRECTORY,
    MenuState,
    DifficultySettings,
    Ids,
} from './main.js';


/**
 * Prevent non-numerical event response.
 *
 * @param event Event
 */
function preventNonNumericalResponse(event) {
    // Between 0 and 9
    if (event.which < 48 || event.which > 57) {
        event.preventDefault();
    }
}

/**
 * Setup mouse event listeners.
 */
export function setupMouseEventListeners() {
    // Prevent auto-scrolling when middle clicked
    document.body.onmousedown = function (event) {
        if (event.button === 1) {
            return false;
        }
    }
}

/**
 * Setup keyboard event listeners.
 */
export function setupKeyboardEventListeners() {
    // Prevent Ctrl + W from closing the window/tab
    window.onbeforeunload = function (event) {
        event.preventDefault();
    };

    // Prevent non-numerical inputs for inputs
    document.getElementById(Ids.setupScreen.widthTextbox).addEventListener('keypress', preventNonNumericalResponse, false);
    document.getElementById(Ids.setupScreen.heightTextbox).addEventListener('keypress', preventNonNumericalResponse, false);
    document.getElementById(Ids.setupScreen.mineCountTextbox).addEventListener('keypress', preventNonNumericalResponse, false);
}

/**
 * Setup UI event listeners.
 *
 * @param mineField Contains mine field data
 */
export function setupUIEventListeners(mineField) {
    // Default to Expert Difficulty
    document.getElementById(Ids.setupScreen.defaultRadio).checked = true;
    switchDifficulty(DifficultySettings.default);

    document.getElementById(Ids.setupScreen.beginnerRadio).addEventListener('change',
        function () {
            switchDifficulty(DifficultySettings.beginner);
        });

    document.getElementById(Ids.setupScreen.intermediateRadio).addEventListener('change',
        function () {
            switchDifficulty(DifficultySettings.intermediate);
        });

    document.getElementById(Ids.setupScreen.expertRadio).addEventListener('change',
        function () {
            switchDifficulty(DifficultySettings.expert);
        });
    document.getElementById(Ids.setupScreen.defaultRadio).addEventListener('change',
        function () {
            switchDifficulty(DifficultySettings.default);
        });

    document.getElementById(Ids.setupScreen.customRadio).addEventListener('change',
        function () {
            switchDifficulty(null);
        });

    document.getElementById(Ids.setupScreen.startButton).addEventListener('click',
        function () {
            let width = document.getElementById(Ids.setupScreen.widthTextbox).valueAsNumber;
            let height = document.getElementById(Ids.setupScreen.heightTextbox).valueAsNumber;
            let mineCount = document.getElementById(Ids.setupScreen.mineCountTextbox).valueAsNumber;

            // Check that the mineCount is within the range of the width/height of the mine field
            let maximumMineCount = width * height - 9;
            if (mineCount > maximumMineCount) {
                alert('Mine count is too high. Mine count should be less than or equal to ' + maximumMineCount);
                return;
            }

            let difficultySelected = document.querySelector('input[name="difficulty"]:checked').value;


            document.getElementById(Ids.setupScreen.id).hidden = true;
            document.getElementById(Ids.gameScreen.id).hidden = false;

            minesweeperUtilities.setMineField(mineField, width, height, mineCount);
            minesweeperUtilities.resetAndDrawMineField(mineField);
        });

    // Reset button state listener
    document.getElementById(Ids.gameScreen.statusBar.resetButton).addEventListener('mousedown',
        function () {
            document.getElementById(Ids.gameScreen.statusBar.resetButton).innerHTML =
            `<img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.SMILE_PRESSED}.png" width="40" height="40">`
        });

    document.getElementById(Ids.gameScreen.statusBar.resetButton).addEventListener('mouseup',
        function () {
            document.getElementById(Ids.gameScreen.statusBar.resetButton).innerHTML =
            `<img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.SMILE}.png" width="40" height="40">`;

            // Reset and redraw game field on mouseup reset button
            let width = document.getElementById(Ids.setupScreen.widthTextbox).valueAsNumber;
            let height = document.getElementById(Ids.setupScreen.heightTextbox).valueAsNumber;
            let mineCount = document.getElementById(Ids.setupScreen.mineCountTextbox).valueAsNumber;
            document.getElementById(Ids.gameScreen.statusBar.timerLabel).innerHTML = `
                    <img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.MENU_NUMBER0}.png">
                    <img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.MENU_NUMBER0}.png">
                    <img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.MENU_NUMBER0}.png">`;

            minesweeperUtilities.setMineField(mineField, width, height, mineCount);
            minesweeperUtilities.resetAndDrawMineField(mineField);
        });

    // Game field state event listeners
    // Setup scared face on reset button when game field tiles are pressed
    document.getElementById(Ids.gameScreen.mineField).addEventListener('mousedown',
        function (e) {
            switch (e.button) {
                case 0:
                    if (!isGridCleared(mineField) && !mineField.gameOver) {
                        document.getElementById(Ids.gameScreen.statusBar.resetButton).innerHTML =
                        `<img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.TILE_PRESSED}.png" width="40" height="40">`;
                    }
                    break;
                default:
                    break;
            }
        });

    // Setup smile face on reset button on game field mouseup
    document.getElementById(Ids.gameScreen.mineField).addEventListener('mouseup',
        function (e) {
            switch (e.button) {
                case 0:
                    if (!mineField.gameOver && !isGridCleared(mineField)) {
                        document.getElementById(Ids.gameScreen.statusBar.resetButton).innerHTML =
                        `<img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.SMILE}.png" width="40" height="40">`;
                    }
                    break;
                default:
                    break;
            }
        });

    // Setup final click on game field, sets game state to win or lose
    document.getElementById(Ids.gameScreen.mineField).addEventListener('click',
        function () {
            if (isGridCleared(mineField)) {
                document.getElementById(Ids.gameScreen.statusBar.resetButton).innerHTML =
                `<img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.WIN_FACE}.png" width="40" height="40">`;
            }
            else if (mineField.gameOver) {
                document.getElementById(Ids.gameScreen.statusBar.resetButton).innerHTML =
                `<img src="${DEFAULT_MENU_IMAGE_DIRECTORY}/${MenuState.LOSE_FACE}.png" width="40" height="40">`;
            }
        });

}

/**
 * Update the Setup Screen UI elements based on the difficulty.
 *
 * @param difficultySetting DifficultySettings enum
 */
function switchDifficulty(difficultySetting) {

    if  (JSON.stringify(difficultySetting) === JSON.stringify(DifficultySettings.beginner)
        || JSON.stringify(difficultySetting) === JSON.stringify(DifficultySettings.intermediate)
        || JSON.stringify(difficultySetting) === JSON.stringify(DifficultySettings.expert)
        || JSON.stringify(difficultySetting) === JSON.stringify(DifficultySettings.default)
    ) {
        document.getElementById(Ids.setupScreen.widthTextbox).valueAsNumber = difficultySetting.width;
        document.getElementById(Ids.setupScreen.heightTextbox).valueAsNumber = difficultySetting.height;
        document.getElementById(Ids.setupScreen.mineCountTextbox).valueAsNumber = difficultySetting.mineCount;
        document.getElementById(Ids.setupScreen.widthTextbox).disabled = true;
        document.getElementById(Ids.setupScreen.heightTextbox).disabled = true;
        document.getElementById(Ids.setupScreen.mineCountTextbox).disabled = true;
    } else {
        document.getElementById(Ids.setupScreen.widthTextbox).disabled = false;
        document.getElementById(Ids.setupScreen.heightTextbox).disabled = false;
        document.getElementById(Ids.setupScreen.mineCountTextbox).disabled = false;
    }
}

#!/usr/bin/env node

// Custom Command Line Interface Quiz Game

// 1. "npm init -y" will add a package.json
// 2. "type": "module" will tell node.js we want to use ESM modules allowing us to use import/export syntax instead of the require function
// 3. "npm i chalk chalk-animation figlet gradient-string inquirer nanospinner"

// 4. In the js file, add a shebang #! on top (#!/usr/bin/env node)
//    Always add these when writing command line script for somebody else to use. 
//    It tells the operating system to execute the code with node.js version installed on the user's local system.
// 5. Then we import our node dependencies

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

///// Chalk (alternative for color.js) 
console.clear();
console.log(chalk.bgGreen(" Hi player! "));

///// Chalk Animation: rainbow, pulse, glitch, radar, neon, karaoke
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(" Hey What is up? \n ");
    await sleep();
    rainbowTitle.stop();

    console.log(`${chalk.bgBlue(" How to play ")}
    I am a process on your computer. There is 5 questions in this quiz.
    If you get any question wrong I will be ${chalk.bgRed(" killed ")}
    So get all the questions right...
    `);
}

///// Inquirer (collects user's input)
async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",   // input
        message: "What is your name?",
        default() {
            return "Player";
        }
    });

    playerName = answers.player_name;
}

///// Inquirer (creation of multiple choice quiz questions)
async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: "list",   // list
        message: "Which tool was used as a weapon by the Norse God Thor? \n",
        choices: [
            'Pliers',
            'Hammer',
            'Screwdriver',
            'Saw'
        ]
    });

    return handleAnswer(answers.question_1 == 'Hammer');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: "question_2",
        type: "list",   // list
        message: "What is the capital of Canada? \n",
        choices: [
            'Vancouver',
            'Montreal',
            'Toronto',
            'Ottawa'
        ]
    });

    return handleAnswer(answers.question_2 == 'Ottawa');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: "question_3",
        type: "list",   // list
        message: "What is the highest title for a chess player? \n",
        choices: [
            'Grandmaster',
            'Top Player',
            'Chess King',
            'Champion Chess Player'
        ]
    });

    return handleAnswer(answers.question_3 == 'Grandmaster');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: "question_4",
        type: "list",   // list
        message: "The Earth is approximately how many kilometers away from the Sun? \n",
        choices: [
            '10 million km',
            '150 million km',
            '450 million km',
            '950 million km'
        ]
    });

    return handleAnswer(answers.question_4 == '150 million km');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: "question_5",
        type: "list",   // list
        message: "In maths, what is the simplest form of 1.5 : 2.5 ? \n",
        choices: [
            '6 : 10',
            '15 : 25',
            '0.75 : 1.25',
            '3 : 5'
        ]
    });

    return handleAnswer(answers.question_5 == '3 : 5');
}

///// Nano-spinner (loading spinner)
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect) {
        spinner.success({ text: `Nice work ${playerName}.`});
    } else {
        spinner.error({ text:`Game over, you lose ${playerName}!`});
        process.exit(1); // 0: success, 1: errors & kills the script
    }
}

///// Figlet (generating ascii art from text) & Gradient
function winner() {
    console.clear();
    const msg = `\n Congrats, ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

    figlet (msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

///// Top level Awaits (requires node 14+)
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();

// Building his own CLI tool can be very useful for productivity

// To share with the world via npx: 
// 1. Add "bin": "./app.js" in your package.json
// 2. run npm login
// 3. run npm publish
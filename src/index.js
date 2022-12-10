import readline from 'readline';
import getCommand from './commands/index.js';
import { homedir } from 'os';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.chdir(homedir());

rl.on("SIGINT", () => endProcess());

greetUser();

prompt(currentWorkingDirectoryMessage());

function prompt (message) {
    rl.question(message, async input => {
        const command = input.toString().trim();
    
        if(command === ".exit") endProcess();

        try {
            await execute(input);
        } catch (e) {
            console.error(e.message);
        }

        prompt(currentWorkingDirectoryMessage())
    })
}

function currentWorkingDirectoryMessage () {
   return `You are currently in ${ process.cwd() }\n`; 
};

function getGoodbyeMessage () {
    const userName = getUserNameFromArgs();
    return `\nThank you for using File Manager, ${ userName }, goodbye!`;
}

function getHelloMessage () {
    const userName = getUserNameFromArgs();
    return `\nWelcome to the File Manager, ${ userName }!\n`;
}

function getUserNameFromArgs () {
    let usernameKeyValue = process.argv?.slice(2).filter(str => str.startsWith('--username'))[0];
    let userName = usernameKeyValue?.split('=')[1] ?? 'User';

    return userName;
};

function greetUser () {
    console.log(getHelloMessage());
}

function endProcess () {
    console.log(getGoodbyeMessage());
    process.exit();
}

async function execute (input) {
    const args = input.split(' ');
    
    const commandName = args.shift();

    const command = getCommand(commandName);

    await command(args);
} 
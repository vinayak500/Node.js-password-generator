#!/usr/bin/env node

// console.log(process.argv);
const program = require('commander');
// Chalk 5 is ESM. If you want to use Chalk with TypeScript or a build tool, 
//you will probably want to use Chalk 4 for now
// npm i chalk@4.1.2
const chalk = require('chalk');
//last version npm i clipboardy@2.3.0
const clipboardy = require('clipboardy');
// import clipboardy from 'clipboardy'
const log = console.log ;
const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');

//node index.js -h can be used 
program.version('1.0.0').description('Simple Password generator')


//by default length=8
//by default save is false (boolean value) 
//when you do --save it becomes true
//by default numbers is true
//by writing no infront it keeps it true by default
program
.option('-l,--length <number>', 'length of password' , '8')
.option('-s,--save' , 'save password to password.txt')
.option('-nn,--no-numbers' , 'remove numbers')
.option('-ns,--no-symbols' , 'remove symbols')
.parse()

//console.log(program.opts())
const {length , save , numbers , symbols } = program.opts();

//get generated password
const generatedPassword = createPassword(length , numbers , symbols);


//save password
if(save){
    savePassword(generatedPassword);
}

//copy to clipboard
clipboardy.writeSync(generatedPassword);

//output generated passowrd
log(chalk.blue('Generated Password = ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to cipboard'));
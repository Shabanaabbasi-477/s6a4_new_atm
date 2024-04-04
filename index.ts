#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance =10000;
let myPin =1234;

console.log(chalk.blueBright.bold.underline("\n \t <<<<<<<<<<  Well Come To Atm Machine >>>>>>>>>>> \n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message:chalk.cyanBright.italic("Enter your pin code:"),
    }
])
if (pinAnswer.pin === myPin){
    console.log(chalk.magentaBright.italic("your pin is correct, login successfully!"));

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.cyanBright.italic("Select an operation:"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ])
    if(operationAns.operation === "Withdraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.magentaBright.italic("Select A Withdraw Method :"),
                choices: ["Fast Cash" , "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
             let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.cyanBright.italic("Select Amount"),
                    choices:[1000 , 2000 ,5000 ,10000 , 20000] 
                }
             ])
             if(fastCashAns.fastCash > myBalance){
                console.log(chalk.redBright.italic("Insufficient Balance"));

             } 
             else{
                myBalance -= fastCashAns.fastCash
                console.log(chalk.cyanBright.italic(`${fastCashAns} Withdraw Successfully`));
                console.log(chalk.magentaBright.italic(`Your Remaining Balance Is: ${myBalance}`));
             }  
            } 
            else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                  name: "amount",
                  type: "number",
                  message: chalk.cyanBright.italic("Enter the amount to withdraw:")
                }
            ])
            if(amountAns.amount > myBalance){
            console.log(chalk.redBright.italic("Insufficient balance"));
            }
            else{
                myBalance -= amountAns.amount;
                console.log(chalk.magentaBright.italic(`${amountAns} Withdraw Succesfully`));
                console.log(chalk.cyanBright.italic(`Your remaining balance is: ${myBalance}`));
            }
        }
        
    }
    else if(operationAns.operation === "Check Balance"){
        console.log(chalk.magentaBright.italic(`Your account balance is : ${myBalance}`));
    }
}
else{
     console.log(chalk.redBright.italic("Pin is incorrect, Try again"));
}
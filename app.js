const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Blank array to be populated with answers from prompts
const memberObj = [];


//Initial Question to select position of team member being added
const memberSelect = [{
    type: "list",
    name: "position",
    message: "Select the type of employee to add to your team:",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "All done"
    ]
}];


//Questions for new team member based on selectecd position
const managerSetup = [{
        type: "input",
        name: "name",
        message: "Manager\'s name:"
    },
    {
        type: "input",
        name: "id",
        message: "Manager\'s ID number:",
    },
    {
        type: "input",
        name: "email",
        message: "Manager\'s email address:"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Manager\'s office number:"
    }
];

const engineerSetup = [{
        type: "input",
        name: "name",
        message: "Engineer\'s name:"
    },
    {
        type: "input",
        name: "id",
        message: "Engineer\'s ID number:",
    },
    {
        type: "input",
        name: "email",
        message: "Engineer\'s email address:"
    },
    {
        type: "input",
        name: "github",
        message: "Engineer\'s GitHub username:"
    }
];

const internSetup = [{
        type: "input",
        name: "name",
        message: "Intern\'s name:"
    },
    {
        type: "input",
        name: "id",
        message: "Intern\'s ID number:",
    },
    {
        type: "input",
        name: "email",
        message: "Intern\'s email address:"
    },
    {
        type: "input",
        name: "school",
        message: "Intern\'s school:"
    }
];


// Function with switch case triggering appropriate function to write card based off of employee's position
function newMember() {
    inquirer.prompt(memberSelect).then(answers => {
        switch (answers.position) {
            case "Manager":
                newManager();
                break;
            case "Engineer":
                newEngineer();
                break;
            case "Intern":
                newIntern();
                break;
            case "All done":
                console.log("You team is ready!");
                break;
            default:
                newMember();
        }
    })
};


//  Functions based on position passing answers through 'render' and writing to team.html
function newManager() {
    inquirer.prompt(managerSetup).then(answers => {
        const manager = new Manager (
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber);
        memberObj.push(manager);
        writeToFile();
        newMember();
    })
};

function newEngineer() {
    inquirer.prompt(engineerSetup).then(answers => {
        const engineer = new Engineer (
            answers.name,
            answers.id,
            answers.email,
            answers.github);
        memberObj.push(engineer);
        writeToFile();
        newMember();
    })
};

function newIntern() {
    inquirer.prompt(internSetup).then(answers => {
        const intern = new Intern (
            answers.name,
            answers.id,
            answers.email,
            answers.school);
        memberObj.push(intern);
        writeToFile();
        newMember();
    })
};

//Function that writes to team.html
function writeToFile() {
    fs.writeFile(outputPath, render(memberObj), (err) => {
        if (err)
    console.log(err);
    })
};

// Begin program
newMember();
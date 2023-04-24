// Import dependencies
const inquirer = require('inquirer');
const captcha = require('svg-captcha');
const fs = require('fs');

// function to initialize app
function init() {
  // Prompt for user input
  inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text for your logo:',
    },
    {
      type: 'list',
      name: 'color',
      message: 'Select a color for your logo:',
      choices: ['red', 'green', 'blue', 'yellow'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for your logo:',
      choices: ['circle', 'square', 'triangle'],
    },
  ])
    .then(answers => {
      // Generate SVG captcha image
      if (typeof answers.text !== 'undefined') {
        const captchaOptions = {
          size: 4,
          ignoreChars: '0o1iIl5s8B',
          noise: 3,
          color: true,
          background: '#ffffff',
          width: 200,
          height: 100,
        };
        const captchaData = captcha.create(answers.text, captchaOptions).data;
        const captchaSvg = captchaData.toString();

        // Save SVG to a file
        const fileName = `${answers.text}_${answers.color}_${answers.shape}.svg`;
        fs.writeFileSync(fileName, captchaSvg);
        console.log(`Logo generated and saved as ${fileName}`);
      } else {
        console.error('Error: Text input is missing or undefined');
      }
    })
    .catch(error => console.error(error));
}

// call init function to initialize app
init();

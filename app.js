// set of all characters to be used in a password. Separated in distinct arrays letters, numbers & symbols
const characterSet = {
  letters: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  symbols: [
    '~',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '-',
    '+',
    '=',
    '{',
    '[',
    '}',
    ']',
    ',',
    '|',
    ':',
    ';',
    '<',
    '>',
    '.',
    '?',
    '/',
  ],
}

// querying html elements
const passwordEl = document.getElementById('password-display') //element that displays the password
const lengthRange = document.getElementById('length-range') // range input for password length
const lengthDisplay = document.getElementById('length-display') // element to display password length
const numberCheckbox = document.getElementById('number-check') // checkbox to include numbers in the password
const symbolCheckbox = document.getElementById('symbol-check') // checkbox to include symbols in the password
const regeneratePassBtn = document.getElementById('regenerate-pass-btn') // button to regenerate password
const copyPassBtn = document.getElementById('copy-pass-btn') // button to copy password to clipboard

let password = '' // this will hold the generated password

// password generation parameters
let length = parseInt(lengthRange.value) //grabbing the initial length value from range input
let includeNumbers = false
let includeSymbols = false

/* 
when clicked, this button generates the password again,
using the selected parameters
*/
regeneratePassBtn.onclick = generatePassword

// when clicked, this button copies the current generated password to the clipboard
copyPassBtn.onclick = async () => {
  await navigator.clipboard.writeText(password)
}

// setting the length display element to initial password length
lengthDisplay.textContent = length

/* 
every time any option changes its value (length, numbers, symbols)
the program regenerates the password with updated options
*/
lengthRange.oninput = (event) => {
  length = parseInt(event.target.value)
  lengthDisplay.textContent = length
  generatePassword()
}

numberCheckbox.onchange = (event) => {
  includeNumbers = event.target.checked
  generatePassword()
}

symbolCheckbox.onchange = (event) => {
  includeSymbols = event.target.checked
  generatePassword()
}

//the password generation function
function generatePassword() {
  //reset current password before generating a new one
  resetPassword()

  //this array will contain letters, numbers and symbols based on selected options
  let characterPool = [characterSet.letters]

  // if user has checked the numbers checkbox, include numbers array in the character pool
  if (includeNumbers) {
    characterPool.push(characterSet.numbers)
  }

  // if user has checked the symbols checkbox, include symbols array in the character pool
  if (includeSymbols) {
    characterPool.push(characterSet.symbols)
  }

  // program loops *length* number of times to generate a password of specified length
  for (let i = 0; i < length; i++) {
    /*
      on every iteration, the program will randomly decide if the next character
      in the password will be a letter, number or a symbol.
      (depending on if the user has checked those checkboxes)
      */
    let nextCharacterSet = sample(characterPool)

    //a random character is selected from above array & appended to the password
    password += sample(nextCharacterSet)

    /*
      both of the above random selections combined result in a
      truly randomised password!
      */
  }

  // updating the password html element
  passwordEl.textContent = password
}

//reset password and clear html element text
function resetPassword() {
  password = ''
  passwordEl.textContent = ''
}

// this function gets a random sample from the given array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// generate a new password as soon as the page is loaded!
generatePassword()

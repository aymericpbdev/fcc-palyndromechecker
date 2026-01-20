const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const resultDisplay = document.getElementById('result');

function cleanString(text) {
    const lowercaseText = text.toLowerCase();
    /*
        PROTECTION: Simple regex pattern
        The regex /[^a-z0-9]/g is intentionally simple to avoid ReDoS attacks.
        Complex patterns with nested quantifiers (e.g., /(a+)+$/) can cause exponential processing time with crafted inputs.
    */
    const alphanumericOnly = lowercaseText.replace(/[^a-z0-9]/g, '');
    return alphanumericOnly;
}

function reverseString(text) {
    const charactersArray = text.split('');
    const reversedArray = charactersArray.reverse();
    const reversedText = reversedArray.join('');
    return reversedText;
}

function isPalindrome(text) {
    const cleanedText = cleanString(text);
    const reversedText = reverseString(cleanedText);
    return cleanedText === reversedText;
}

function clearPreviousResult() {
    resultDisplay.classList.remove(
        'palindrome-checker__result--success',
        'palindrome-checker__result--failure'
    );
}

/*
    PROTECTION: Using textContent instead of innerHTML
    textContent treats everything as plain text, preventing XSS attacks.
    If we used innerHTML, an input like "<script>alert('hacked')</script>" could execute malicious code in the user's browser.
*/
function displayPalindromeResult(originalText) {
    resultDisplay.textContent = `${originalText} is a palindrome`;
    resultDisplay.classList.add('palindrome-checker__result--success');
}

function displayNotPalindromeResult(originalText) {
    resultDisplay.textContent = `${originalText} is not a palindrome`;
    resultDisplay.classList.add('palindrome-checker__result--failure');
}

function handlePalindromeCheck() {
    const userInput = textInput.value;

    /*
        PROTECTION: Empty input validation
        We check after cleaning to catch inputs that contain only non-alphanumeric characters (spaces, punctuation, etc.).
        Example: "     " or "!@#$%" would pass a simple empty check but become empty strings after cleaning.
    */
    if (userInput === '' || cleanString(userInput) === '') {
        alert('Please input a value');
        return;
    }

    clearPreviousResult();

    if (isPalindrome(userInput)) {
        displayPalindromeResult(userInput);
    } else {
        displayNotPalindromeResult(userInput);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handlePalindromeCheck();
    }
}

checkButton.addEventListener('click', handlePalindromeCheck);
textInput.addEventListener('keypress', handleKeyPress);

export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export function sortArrayByProperty(array, property) {
    return array.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
}

// Function to validate user input
function validateInput(input) {
    // Check if input is not null or undefined
    if (input === null || input === undefined) {
        return false;
    }

    // Check if input is an empty string
    if (typeof input === 'string' && input.trim() === '') {
        return false;
    }

    return true;
}

// Function to generate a random ID
function generateId() {
    return Math.floor(Math.random() * 1000000);
}

module.exports = {
    validateInput,
    generateId
};
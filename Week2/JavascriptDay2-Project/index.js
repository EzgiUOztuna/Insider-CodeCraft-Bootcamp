function longestCollaztSequence(n) {
    let longestSequence = 1;
    let longestValue = 1;

    for (let num = 2; num < n; num++) {
        let numbersOfTerms = 1;
        let currentTerm = num;

        while (currentTerm != 1) {
            if (currentTerm % 2 == 0) {
                currentTerm = currentTerm /= 2;
            } else {
                currentTerm = (3 * currentTerm) + 1;
            }
            numbersOfTerms++;
        }

        if (numbersOfTerms > longestSequence) {
            console.log("Number of terms for " + num + " is " + numbersOfTerms)
            longestSequence = numbersOfTerms;
            longestValue = num;
        }
    }
    return longestValue;
}

console.log("Result is " + longestCollaztSequence(20));
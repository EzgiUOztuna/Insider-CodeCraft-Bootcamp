function longestCollaztSequence(n) {
    let longestSequence = 1; //Şu ana kadar bulunan en uzun Collatz dizisinin uzunluğunu saklar
    let longestValue = 1; //En uzun Collatz dizisini başlatan sayıyı saklar. 

    for (let num = 2; num < n; num++) {
        let numbersOfTerms = 1; //Mevcut Collatz dizisinin kaç eleman içerdiğini sayar.
        let currentTerm = num; // Şu an üzerinde çalıştığımız sayıyı takip eder.

        while (currentTerm != 1) { //currentTerm değeri 1 olana kadar çalışır.
            if (currentTerm % 2 == 0) {
                currentTerm = currentTerm /= 2;
            } else {
                currentTerm = (3 * currentTerm) + 1;
            }
            numbersOfTerms++; //Her adımda numbersOfTerms değişkenini 1 artırıyoruz çünkü bir terim eklenmiş oluyor.
        }

        if (numbersOfTerms > longestSequence) {
            console.log("Number of terms for " + num + " is " + numbersOfTerms)
            longestSequence = numbersOfTerms;
            longestValue = num;
        }
    }
    return longestValue;
}

console.log("Result is " + longestCollaztSequence(1000000));
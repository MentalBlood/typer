function randomSymbol(allowedSymbols) {
    return allowedSymbols.charAt(Math.floor(Math.random() * allowedSymbols.length))
}

var textGenerator = {
    method: undefined,
    newGeneratedText: function() {
        return textGenerator.method.generate()
    }
}

var textToType = document.getElementById("text")
var charactersLeft

function generateNewText() {
    textToType.innerHTML = textGenerator.newGeneratedText()
    charactersLeft = textToType.innerHTML.length
    console.log(charactersLeft)
    if (textToType.innerHTML.length == 1)
        statisticsHandler.startMeasuring(textToType.innerHTML)
    else
        statisticsHandler.measuring = false
}
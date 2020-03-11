function randomSymbol(allowedSymbols) {
    return allowedSymbols.charAt(Math.floor(Math.random() * allowedSymbols.length))
}

var textGenerator = {
    method: undefined,
    newGeneratedText: function() {
        return this.method.generate()
    }
}

var textToType = document.getElementById("text")
var charactersLeft

function generateNewText() {
    textToType.innerHTML = textGenerator.newGeneratedText()
    charactersLeft = textToType.innerHTML.length
    if (textToType.innerHTML.length == 1)
        statisticsHandler.startMeasuring(textToType.innerHTML)
}
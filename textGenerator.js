function randomSymbol(allowedSymbols) {
    return allowedSymbols.charAt(Math.floor(Math.random() * allowedSymbols.length))
}

var textGenerator = {
    allowedSymbols: 'qwertyuiopasdfghjklzxcvbnm ',
    allowedSymbolsWithoutSpaces: '',
    stringLength: 12,

    onAllowedSymbolsUpdated: function() {
        this.allowedSymbolsWithoutSpaces = this.allowedSymbols.replace(/ /g, '')
    },

    randomString: function() {
        let newString = ""
        for (let i = 0; i < this.stringLength; i++)
            newString += randomSymbol(this.allowedSymbols)
        return newString
    },

    randomStringWithoutSpacesAtTheEnds: function() {
        let newString = ""
        newString += randomSymbol(this.allowedSymbolsWithoutSpaces)
        if (this.stringLength == 1)
        return newString
        for (let i = 1; i < (this.stringLength - 1); i++)
            newString += randomSymbol(this.allowedSymbols)
        newString += randomSymbol(this.allowedSymbolsWithoutSpaces)
        return newString
    },

    functionForGeneratingText: null,

    newGeneratedText: function() {
        let newString = this.functionForGeneratingText()
        return newString
    }
}

textGenerator.onAllowedSymbolsUpdated()
textGenerator.functionForGeneratingText = textGenerator.randomStringWithoutSpacesAtTheEnds

var textToType = document.getElementById("text")
var charactersLeft

function generateNewText() {
    textToType.innerHTML = textGenerator.newGeneratedText()
    charactersLeft = textToType.innerHTML.length
    if (textToType.innerHTML.length == 1)
        statisticsHandler.startMeasuring(textToType.innerHTML)
}
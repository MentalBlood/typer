function randomSymbol(allowedSymbols) {
    return allowedSymbols.charAt(Math.floor(Math.random() * allowedSymbols.length))
}

var textGenerator = {
    method: undefined,
    newGeneratedText: function(args) {
        if (args.refresh || !('generateNext' in textGenerator.method))
            return textGenerator.method.generate()
        return textGenerator.method.generateNext()
    }
}

var charactersLeft

function generateNewText(args) {
    textToType.innerHTML = textGenerator.newGeneratedText(args)
    charactersLeft = textToType.innerHTML.length
    if (textToType.innerHTML.length == 1)
        statisticsHandler.startMeasuring(textToType.innerHTML)
    else
        statisticsHandler.measuring = false
}
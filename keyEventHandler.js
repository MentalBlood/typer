var keyEventHandler = event => {
    if (!statisticsHandler.measuring)
        statisticsHandler.startMeasuring(textToType.innerHTML)
    if (event.key == textToType.innerHTML[0]) {
        textToType.innerHTML = textToType.innerHTML.substring(1)
        charactersLeft -= 1
        if (charactersLeft == 0) {
            statisticsHandler.endMeasuring()
            generateNewText()
        }
    }
}

window.addEventListener('keydown', keyEventHandler, false)
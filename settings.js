let configHandler = {
    save: () => download('config.json', JSON.stringify(rootFolder.getSaveObject())),
    upload: () => upload(makeGUI, 'json')
}

var rootFolder
var textGenerationFolder, textStyleFolder, textToTypeFontFamilyController, textPositionFolder, shadowFolder, backgroundStyleFolder

function makeGUI(configText) {
    if (configText) {
        rootFolder.destroy()
        statisticsHandler.clearStatistics()
        rootFolder = new dat.gui.GUI({load: JSON.parse(configText)})
    }
    else {
        rootFolder = new dat.gui.GUI()
    }
    rootFolder.useLocalStorage = false
    textToType.style.fontFamily = loadFont(allFontsNames[0])
    if (configText) {
        rootFolder.remember(textGenerator)
        rootFolder.remember(textToType.style)
        rootFolder.remember(outerTextToTypeStyle)
        rootFolder.remember(document.body.style)
    }

    textGenerationFolder = rootFolder.addFolder('Text generation')

    textStyleFolder = rootFolder.addFolder('Text style')
    textToTypeFontFamilyController = textStyleFolder.add(textToType.style, 'fontFamily', allFontsNames).name('Font family')
    textToTypeFontFamilyController.onChange((newValue) => loadFont(newValue))
    textPositionFolder = textStyleFolder.addFolder('Position')
    textPositionFolder.add(outerTextToTypeStyle, 'x', 0, 100, 1).onChange(updateTextX).name('Horizontal').listen()
    textPositionFolder.add(outerTextToTypeStyle, 'y', 0, 100, 1).onChange(updateTextY).name('Vertical').listen()
    textStyleFolder.add(outerTextToTypeStyle, 'fontSize', 0.1, 100, 0.1).onChange(updateFontSize).name('Font size')
    textStyleFolder.add(textToType.style, 'fontStyle', ['normal', 'italic']).name('Font style')
    textStyleFolder.add(textToType.style, 'fontWeight', ['normal', 'bold']).name('Font weight')
    textStyleFolder.addColor(textToType.style, 'color').name('Fill color')
    shadowFolder = textStyleFolder.addFolder('Shadow style')
    outerTextToTypeStyle.dropShadow = 'true'
    shadowFolder.add(outerTextToTypeStyle, 'dropShadow', {Yes: 'true', No: 'false'}).onFinishChange(updateShadowProperties).name('Drop shadow')
    shadowFolder.add(outerTextToTypeStyle, 'shadowDistance', 0, 10, 1).onFinishChange(updateShadowProperties).name('Shadow distance')
    shadowFolder.add(outerTextToTypeStyle, 'shadowAngle', -Math.PI, Math.PI, 0.01).onFinishChange(updateShadowProperties).name('Shadow angle')
    shadowFolder.add(outerTextToTypeStyle, 'shadowBlur', 0, 10, 1).onFinishChange(updateShadowProperties).name('Shadow blur')
    shadowFolder.addColor(outerTextToTypeStyle, 'shadowColor').onFinishChange(updateShadowProperties).name('Shadow color')

    backgroundStyleFolder = rootFolder.addFolder('Background style')
    backgroundStyleFolder.addColor(document.body.style, 'backgroundColor').name('Background color')

    initTextGenerationMethods()

    rootFolder.add(configHandler, 'upload').name('Import configuration')
    rootFolder.add(configHandler, 'save').name('Export configuration')

    chartsHandler.removeAllCharts()
    chartsHandler.addChart('default', 'mean time spent on symbol', statisticsHandler.meanTimeSpentOnEachSymbolOfEachLine)
    updateOuterTextToTypeStyle()
}

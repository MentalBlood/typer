function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

let fileElement = document.getElementById("fileElem")
fileElement.addEventListener('change', function(e) {
    var fileReader = new FileReader(); 
    fileReader.onload = function (e) {
        let config = fileReader.result
        console.log(config)
        makeGUI(config)
    } 
    fileReader.readAsText(fileElement.files[0]);

    //let files = $('#attachment').data('uploadify').queueData.files = []
    //for (let member in files) delete files[member]
    //$('#attachment').data('uploadify').uploads.count = 0
})

let configHandler = {
    save: () => download('config.json', JSON.stringify(rootFolder.getSaveObject())),
    load: () => {
        fileElement.click()
    }
}

getLocalStorageHash = (key) => document.location.href + '.' + key

var rootFolder
var textGenerationFolder, textStyleFolder, textToTypeFontFamilyController, textPositionFolder, shadowFolder, backgroundStyleFolder

function makeGUI(configText) {
    if (configText) {
        rootFolder.destroy()
        rootFolder = new dat.gui.GUI({load: JSON.parse(configText)})
    }
    else {
        rootFolder = new dat.gui.GUI()
    }
    rootFolder.useLocalStorage = false
    textToType.style.fontFamily = loadFont(allFontsNames[0])
    rootFolder.remember(textGenerator)
    rootFolder.remember(textToType.style)
    rootFolder.remember(outerTextToTypeStyle)
    rootFolder.remember(document.body.style)

    textGenerationFolder = rootFolder.addFolder('Text generation')

    textStyleFolder = rootFolder.addFolder('Text style')
    textToTypeFontFamilyController = textStyleFolder.add(textToType.style, 'fontFamily', allFontsNames).name('Font family')
    textToTypeFontFamilyController.setValue(loadFont(textToType.style.fontFamily))
    textToTypeFontFamilyController.onChange((newValue) => loadFont(newValue))
    textPositionFolder = textStyleFolder.addFolder('Position')
    textPositionFolder.add(outerTextToTypeStyle, 'x', 0, 100, 1).onChange(updateTextX).name('Horizontal')
    textPositionFolder.add(outerTextToTypeStyle, 'y', 0, 100, 1).onChange(updateTextY).name('Vertical')
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

    if (configText !== false) {
        for (methodName in textGenerationMethods) {
            method = textGenerationMethods[methodName]
            method.getOption = function(optionName) {
                return this.options[optionName].current
            }
            for (optionName in method.options) {
                option = method.options[optionName]
                option.controller = undefined
                rootFolder.remember(option)
            }
        }
        currentMethod = {name: Object.keys(textGenerationMethods)[0]}
        rootFolder.remember(currentMethod)
        methodSelector = textGenerationFolder.add(currentMethod, 'name', Object.keys(textGenerationMethods)).onChange((newName) => selectMethod(newName)).name('Method')
        methodSelector.setValue(currentMethod.name)
    }

    rootFolder.add(configHandler, 'load').name('Import configuration')
    rootFolder.add(configHandler, 'save').name('Export configuration')

    updateOuterTextToTypeStyle()
}
makeGUI(false)

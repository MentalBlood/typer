var rootFolder = new dat.gui.GUI({name: 'Parameters'});
rootFolder.useLocalStorage = true
textToType.style.fontFamily = loadFont(allFontsNames[0])
rootFolder.remember(textGenerator)
rootFolder.remember(textToType.style)
rootFolder.remember(outerTextToTypeStyle)
rootFolder.remember(document.body.style)

var textGenerationFolder = rootFolder.addFolder('Text generation')

var textStyleFolder = rootFolder.addFolder('Text style')
var textToTypeFontFamilyController = textStyleFolder.add(textToType.style, 'fontFamily', allFontsNames).name('Font family')
textToTypeFontFamilyController.setValue(loadFont(textToType.style.fontFamily))
textToTypeFontFamilyController.onChange((newValue) => loadFont(newValue))
var textPositionFolder = textStyleFolder.addFolder('Position')
textPositionFolder.add(outerTextToTypeStyle, 'x', 0, 100, 1).onChange(updateTextX).name('Horizontal')
textPositionFolder.add(outerTextToTypeStyle, 'y', 0, 100, 1).onChange(updateTextY).name('Vertical')
textStyleFolder.add(outerTextToTypeStyle, 'fontSize', 0.1, 100, 0.1).onChange(updateFontSize).name('Font size')
textStyleFolder.add(textToType.style, 'fontStyle', ['normal', 'italic']).name('Font style')
textStyleFolder.add(textToType.style, 'fontWeight', ['normal', 'bold']).name('Font weight')
textStyleFolder.addColor(textToType.style, 'color').name('Fill color')
var shadowFolder = textStyleFolder.addFolder('Shadow style')
outerTextToTypeStyle.dropShadow = 'true'
shadowFolder.add(outerTextToTypeStyle, 'dropShadow', {Yes: 'true', No: 'false'}).onFinishChange(updateShadowProperties).name('Drop shadow')
shadowFolder.add(outerTextToTypeStyle, 'shadowDistance', 0, 10, 1).onFinishChange(updateShadowProperties).name('Shadow distance')
shadowFolder.add(outerTextToTypeStyle, 'shadowAngle', -Math.PI, Math.PI, 0.01).onFinishChange(updateShadowProperties).name('Shadow angle')
shadowFolder.add(outerTextToTypeStyle, 'shadowBlur', 0, 10, 1).onFinishChange(updateShadowProperties).name('Shadow blur')
shadowFolder.addColor(outerTextToTypeStyle, 'shadowColor').onFinishChange(updateShadowProperties).name('Shadow color')

var backgroundStyleFolder = rootFolder.addFolder('Background style')
backgroundStyleFolder.addColor(document.body.style, 'backgroundColor').name('Background color')
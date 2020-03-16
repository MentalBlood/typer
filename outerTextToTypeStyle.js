var outerTextToTypeStyle = {
    x: 50,
    y: 50,
    fontSize: 10,
    dropShadow: 'true',
    shadowDistance: 5,
    shadowAngle: Math.PI / 3,
    shadowBlur: 2,
    shadowColor: '#000000'
}
function updateTextX(newX) {
    if (newX)
        outerTextToTypeStyle.x = newX
    if (textXShifts === {})
        textToType.style.left = outerTextToTypeStyle.x + 'vw'
}
function updateTextY(newY) {
    if (newY)
        outerTextToTypeStyle.y = newY
    textToType.style.top = outerTextToTypeStyle.y + 'vh'
}
function updateFontSize(newSize) {
    if (newSize)
        outerTextToTypeStyle.fontSize = newSize
    textToType.style.fontSize = outerTextToTypeStyle.fontSize + 'vh'
}
function updateShadowProperties() {
    if (outerTextToTypeStyle.dropShadow == 'false') {
        textToType.style.textShadow = 'none'
        return
    }
    let horizontalShadow = outerTextToTypeStyle.shadowDistance * Math.cos(outerTextToTypeStyle.shadowAngle)
    let verticalShadow = outerTextToTypeStyle.shadowDistance * Math.sin(outerTextToTypeStyle.shadowAngle)
    textToType.style.textShadow = horizontalShadow + 'px ' + verticalShadow + 'px ' + outerTextToTypeStyle.shadowBlur + 'px ' + 
                                outerTextToTypeStyle.shadowColor
}

function updateOuterTextToTypeStyle() {
    generateNewText({refresh: true})
    updateTextX()
    updateTextY()
    updateFontSize()
    updateShadowProperties()
}
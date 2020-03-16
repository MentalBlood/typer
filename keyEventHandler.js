function getTextWidth(textObject) {
    return Math.ceil(textObject.clientWidth) + 1
}

function getTextToTypeX() {
    return Number(textToType.style.left.replace('vw', '')) / 100 * document.documentElement.clientWidth
}

function setTextToTypeX(number) {
    textToType.style.left = (number * 100 / document.documentElement.clientWidth).toString() + 'vw'
}

var textXShifts = {}
var normalTextX

let uniqueKeyGenerator = {
    _this: false,

    init: function() {
        _this = this
    },

    generate: function(dictObject) {
        let newKey = Math.max(...Object.keys(dictObject))
        if (typeof newKey === 'number' && isFinite(newKey))
            return newKey + 1
        else
            return 1
    },

    addWithUniqueId: function(dict, element) {
        let key = _this.generate(dict)
        dict[key] = element
        return key
    }
}

uniqueKeyGenerator.init()

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        hiddenText.style.cssText = textToType.style.cssText
        hiddenText.style.left = '100vw'
        hiddenText.style.top = '100vh'
    })
})
observer.observe(textToType, { attributes : true, attributeFilter : ['style'] })

function getCurrentSymbolWidth() {
    hiddenText.innerHTML = textToType.innerHTML

    let oldWidth = getTextWidth(hiddenText)
    hiddenText.innerHTML = hiddenText.innerHTML.substring(1)
    let newWidth = getTextWidth(hiddenText)

    return oldWidth - newWidth
}

var keyEventHandler = event => {
    if (event.key == textToType.innerHTML[0]) {
        if (!statisticsHandler.measuring)
            statisticsHandler.startMeasuring(textToType.innerHTML)
        charactersLeft -= 1
        if (charactersLeft == 0) {
            statisticsHandler.endMeasuring()
            generateNewText()
        }
        else {
            let newShiftKey = uniqueKeyGenerator.addWithUniqueId(textXShifts, getCurrentSymbolWidth())
            new TWEEN.Tween({key: newShiftKey, shift: textXShifts[newShiftKey]}).to({shift: 0}, 1000).onUpdate(
                object => textXShifts[object.key] = object.shift
            ).onStart(
                object => textToType.innerHTML = textToType.innerHTML.substring(1)
            ).onComplete(
                object => delete textXShifts[object.key]
            ).start()
        }
    }
}

let sum = (list) => list.reduce((sum, current) => sum + current, 0)

animationsHandler.onUpdate = function() {
    let shiftsSum = sum(Object.values(textXShifts))
    normalTextX = outerTextToTypeStyle.x / 100 * document.documentElement.clientWidth
    setTextToTypeX(normalTextX + shiftsSum)
}

window.addEventListener('keydown', keyEventHandler, false)
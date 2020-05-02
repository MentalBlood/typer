function addOptionsToGUI(GUI, options) {
    for (optionName in options) {
        option = options[optionName]
        if (option.type === 'integer')
            option.controller = GUI.add(option, 'current', option.min, option.max, option.step).onFinishChange(() => generateNewText({refresh: true})).name(option.name)
        else if (option.type === 'string')
            option.controller = GUI.add(option, 'current').onFinishChange(() => generateNewText({refresh: true})).name(option.name)
        else if (option.type === 'function')
            option.controller = GUI.add(option, 'current').name(option.name)
        else if (option.type === 'folder') {
            option.controller = GUI.addFolder(option.name)
            addOptionsToGUI(option.controller, option.options)
        }
        if ('onChange' in option)
            option.controller.onChange(option.onChange)
        if ('listen' in option)
            option.controller.listen()
    }
}

function selectMethod(methodName) {
    if (currentMethod.name in textGenerationMethods)
        for (optionName in textGenerationMethods[currentMethod.name].options) {
            let option = textGenerationMethods[currentMethod.name].options[optionName]
            if (option.controller) {
                if (option.type === 'folder')
                    textGenerationFolder.removeFolder(option.controller)
                else
                    textGenerationFolder.remove(option.controller)
            }
        }

    method = textGenerationMethods[methodName]
    addOptionsToGUI(textGenerationFolder, method.options)

    textGenerator.method = method
    generateNewText({refresh: true})
}

var currentMethod = {name: undefined};
var methodSelector

function addControllerProperty() {
    let addControllerPropertyToOptions = function(options) {
        for (optionName in options) {
            option = options[optionName]
            option.controller = undefined
            if (option.type === 'folder')
                addControllerPropertyToOptions(option.options)
        }
    }

    for (methodName in textGenerationMethods) {
        method = textGenerationMethods[methodName]
        addControllerPropertyToOptions(method.options)
    }
}

function addGetOptionMethod() {
    for (methodName in textGenerationMethods) {
        method = textGenerationMethods[methodName]
        method.getOption = function(pathToOptionString) {
            let pathToOptionList = pathToOptionString.split('/')
            let optionName = pathToOptionList.slice(-1)[0]
            let folderWithOption = this.options
            if (pathToOptionList.length > 1) {
                let foldersList = pathToOptionList.slice(0, -1)
                for (folderName in foldersList) {
                    folderWithOption = folderWithOption[folderName].options
                }
            }
            return folderWithOption[optionName]
        }
    } 
}

function initTextGenerationMethods() {
    addGetOptionMethod()
    addControllerProperty()

    currentMethod = {name: Object.keys(textGenerationMethods)[0]}
    rootFolder.remember(currentMethod)
    methodSelector = textGenerationFolder.add(currentMethod, 'name', Object.keys(textGenerationMethods)).onChange(
        function(newName) {
            selectMethod(newName)
        }
    ).name('Method')
    methodSelector.setValue(currentMethod.name)
}
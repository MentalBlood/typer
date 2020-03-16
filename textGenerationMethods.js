var textGenerationMethods = {
    'Random characters': {
        options: {
            allowedSymbols: {
                type: 'string',
                name: 'Allowed symbols',
                current: 'qwertyuiopasdfghjklzxcvbnm '
            },
            stringLength: {
                type: 'integer',
                name: 'Line length',
                min: 1,
                max: 128,
                step: 1,
                current: 16
            }
        },
        generate: function() {
            let newString = ""
            let allowedSymbolsWithoutSpaces = this.getOption('allowedSymbols').replace(/ /g, '')
            newString += randomSymbol(allowedSymbolsWithoutSpaces)
            if (this.getOption('stringLength') == 1)
                return newString
            for (let i = 1; i < (this.getOption('stringLength') - 1); i++)
                newString += randomSymbol(this.getOption('allowedSymbols'))
            newString += randomSymbol(allowedSymbolsWithoutSpaces)
            return newString
        }
    },

    'Random fake words': {
        options: {
            numberOfWords: {
                type: 'integer',
                name: 'Number of words',
                min: 1,
                max: 32,
                step: 1,
                current: 8
            }
        },
        generate: function() {
            newString = fake.word()
            for (let i = 1; i < this.getOption('numberOfWords'); i++)
                newString += ' ' + fake.word()
            return newString.toLowerCase()
        }
    },

    'Markov chain': {
        options: {
            numberOfWords: {
                type: 'integer',
                name: 'Number of words',
                min: 1,
                max: 32,
                step: 1,
                current: 8
            },
            file: {
                type: 'function',
                name: 'Upload corpus',
                current: function() {
                    upload(textGenerationMethods['Markov chain'].makeGenerator, 'txt')
                }
            }
        },
        makeGenerator: function(corpus) {
            textGenerationMethods['Markov chain'].generator = new markov(corpus, 'string', /[.,?"();\-!':—^\w]+ /g)
            generateNewText()
        },
        generator: false,
        generate: function() {
            if (this.generator === false)
                return 'Upload corpus (larger is better) to generate more text'
            return this.generator.gen(this.getOption('numberOfWords')).replace(/^\s+|\s+$/g, '')
        }
    },
    'Given text file': {
        options: {
            numberOfSentences: {
                type: 'integer',
                name: 'Number of sentences',
                min: 1,
                max: 32,
                step: 1,
                current: 8
            },
            file: {
                type: 'function',
                name: 'Upload file',
                current: function() {
                    upload(textGenerationMethods['Given text file'].setText, 'txt')
                }
            },
            navigation: {
                type: 'folder',
                name: 'Navigation',
                options: {
                    goToBeginning: {
                        type: 'function',
                        name: 'Go to beginning',
                        current: function() {
                            textGenerationMethods['Given text file'].currentSentenceNumber = 0
                            generateNewText()
                        }
                    }
                }
            }
        },
        text: false,
        currentSentenceNumber: 0,
        setText: function(newText) {
            textGenerationMethods['Given text file'].text = newText.match( /[^\.!\?]+[\.!\?]+/g )
            textGenerationMethods['Given text file'].currentSentenceNumber = 0
            generateNewText()
        },
        generate: function() {
            if (this.text === false)
                return 'Upload file to type sentences from'
            if (this.currentSentenceNumber > this.text.length)
                return 'Text ended, please upload a new one'
            result = this.text.slice(this.currentSentenceNumber, this.currentSentenceNumber + this.getOption('numberOfSentences')).join('').replace(/^\s+|\s+$/g, '')
            this.currentSentenceNumber += this.getOption('numberOfSentences')
            return result
        }
    }
}

function addOptionsToGUI(GUI, options) {
    for (optionName in options) {
        option = options[optionName]
        if (option.type === 'integer')
            option.controller = GUI.add(option, 'current', option.min, option.max, option.step).onFinishChange(() => generateNewText()).name(option.name)
        else if (option.type === 'string')
            option.controller = GUI.add(option, 'current').onFinishChange(() => generateNewText()).name(option.name)
        else if (option.type === 'function')
            option.controller = GUI.add(option, 'current').name(option.name)
        else if (option.type === 'folder') {
            option.controller = GUI.addFolder(option.name)
            addOptionsToGUI(option.controller, option.options)
        }
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
    generateNewText()
}

var currentMethod
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
        method.getOption = function(optionName) {
            return this.options[optionName].current
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
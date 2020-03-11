textGenerationMethods = {
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
    }
}

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

let currentMethod = {name: Object.keys(textGenerationMethods)[0]}
rootFolder.remember(currentMethod)

let methodSelector = textGenerationFolder.add(currentMethod, 'name', Object.keys(textGenerationMethods)).onChange((newName) => selectMethod(newName)).name('Method')

function selectMethod(methodName) {
    if (currentMethod.name in textGenerationMethods)
        for (optionName in textGenerationMethods[currentMethod.name].options) {
            let option = textGenerationMethods[currentMethod.name].options[optionName]
            if (option.controller)
                textGenerationFolder.remove(option.controller)
        }

    let method = textGenerationMethods[methodName]
    for (optionName in method.options) {
        let option = method.options[optionName]
        if (option.type === 'integer')
            option.controller = textGenerationFolder.add(option, 'current', option.min, option.max, option.step).onFinishChange(() => generateNewText()).name(option.name)
        else if (option.type === 'string')
            option.controller = textGenerationFolder.add(option, 'current').onFinishChange(() => generateNewText()).name(option.name)
        else if (option.type === 'function')
            option.controller = textGenerationFolder.add(option, 'current').name(option.name)

    }

    textGenerator.method = method
    generateNewText()
}

methodSelector.setValue(currentMethod.name)
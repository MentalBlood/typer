function replaceLineBreaksWithSpaces(string) {
    return string.replace(/[\r\n]+/g, ' ')
}

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
            let allowedSymbolsWithoutSpaces = this.getOption('allowedSymbols').current.replace(/ /g, '')
            newString += randomSymbol(allowedSymbolsWithoutSpaces)
            if (this.getOption('stringLength').current == 1)
                return newString
            for (let i = 1; i < (this.getOption('stringLength').current - 1); i++)
                newString += randomSymbol(this.getOption('allowedSymbols').current)
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
            for (let i = 1; i < this.getOption('numberOfWords').current; i++)
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
            textGenerationMethods['Markov chain'].generator = new markov(replaceLineBreaksWithSpaces(corpus), 'string', /[.,?"();\-!':—^\w]+ /g)
            generateNewText({refresh: true})
        },
        generator: false,
        generate: function() {
            if (this.generator === false)
                return 'Upload corpus (larger is better) to generate more text'
            return this.generator.gen(this.getOption('numberOfWords').current).replace(/^\s+|\s+$/g, '')
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
                    upload(textGenerationMethods['Given text file'].setText, '')
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
                            textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current = 1
                            generateNewText({refresh: true})
                        }
                    },
                    sentenceNumber: {
                        type: 'integer',
                        name: 'Sentence number',
                        min: 1,
                        max: 1,
                        step: 1,
                        current: 1,
                        listen: true
                    }
                }
            }
        },
        text: false,
        setText: function(newText) {
            textGenerationMethods['Given text file'].text = newText.match( /[^\.!\?\n\r]+[\.!\?\n\r]+/g ) || [newText]
            textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current = 1
            textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.controller.max(textGenerationMethods['Given text file'].text.length)
            generateNewText({refresh: true})
        },
        generate: function() {
            if (this.text === false)
                return 'Upload file to type sentences from'

            let firstSentenceIndex = textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current - 1
            if (firstSentenceIndex > this.text.length) {
                textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current = 1
                firstSentenceIndex = 0
            }
            let lastSentenceIndex = Math.min(textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current - 1 + this.getOption('numberOfSentences').current, this.text.length)
            
            let result = replaceLineBreaksWithSpaces(this.text.slice(firstSentenceIndex, lastSentenceIndex).join('').replace(/^\s+|\s+$/g, ''))
            console.log(result)
            return result
        },
        generateNext: function() {
            if (this.text === false)
                return 'Upload file to type sentences from'
            textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current += textGenerationMethods['Given text file'].options.numberOfSentences.current

            let firstSentenceIndex = textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current - 1
            if (firstSentenceIndex > this.text.length) {
                textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current = 1
                firstSentenceIndex = 0
            }
            let lastSentenceIndex = Math.min(textGenerationMethods['Given text file'].options.navigation.options.sentenceNumber.current - 1 + this.getOption('numberOfSentences').current, this.text.length)
            
            let result = replaceLineBreaksWithSpaces(this.text.slice(firstSentenceIndex, lastSentenceIndex).join('').replace(/^\s+|\s+$/g, ''))
            console.log(result)
            return result
        }
    }
}
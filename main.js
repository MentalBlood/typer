const settingsButton = document.querySelector('.settings-button');
const settingsContent = document.querySelector('.settings-content');

settingsButton.onclick = function() {
    settingsContent.classList.toggle('opened');
};

const folderTitles = document.querySelectorAll('.settings-content .folder-title');

for (let folderTitle of folderTitles) {
    const currentTitleId = folderTitle.id;
    const currentFolder = document.querySelector('#_' + currentTitleId);
    folderTitle.onclick = function() {
        currentFolder.classList.toggle('opened');
    }
}



let textToType = document.getElementById('text');

function setValue(object, newValue) {
    if (object.value)
        object.value = newValue;
    else
        for (let i = 0; ; i += 1) {
            if (object.options[i].value === newValue) {
                object.selectedIndex = i;
                break;
            }
        }
    if (object.onchange)
        object.onchange();
}

const configHandler = {
    config: {},
    applyNewConfig: function(newConfigText) {
        const newConfig = JSON.parse(newConfigText);
        for (const [id, value] of Object.entries(newConfig)) {
            const settingController = document.querySelector('#' + id + '>.setting-controller');
            setValue(settingController, newConfig[id]);
        }
    },
    download: function() {
        download('config.json', JSON.stringify(configHandler.config));
    },
    upload: function() {
        upload(configHandler.applyNewConfig, 'json');
    }
}

const conditionalsHandler = {
    conditionals: {},
    addConditional: function(conditionalDiv) {
        if (!(conditionalDiv.getAttribute('whenId') in conditionalsHandler.conditionals))
            conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')] = {};
        if (!(conditionalDiv.getAttribute('whenValue') in conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')]))
            conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')][conditionalDiv.getAttribute('whenValue')] = [];
        conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')][conditionalDiv.getAttribute('whenValue')].push(conditionalDiv)
    },
    onChange: function(selectController) {
        if (selectController.id in conditionalsHandler.conditionals) {
            for (value in conditionalsHandler.conditionals[selectController.id]) {
                if (value === selectController.options[selectController.selectedIndex].value)
                    conditionalsHandler.conditionals[selectController.id][value].map((element) => element.classList.remove('conditional-hidden'));
                else
                    conditionalsHandler.conditionals[selectController.id][value].map((element) => element.classList.add('conditional-hidden'));
            }
        }
    }
};

const conditionalDivs = document.querySelectorAll('.conditional');
for (conditionalDiv of conditionalDivs)
    conditionalsHandler.addConditional(conditionalDiv);



const importConfigButton = document.getElementById('importConfigButton');
const exportConfigButton = document.getElementById('exportConfigButton');

importConfigButton.onclick = configHandler.upload;
exportConfigButton.onclick = configHandler.download;

function getValue(object) {
    if (object.type === 'checkbox')
        return object.checked;
    if (object.classList.contains('select'))
        return object.options[object.selectedIndex].value;
    return object.value;
}

function bind(id, dictionary, key, preprocessor, onFinishChange) {
    const settingController = document.querySelector('#' + id + '>.setting-controller');
    settingController.onchange = function() {
        let newValue = getValue(this);
        if (preprocessor !== undefined)
            dictionary[key] = preprocessor(newValue);
        else
            dictionary[key] = newValue;
        configHandler.config[id] = newValue;
        if (onFinishChange !== undefined)
            onFinishChange(newValue);
        if (settingController.classList.contains('select'))
            conditionalsHandler.onChange(settingController);
    }
    settingController.onchange();
    if (settingController.classList.contains('select'))
        conditionalsHandler.onChange(settingController);
}

bind('fontSize', textToType.style, 'fontSize', value => value + 'vh');
bind('horizontal', textToType.style, 'left', value => value + 'vw');
bind('vertical', textToType.style, 'top', value => value + 'vh');
bind('fontColor', textToType.style, 'color');
bind('backgroundColor', document.body.style, 'backgroundColor');
bind('italic', textToType.style, 'font-style', value => value ? 'italic' : 'normal');
bind('bold', textToType.style, 'font-weight', value => value ? 'bold' : 'normal');



let shadowStyle = {
    enabled: undefined,
    distance: undefined,
    angle: undefined,
    blur: undefined,
    color: undefined
};

function updateShadowStyle() {
    if (shadowStyle.enabled === false) {
        textToType.style.textShadow = 'none';
        return;
    }
    const horizontalShadow = shadowStyle.distance * Math.cos(shadowStyle.angle);
    const verticalShadow = shadowStyle.distance * Math.sin(shadowStyle.angle);
    textToType.style.textShadow = horizontalShadow + 'vh ' + verticalShadow + 'vh ' 
                                + shadowStyle.blur + 'vh ' + shadowStyle.color;
}

bind('dropShadow', shadowStyle, 'enabled', undefined, updateShadowStyle);
bind('shadowDistance', shadowStyle, 'distance', undefined, updateShadowStyle);
bind('shadowAngle', shadowStyle, 'angle', undefined, updateShadowStyle);
bind('shadowBlur', shadowStyle, 'blur', undefined, updateShadowStyle);
bind('shadowColor', shadowStyle, 'color', undefined, updateShadowStyle);



function addOptions(selectControllerId, optionsNames, defaultOptionName) {
    const controller = document.querySelector('#' + selectControllerId + '>.setting-controller');
    for (const optionName of optionsNames) {
        let newOption = document.createElement('option');
        newOption.value = optionName;
        newOption.text = optionName;
        controller.add(newOption);
    }
    if (defaultOptionName !== undefined)
        controller.selectedIndex = optionsNames.indexOf(defaultOptionName);
}



let loadedFontsNames = {}
function loadFont(fontName) {
    if (loadedFontsNames[fontName] != true) {
        WebFont.load({google: {families: [fontName]}});
        loadedFontsNames[fontName] = true;
    }
    return fontName;
}

loadFont('Rubik');
addOptions('font', allFontsNames, 'Rubik');
bind('font', textToType.style, 'fontFamily', loadFont);



function sync(id, dict, key) {
    const object = document.querySelector('#' + id + '>.setting-controller');
    setValue(object, dict[key]);
}



function randomSymbol(symbols) {
    return symbols.charAt(Math.floor(Math.random() * symbols.length))
}

const textGenerator = {
    methods: {
        'Random characters': {
            options: {
                symbols: undefined,
                numberOfSymbols: undefined
            },
            functions: {
                randomSymbol: function(symbols) {
                    return symbols.charAt(Math.floor(Math.random() * symbols.length))
                }
            },
            generate: function() {
                let newString = '';
                let allowedSymbolsWithoutSpaces = this.options.symbols.replace(/ /g, '');
                newString += randomSymbol(allowedSymbolsWithoutSpaces);
                if (this.options.numberOfSymbols == 1)
                    return newString;
                for (let i = 1; i < (this.options.numberOfSymbols - 1); i++)
                    newString += this.functions.randomSymbol(this.options.symbols);
                newString += randomSymbol(allowedSymbolsWithoutSpaces);
                return newString;
            }
        },
        'Random fake words': {
            options: {
                numberOfWords: undefined
            },
            generate: function() {
                newString = fake.word();
                for (let i = 1; i < this.options.numberOfWords; i++)
                    newString += ' ' + fake.word();
                return newString.toLowerCase();
            }
        },
        'Markov chain': {
            options: {
                numberOfWordsInChain: undefined
            },
            variables: {
                generator: undefined,
                corpus: undefined
            },
            buttons: {
                uploadCorpus: function() {
                    upload((text) => {
                        _this = textGenerator.methods['Markov chain'];
                        _this.variables.corpus = text;
                        _this.functions.makeNewGenerator();
                        textGenerator.generate();
                    }, 'txt');
                }
            },
            functions: {
                replaceLineBreaksWithSpaces: function(string) {
                    return string.replace(/[\r\n]+/g, ' ');
                },
                makeNewGenerator: function() {
                    _this = textGenerator.methods['Markov chain'];
                    _this.variables.generator = new markov(_this.functions.replaceLineBreaksWithSpaces(_this.variables.corpus), 'string', /[.,?"();\-!':—^\w]+ /g);
                }
            },
            generate: function() {
                if (this.variables.generator === undefined)
                    return 'Upload corpus (larger is better) to generate more text';
                return this.variables.generator.gen(this.options.numberOfWordsInChain.replace(/^\s+|\s+$/g, ''));
            }
        },
        'Given text file': {
            options: {
                numberOfSentences: undefined,
                currentSentenceNumber: undefined
            },
            variables: {
                text: undefined
            },
            buttons: {
                uploadTextFile: function() {
                    upload((text) => {
                        _this = textGenerator.methods['Given text file'];
                        _this.variables.text = text.match( /[^\.!\?\n\r]+[\.!\?\n\r]+/g ) || [text];
                        _this.options.currentSentenceNumber = 1;
                        sync('currentSentenceNumber', _this.options, 'currentSentenceNumber');
                        const currentSentenceNumberObject = document.querySelector('#currentSentenceNumber>.setting-controller');
                        currentSentenceNumberObject.max = _this.variables.text.length;
                        textGenerator.generate();
                    }, 'txt');
                }
            },
            functions: {
                replaceLineBreaksWithSpaces: function(string) {
                    return string.replace(/[\r\n]+/g, ' ');
                },
                incCurrentSentenceNumber: function() {
                    _this = textGenerator.methods['Given text file'];
                    let newSentenceNumber = Number.parseInt(_this.options.currentSentenceNumber) + 1;
                    if (newSentenceNumber > _this.variables.text.length)
                        newSentenceNumber = 1;
                    _this.options.currentSentenceNumber = newSentenceNumber;
                    sync('currentSentenceNumber', _this.options, 'currentSentenceNumber');
                }
            },
            generate: function(mode) {
                if (this.variables.text === undefined)
                    return 'Upload file to type sentences from';

                if (mode === 'next') {
                    this.functions.incCurrentSentenceNumber();
                }
                let firstSentenceIndex = this.options.currentSentenceNumber - 1;
                if (firstSentenceIndex > this.variables.text.length) {
                    this.options.currentSentenceNumber = 1;
                    sync('currentSentenceNumber', this.options, 'currentSentenceNumber');
                    firstSentenceIndex = 0;
                }
                const numberOfSentences = Number.parseInt(this.options.numberOfSentences, 10);
                const lastSentenceIndex = Math.min(firstSentenceIndex + numberOfSentences, this.variables.text.length);
                
                return this.functions.replaceLineBreaksWithSpaces(this.variables.text.slice(firstSentenceIndex, lastSentenceIndex).join('')).replace(/^\s+|\s+$/g, '');;
            }
        }
    },
    currentMethod: undefined,
    bindOptions: function() {
        for (const method of Object.values(textGenerator.methods))
            for (const optionName of Object.keys(method.options))
                bind(optionName, method.options, optionName, undefined, textGenerator.generate);
    },
    bindButtons: function() {
        for (const method of Object.values(textGenerator.methods))
            if ('buttons' in method)
                for (const buttonName of Object.keys(method.buttons)) {
                    const button = document.getElementById(buttonName);
                    button.onclick = method.buttons[buttonName];
                }
    },
    generate: function(mode) {
        if (textGenerator.initialized === false)
            return;
        textToType.innerHTML = textGenerator.methods[textGenerator.currentMethod].generate(mode);
    },
    initialized: false,
    init: function() {
        addOptions('method', Object.keys(textGenerator.methods), 'Random fake words');
        bind('method', textGenerator, 'currentMethod', undefined, textGenerator.generate);
        textGenerator.bindOptions();
        textGenerator.bindButtons();
        textGenerator.initialized = true;
        textGenerator.generate();
    }
}

textGenerator.init();



function getTextWidth(textObject) {
    return Math.ceil(textObject.clientWidth) + 1;
}

function setTextToTypeShift(number) {
    textToType.style.transform = 'translateX(' + (number * 100 / document.documentElement.clientWidth).toString() + 'vw)';
}

let textXShifts = {};
let normalTextX;

const uniqueKeyGenerator = {
    generate: function(dictObject) {
        const newKey = Math.max(...Object.keys(dictObject));
        if (typeof newKey === 'number' && isFinite(newKey))
            return newKey + 1;
        else
            return 1;
    },

    addWithUniqueId: function(dict, element) {
        const key = uniqueKeyGenerator.generate(dict);
        dict[key] = element;
        return key;
    }
}

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        hiddenText.style.cssText = textToType.style.cssText;
        hiddenText.style.opacity = '0';
    })
})
observer.observe(textToType, { attributes : true, attributeFilter : ['style'] });

function getCurrentSymbolWidth() {
    hiddenText.innerHTML = textToType.innerHTML;
    const oldWidth = getTextWidth(hiddenText);

    hiddenText.innerHTML = hiddenText.innerHTML.substring(1);
    const newWidth = getTextWidth(hiddenText);

    return oldWidth - newWidth;
}

function keyEventHandler(event) {
    if (event.key === textToType.innerHTML[0]) {
        if (textToType.innerHTML.length === 1) {
            textGenerator.generate('next');
        }
        else {
            const newShiftKey = uniqueKeyGenerator.addWithUniqueId(textXShifts, getCurrentSymbolWidth());
            new TWEEN.Tween({key: newShiftKey, shift: textXShifts[newShiftKey]}).to({shift: 0}, 1000).onUpdate(
                object => textXShifts[object.key] = object.shift
            ).onStart(
                object => textToType.innerHTML = textToType.innerHTML.substring(1)
            ).onComplete(
                object => delete textXShifts[object.key]
            ).start();
        }
    }
}

function sum(list) {
    return list.reduce((sum, current) => sum + current, 0);
}

const animationsHandler = {
    timerId: false,
    onUpdate: false,

    startUpdating: function() {
        if (animationsHandler.onUpdate)
            animationsHandler.onUpdate();
        TWEEN.update();
        animationsHandler.timerId = setTimeout(animationsHandler.startUpdating, 15);
    },

    stopUpdating: function() {
        clearInterval(timerId);
    }
}

animationsHandler.startUpdating()

animationsHandler.onUpdate = function() {
    const shiftsSum = sum(Object.values(textXShifts));
    setTextToTypeShift(shiftsSum);
}

window.addEventListener('keydown', keyEventHandler, false);



document.fonts.ready.then(function () {
    document.getElementById('html').classList.remove('hidden-on-startup');
});
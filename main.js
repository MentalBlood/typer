const settingsButton = document.querySelector('.settings .side-button');
const settingsContent = document.querySelector('.settings .side-panel');

settingsButton.onclick = function() {
    settingsContent.classList.toggle('opened');
};

function closeSettings() {
    settingsContent.classList.remove('opened');
};

function openSettings() {
    settingsContent.classList.add('opened');
};

const statisticsButton = document.querySelector('.statistics .side-button');
const statisticsContent = document.querySelector('.statistics .side-panel');

statisticsButton.onclick = function() {
    statisticsContent.classList.toggle('opened');
};

function closeStatistics() {
    statisticsContent.classList.remove('opened');
};

function openStatistics() {
    statisticsContent.classList.add('opened');
};

function closePanels() {
    closeSettings();
    closeStatistics();
}



const folderTitles = document.querySelectorAll('.settings .side-panel .folder-title');

for (let folderTitle of folderTitles) {
    const currentTitleId = folderTitle.id;
    const currentFolder = document.querySelector('#_' + currentTitleId);
    folderTitle.onclick = function() {
        currentFolder.classList.toggle('opened');
    }
}



let textToType = document.getElementById('text');

function setValue(object, newValue) {
    if (object.type === 'select')
        for (let i = 0; ; i += 1) {
            if (object.options[i].value === newValue) {
                object.selectedIndex = i;
                break;
            }
        }
    else if (object.type === 'checkbox')
        object.checked = newValue;
    else
        object.value = newValue;
    if (object.onchange)
        object.onchange();
}

const configHandler = {
    config: {},
    applyNewConfig: function(newConfigText) {
        let newConfig = undefined;
        if (typeof(newConfigText) === 'string')
            newConfig = JSON.parse(newConfigText);
        else
            newConfig = newConfigText;
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
        if (preprocessor !== undefined) {
            dictionary[key] = preprocessor(newValue);
        }
        else
            dictionary[key] = newValue;
        configHandler.config[id] = newValue;
        if (onFinishChange !== undefined)
            onFinishChange(newValue);
        if (settingController.classList.contains('select'))
            conditionalsHandler.onChange(settingController);
        else if (settingController.type === 'range') {
            const outputElement = document.querySelector('#' + id + '>.output');
            if (outputElement !== null)
                outputElement.innerHTML = newValue;
        }
        else if (settingController.type === 'color') {
            settingController.style.backgroundColor = newValue;
        }
    }
    if (settingController.type === 'range')
        settingController.oninput = settingController.onchange;
    settingController.onchange();
}

const gradientOverlay = document.getElementById('gradientOverlay');
const horizontalFadingSettings = {'start': undefined, 'end': undefined};
function updateFading() {
    const backgroundColor = document.body.style.backgroundColor;
    const textToTypeX = Number.parseFloat(textToType.style.left);
    const absoluteStart = textToTypeX + horizontalFadingSettings.start;
    const absoluteEnd = textToTypeX + horizontalFadingSettings.end;
    gradientOverlay.style.background = 'linear-gradient(90deg, rgba(0, 0, 0, 0) ' + absoluteStart+ '%, ' + backgroundColor + ' ' + absoluteEnd + '%)';
}
bind('horizontalFadingStart', horizontalFadingSettings, 'start', value => Number.parseFloat(value), updateFading);
bind('horizontalFadingEnd', horizontalFadingSettings, 'end', value => Number.parseFloat(value), updateFading);
bind('backgroundColor', document.body.style, 'backgroundColor', undefined, updateFading);
bind('fontSize', textToType.style, 'fontSize', value => value + 'vh');
bind('horizontal', textToType.style, 'left', value => value + 'vw', updateFading);
bind('vertical', textToType.style, 'top', value => value + 'vh');
bind('fontColor', textToType.style, 'color');
bind('italic', textToType.style, 'fontStyle', value => value ? 'italic' : 'normal');
bind('bold', textToType.style, 'fontWeight', value => value ? 'bold' : 'normal');



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



const uniqueKeyGenerator = {
    generate: function(dictObject) {
        const keys = Object.keys(dictObject);
        if (keys.length === 0)
            return 0;
        return Number.parseInt(keys[keys.length - 1]) + 1;
    },

    addWithUniqueId: function(dict, element) {
        const key = uniqueKeyGenerator.generate(dict);
        dict[key] = element;
        return key;
    }
}



const statisticsHandler = {
    variables: {},
    desktopVariables: {},
    draggingHadler: {
        objectThatIsDraggedNow: undefined,
        objectThatIsResizedNow: undefined,
        handleMouseMove: function(e) {
            if ((e.pageX < 0) || (e.pageX > window.innerWidth) || (e.pageY < 0) || (e.pageY > window.innerHeight) || (statisticsHandler.draggingHadler.objectThatIsResizedNow !== undefined))
                return;
            _this = statisticsHandler.draggingHadler.objectThatIsDraggedNow;
            _this.style.zIndex = 1000;
            _this.style.top = (e.pageY - _this.getAttribute('initialMouseOffsetY')) / window.innerHeight * 100 + _this.initialY + 'vh';
            _this.style.left = (e.pageX - _this.getAttribute('initialMouseOffsetX')) / window.innerWidth * 100 + _this.initialX + 'vw';
        },
        handleResize: function(e) {
            if ((e.pageX < 0) || (e.pageX > window.innerWidth) || (e.pageY < 0) || (e.pageY > window.innerHeight))
                return;
            _this = statisticsHandler.draggingHadler.objectThatIsResizedNow;
            _this.style.zIndex = 1000;
            _this.height = (e.pageY - _this.getAttribute('initialMouseOffsetY') + _this.initialHeight) * 100 / window.innerHeight;
            _this.width = (e.pageX - _this.getAttribute('initialMouseOffsetX') + _this.initialWidth) * 100 / window.innerWidth;
            statisticsHandler.draggingHadler.updateDesktopVariableSize(_this);
        },
        updateDesktopVariableSize: function(desktopVariable) {
            const heightWithPadding = Math.max(desktopVariable.height, 5);
            const widthWithPadding = Math.max(desktopVariable.width, 5);
            const padding = 1;
            const height = heightWithPadding - padding;
            const width = widthWithPadding - padding;
            desktopVariable.style.padding = 'min(' + padding + 'vh, ' + padding + 'vw)';
            desktopVariable.style.width = 'calc(' + width + 'vw - 2*' + 'min(' + padding + 'vh, ' + padding + 'vw))';
            desktopVariable.style.height = 'default';
            const desktopVariableTitle = desktopVariable.childNodes[1];
            const multiplier = Math.min(height / 10, width / 15);
            const titleFontSize = multiplier * 3;
            desktopVariableTitle.style.fontSize = titleFontSize + 'vh';
            const desktopVariableValue = desktopVariable.childNodes[3];
            const valueFontSize = multiplier * 2.5;
            desktopVariableValue.style.fontSize = valueFontSize + 'vh';
            const desktopVariableUnits = desktopVariable.childNodes[5];
            const unitsFontSize = multiplier * 2;
            desktopVariableUnits.style.fontSize = unitsFontSize + 'vh';
        },
        createDesktopVariable: function(variable, e) {
            const initialMouseOffsetX = e.offsetX;
            const initialMouseOffsetY = e.offsetY;
            let desktopVariable = variable.cloneNode(true);
            desktopVariable.id = uniqueKeyGenerator.generate(statisticsHandler.desktopVariables);
            desktopVariable.classList.remove('variable');
            desktopVariable.classList.add('desktop-variable');
            statisticsHandler.draggingHadler.removeEventListeners(desktopVariable);
            const resizer = document.createElement('div');
            resizer.classList.add('resizer');
            desktopVariable.resizing = false;
            resizer.onmousedown = function(e) {
                statisticsHandler.draggingHadler.objectThatIsResizedNow = this.parentNode;
                _this = this.parentNode;
                _this.resizing = true;
                document.addEventListener('mousemove', statisticsHandler.draggingHadler.handleResize);
                _this.setAttribute('initialMouseOffsetX', e.pageX);
                _this.setAttribute('initialMouseOffsetY', e.pageY);
                const rect = _this.getBoundingClientRect();
                _this.initialWidth = rect.width;
                _this.initialHeight = rect.height;
            };
            document.addEventListener('mouseup', e => {
                _this = statisticsHandler.draggingHadler.objectThatIsResizedNow;
                if (_this === undefined)
                    return;
                _this.resizing = false;
                document.removeEventListener('mousemove', statisticsHandler.draggingHadler.handleResize);
                _this.style.zIndex = 3;
                statisticsHandler.draggingHadler.objectThatIsResizedNow = undefined;
            })
            desktopVariable.appendChild(resizer);
            const closeButton = document.createElement('div');
            closeButton.classList.add('closeButton');
            closeButton.innerHTML = 'x';
            closeButton.onclick = function(e) {
                this.parentNode.remove();
                delete statisticsHandler.desktopVariables[this.parentNode.id];
            }
            desktopVariable.appendChild(closeButton);
            desktopVariable.style.zIndex = 3;
            const variableRect = variable.getBoundingClientRect();
            desktopVariable.style.top = variableRect.top * 100 / window.innerHeight + 'vh';
            desktopVariable.style.left = variableRect.left * 100 / window.innerWidth + 'vw';
            desktopVariable.setAttribute('initialMouseOffsetX', initialMouseOffsetX);
            desktopVariable.setAttribute('initialMouseOffsetY', initialMouseOffsetY);
            desktopVariable.onmousedown = function(e) {
                if (this.resizing === true)
                    return;
                statisticsHandler.draggingHadler.objectThatIsDraggedNow = this;
                document.addEventListener('mousemove', statisticsHandler.draggingHadler.handleMouseMove);
                this.setAttribute('initialMouseOffsetX', e.pageX);
                this.setAttribute('initialMouseOffsetY', e.pageY);
                this.initialX = Number.parseFloat(this.style.left);
                this.initialY = Number.parseFloat(this.style.top);
            };
            document.addEventListener('mouseup', e => {
                _this = statisticsHandler.draggingHadler.objectThatIsDraggedNow;
                if (_this === undefined)
                    return;
                document.removeEventListener('mousemove', statisticsHandler.draggingHadler.handleMouseMove);
                _this.style.zIndex = 3;
                statisticsHandler.draggingHadler.objectThatIsDraggedNow = undefined;
            });
            desktopVariable.ondragstart = function() {
                return false;
            };
            desktopVariable.height = '7';
            desktopVariable.width = '40';
            statisticsHandler.draggingHadler.updateDesktopVariableSize(desktopVariable);
            statisticsHandler.variables[variable.id].clones.push({'value': desktopVariable.childNodes[3]});
            statisticsHandler.desktopVariables[desktopVariable.id] = desktopVariable;
            document.addEventListener('mousemove', e => {
                for (const desktopVariable of Object.values(statisticsHandler.desktopVariables)) {
                    const rect = desktopVariable.getBoundingClientRect();
                    if ((e.pageX < rect.x) || (e.pageX > rect.x + rect.width) || (e.pageY < rect.y) || (e.pageY > rect.y + rect.height)) {
                        desktopVariable.style.zIndex = 3;
                        continue;
                    }
                    desktopVariable.style.zIndex = 1000;
                }
            });
            closePanels();
            document.getElementById('header').appendChild(desktopVariable);
            desktopVariable.onmousedown(e);
        },
        isMousedown: false,
        eventListeners: {
            'onmousedown': function(e) {
                const _this = statisticsHandler.draggingHadler;
                _this.isMousedown = true;
            },
            'onmouseup': function(e) {
                const _this = statisticsHandler.draggingHadler;
                _this.isMousedown = false;
            },
            'onmousemove': function(e) {
                const _this = statisticsHandler.draggingHadler;
                if (_this.isMousedown === true) {
                    _this.createDesktopVariable(this, e);
                    _this.isMousedown = false;
                }
            }
        },
        addEventListeners: function(variable) {
            const _this = statisticsHandler.draggingHadler;
            for (eventListenerName of Object.keys(_this.eventListeners))
                variable[eventListenerName] = _this.eventListeners[eventListenerName];
        },
        removeEventListeners: function(variable) {
            const _this = statisticsHandler.draggingHadler;
            for (eventListenerName of Object.keys(_this.eventListeners))
                variable[eventListenerName] = undefined;
        }
    },
    bindVariables: function() {
        const variables = document.querySelectorAll('.variable');
        for (const variable of variables) {
            statisticsHandler.draggingHadler.addEventListeners(variable);
            const variableValue = document.querySelector('#' + variable.id + '>.value');
            statisticsHandler.variables[variable.id] = {'value': variableValue, 'clones': []};
        }
    },
    setVariableValue: function(variableId, newValue) {
        const variable = statisticsHandler.variables[variableId];
        variable.value.innerHTML = newValue;
        for (const clone of variable.clones)
            clone.value.innerHTML = newValue;
    },
    stopwatches: {},
    startStopwatch: function(name) {
        statisticsHandler.stopwatches[name] = performance.now();
    },
    stopStopwatch: function(name) {
        const timePassed = performance.now() - statisticsHandler.stopwatches[name];
        delete statisticsHandler.stopwatches[name];
        return timePassed;
    },
    stringLength: undefined,
    onTypingStart: function() {
        statisticsHandler.stringLength = textToType.innerHTML.length;
        statisticsHandler.startStopwatch('string');
    },
    onTypingAborted: function() {
        statisticsHandler.stopStopwatch('string');
    },
    onTypingEnd: function() {
        const timePassed = statisticsHandler.stopStopwatch('string');
        const symbolsPerMinute = Number((
                statisticsHandler.stringLength / (timePassed / 1000 / 60)
            ).toFixed(0)
        );
        statisticsHandler.setVariableValue('lastTypingSpeed', symbolsPerMinute);
        statisticsHandler.stringLength = undefined;
    },
    init: function() {
        statisticsHandler.bindVariables();
    }
}
statisticsHandler.init();


let typing = false;

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
        statisticsHandler.onTypingAborted();
        typing = false;
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

    if ((textToType.innerHTML.length === 1) && (typing === false)) {
        typing = true;
        statisticsHandler.onTypingStart();
    }
    if (event.key === textToType.innerHTML[0]) {
        if (typing === false) {
            typing = true;
            statisticsHandler.onTypingStart();
        }
        if (textToType.innerHTML.length === 1) {
            statisticsHandler.onTypingEnd();
            typing = false;
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



function setDefaults() {
    configHandler.applyNewConfig(defaults);
}

const resetToDefaultsButton = document.getElementById('resetToDefaultsButton');
resetToDefaultsButton.onclick = setDefaults;



document.fonts.ready.then(function () {
    document.getElementById('html').classList.remove('hidden-on-startup');
});
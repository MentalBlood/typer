let pageLoaded = false;



const settingsButton = document.querySelector('.settings .side-button');
const settingsContent = document.querySelector('.settings .side-panel');

settingsButton.onclick = function() {
    settingsContent.classList.toggle('opened');
};

function closeSettings() {
    settingsContent.classList.remove('opened');
}

const statisticsButton = document.querySelector('.statistics .side-button');
const statisticsContent = document.querySelector('.statistics .side-panel');

statisticsButton.onclick = function() {
    statisticsContent.classList.toggle('opened');
};

function closeStatistics() {
    statisticsContent.classList.remove('opened');
}

function closePanels() {
    closeSettings();
    closeStatistics();
}



const folderTitles = document.querySelectorAll('.settings .side-panel .folder-title');

for (const folderTitle of folderTitles) {
    const currentTitleId = folderTitle.id;
    const currentFolder = document.querySelector('#_' + currentTitleId);
    folderTitle.onclick = function() {
        currentFolder.classList.toggle('opened');
    }
}



let textToType = document.getElementById('text');
let textToTypeContainer = document.getElementById('textContainer');

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
    applyNewConfig(newConfigText) {
        let newConfig = undefined;
        if (typeof(newConfigText) === 'string')
            newConfig = JSON.parse(newConfigText);
        else
            newConfig = newConfigText;
        for (const id of Object.keys(newConfig)) {
            const settingController = document.querySelector('#' + id + '>.setting-controller');
            setValue(settingController, newConfig[id]);
        }
    },
    download() {
        download('config.json', JSON.stringify(configHandler.config));
    },
    upload() {
        upload(configHandler.applyNewConfig, 'json');
    }
}

const conditionalsHandler = {
    conditionals: {},
    addConditional(conditionalDiv) {
        if (!(conditionalDiv.getAttribute('whenId') in conditionalsHandler.conditionals))
            conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')] = {};
        if (!(conditionalDiv.getAttribute('whenValue') in conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')]))
            conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')][conditionalDiv.getAttribute('whenValue')] = [];
        conditionalsHandler.conditionals[conditionalDiv.getAttribute('whenId')][conditionalDiv.getAttribute('whenValue')].push(conditionalDiv)
    },
    onChange(selectController) {
        if (selectController.id in conditionalsHandler.conditionals) {
            for (const value in conditionalsHandler.conditionals[selectController.id]) {
                if (value === selectController.options[selectController.selectedIndex].value)
                    conditionalsHandler.conditionals[selectController.id][value].map((element) => element.classList.remove('conditional-hidden'));
                else
                    conditionalsHandler.conditionals[selectController.id][value].map((element) => element.classList.add('conditional-hidden'));
            }
        }
    }
};

const conditionalDivs = document.querySelectorAll('.conditional');
for (const conditionalDiv of conditionalDivs)
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
gradientOverlay.onclick = function() {
    closeStatistics();
    closeSettings();
}
const horizontalFadingSettings = {'start': undefined, 'end': undefined};
function updateFading() {
    const backgroundColor = document.body.style.backgroundColor;
    const textToTypeX = Number.parseFloat(textToTypeContainer.style.left);
    const absoluteStart = textToTypeX + horizontalFadingSettings.start;
    const absoluteEnd = textToTypeX + horizontalFadingSettings.end;
    gradientOverlay.style.background = 'linear-gradient(90deg, rgba(0, 0, 0, 0) ' + absoluteStart+ '%, ' + backgroundColor + ' ' + absoluteEnd + '%)';
}
bind('horizontalFadingStart', horizontalFadingSettings, 'start', value => Number.parseFloat(value), updateFading);
bind('horizontalFadingEnd', horizontalFadingSettings, 'end', value => Number.parseFloat(value), updateFading);
bind('backgroundColor', document.body.style, 'backgroundColor', undefined, updateFading);
bind('fontSize', textToType.style, 'fontSize', value => value + 'vh', updateCurrentSymbolHighlightingStyle);
bind('horizontal', textToTypeContainer.style, 'left', value => value + 'vw', updateFading);
bind('vertical', textToTypeContainer.style, 'top', value => value + 'vh');
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



let currentSymbolHighlightingStyle = {
    enabled: undefined,
    color: undefined
}

function updateCurrentSymbolHighlightingStyle() {
    const currentSymbol = document.querySelector('#text span:first-of-type');
    if (currentSymbol === null)
        return;
    if (currentSymbolHighlightingStyle.enabled === false) {
        currentSymbol.style.backgroundColor = 'transparent';
        return;
    }
    currentSymbol.style.backgroundColor = currentSymbolHighlightingStyle.color;
    currentSymbol.style.borderRadius = Number.parseFloat(textToType.style.fontSize) / 5 + 'vh';
}

bind('highlightingEnabled', currentSymbolHighlightingStyle, 'enabled', undefined, updateCurrentSymbolHighlightingStyle);
bind('highlightingColor', currentSymbolHighlightingStyle, 'color', undefined, updateCurrentSymbolHighlightingStyle);



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
    if (loadedFontsNames[fontName] !== true) {
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
    generate(dictObject) {
        const keys = Object.keys(dictObject);
        if (keys.length === 0)
            return 0;
        return Number.parseInt(keys[keys.length - 1]) + 1;
    },

    addWithUniqueId(dict, element) {
        const key = uniqueKeyGenerator.generate(dict);
        dict[key] = element;
        return key;
    }
}



const modalWindowBackground = document.getElementById('modalWindowBackground');
const setTargetWindow = document.getElementById('setTargetWindow');
const setTargetWindowValue = document.querySelector('#setTargetWindow .value');
const setTargetWindowCheckbox = document.querySelector('#setTargetWindow .checkbox');

const setTargetWindowSubmitButton = document.querySelector('#setTargetWindow .submit');
let currentlySetingId = undefined;
function processSetTargetWindowSubmitButtonClick() {
    const newTarget = setTargetWindowValue.value;
    const isPositive = setTargetWindowCheckbox.checked;
    statisticsHandler.setVariableTarget(currentlySetingId, newTarget, isPositive);
    modalWindowBackground.classList.add('hidden');
    setTargetWindow.classList.add('hidden');
    currentlySetingId = undefined;
}
setTargetWindowSubmitButton.addEventListener('click', processSetTargetWindowSubmitButtonClick);

const setTargetWindowCancelButton = document.querySelector('#setTargetWindow .cancel');
function processSetTargetWindowCancelButtonClick() {
    modalWindowBackground.classList.add('hidden');
    setTargetWindow.classList.add('hidden');
    currentlySetingId = undefined;
}
setTargetWindowCancelButton.addEventListener('click', processSetTargetWindowCancelButtonClick);

const variables = document.querySelectorAll('.variable:not(.chart)');
function processVariableTargetClick() {
    currentlySetingId = this.parentNode.originalId;
    modalWindowBackground.classList.toggle('hidden');
    setTargetWindow.classList.toggle('hidden');
}
const defaultTargetText = '(click here to add target)';
for (variable of variables) {
    variable.originalId = variable.id;

    const variableTarget = document.querySelector('#' + variable.id + '>.target');
    variableTarget.innerHTML = defaultTargetText;
    variableTarget.addEventListener('click', processVariableTargetClick);
}



function focusOnTextToType() {
    if (settingsContent.classList.contains('opened'))
        return false;
    if (statisticsContent.classList.contains('opened'))
        return false;
    if (setTargetWindow.classList.contains('hidden') === false)
        return false;
    return true;
}



const statisticsHandler = {
    variables: {},
    canvasesClones: {},
    desktopVariables: {},
    draggingHadler: {
        objectThatIsDraggedNow: undefined,
        objectThatIsResizedNow: undefined,
        handleMouseMove(e) {
            if ((e.pageX < 0) || (e.pageX > window.innerWidth) || (e.pageY < 0) || (e.pageY > window.innerHeight) || (statisticsHandler.draggingHadler.objectThatIsResizedNow !== undefined))
                return;
            const _this = statisticsHandler.draggingHadler.objectThatIsDraggedNow;
            _this.style.zIndex = '1000';
            _this.style.top = (e.pageY - _this.getAttribute('initialMouseOffsetY')) / window.innerHeight * 100 + _this.initialY + 'vh';
            _this.style.left = (e.pageX - _this.getAttribute('initialMouseOffsetX')) / window.innerWidth * 100 + _this.initialX + 'vw';
        },
        handleResize(e) {
            if ((e.pageX < 0) || (e.pageX > window.innerWidth) || (e.pageY < 0) || (e.pageY > window.innerHeight))
                return;
            const _this = statisticsHandler.draggingHadler.objectThatIsResizedNow;
            _this.style.zIndex = '1000';
            _this.height = (e.pageY - _this.getAttribute('initialMouseOffsetY') + _this.initialHeight) * 100 / window.innerHeight;
            _this.width = (e.pageX - _this.getAttribute('initialMouseOffsetX') + _this.initialWidth) * 100 / window.innerWidth;
            statisticsHandler.draggingHadler.updateDesktopVariableSize(_this);
        },
        updateDesktopVariableSize(desktopVariable) {
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
            if (desktopVariable.classList.contains('chart'))
                return;
            const desktopVariableValue = desktopVariable.childNodes[3];
            const valueFontSize = multiplier * 2.5;
            desktopVariableValue.style.fontSize = valueFontSize + 'vh';
            const desktopVariableSeparator = desktopVariable.childNodes[5];
            desktopVariableSeparator.style.fontSize = valueFontSize + 'vh';
            const desktopVariableTarget = desktopVariable.childNodes[7];
            desktopVariableTarget.style.fontSize = valueFontSize + 'vh';
            const desktopVariableUnits = desktopVariable.childNodes[9];
            const unitsFontSize = multiplier * 2;
            desktopVariableUnits.style.fontSize = unitsFontSize + 'vh';
        },
        createDesktopVariable(variable, e) {
            const initialMouseOffsetX = e.offsetX;
            const initialMouseOffsetY = e.offsetY;
            let desktopVariable = variable.cloneNode(true);
            desktopVariable.id = variable.id + '_clone_' + uniqueKeyGenerator.generate(statisticsHandler.desktopVariables);
            desktopVariable.originalId = variable.id;
            desktopVariable.classList.remove('variable');
            desktopVariable.classList.add('desktop-variable');
            const desktopVariableTarget = desktopVariable.childNodes[7];
            desktopVariableTarget.addEventListener('click', processVariableTargetClick);
            if (variable.classList.contains('chart')) {
            } else {
                const desktopVariableValue = desktopVariable.childNodes[3];
                const desktopVariableTarget = desktopVariable.childNodes[7];
                statisticsHandler.variables[variable.id].clones.push({'element': desktopVariable, 'value': desktopVariableValue, 'target': desktopVariableTarget});
            }
            statisticsHandler.draggingHadler.removeEventListeners(desktopVariable);
            const resizer = document.createElement('div');
            resizer.classList.add('resizer');
            desktopVariable.resizing = false;
            resizer.onmousedown = function(e) {
                statisticsHandler.draggingHadler.objectThatIsResizedNow = this.parentNode;
                const _this = this.parentNode;
                _this.resizing = true;
                document.addEventListener('mousemove', statisticsHandler.draggingHadler.handleResize);
                _this.setAttribute('initialMouseOffsetX', e.pageX);
                _this.setAttribute('initialMouseOffsetY', e.pageY);
                const rect = _this.getBoundingClientRect();
                _this.initialWidth = rect.width;
                _this.initialHeight = rect.height;
            };
            document.addEventListener('mouseup', () => {
                const _this = statisticsHandler.draggingHadler.objectThatIsResizedNow;
                if (_this === undefined)
                    return;
                _this.resizing = false;
                document.removeEventListener('mousemove', statisticsHandler.draggingHadler.handleResize);
                _this.style.zIndex = '3';
                statisticsHandler.draggingHadler.objectThatIsResizedNow = undefined;
            })
            desktopVariable.appendChild(resizer);
            const closeButton = document.createElement('div');
            closeButton.classList.add('closeButton');
            closeButton.innerHTML = 'x';
            closeButton.onclick = function() {
                this.parentNode.remove();
                delete statisticsHandler.desktopVariables[this.parentNode.id];
            }
            desktopVariable.appendChild(closeButton);
            desktopVariable.style.zIndex = '3';
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
            document.addEventListener('mouseup', () => {
                const _this = statisticsHandler.draggingHadler.objectThatIsDraggedNow;
                if (_this === undefined)
                    return;
                document.removeEventListener('mousemove', statisticsHandler.draggingHadler.handleMouseMove);
                _this.style.zIndex = '3';
                statisticsHandler.draggingHadler.objectThatIsDraggedNow = undefined;
            });
            desktopVariable.ondragstart = function() {
                return false;
            };
            desktopVariable.height = '7';
            desktopVariable.width = '40';
            statisticsHandler.draggingHadler.updateDesktopVariableSize(desktopVariable);
            statisticsHandler.desktopVariables[desktopVariable.id] = desktopVariable;
            closePanels();
            document.getElementById('header').appendChild(desktopVariable);
            desktopVariable.onmousedown(e);
        },
        isMousedown: false,
        eventListeners: {
            'onmousedown'() {
                const _this = statisticsHandler.draggingHadler;
                _this.isMousedown = true;
            },
            'onmouseup'() {
                const _this = statisticsHandler.draggingHadler;
                _this.isMousedown = false;
            },
            'onmousemove'(e) {
                const _this = statisticsHandler.draggingHadler;
                if (_this.isMousedown === true) {
                    _this.createDesktopVariable(this, e);
                    _this.isMousedown = false;
                }
            }
        },
        addEventListeners(variable) {
            const _this = statisticsHandler.draggingHadler;
            for (const eventListenerName of Object.keys(_this.eventListeners))
                variable[eventListenerName] = _this.eventListeners[eventListenerName];
        },
        removeEventListeners(variable) {
            const _this = statisticsHandler.draggingHadler;
            for (const eventListenerName of Object.keys(_this.eventListeners))
                variable[eventListenerName] = undefined;
        }
    },
    bindVariables() {
        const variables = document.querySelectorAll('.variable');
        for (const variable of variables) {
            if (variable.classList.contains('chart'))
                return;
            statisticsHandler.draggingHadler.addEventListeners(variable);
            const variableValue = document.querySelector('#' + variable.id + '>.value');
            const variableTarget = document.querySelector('#' + variable.id + '>.target');
            statisticsHandler.variables[variable.id] = {'value': variableValue, 'target': variableTarget, 'clones': []};
        }
    },
    defaultState: {
        sequencies: {
            'Typing speed': []
        },
        numbers: {
            symbolsTyped: 0,
            mistakesMade: 0,
            lastTypingSpeed: '?'
        },
        targets: {}
    },
    state: undefined,
    setVariableValue(variableId, newValue) {
        const variable = statisticsHandler.variables[variableId];
        if (newValue === undefined)
            newValue = statisticsHandler.state.numbers[variableId];
        variable.value.innerHTML = newValue;
        for (const clone of variable.clones)
            clone.value.innerHTML = newValue;
        statisticsHandler.updateTargetReachIndicator(variableId);
    },
    setVariableTarget(variableId, newTarget, isPositive) {
        const variable = statisticsHandler.variables[variableId];
        variable.target.innerHTML = newTarget;
        variable.target.isPositive = isPositive;
        statisticsHandler.state.targets[variableId] = {'value': newTarget, 'isPositive': isPositive};
        for (const clone of variable.clones) {
            clone.target.innerHTML = newTarget;
        }
        statisticsHandler.updateTargetReachIndicator(variableId);
    },
    updateVariablesValues() {
        for (variableId in statisticsHandler.state.numbers)
            statisticsHandler.setVariableValue(variableId);
    },
    updateCanvasesClones(variableId) {
        const sourceCanvas = document.getElementById(variableId).childNodes[3].childNodes[0];
        for (const clone of statisticsHandler.canvasesClones[variableId]) {
            clone.getContext('2d').canvas.drawImage(sourceCanvas, 0, 0);
        }
    },
    stopwatches: {},
    startStopwatch(name) {
        statisticsHandler.stopwatches[name] = performance.now();
    },
    stopStopwatch(name) {
        const timePassed = performance.now() - statisticsHandler.stopwatches[name];
        delete statisticsHandler.stopwatches[name];
        return timePassed;
    },
    isTargetSet(variableId) {
        const variable = statisticsHandler.variables[variableId];
        const targetValue = variable.target.innerHTML;
        return targetValue !== defaultTargetText;
    },
    isTargetReached(variableId) {
        const variable = statisticsHandler.variables[variableId];
        const targetValue = Number.parseInt(variable.target.innerHTML, 10);
        const value = Number.parseInt(variable.value.innerHTML, 10);
        const isPositive = variable.target.isPositive;
        if (isPositive)
            return value >= targetValue;
        else
            return value <= targetValue;
    },
    updateTargetReachIndicator(variableId) {
        if (statisticsHandler.isTargetSet(variableId) === false)
            return;
        const variableElement = document.getElementById(variableId);
        const clones = statisticsHandler.variables[variableId].clones;
        if (statisticsHandler.isTargetReached(variableId)) {
            variableElement.classList.remove('target-not-reached');
            variableElement.classList.add('target-reached');
            for (clone of clones) {
                clone.element.classList.remove('target-not-reached');
                clone.element.classList.add('target-reached');
            }
        }
        else {
            variableElement.classList.remove('target-reached');
            variableElement.classList.add('target-not-reached');
            for (clone of clones) {
                clone.element.classList.remove('target-reached');
                clone.element.classList.add('target-not-reached');
            }
        }
    },
    updateTargetsReachIndicators() {
        for (variableId in statisticsHandler.variables)
            statisticsHandler.updateTargetReachIndicator(variableId)
    },
    stringLength: undefined,
    currentString: undefined,
    onTypingStart() {
        statisticsHandler.stringLength = textToType.innerText.length;
        statisticsHandler.currentString = textToType.innerText;
        statisticsHandler.startStopwatch('string');
    },
    onSymbolTyped() {
        statisticsHandler.state.numbers.symbolsTyped += 1;
        statisticsHandler.setVariableValue('symbolsTyped');
    },
    onMistakeMade() {
        statisticsHandler.state.numbers.mistakesMade += 1;
        statisticsHandler.setVariableValue('mistakesMade');
    },
    onTypingAborted() {
        statisticsHandler.stopStopwatch('string');
    },
    onTypingEnd() {
        const timePassed = statisticsHandler.stopStopwatch('string');
        const symbolsPerMinute = Number((statisticsHandler.stringLength / (timePassed / 1000 / 60)).toFixed(0));
        statisticsHandler.state.numbers.lastTypingSpeed = symbolsPerMinute;
        statisticsHandler.setVariableValue('lastTypingSpeed');
        chartsHandler.addDot('Typing speed', statisticsHandler.currentString, symbolsPerMinute);
        statisticsHandler.stringLength = undefined;
        statisticsHandler.currentString = undefined;
    },

    applyNewState(newStateText) {
        newState = JSON.parse(newStateText);
        statisticsHandler.state = newState.state;
        statisticsHandler.updateVariablesValues();
        for (variableId in statisticsHandler.state.targets) {
            const target = statisticsHandler.state.targets[variableId];
            statisticsHandler.setVariableTarget(variableId, target.value, target.isPositive);
        }
        chartsHandler.setState(newState.charts);
    },
    downloadState() {
        download('statistics.json', JSON.stringify({'state': statisticsHandler.state, 'charts': chartsHandler.getState()}));
    },
    uploadState() {
        upload(statisticsHandler.applyNewState, 'json');
    },
    resetState() {
        statisticsHandler.state = JSON.parse(JSON.stringify(statisticsHandler.defaultState));
        statisticsHandler.updateVariablesValues();
        chartsHandler.resetCharts();
    },

    init() {
        statisticsHandler.bindVariables();
        statisticsHandler.state = JSON.parse(JSON.stringify(statisticsHandler.defaultState));
        statisticsHandler.updateTargetsReachIndicators();
    },
}

const importStatisticsButton = document.getElementById('importStatisticsButton');
const exportStatisticsButton = document.getElementById('exportStatisticsButton');
const resetStatisticsButton = document.getElementById('resetStatisticsButton');

importStatisticsButton.onclick = statisticsHandler.uploadState;
exportStatisticsButton.onclick = statisticsHandler.downloadState;
resetStatisticsButton.onclick = statisticsHandler.resetState;

statisticsHandler.init();



function setTextToType(newText) {
    textToType.innerHTML = '';
    const firstLetter = newText[0];
    if (firstLetter === undefined)
        return;
    const textExceptFirstLetter = newText.substring(1);
    const firstLetterElement = document.createElement('span');
    firstLetterElement.innerHTML = firstLetter;
    textToType.appendChild(firstLetterElement);
    textToType.innerHTML += textExceptFirstLetter;
    updateCurrentSymbolHighlightingStyle();
}



let typing = false;

function randomSymbol(symbols) {
    return symbols.charAt(Math.floor(Math.random() * symbols.length));
}

const textGenerator = {
    methods: {
        'Random characters': {
            options: {
                symbols: undefined,
                numberOfSymbols: undefined
            },
            functions: {
                randomSymbol(symbols) {
                    return symbols.charAt(Math.floor(Math.random() * symbols.length));
                }
            },
            generate() {
                let newString = '';
                let allowedSymbolsWithoutSpaces = this.options.symbols.replace(/ /g, '');
                newString += randomSymbol(allowedSymbolsWithoutSpaces);
                if (this.options.numberOfSymbols === 1)
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
            generate() {
                let newString = fake.word();
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
                uploadCorpus() {
                    upload((text) => {
                        const _this = textGenerator.methods['Markov chain'];
                        _this.variables.corpus = text;
                        _this.functions.makeNewGenerator();
                        textGenerator.generate();
                    }, 'txt');
                }
            },
            functions: {
                replaceLineBreaksWithSpaces(string) {
                    return string.replace(/[\r\n]+/g, ' ');
                },
                makeNewGenerator() {
                    const _this = textGenerator.methods['Markov chain'];
                    _this.variables.generator = new markov(_this.functions.replaceLineBreaksWithSpaces(_this.variables.corpus), 'string', /[.,?"();\-!':—^\w]+ /g);
                }
            },
            generate() {
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
                uploadTextFile() {
                    upload((text) => {
                        const _this = textGenerator.methods['Given text file'];
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
                replaceLineBreaksWithSpaces(string) {
                    return string.replace(/[\r\n]+/g, ' ');
                },
                incCurrentSentenceNumber() {
                    const _this = textGenerator.methods['Given text file'];
                    let newSentenceNumber = Number.parseInt(_this.options.currentSentenceNumber) + 1;
                    if (newSentenceNumber > _this.variables.text.length)
                        newSentenceNumber = 1;
                    _this.options.currentSentenceNumber = newSentenceNumber;
                    sync('currentSentenceNumber', _this.options, 'currentSentenceNumber');
                }
            },
            generate(mode) {
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
                
                return this.functions.replaceLineBreaksWithSpaces(this.variables.text.slice(firstSentenceIndex, lastSentenceIndex).join('')).replace(/^\s+|\s+$/g, '');
            }
        }
    },
    currentMethod: undefined,
    bindOptions() {
        for (const method of Object.values(textGenerator.methods))
            for (const optionName of Object.keys(method.options))
                bind(optionName, method.options, optionName, undefined, textGenerator.generate);
    },
    bindButtons() {
        for (const method of Object.values(textGenerator.methods))
            if ('buttons' in method)
                for (const buttonName of Object.keys(method.buttons)) {
                    const button = document.getElementById(buttonName);
                    button.onclick = method.buttons[buttonName];
                }
    },
    generate(mode) {
        if (pageLoaded === false)
            return;
        if (textGenerator.initialized === false)
            return;
        statisticsHandler.onTypingAborted();
        typing = false;
        const generatedText = textGenerator.methods[textGenerator.currentMethod].generate(mode);
        setTextToType(generatedText);
    },
    initialized: false,
    init() {
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

const hiddenText = document.getElementById('hiddenText');

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function() {
        hiddenText.style.cssText = textToType.style.cssText;
        hiddenText.style.opacity = '0';
        hiddenText.style.position = 'absolute';
    })
})
observer.observe(textToType, { attributes : true, attributeFilter : ['style'] });

function getCurrentSymbolWidth() {
    hiddenText.innerHTML = textToType.innerHTML;
    const oldWidth = getTextWidth(hiddenText);

    hiddenText.removeChild(hiddenText.firstChild);
    hiddenText.innerHTML = hiddenText.innerHTML;
    const newWidth = getTextWidth(hiddenText);

    return oldWidth - newWidth;
}

function getFirstTextToTypeLetter() {
    const firstLetterElement = textToType.firstChild;
    return firstLetterElement.innerHTML;
}

function removeFirstTextToTypeLetter() {
    textToType.removeChild(textToType.firstChild);
    setTextToType(textToType.innerHTML);
}

const greeting = document.getElementById('greeting');

function keyEventHandler(event) {
    if (focusOnTextToType() === false)
        return;
    greeting.classList.add('hidden');
    if ((textToType.innerHTML.length === 1) && (typing === false)) {
        typing = true;
        statisticsHandler.onTypingStart();
    }
    if (event.key === getFirstTextToTypeLetter()) {
        statisticsHandler.onSymbolTyped();
        if (typing === false) {
            typing = true;
            statisticsHandler.onTypingStart();
        }
        if (textToType.innerText.length === 1) {
            statisticsHandler.onTypingEnd();
            typing = false;
            textGenerator.generate('next');
        }
        else {
            const newShiftKey = uniqueKeyGenerator.addWithUniqueId(textXShifts, getCurrentSymbolWidth());
            new TWEEN.Tween({key: newShiftKey, shift: textXShifts[newShiftKey]}).to({shift: 0}, 1000).onUpdate(
                object => textXShifts[object.key] = object.shift
            ).onStart(
                () => removeFirstTextToTypeLetter()
            ).onComplete(
                object => delete textXShifts[object.key]
            ).start();
        }
    }
    else {
        statisticsHandler.onMistakeMade();
    }
}

function sum(list) {
    return list.reduce((sum, current) => sum + current, 0);
}

const animationsHandler = {
    timerId: false,
    onUpdate: false,

    startUpdating() {
        if (animationsHandler.onUpdate)
            animationsHandler.onUpdate();
        TWEEN.update();
        animationsHandler.timerId = setTimeout(animationsHandler.startUpdating, 15);
    },

    stopUpdating() {
        clearInterval(animationsHandler.timerId);
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
setDefaults();

const resetToDefaultsButton = document.getElementById('resetToDefaultsButton');
resetToDefaultsButton.onclick = setDefaults;



const chartsHandler = {
    charts: {},
    clones: {},

    addChart(canvasId, name) {
        const canvas = document.getElementById(canvasId);
        chartsHandler.charts[name] = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: name,
                    data: [],
                    fill: false,
                    borderColor: 'white',
                    backgroundColor: 'white',
                    pointBorderColor: 'rgba(255,255,255,0.5)',
                    pointBackgroundColor: 'rgba(255,255,255,1)',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        });
    },

    addDot(chartName, label, value, color) {
        const chart = chartsHandler.charts[chartName];
        chart.data.labels.push(label);
        chart.data.datasets[0].data.push(value);
        const dataset = chart.data.datasets[0];
        dataset.pointRadius = 9 / Math.sqrt(dataset.data.length);
        chart.update(200);
    },

    removeAllCharts() {
        for (const key in chartsHandler.charts) {
            chartsHandler.charts[key].destroy();
        }
        chartsHandler.charts = {};
    },

    getState() {
        const currentState = {'charts': undefined};
        for (chartName in chartsHandler.charts) {
            const chart = chartsHandler.charts[chartName];
            currentState[chartName] = {'labels': chart.data.labels, 'values': chart.data.datasets[0].data};
        }
        return JSON.stringify(currentState);
    },

    setState(newStateText) {
        const newState = JSON.parse(newStateText);
        for (const chartName in newState) {
            const newChartData = newState[chartName];
            const currentChart = chartsHandler.charts[chartName];
            currentChart.data.labels = newChartData.labels;
            currentChart.data.datasets[0].data = newChartData.values;
            currentChart.update(400);
        }
    },

    resetCharts() {
        for (const chart of Object.values(chartsHandler.charts)) {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.update(400);
        }
    }
}

chartsHandler.addChart('typingSpeedChart', 'Typing speed');


const bodyElement = document.getElementById('body');
let timerForHidingCursor;
function onMouseAction() {
    clearTimeout(timerForHidingCursor);
    bodyElement.classList.remove('cursor-hidden');
    timerForHidingCursor = setTimeout(function () {
        bodyElement.classList.add('cursor-hidden');
    }, 4000);
}
document.addEventListener('mousemove', onMouseAction);
document.addEventListener('mousedown', onMouseAction);
document.addEventListener('mouseup', onMouseAction);
document.addEventListener('focus', onMouseAction);



document.fonts.ready.then(function () {
    if (pageLoaded === true)
        return;
    pageLoaded = true;
    textGenerator.generate();
    document.getElementById('html').classList.remove('hidden-on-startup');
});
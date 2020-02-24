let Application = PIXI.Application,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

function windowWidth() { return (window.innerWidth > 0) ? window.innerWidth : screen.width; }
function windowHeight() { return (window.innerHeight > 0) ? window.innerHeight : screen.height; }

let app = new Application({ 
    width: windowWidth(),
    height: windowHeight(),
    antialiasing: true,
    transparent: false,
    resolution: 1,
    backgroundColor: 0x2b2b2b
  }
);

function windowResizedCallback() {
  app.renderer.resize(windowWidth(), windowHeight());
  updateTextX()
  updateTextY()
}

window.addEventListener('resize', windowResizedCallback);

document.body.appendChild(app.view);

let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: '#a3a3a3',
  stroke: '#000000',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

let textToType = new Text("text", style)
textToType.position.set(0, 0)
app.stage.addChild(textToType);

let charactersLeft

let textGenerator = {
  allowedSymbols: 'qwertyuiopasdfghjklzxcvbnm ',
  stringLength: 5,

  newGeneratedText: function() {
    let newString = ''
    for (var i = 0; i < this.stringLength; i++)
      newString += this.allowedSymbols.charAt(Math.floor(Math.random() * this.allowedSymbols.length));
    charactersLeft = newString.length
    return newString
  }
};

function generateNewText() {
  textToType.text = textGenerator.newGeneratedText()
}

var rootFolder = new dat.gui.GUI({name: 'Parameters'});
rootFolder.remember(textGenerator)
rootFolder.remember(textToType.position)
rootFolder.remember(textToType.style)
rootFolder.remember(app.renderer)

var textGenerationFolder = rootFolder.addFolder('Text generation')
let allowedSymbolsController = textGenerationFolder.add(textGenerator, 'allowedSymbols')
allowedSymbolsController.name('Allowed symbols')
allowedSymbolsController.onChange(generateNewText)
let stringLengthController = textGenerationFolder.add(textGenerator, 'stringLength', 1, 50, 1)
stringLengthController.name('String length')
stringLengthController.onChange(generateNewText)

var textPositionFolder = rootFolder.addFolder('Text position')
let relativeTextPosition = {x: 0.0, y: 0.0}
let relativeTextXController = textPositionFolder.add(relativeTextPosition, 'x', 0, 1, 0.001).name('Horizontal')
function updateTextX() {textToType.position.x = app.screen.width * relativeTextPosition.x}
relativeTextXController.onChange(updateTextX)
let relativeTextYController = textPositionFolder.add(relativeTextPosition, 'y', 0, 1, 0.001).name('Vertical')
function updateTextY() {textToType.position.y = app.screen.height * relativeTextPosition.y}
relativeTextYController.onChange(updateTextY)
textPositionFolder.add(textToType.style, 'fontSize', 6, app.screen.height, 1).name('Font size')

var textStyleFolder = rootFolder.addFolder('Text style')
textStyleFolder.addColor(textToType.style, 'fill').name('Fill color')
textStyleFolder.addColor(textToType.style, 'stroke').name('Stroke color')
var shadowFolder = textStyleFolder.addFolder('Shadow style')
shadowFolder.add(textToType.style, 'dropShadow', {Yes: true, No: false}).name('Drop shadow')
shadowFolder.addColor(textToType.style, 'dropShadowColor').name('Shadow color')
shadowFolder.add(textToType.style, 'dropShadowBlur', 0, 10, 1).name('Shadow blur')
shadowFolder.add(textToType.style, 'dropShadowAngle', -Math.PI, Math.PI, 0.01).name('Shadow angle')
shadowFolder.add(textToType.style, 'dropShadowDistance', 0, 10, 1).name('Shadow distance')

var backgroundStyleFolder = rootFolder.addFolder('Background style')
backgroundStyleFolder.addColor(app.renderer, 'backgroundColor').name('Background color')

generateNewText()

keyEventHandler = event => {
  if (event.key == textToType.text[0]) {
    textToType.text = textToType.text.substring(1)
    charactersLeft -= 1
    if (charactersLeft == 0) {
      generateNewText()
    }
  }
}

window.addEventListener('keydown', keyEventHandler, false)
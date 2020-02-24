//Aliases
let Application = PIXI.Application,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

//Create a Pixi Application
let app = new Application({ 
    width: 2048, 
    height: 1024,                       
    antialiasing: true, 
    transparent: false, 
    resolution: 1,
    backgroundColor: 0x6699ff
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: '#00FF00',
  stroke: '#ff3300',
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

var rootFolder = new dat.gui.GUI();
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
textPositionFolder.add(textToType.position, 'x', 0, app.screen.width, 1)
textPositionFolder.add(textToType.position, 'y', 0, app.screen.height, 1)
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
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

let textToType = new Text("", style)
textToType.position.set(0, 0)
app.stage.addChild(textToType);

var gui = new dat.gui.GUI();

gui.remember(textToType.position);
gui.add(textToType.position, 'x', 0, app.screen.width, 1)
gui.add(textToType.position, 'y', 0, app.screen.height, 1)

gui.remember(textToType.style)
gui.add(textToType.style, 'fontSize', 6, app.screen.height, 1)
gui.addColor(textToType.style, 'fill')
gui.addColor(textToType.style, 'stroke')

gui.remember(app.renderer)
gui.addColor(app.renderer, 'backgroundColor')

let charactersLeft

function newGeneratedText() {
  let newString = Math.random().toString(36).substring(2, 15)
  charactersLeft = newString.length
  return newString
}

textToType.text = newGeneratedText()

keyEventHandler = event => {
  if (event.key == textToType.text[0]) {
    textToType.text = textToType.text.substring(1)
    charactersLeft -= 1
    if (charactersLeft == 0) {
      textToType.text = newGeneratedText()
    }
  }
}

window.addEventListener('keydown', keyEventHandler, false)
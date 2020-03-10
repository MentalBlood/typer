let ifNotMobileThanGoGame = () => {if (!window.matchMedia("only screen and (max-width: 760px)").matches) window.location.replace("game.html")}

ifNotMobileThanGoGame()

window.addEventListener("resize", ifNotMobileThanGoGame)
let ifMobileThanGoAway = () => {if (window.matchMedia("only screen and (max-width: 760px)").matches) window.location.replace("mobile.html")}

ifMobileThanGoAway()

function onWindowResize() {
    ifMobileThanGoAway()
    updateTextX()
    updateTextY()
    updateFontSize()
}
window.addEventListener('resize', onWindowResize, false)
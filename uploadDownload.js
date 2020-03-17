function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

let currentOnFileElementChangeFunction
let fileElement

function onFileElementChangeFunction(onUploaded) {
    return function() {
        var fileReader = new FileReader();
        if (fileElement.files[0].name.substr(-3) === 'fb2')
            fileReader.onload = function (e) {
                fileElement.removeEventListener('change', currentOnFileElementChangeFunction)
                fileElement.remove()
                return onUploaded(fb2TextExtractor.extract(fileReader.result))
            }
        else
            fileReader.onload = function (e) {
                fileElement.removeEventListener('change', currentOnFileElementChangeFunction)
                fileElement.remove()
                return onUploaded(fileReader.result)
            }
        fileReader.readAsText(fileElement.files[0]);
    }
}

function upload(onUploaded, fileExtension) {
    fileElement = document.createElement('input')
    fileElement.type = 'file'
    fileElement.accept = '.' + fileExtension

    currentOnFileElementChangeFunction = onFileElementChangeFunction(onUploaded)
    fileElement.addEventListener('change', currentOnFileElementChangeFunction)
    fileElement.click()
}
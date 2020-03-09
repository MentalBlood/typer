import re
import secret

def includeJSFile(textToIncludeIn, fileToIncludeName):
    with open(fileToIncludeName, 'r') as fileToInclude:
        return textToIncludeIn.replace(' src="' + fileToIncludeName + '">', '>' + fileToInclude.read())

with open('game.html', 'r') as inputFile, open('gameBuild.html', 'w') as outputFile:
    inputFileText = inputFile.read()
    outputFileText = includeJSFile(inputFileText, 'main.js')
    outputFileText = includeJSFile(outputFileText, 'dat.gui.js')

    outputFileText = re.sub(' +', ' ', outputFileText)
    outputFileText = re.sub('//*\n', '', outputFileText)
    outputFile.write(outputFileText)

oldIndexText = ''
newIndexText = ''
with open('index.html', 'r') as indexFile:
    oldIndexText = indexFile.read()
    newIndexText = oldIndexText.replace('game.html', 'gameBuild.html')
with open('index.html', 'w') as indexFile:
    indexFile.write(newIndexText)

secret.uploadToFTP('index.html')

with open('index.html', 'w') as indexFile:
    indexFile.write(oldIndexText)

secret.uploadToFTP('gameBuild.html')
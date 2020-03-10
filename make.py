import re
import secret
from os import listdir
from os.path import isfile, join

def filesNames(extension, whatMustNotBeInFileName):
    whatMustBeInFileName = '.' + extension
    return [fileName for fileName in listdir('.') if (isfile(join('.', fileName)) and (whatMustBeInFileName in fileName) and ((not whatMustNotBeInFileName) or (not (whatMustNotBeInFileName in fileName))))]

def makeIncludes(fileWithIncludesName):
    with open(fileWithIncludesName, 'r') as fileWithIncludes, open(fileWithIncludesName + '.build', 'w') as outputFile:
        fileWithIncludesText = fileWithIncludes.read()
        shift = 0
        while True:
            index = fileWithIncludesText.find('type="text/javascript" src="', shift)
            if index == -1:
                break
            quotesBeforeFileNameIndex = index + len('type="text/javascript" src="') - 1
            fileToIncludeName = fileWithIncludesText[quotesBeforeFileNameIndex + 1:fileWithIncludesText.find('"', quotesBeforeFileNameIndex + 1)]
            print('\t' + fileToIncludeName)
            shift = quotesBeforeFileNameIndex - len(' src="') + len('>')
            with open(fileToIncludeName, 'r') as fileToInclude:
                fileToIncludeText = fileToInclude.read()
                fileWithIncludesText = fileWithIncludesText.replace(' src="' + fileToIncludeName + '">', '>' + fileToIncludeText)
                shift += len(fileToIncludeText)
        outputFile.write(fileWithIncludesText)

for name in filesNames('html', '.build'):
    print(name)
    makeIncludes(name)

for buildName in filesNames('build', False):
    buildNameOnServer = buildName.replace('.build', '')
    print('uploading', buildName, 'as', buildNameOnServer)
    secret.uploadToFTP(buildName, buildNameOnServer)
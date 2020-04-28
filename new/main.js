const settingsButton = document.querySelector('.settings-button');
const settingsContent = document.querySelector('.settings-content');

settingsButton.onclick = function() {
    settingsContent.classList.toggle('opened');
};

const folderTitles = document.querySelectorAll('.settings-content .folder-title');

for (let folderTitle of folderTitles) {
    const currentTitleId = folderTitle.id;
    const currentFolder = document.querySelector('#_' + currentTitleId);
    folderTitle.onclick = function() {
        currentFolder.classList.toggle('opened');
    }
}

function bind(id, dictionary, key) {
    const settingController = document.querySelector('#' + id + '>.setting-controller');
    settingController.onchange = function() {
        dictionary[key] = this.value;
    }
}

const dictionary = {'font size': 10}

bind('fontSize', dictionary, 'font size');
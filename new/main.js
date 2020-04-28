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

function bind(id, dictionary, key, preprocessor) {
    const settingController = document.querySelector('#' + id + '>.setting-controller');
    dictionary[key] = settingController.value;
    settingController.onchange = function() {
        if (preprocessor)
            dictionary[key] = preprocessor(this.value);
        else
            dictionary[key] = this.value;
    }
}

let textToType = document.getElementById('text');

bind('fontSize', textToType.style, 'fontSize', value => value + 'vh');
bind('fontColor', textToType.style, 'color');
bind('backgroundColor', document.body.style, 'backgroundColor')
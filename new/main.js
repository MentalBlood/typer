const settingsButton = document.querySelector('.settings-button');
const settingsContent = document.querySelector('.settings-content');

settingsButton.onclick = function() {
    settingsContent.classList.toggle('opened');
};

const folderTitles = document.querySelectorAll('.settings-content .folder-title');

for (let folderTitle of folderTitles) {
    const currentTitleId = folderTitle.id;
    const currentContent = document.querySelector('#' + currentTitleId + ' + .folder-content');
    folderTitle.onclick = function() {
        currentContent.classList.toggle('opened');
    }
}
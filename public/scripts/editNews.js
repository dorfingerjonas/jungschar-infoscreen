window.addEventListener('load', () => {
    const parent = document.getElementById('newsWrapper');
    const socket = getSocket();

    socket.emit('get all news', null);

    socket.on('all news', data => {
        removeAllChildren(parent);
        printShortcutButtons();
        printCreateNewsWindow();

        for (const news of data) {
            parent.appendChild(createNewsItem(news));
        }
    });

    function createNewsItem(news) {
        const newNews = document.createElement('div');
        const headline = document.createElement('input');
        const content = document.createElement('textarea');
        const checkbox = document.createElement('input');
        const checkboxLabel = document.createElement('label');
        const inputWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const checkBoxWrapper = document.createElement('div');

        headline.type = 'text';
        checkbox.type = 'checkbox';

        headline.value = news.headline;
        content.value = news.content;
        checkbox.checked = news.isVisible;
        headline.placeholder = 'Titel';
        content.placeholder = 'Inhalt';
        checkboxLabel.textContent = 'Sichtbar';

        headline.readOnly = true;
        content.readOnly = true;
        checkbox.readOnly = true;

        const startEditBtn = document.createElement('div');
        const saveEditBtn = document.createElement('div');
        const cancelEditBtn = document.createElement('div');
        const deleteNewsBtn = document.createElement('div');

        startEditBtn.textContent = 'Bearbeiten';
        saveEditBtn.textContent = 'Speichern';
        cancelEditBtn.textContent = 'Abbrechen';
        deleteNewsBtn.textContent = 'Löschen';

        saveEditBtn.classList.add('disable');
        cancelEditBtn.classList.add('disable');

        checkbox.addEventListener('click', () => {
            if (!checkbox.className.includes('active')) {
                checkbox.checked = !checkbox.checked;
            }
        });

        startEditBtn.addEventListener('click', () => {                
            if (!startEditBtn.className.includes('disable')) {
                headline.readOnly = false;
                content.readOnly = false;
                checkbox.readOnly = false;
                headline.classList.add('active');
                content.classList.add('active');
                checkbox.classList.add('active');

                headline.oldVal = headline.value;
                content.oldVal = content.value;
                checkbox.oldVal = checkbox.checked;
                
                startEditBtn.classList.add('disable');
                deleteNewsBtn.classList.add('disable');
                saveEditBtn.classList.remove('disable');
                cancelEditBtn.classList.remove('disable');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
            if (!cancelEditBtn.className.includes('disable')) {
                if (headline.oldVal === headline.value
                    && content.oldVal === content.value
                    && checkbox.oldVal === checkbox.checked) {

                    headline.readOnly = true;    
                    content.readOnly = true;
                    checkbox.readOnly = true;
                    headline.classList.remove('active');
                    content.classList.remove('active');
                    checkbox.classList.remove('active');
                    
                    saveEditBtn.classList.add('disable');
                    cancelEditBtn.classList.add('disable');
                    startEditBtn.classList.remove('disable');
                    deleteNewsBtn.classList.remove('disable');
                } else {
                    showFeedbackMessage(false, 'ungespeicherte Änderungen');
                }
            }
        });

        saveEditBtn.addEventListener('click', () => {
            if (!saveEditBtn.className.includes('disable')) {
                if (headline.value.trim() !== '') {
                    headline.readOnly = true;
                    content.readOnly = true;
                    headline.classList.remove('active');
                    content.classList.remove('active');
                    checkbox.classList.remove('active');
                    
                    saveEditBtn.classList.add('disable');
                    cancelEditBtn.classList.add('disable');
                    startEditBtn.classList.remove('disable');
                    deleteNewsBtn.classList.remove('disable');
                    
                    const newsToUpdate = {
                        id: news.id,
                        headline: headline.value,
                        content: content.value,
                        isVisible: checkbox.checked
                    };
                    
                    socket.emit('update news', newsToUpdate);
                    showFeedbackMessage(true, 'News aktualisiert');
                } else {
                    showFeedbackMessage(false, 'Titel ist leer');
                }
            }
        });

        deleteNewsBtn.addEventListener('click', () => {
            const newsToDelete = {
                id: news.id,
                headline: headline.value,
                content: content.value,
                isVisible: checkbox.checked
            };
            
            socket.emit('delete news', newsToDelete);
            
            parent.removeChild(newNews);
            showFeedbackMessage(true, 'News gelöscht');
        });

        newNews.classList.add('news');
        inputWrapper.classList.add('inputWrapper');
        buttonWrapper.classList.add('buttonWrapper');
        checkBoxWrapper.classList.add('checkBoxWrapper');

        buttonWrapper.appendChild(startEditBtn);
        buttonWrapper.appendChild(saveEditBtn);
        buttonWrapper.appendChild(cancelEditBtn);
        buttonWrapper.appendChild(deleteNewsBtn);

        checkBoxWrapper.appendChild(checkboxLabel);
        checkBoxWrapper.appendChild(checkbox);

        inputWrapper.appendChild(headline);
        inputWrapper.appendChild(content);
        inputWrapper.appendChild(checkBoxWrapper);

        newNews.appendChild(inputWrapper);
        newNews.appendChild(buttonWrapper);
        return newNews;
    }

    function printShortcutButtons() {
        const newButtonBar = document.createElement('div');
        const deleteAll = document.createElement('div');
        const refresh = document.createElement('div');
        const refreshPresentationNews = document.createElement('div');
        const createNews = document.createElement('div');

        deleteAll.textContent = 'Alle löschen';
        refresh.textContent = 'Aktualisieren';
        refreshPresentationNews.textContent = 'Präsentation aktualisieren';
        createNews.textContent = 'News erstellen';

        deleteAll.classList.add('newsShortCutButton');
        refresh.classList.add('newsShortCutButton');
        refreshPresentationNews.classList.add('newsShortCutButton');
        createNews.classList.add('newsShortCutButton');
        newButtonBar.classList.add('newsShortCutBar');

        deleteAll.addEventListener('click', () => {
            socket.emit('news delete all', null);
            const news = document.getElementsByClassName('news');
            
            while (news.length !== 0) {
                parent.removeChild(parent.lastChild);
            }

            showFeedbackMessage(true, 'Alle News gelöscht');
        });

        refresh.addEventListener('click', () => {
            socket.emit('get all news', null);
            showFeedbackMessage(true, 'News aktualisiert');
        });

        refreshPresentationNews.addEventListener('click', () => {
            showFeedbackMessage(false, 'nicht implementiert');
        });

        createNews.addEventListener('click', () => {
            const createNewsWindow = document.getElementById('createNewsWindow');
            const disableCreateWindow = document.getElementById('disableCreateWindow');
            const nav = document.getElementsByTagName('nav')[0];
            const currentPageBar = document.getElementById('currentPageBar');
            createNewsWindow.classList.remove('hide');
            disableCreateWindow.classList.remove('hide');

            setTimeout(() => {
                createNewsWindow.style.opacity = 1;
                createNewsWindow.style.transform = 'scale(1)';
                parent.style.opacity = .3;
                nav.style.opacity = .3;
                currentPageBar.style.opacity = .3;
            }, 5);
        });

        newButtonBar.appendChild(deleteAll);
        newButtonBar.appendChild(refreshPresentationNews);
        newButtonBar.appendChild(refresh);
        newButtonBar.appendChild(createNews);
        parent.appendChild(newButtonBar);
    }

    function printCreateNewsWindow() {
        const createNews = document.createElement('div');
        const text = document.createElement('h2');
        const headline = document.createElement('input');
        const content = document.createElement('textarea');
        const checkbox = document.createElement('input');
        const checkboxLabel = document.createElement('label');
        const checkBoxWrapper = document.createElement('div');
        const buttonBar = document.createElement('div');
        const createButton = document.createElement('div');
        const cancelButton = document.createElement('div');
        const disableCreateWindow = document.createElement('div');

        headline.type = 'text';
        checkbox.type = 'checkbox';

        text.textContent = 'Erstelle eine neue News';
        headline.placeholder = 'Titel';
        content.placeholder = 'Inhalt';
        checkboxLabel.textContent = 'Sichtbar'
        createButton.textContent = 'Erstellen';
        cancelButton.textContent = 'Abbrechen';
        checkbox.checked = true;

        createNews.setAttribute('class', 'hide');
        createNews.setAttribute('id', 'createNewsWindow');
        checkBoxWrapper.setAttribute('id', 'checkBoxWrapper');
        buttonBar.setAttribute('id', 'buttonBar');
        disableCreateWindow.setAttribute('id', 'disableCreateWindow');
        disableCreateWindow.setAttribute('class', 'hide');

        createButton.addEventListener('click', () => {
            if (headline.value.trim() !== '') {
                const news = {
                    headline: headline.value,
                    content: content.value,
                    isVisible: checkbox.checked
                };
    
                socket.emit('add news', news);
                cancelButton.click();
    
                parent.appendChild(createNewsItem(news));

                showFeedbackMessage(true, 'News erstellt');
            } else {
                showFeedbackMessage(false, 'Titel leer');
            }
        });

        cancelButton.addEventListener('click', () => {
            const createNewsWindow = document.getElementById('createNewsWindow');
            const disableCreateWindow = document.getElementById('disableCreateWindow');
            const nav = document.getElementsByTagName('nav')[0];

            createNewsWindow.style.opacity = 0;
            createNewsWindow.style.transform = 'scale(.6)';
            parent.style.opacity = 1;
            nav.style.opacity = 1;
            currentPageBar.style.opacity = 1;

            setTimeout(() => {
                disableCreateWindow.classList.add('hide');
                createNewsWindow.classList.add('hide');
            }, 310);
        });

        disableCreateWindow.addEventListener('click', () => {
            cancelButton.click();
        });

        checkBoxWrapper.appendChild(checkboxLabel);
        checkBoxWrapper.appendChild(checkbox);

        buttonBar.appendChild(createButton);
        buttonBar.appendChild(cancelButton);

        createNews.appendChild(text);
        createNews.appendChild(headline);
        createNews.appendChild(content);
        createNews.appendChild(checkBoxWrapper);
        createNews.appendChild(buttonBar);
        document.body.appendChild(createNews);
        document.body.appendChild(disableCreateWindow);
    }
});
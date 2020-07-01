window.addEventListener('load', () => {
    const parent = document.getElementById('jobWrapper');
    const socket = getSocket();

    socket.emit('get all jobs', null);

    socket.on('all jobs', data => {
        removeAllChildren(parent);
        printShortcutButtons();
        printCreateJobsWindow();

        for (const job of data) {
            parent.appendChild(createJobItem(job));
        }
    });

    function createJobItem(job) {
        const newJob = document.createElement('div');
        const headline = document.createElement('input');
        const inputWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const checkBoxWrapper = document.createElement('div');
        const changeNumberWrapper = document.createElement('div');

        headline.type = 'text';
        headline.value = job.name;
        headline.placeholder = 'Name';
        headline.readOnly = true;

        const startEditBtn = document.createElement('div');
        const saveEditBtn = document.createElement('div');
        const cancelEditBtn = document.createElement('div');
        const deleteJobBtn = document.createElement('div');

        startEditBtn.textContent = 'Bearbeiten';
        saveEditBtn.textContent = 'Speichern';
        cancelEditBtn.textContent = 'Abbrechen';
        deleteJobBtn.textContent = 'Löschen';

        saveEditBtn.classList.add('disable');
        cancelEditBtn.classList.add('disable');

        const changeSalary = document.createElement('div');
        const salIconWrapper = document.createElement('div');
        const salLabel = document.createElement('label');
        const salary = document.createElement('span');
        const salPlusIcon = document.createElement('span');
        const salMinusIcon = document.createElement('span');

        salLabel.textContent = 'Gehalt';
        salary.textContent = job.salary;
        salPlusIcon.textContent = '+';
        salMinusIcon.textContent = '-';

        salPlusIcon.addEventListener('click', () => {
            if (salPlusIcon.className.includes('active'))
            salary.textContent = parseInt(salary.textContent) + 1;
        });

        salMinusIcon.addEventListener('click', () => {
            if (salMinusIcon.className.includes('active')
                && parseInt(salary.textContent) - 1 >= 0)
            salary.textContent = parseInt(salary.textContent) - 1;
        });

        changeSalary.appendChild(salLabel);
        changeSalary.appendChild(salary);
        salIconWrapper.appendChild(salMinusIcon);
        salIconWrapper.appendChild(salPlusIcon);
        changeSalary.appendChild(salIconWrapper);
        changeNumberWrapper.appendChild(changeSalary);
        
        const changeAmount = document.createElement('div');
        const amIconWrapper = document.createElement('div');
        const amLabel = document.createElement('label');
        const amount = document.createElement('span');
        const amPlusIcon = document.createElement('span');
        const amMinusIcon = document.createElement('span');

        amLabel.textContent = 'Arbeitsplätze';
        amount.textContent = job.amount;
        amPlusIcon.textContent = '+';
        amMinusIcon.textContent = '-';

        amPlusIcon.addEventListener('click', () => {
            if (amPlusIcon.className.includes('active'))
            amount.textContent = parseInt(amount.textContent) + 1;
        });

        amMinusIcon.addEventListener('click', () => {
            if (amMinusIcon.className.includes('active')
                && parseInt(amount.textContent) - 1 >= 0)
            amount.textContent = parseInt(amount.textContent) - 1;
        });

        changeAmount.appendChild(amLabel);
        changeAmount.appendChild(amount);
        amIconWrapper.appendChild(amMinusIcon);
        amIconWrapper.appendChild(amPlusIcon);
        changeAmount.appendChild(amIconWrapper);
        changeNumberWrapper.appendChild(changeAmount);
             
        const isVisible = document.createElement('input');
        const isVisibleLabel = document.createElement('label');
        
        isVisible.type = 'checkbox';
        isVisible.checked = job.isVisible;
        isVisible.readOnly = true;
        isVisibleLabel.textContent = 'Sichtbar';

        isVisible.addEventListener('click', () => {
            if (!isVisible.className.includes('active')) {
                isVisible.checked = !isVisible.checked;
            }
        });

        checkBoxWrapper.appendChild(isVisibleLabel);
        checkBoxWrapper.appendChild(isVisible);

        startEditBtn.addEventListener('click', () => {                
            if (!startEditBtn.className.includes('disable')) {
                headline.readOnly = false;
                isVisible.readOnly = false;
                headline.classList.add('active');
                isVisible.classList.add('active');
                salPlusIcon.classList.add('active');
                salMinusIcon.classList.add('active');
                amPlusIcon.classList.add('active');
                amMinusIcon.classList.add('active');

                headline.oldVal = headline.value;
                isVisible.oldVal = isVisible.checked;
                salary.oldVal = salary.textContent;
                amount.oldVal = amount.textContent;
                
                startEditBtn.classList.add('disable');
                deleteJobBtn.classList.add('disable');
                saveEditBtn.classList.remove('disable');
                cancelEditBtn.classList.remove('disable');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
            if (!cancelEditBtn.className.includes('disable')) {
                if (headline.oldVal === headline.value
                    && salary.oldVal === salary.textContent
                    && amount.oldVal === amount.textContent
                    && isVisible.oldVal === isVisible.checked) {

                    headline.readOnly = true;
                    isVisible.readOnly = true;

                    headline.classList.remove('active');
                    isVisible.classList.remove('active');
                    salPlusIcon.classList.remove('active');
                    salMinusIcon.classList.remove('active');
                    amPlusIcon.classList.remove('active');
                    amMinusIcon.classList.remove('active');
                    
                    saveEditBtn.classList.add('disable');
                    cancelEditBtn.classList.add('disable');
                    startEditBtn.classList.remove('disable');
                    deleteJobBtn.classList.remove('disable');
                } else {                    
                    showFeedbackMessage(false, 'ungespeicherte Änderungen');
                }
            }
        });

        saveEditBtn.addEventListener('click', () => {
            if (!saveEditBtn.className.includes('disable')) {
                if (headline.value.trim() !== '') {
                    headline.readOnly = true;
                    isVisible.readOnly = true;

                    headline.classList.remove('active');
                    isVisible.classList.remove('active');
                    salPlusIcon.classList.remove('active');
                    salMinusIcon.classList.remove('active');
                    amPlusIcon.classList.remove('active');
                    amMinusIcon.classList.remove('active');
                    
                    saveEditBtn.classList.add('disable');
                    cancelEditBtn.classList.add('disable');
                    startEditBtn.classList.remove('disable');
                    deleteJobBtn.classList.remove('disable');
                    
                    const jobToUpdate = {
                        id: job.id,
                        name: headline.value,
                        salary: parseInt(salary.textContent),
                        amount: parseInt(amount.textContent),
                        isVisible: isVisible.checked
                    };
                    
                    socket.emit('update job', jobToUpdate);
                    showFeedbackMessage(true, 'Jobs aktualisiert');
                } else {
                    showFeedbackMessage(false, 'Name ist leer');
                }
            }
        });

        deleteJobBtn.addEventListener('click', () => {
            const jobToDelete = {
                id: job.id,
                name: headline.value,
                salary: parseInt(salary.textContent),
                amount: parseInt(amount.textContent),
                isVisible: isVisible.checked
            };
            
            socket.emit('delete job', jobToDelete);
            
            parent.removeChild(newJob);
            showFeedbackMessage(true, 'Job gelöscht');
        });

        newJob.classList.add('job');
        inputWrapper.classList.add('inputWrapper');
        buttonWrapper.classList.add('buttonWrapper');
        checkBoxWrapper.classList.add('checkBoxWrapper');
        changeNumberWrapper.classList.add('changeNumberWrapper');

        buttonWrapper.appendChild(startEditBtn);
        buttonWrapper.appendChild(saveEditBtn);
        buttonWrapper.appendChild(cancelEditBtn);
        buttonWrapper.appendChild(deleteJobBtn);

        inputWrapper.appendChild(headline);
        inputWrapper.appendChild(changeNumberWrapper);
        inputWrapper.appendChild(checkBoxWrapper);

        newJob.appendChild(inputWrapper);
        newJob.appendChild(buttonWrapper);
        return newJob;
    }

    function printShortcutButtons() {
        const newButtonBar = document.createElement('div');
        const deleteAll = document.createElement('div');
        const refresh = document.createElement('div');
        const refreshPresentationJob = document.createElement('div');
        const createJob = document.createElement('div');

        deleteAll.textContent = 'Alle löschen';
        refresh.textContent = 'Aktualisieren';
        refreshPresentationJob.textContent = 'Präsentation aktualisieren';
        createJob.textContent = 'Job erstellen';

        deleteAll.classList.add('jobShortCutButton');
        refresh.classList.add('jobShortCutButton');
        refreshPresentationJob.classList.add('jobShortCutButton');
        createJob.classList.add('jobShortCutButton');
        newButtonBar.classList.add('jobShortCutBar');

        deleteAll.addEventListener('click', () => {
            socket.emit('job delete all', null);
            const job = document.getElementsByClassName('job');
            
            while (job.length !== 0) {
                parent.removeChild(parent.lastChild);
            }

            showFeedbackMessage(true, 'Alle Jobs gelöscht');
        });

        refresh.addEventListener('click', () => {
            socket.emit('get all jobs', null);
            showFeedbackMessage(true, 'Jobs aktualisiert');
        });

        refreshPresentationJob.addEventListener('click', () => {
            socket.emit('request jobs', null);
            showFeedbackMessage(true, 'Präsentation aktualisiert');
        });

        createJob.addEventListener('click', () => {
            const createJobWindow = document.getElementById('createJobWindow');
            const disableCreateWindow = document.getElementById('disableCreateWindow');
            const nav = document.getElementsByTagName('nav')[0];
            const currentPageBar = document.getElementById('currentPageBar');
            createJobWindow.classList.remove('hide');
            disableCreateWindow.classList.remove('hide');

            setTimeout(() => {
                createJobWindow.style.opacity = 1;
                createJobWindow.style.transform = 'scale(1)';
                parent.style.opacity = .3;
                nav.style.opacity = .3;
                currentPageBar.style.opacity = .3;
            }, 5);
        });

        newButtonBar.appendChild(deleteAll);
        newButtonBar.appendChild(refreshPresentationJob);
        newButtonBar.appendChild(refresh);
        newButtonBar.appendChild(createJob);
        parent.appendChild(newButtonBar);
    }

    function printCreateJobsWindow() {
        const createJob = document.createElement('div');
        const text = document.createElement('h2');
        const headline = document.createElement('input');
        const isVisible = document.createElement('input');
        const isVisibleLabel = document.createElement('label');
        const checkBoxWrapper = document.createElement('div');
        const buttonBar = document.createElement('div');
        const createButton = document.createElement('div');
        const cancelButton = document.createElement('div');
        const disableCreateWindow = document.createElement('div');
        const changeSalary = document.createElement('div');
        const changeAmount = document.createElement('div');

        headline.type = 'text';
        isVisible.type = 'checkbox';

        text.textContent = 'Erstelle einen neuen Job';
        headline.placeholder = 'Name';
        isVisibleLabel.textContent = 'Sichtbar'
        createButton.textContent = 'Erstellen';
        cancelButton.textContent = 'Abbrechen';
        isVisible.checked = true;

        createJob.setAttribute('class', 'hide');
        createJob.setAttribute('id', 'createJobWindow');
        checkBoxWrapper.setAttribute('id', 'checkBoxWrapper');
        buttonBar.setAttribute('id', 'buttonBar');
        disableCreateWindow.setAttribute('id', 'disableCreateWindow');
        disableCreateWindow.setAttribute('class', 'hide');
        changeSalary.setAttribute('class', 'changeSalary');
        changeAmount.setAttribute('class', 'changeAmount');

        const salIconWrapper = document.createElement('div');
        const salLabel = document.createElement('label');
        const salary = document.createElement('span');
        const salPlusIcon = document.createElement('span');
        const salMinusIcon = document.createElement('span');

        salLabel.textContent = 'Gehalt';
        salary.textContent = 0;
        salPlusIcon.textContent = '+';
        salMinusIcon.textContent = '-';

        salPlusIcon.addEventListener('click', () => {
            salary.textContent = parseInt(salary.textContent) + 1;
        });

        salMinusIcon.addEventListener('click', () => {
            if (parseInt(salary.textContent) - 1 >= 0)
            salary.textContent = parseInt(salary.textContent) - 1;
        });

        changeSalary.appendChild(salLabel);
        changeSalary.appendChild(salary);
        salIconWrapper.appendChild(salMinusIcon);
        salIconWrapper.appendChild(salPlusIcon);
        changeSalary.appendChild(salIconWrapper);
        
        const amIconWrapper = document.createElement('div');
        const amLabel = document.createElement('label');
        const amount = document.createElement('span');
        const amPlusIcon = document.createElement('span');
        const amMinusIcon = document.createElement('span');

        amLabel.textContent = 'Arbeitsplätze';
        amount.textContent = 0;
        amPlusIcon.textContent = '+';
        amMinusIcon.textContent = '-';

        amPlusIcon.addEventListener('click', () => {
            amount.textContent = parseInt(amount.textContent) + 1;
        });

        amMinusIcon.addEventListener('click', () => {
            if (parseInt(amount.textContent) - 1 >= 0)
            amount.textContent = parseInt(amount.textContent) - 1;
        });

        changeAmount.appendChild(amLabel);
        changeAmount.appendChild(amount);
        amIconWrapper.appendChild(amMinusIcon);
        amIconWrapper.appendChild(amPlusIcon);
        changeAmount.appendChild(amIconWrapper);

        createButton.addEventListener('click', () => {
            if (headline.value.trim() !== '') {
                const job = {
                    name: headline.value,
                    amount: parseInt(amount.textContent),
                    salary: parseInt(salary.textContent),
                    isVisible: isVisible.checked
                };
    
                socket.emit('add job', job);
                cancelButton.click();
    
                parent.appendChild(createJobItem(job));

                showFeedbackMessage(true, 'Job erstellt');
            } else {
                showFeedbackMessage(false, 'Name leer');
            }
        });

        cancelButton.addEventListener('click', () => {
            const createJobWindow = document.getElementById('createJobWindow');
            const disableCreateWindow = document.getElementById('disableCreateWindow');
            const nav = document.getElementsByTagName('nav')[0];

            createJobWindow.style.opacity = 0;
            createJobWindow.style.transform = 'scale(.6)';
            parent.style.opacity = 1;
            nav.style.opacity = 1;
            currentPageBar.style.opacity = 1;

            setTimeout(() => {
                disableCreateWindow.classList.add('hide');
                createJobWindow.classList.add('hide');
            }, 310);
        });

        disableCreateWindow.addEventListener('click', () => {
            cancelButton.click();
        });

        checkBoxWrapper.appendChild(isVisibleLabel);
        checkBoxWrapper.appendChild(isVisible);

        buttonBar.appendChild(createButton);
        buttonBar.appendChild(cancelButton);

        createJob.appendChild(text);
        createJob.appendChild(headline);
        createJob.appendChild(changeSalary);
        createJob.appendChild(changeAmount);
        createJob.appendChild(checkBoxWrapper);
        createJob.appendChild(buttonBar);
        document.body.appendChild(createJob);
        document.body.appendChild(disableCreateWindow);
    }
});
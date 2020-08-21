window.addEventListener('load', () => {
    const parent = document.getElementById('manageJobsWrapper');
    const socket = getSocket();
    let currency;
    let icon;

    printShortcutButtons();

    socket.emit('request currency', null);
    socket.emit('request jobs', null);
    socket.emit('request user svg', null);

    socket.on('currency', data => {
        currency = JSON.parse(data).name;
    });

    socket.on('select workplace', job => {
        selectWorkplace(job.id);
    });
    
    socket.on('deselect workplace', job => {
        deselectWorkplace(job.id);
    });

    socket.on('jobs', data => {
        if (!icon) {
            socket.on('user svg', svg => {
                icon = svg;
                printJobs(data, svg);
            });
        } else {
            printJobs(data, icon);
        }
    });

    function printJobs(data, icon) {
        removeAllChildren(parent);
        
        for (const job of data) {
            if (job.isVisible) {
                const newJob = document.createElement('div');
                const name = document.createElement('h2');
                const salary = document.createElement('p');
                const userWrapper = document.createElement('div');
        
                name.textContent = job.name;
                salary.textContent = `Gehalt: ${job.salary} ${currency}`;
        
                for (let i = 0; i < job.amount; i++) {
                    userWrapper.innerHTML += icon;
                    userWrapper.children[i].isUsed = false;
                    userWrapper.children[i].jobId = job.id;
                }

                for (const child of userWrapper.children) {
                    child.addEventListener('click', () => {
                        if (child.isUsed) {
                            socket.emit('deselect job', job);
                        } else {
                            socket.emit('select job', job);
                        }
                    });
                }
        
                userWrapper.classList.add('userWrapper');
                newJob.classList.add('job');
                newJob.setAttribute('id', `job${job.id}`);
                
                newJob.appendChild(name);
                newJob.appendChild(salary);
                newJob.appendChild(userWrapper);
                parent.appendChild(newJob);
            }
        }
    }

    function selectWorkplace(jobId) {
        const icons = document.querySelectorAll(`#job${jobId} svg`);
    
        if (!document.getElementById(`job${jobId}`).className.includes('jobFull')) {
            let i = 0;
            let placeSelected = false;
    
            while (i < icons.length && !placeSelected) {
                if (!icons[i].isUsed) {
                    for (const path of icons[i].children) {
                        path.classList.add('selectedWorkplace');
                    }
    
                    icons[i].isUsed = true;
                    placeSelected = true;
    
                    if (i === icons.length - 1) {
                        document.getElementById(`job${jobId}`).classList.add('jobFull');
                    }
                }
    
                i++;
            }
        }
    }
    
    function deselectWorkplace(jobId) {
        const icons = document.querySelectorAll(`#job${jobId} svg`);
    
        let i = icons.length - 1;
        let placeSelected = false;
    
        while (i >= 0 && !placeSelected) {
            if (icons[i].isUsed) {
                for (const path of icons[i].children) {
                    path.classList.remove('selectedWorkplace');
                }
    
                icons[i].isUsed = false;
                placeSelected = true;
                document.getElementById(`job${jobId}`).classList.remove('jobFull');
            }
    
            i--;
        }
    }

    function printShortcutButtons() {
        const newButtonBar = document.createElement('div');
        const row = document.createElement('div');
        const reset = document.createElement('div');
        const refresh = document.createElement('div');
        const switchScreen = document.createElement('div');
    
        refresh.textContent = 'Aktualisieren';
        reset.textContent = 'Zurücksetzen';
        switchScreen.textContent = 'Job Ansicht aktivieren';

        switchScreen.activate = true;
    
        refresh.classList.add('manageJobShortCutButton');
        reset.classList.add('manageJobShortCutButton');
        switchScreen.classList.add('manageJobShortCutButton');
        newButtonBar.classList.add('manageJobShortCutBar');
        row.classList.add('shortCutRow');

        socket.on('mode', mode => {
            if (mode === 'main') {
                switchScreen.textContent = 'Job Ansicht aktivieren';
                switchScreen.activate = true;
            } else if (mode === 'job') {
                switchScreen.textContent = 'Job Ansicht deaktivieren';
                switchScreen.activate = false;
            }
        });
    
        refresh.addEventListener('click', () => {
            socket.emit('request jobs', null);
            showFeedbackMessage(true, 'Jobs aktualisiert');
        });
    
        reset.addEventListener('click', () => {
            const jobs = document.querySelectorAll(`#${parent.id} .job`);

            for (const job of jobs) {
                const iconsAmount = job.querySelectorAll('.userWrapper svg').length;
                const jobId = parseInt(job.id.substring(3, job.id.length));

                for (let i = 0; i < iconsAmount; i++) {
                    socket.emit('deselect job', {id: jobId});
                }
            }

            showFeedbackMessage(true, 'Jobs zurückgesetzt');
        });
    
        switchScreen.addEventListener('click', () => {
            if (switchScreen.activate) {
                socket.emit('request mode change', 'job');
                showFeedbackMessage(true, 'Job Ansicht aktiviert');
            } else {
                socket.emit('request mode change', 'main');
                showFeedbackMessage(true, 'Job Ansicht deaktiviert');
            }
        });
    
        row.appendChild(refresh);
        row.appendChild(reset);
        row.appendChild(switchScreen);
        newButtonBar.appendChild(row);
        parent.parentElement.appendChild(newButtonBar);
    }
});
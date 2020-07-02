window.addEventListener('load', () => {
    const parent = document.getElementById('manageJobs');
    const socket = getSocket();
    let currency;
    let icon;

    socket.emit('request currency', null);
    socket.emit('request jobs', null);
    socket.emit('request user svg', null);

    socket.on('currency', data => {
        currency = data.name;
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
});
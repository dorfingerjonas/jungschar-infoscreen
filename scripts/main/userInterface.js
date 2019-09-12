window.addEventListener('load', () => {

    const title = document.getElementById('titleInput');
    const text = document.getElementById('textInput');
    const button = document.getElementById('saveNews');
    const errField = document.getElementById('errorField');
    const charsCounter = document.getElementById('charsCounter');
    const navNews = document.getElementById('navNews');
    const navJobs = document.getElementById('navJobs');
    const navBorder = document.getElementById('navBorder');
    const newsUI = document.getElementById('newsInterfaceWrapper');
    const jobsUI = document.getElementById('jobsInterfaceWrapper');
    const addNews = document.getElementById('addNews');
    const addNewsBtn = document.getElementById('addNewsBtn');

    firebase.database().ref('public/news').once('value').then((snapshot) => {
        const content = snapshot.val();

        for (let i = 0; i < content.length; i++) {
            let title = content[i].title;
            let text = content[i].text;
            let active = content[i].active;

            const contentWrapper = document.getElementById('editNews');
            const newNews = document.createElement('div');

            let titleElm = document.createElement('h2');
            let textElm = document.createElement('p');
            let activeElm = document.createElement('i');
            // let deleteElm = document.createElement('i');
            
            let elements = [titleElm, textElm];
            let output = [title, text];

            if (active) {
                activeElm.setAttribute('class', 'fas fa-ban');
            } else {
                activeElm.setAttribute('class', 'far fa-check-circle');
            }

            // deleteElm.setAttribute('class', 'far fa-trash-alt');

            for (let j = 0; j < elements.length; j++) {
                elements[j].textContent = output[j];
                newNews.appendChild(elements[j]);
            }

            activeElm.addEventListener('click', () => {
                firebase.database().ref('public/news/' + i).update({
                    active: !active
                });

                active = !active;

                if (active) {
                    activeElm.setAttribute('class', 'fas fa-ban');
                    newNews.style.opacity = 1;
                } else {
                    activeElm.setAttribute('class', 'far fa-check-circle');
                    newNews.style.opacity = 0.3;
                }
            });
            
            // deleteElm.addEventListener('click', () => {
            //     firebase.database().ref('public/news/' + i).remove();
            //     contentWrapper.removeChild(newNews);
            //     console.log('this feature is currently not working.');                
            // });

            newNews.appendChild(activeElm);
            // newNews.appendChild(deleteElm);

            contentWrapper.appendChild(newNews);
        }

        button.addEventListener('click', () => {

            if (title.value === '') {
                errField.textContent = 'Es muss ein Titel eingegeben werden!';
                errField.style.color = 'red';
            } else if (text.value === '') {
                errField.textContent = 'Es muss ein Text eingegeben werden!';
                errField.style.color = 'red';
            } else {
                firebase.database().ref('public/news/' + content.length).set({
                    title: title.value,
                    text: text.value,
                    active: true,
                    i: content.length
                });
                errField.style.color = 'black';
                errField.textContent = 'Ihre News wurde erfolgreich gespeichert.';

                
                const contentWrapper = document.getElementById('editNews');
                const newNews = document.createElement('div');
                let active = true;
                
                let titleElm = document.createElement('h2');
                let textElm = document.createElement('p');
                let activeElm = document.createElement('i');
                
                let elements = [titleElm, textElm];
                let output = [title.value, text.value];          
                
                title.value = '';
                text.value = '';

                addNewsBtn.click();

                if (active) {
                    activeElm.setAttribute('class', 'fas fa-ban');
                } else {
                    activeElm.setAttribute('class', 'far fa-check-circle');
                }

                for (let j = 0; j < elements.length; j++) {
                    elements[j].textContent = output[j];
                    newNews.appendChild(elements[j]);
                }

                activeElm.addEventListener('click', () => {
                    firebase.database().ref('public/news/' + i).update({
                        active: !active
                    });

                    active = !active;

                    if (active) {
                        activeElm.setAttribute('class', 'fas fa-ban');
                    } else {
                        activeElm.setAttribute('class', 'far fa-check-circle');
                    }
                });

                newNews.appendChild(activeElm);
                contentWrapper.appendChild(newNews);
            }
        });
    });

    addNewsBtn.addEventListener('click', () => {
        if (addNewsBtn.style.transform === 'rotateZ(135deg)') {
            addNewsBtn.style.transform = 'rotateZ(0)';
            document.getElementById('editNews').style.filter = 'blur(0)';
            addNews.style.display = 'none';
        } else {
            addNewsBtn.style.transform = 'rotateZ(135deg)';
            document.getElementById('editNews').style.filter = 'blur(3px)';
            addNews.style.display = 'flex';
        }
    });

    text.addEventListener('input', () => {
        let chars = text.value.length;

        let percent = (chars / 350) * 100;

        if (percent >= 90) {
            charsCounter.style.color = 'orange';
        }
        
        if (percent >= 96) {
            charsCounter.style.color = 'red';
        } 
        
        if (percent < 90) {
            charsCounter.style.color = 'black';
        }

        charsCounter.textContent = `${chars}/350`;
    });

    navNews.addEventListener('click', () => {
        navBorder.style.left = '0';
        newsUI.style.display = 'flex';
        jobsUI.style.display = 'none';
    });

    navJobs.addEventListener('click', () => {
        navBorder.style.left = '4vw';
        jobsUI.style.display = 'flex';
        newsUI.style.display = 'none';
    });

    firebase.database().ref('public/jobs').once('value').then((snapshot) => {

        const jobs = snapshot.val();

        for (let i = 0; i < jobs.length; i++) {
            let name = jobs[i].name;
            let members = `Mitarbeiter: ${jobs[i].members}`;
            let salary = `Gehalt: ${jobs[i].salary}`;
            let afternoon = 'Nachmittag:';
            let morning = 'Vormittag:';
    
            salary = `${salary} TVLinos`;
    
            const contentWrapper = document.getElementById('jobsInterfaceWrapper');
            const newJob = document.createElement('div');
    
            let nameBox = document.createElement('h3');
            let membersWrapper = document.createElement('div');
            let salaryWrapper = document.createElement('div');
            let memberText = document.createElement('p');
            let salaryText = document.createElement('p');

            nameBox.textContent = name;

            newJob.appendChild(nameBox);

            let wrapperElements = [members, salary];
            let wrapperContent = [memberText, salaryText];
            let wrappers = [membersWrapper, salaryWrapper];
            
            for (let j = 0; j < wrappers.length; j++) {
                let plus = document.createElement('i');
                let minus = document.createElement('i');

                wrapperContent[j].textContent = wrapperElements[j];
                wrappers[j].appendChild(wrapperContent[j]);

                wrappers[j].setAttribute('class', 'attribute');

                plus.setAttribute('class', 'fas fa-plus plusMinusBtn');
                minus.setAttribute('class', 'fas fa-minus plusMinusBtn');

                if (j === 0) {
                    wrapperContent[0].setAttribute('id', `${i}m`);

                    plus.addEventListener('click', () => {
                        let text = document.getElementById(`${i}m`);

                        let parts = text.textContent.split(' ');
                        
                        text.textContent = `Mitarbeiter: ${parseInt(parts[1]) + 1}`;
                    });
    
                    minus.addEventListener('click', () => {
                        let text = document.getElementById(`${i}m`);

                        let parts = text.textContent.split(' ');
                        
                        text.textContent = `Mitarbeiter: ${parseInt(parts[1]) - 1}`;
                    });
                } else if (j === 1) {
                    wrapperContent[1].setAttribute('id', `${i}s`);

                    plus.addEventListener('click', () => {
                        let text = document.getElementById(`${i}s`);

                        let parts = text.textContent.split(' ');
                        
                        text.textContent = `Gehalt: ${parseInt(parts[1]) + 1} TVLinos`;
                    });
    
                    minus.addEventListener('click', () => {
                        let text = document.getElementById(`${i}s`);

                        let parts = text.textContent.split(' ');
                        
                        text.textContent = `Gehalt: ${parseInt(parts[1]) - 1} TVLinos`;
                    });
                }

                let iWrapper = document.createElement('div')
                

                iWrapper.appendChild(plus);
                iWrapper.appendChild(minus);
                wrappers[j].appendChild(iWrapper);
                
                newJob.appendChild(wrappers[j]);
            }

            const checkboxes = [morning, afternoon];

            for (let k = 0; k < checkboxes.length; k++) {
                let wrapper = document.createElement('div');
                let cb = document.createElement('input');
                let text = document.createElement('p');

                cb.type = 'checkbox';
                
                if (k === 0) {
                    cb.setAttribute('id', `${i}cbm`);
                } else {
                    cb.setAttribute('id', `${i}cba`);
                }

                cb.textContent = checkboxes[k];

                if (jobs[i].morning && k === 0) cb.checked = true;
                if (jobs[i].afteroon && k === 1) cb.checked = true;

                text.textContent = checkboxes[k];

                wrapper.appendChild(text);
                wrapper.appendChild(cb);
                wrapper.setAttribute('class', 'dayCB');
                newJob.appendChild(wrapper);
            }

            newJob.setAttribute('class', 'job');

            let buttonWrapper = document.createElement('div');
            let button = document.createElement('span');

            button.textContent = 'Speichern';

            button.addEventListener('click', () => {
                let workers = document.getElementById(`${i}m`);
                let payment = document.getElementById(`${i}s`);
                const morningElm = document.getElementById(`${i}cbm`);
                const afternoonElm = document.getElementById(`${i}cba`);

                let parts = workers.textContent.split(' ');
                workers = parseInt(parts[1]);

                parts = payment.textContent.split(' ');
                payment = parseInt(parts[1]);

                firebase.database().ref('public/jobs/' + i).update({
                    members: workers,
                    salary: payment,
                    morning: morningElm.checked,
                    afteroon: afternoonElm.checked
                });
            });

            buttonWrapper.setAttribute('class', 'btnWrapper')

            buttonWrapper.appendChild(button);
            newJob.appendChild(buttonWrapper);

            contentWrapper.appendChild(newJob);
            jobs[i].element = newJob;
        }

        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        searchInput.addEventListener('input', () => {
            console.log(searchInput.value.toLowerCase());
            
            
            for (const job of jobs) {
                console.log(job.name);
                if (job.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    job.element.style.display = 'flex';
                } else {
                    job.element.style.display = 'none';
                }
            }
        });

    });
});
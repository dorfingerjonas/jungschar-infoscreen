window.addEventListener('load', () => {
    const clearBtn = document.getElementById('clear');

    const jobs = [
        {name: 'Programm-Manager (Bürgermeister)', members: 1, morning: true, afternoon: true, salary: 10},
        {name: 'Radio Max Fencer (Radio)', members: 1, morning: true, afternoon: true, salary: 10},
        {name: 'Innen Hui, außen Pfui (Duschsalon)', members: 5, morning: true, afternoon: true, salary: 10},
        {name: 'Blaulicht Report (Polizei)', members: 5, morning: true, afternoon: true, salary: 10},
        {name: 'Larrys Omlettenbude (Bäckerei)', members: 3, morning: true, afternoon: false, salary: 10},
        {name: 'Klatschblatt (Post)', members: 3, morning: true, afternoon: true, salary: 10},
        {name: 'Werbe-Joni (Werbe Videos)', members: 2, morning: true, afternoon: true, salary: 10},
        {name: 'Carinis Blingbling (Schmuck)', members: 4, morning: true, afternoon: true, salary: 10},
        {name: 'Pfusch beim Putz (Putztrupp)', members: 4, morning: true, afternoon: true, salary: 10},
        {name: '5 Sterne Koch (Küche)', members: 5, morning: true, afternoon: false, salary: 10},
        {name: 'Müll wög mit Müllölk (Müllbeseitigung)', members: 5, morning: true, afternoon: false, salary: 10},
        {name: 'Fit in (Fittnesscenter)', members: 4, morning: true, afternoon: true, salary: 10},
        {name: 'Schneiderei', members: 4, morning: true, afternoon: false, salary: 10},
        {name: 'Paparazzi (Fotografen)', members: 4, morning: true, afternoon: true, salary: 10},
        {name: 'Bauer sucht Frau (Partnervermittlung)', members: 2, morning: false, afternoon: true, salary: 10},
        {name: 'Flockis Beauty Palace', members: 4, morning: false, afternoon: true, salary: 10},
        {name: 'Sindelbörg Casino (Glücksspiele)', members: 2, morning: false, afternoon: true, salary: 10},
        {name: 'Tante Irene Laden', members: 2, morning: false, afternoon: true, salary: 10},
        {name: 'Free Walking Tours (Stadtführungen)', members: 4, morning: false, afternoon: true, salary: 10},
    ];

    const currentTime = new Date();

    if (currentTime.getHours() <= 12 || true) {
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].morning) {
                let name = jobs[i].name;
                let members = jobs[i].members;
                let salary = jobs[i].salary;

                salary = `${salary} TVLinos`;

                const contentWrapper = document.getElementById('jobWrapper');
                const newJob = document.createElement('div');

                let nameBox = document.createElement('h3');
                let memberWrapper = document.createElement('div');
                let salaryBox = document.createElement('p');

                const memberElements = [];

                for (let i = 0; i < members; i++) {
                    let memberBox = document.createElement('div');
                    memberBox.setAttribute('class', 'memberBox');

                    memberElements.push(memberBox);

                    memberBox.addEventListener('click', () => {
                        memberBox.classList.toggle('selected');

                        let isFull = '';

                        for (const member of memberElements) {

                            if (member.className.includes('selected')) {
                                isFull += 'true';
                            } else {
                                isFull += 'false';
                            }
                        }

                        if (!isFull.includes('false')) {
                            newJob.style.background = 'rgba(255, 0, 0, 0.596)';                            
                        } else {
                            newJob.style.background = 'white';
                        }

                    });

                    memberWrapper.setAttribute('class', 'memberWrapper');
                    memberWrapper.appendChild(memberBox);
                }

                nameBox.textContent = name;
                newJob.appendChild(nameBox);

                salaryBox.textContent = salary;
                newJob.appendChild(salaryBox);
                
                newJob.appendChild(memberWrapper);

                newJob.setAttribute('class', 'job');
                
                contentWrapper.appendChild(newJob);
            }
        }
    } else {
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].afternoon) {
                let name = jobs[i].name;
                let members = jobs[i].members;
                let salary = jobs[i].salary;

                salary = `${salary} TVLinos`;

                const contentWrapper = document.getElementById('jobWrapper');
                const newJob = document.createElement('div');

                let nameBox = document.createElement('h3');
                let memberWrapper = document.createElement('div');
                let salaryBox = document.createElement('p');

                const memberElements = [];

                for (let i = 0; i < members; i++) {
                    let memberBox = document.createElement('div');
                    memberBox.setAttribute('class', 'memberBox');

                    memberElements.push(memberBox);

                    memberBox.addEventListener('click', () => {
                        memberBox.classList.toggle('selected');

                        let isFull = '';

                        for (const member of memberElements) {

                            if (member.className.includes('selected')) {
                                isFull += 'true';
                            } else {
                                isFull += 'false';
                            }
                        }

                        if (!isFull.includes('false')) {
                            newJob.style.background = 'rgba(255, 0, 0, 0.596)';                            
                        } else {
                            newJob.style.background = 'white';
                        }

                    });

                    memberWrapper.setAttribute('class', 'memberWrapper');
                    memberWrapper.appendChild(memberBox);
                }

                nameBox.textContent = name;
                newJob.appendChild(nameBox);

                salaryBox.textContent = salary;
                newJob.appendChild(salaryBox);
                
                newJob.appendChild(memberWrapper);

                newJob.setAttribute('class', 'job');
                
                contentWrapper.appendChild(newJob);
            }
        }
    }

    clearBtn.addEventListener('click', () => {
        const memberElements = document.getElementsByClassName('memberBox');
        const jobElements = document.getElementsByClassName('job');

        for (const element of memberElements) {
            element.classList.remove('selected');            
        }

        for (const element of jobElements) {
            element.style.background = 'white';            
        }
    });
});

window.addEventListener('keydown', (event) => {
    const boxes = [
        document.getElementById('mainScreen'),
        document.getElementById('sideScreen'),
        document.getElementById('newsScreen'),
    ]
    if (event.key.toLowerCase() === 'j') {
        for (const box of boxes) {
            box.style.display = 'none';
        }
        document.getElementById('jobWrapper').style.display = 'flex';
    } else if (event.key.toLowerCase() === 'v') {
        for (const box of boxes) {
            box.style.display = 'flex';
        }
        document.getElementById('jobWrapper').style.display = 'none';
    }
});
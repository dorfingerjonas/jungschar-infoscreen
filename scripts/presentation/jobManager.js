window.addEventListener('load', () => {

    firebase.database().ref('public/currentPage/page').on('value', (snapshot) => {
        const wrappers = [
            document.getElementById('mainScreen'),
            document.getElementById('sideScreen'),
            document.getElementById('videoWrapper'),
            document.getElementById('timeWrapper'),
            document.getElementById('currentDay'),
            document.getElementById('currentTime'),
            document.getElementById('weatherWrapper'),
            document.getElementById('mainInfo'),
            document.getElementById('logoWrapper'),
            document.getElementById('newsScreen'),
            document.getElementById('newsWrapper')
        ];

        const jobWrapper = document.getElementById('jobWrapper');

        if (snapshot.val() === 'job') {
            for (const wrapper of wrappers) {
                wrapper.style.display = 'none';
            }
            jobWrapper.style.display = 'flex';
        } else {
            for (const wrapper of wrappers) {                
                wrapper.style.display = 'flex';
            }
            jobWrapper.style.display = 'none';
        }
    });
    
    let jobs = [];

    firebase.database().ref('public/jobs').once('value').then((snapshot) => {

        jobs = snapshot.val();

        const currentTime = new Date();

        if (currentTime.getHours() <= 12) {
            for (let i = 0; i < jobs.length; i++) {                
                if (jobs[i].morning) {
                    let name = jobs[i].name;
                    let members = jobs[i].members;
                    let salary = `${jobs[i].salary} TVLinos`;

                    const contentWrapper = document.getElementById('jobWrapper');
                    const newJob = document.createElement('div');

                    let nameBox = document.createElement('h3');
                    let memberWrapper = document.createElement('div');
                    let salaryBox = document.createElement('p');

                    let memberBoxes = [];

                    for (let j = 0; j < members; j++) {
                        let memberBox = document.createElement('div');
                        memberBox.setAttribute('class', 'memberBox');
                        memberWrapper.setAttribute('class', 'memberWrapper');
                        memberWrapper.appendChild(memberBox);
                        memberBoxes.push(memberBox);
                    }

                    let taken = 0;

                    firebase.database().ref(`public/jobs/${i}/taken`).on('value', (snapshot) => {
                        let takenJobs = snapshot.val();

                        if (takenJobs === 0) {
                            for (const box of memberBoxes) {
                                box.classList.remove('selected');
                            }
                        } else if (taken < takenJobs) {
                            for (let i = 0; i < takenJobs; i++) {
                                memberBoxes[i].classList.add('selected');                 
                            }
                        } else {
                            for (const box of memberBoxes) {
                                box.classList.remove('selected');
                            }
                            for (let i = 0; i < takenJobs; i++) {
                                memberBoxes[i].classList.add('selected');                 
                            }
                        }

                        taken = takenJobs                        

                        let isFull = '';

                        for (const member of memberBoxes) {

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

                    nameBox.textContent = name;
                    nameBox.setAttribute('class', 'jobName');
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
                if (jobs[i].afteroon) {
                    let name = jobs[i].name;
                    let members = jobs[i].members;
                    let salary = jobs[i].salary;

                    salary = `${salary} TVLinos`;

                    const contentWrapper = document.getElementById('jobWrapper');
                    const newJob = document.createElement('div');

                    let nameBox = document.createElement('h3');
                    let memberWrapper = document.createElement('div');
                    let salaryBox = document.createElement('p');

                    let memberBoxes = [];

                    for (let j = 0; j < members; j++) {
                        let memberBox = document.createElement('div');
                        memberBox.setAttribute('class', 'memberBox');
                        memberWrapper.setAttribute('class', 'memberWrapper');
                        memberWrapper.appendChild(memberBox);
                        memberBoxes.push(memberBox);
                    }

                    let taken = 0;

                    firebase.database().ref(`public/jobs/${i}/taken`).on('value', (snapshot) => {
                        let takenJobs = snapshot.val();

                        if (takenJobs === 0) {
                            for (const box of memberBoxes) {
                                box.classList.remove('selected');
                            }
                        } else if (taken < takenJobs) {
                            for (let i = 0; i < takenJobs; i++) {
                                memberBoxes[i].classList.add('selected');                 
                            }
                        } else {
                            for (const box of memberBoxes) {
                                box.classList.remove('selected');
                            }
                            for (let i = 0; i < takenJobs; i++) {
                                memberBoxes[i].classList.add('selected');                 
                            }
                        }

                        taken = takenJobs                        

                        let isFull = '';

                        for (const member of memberBoxes) {

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

                    nameBox.textContent = name;
                    nameBox.setAttribute('class', 'jobName');
                    newJob.appendChild(nameBox);

                    salaryBox.textContent = salary;
                    newJob.appendChild(salaryBox);
                    
                    newJob.appendChild(memberWrapper);

                    newJob.setAttribute('class', 'job');
                    
                    contentWrapper.appendChild(newJob);
                }
            }
        }
    });
});
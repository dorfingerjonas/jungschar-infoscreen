window.addEventListener('load', () => {
    const clearBtn = document.getElementById('clear');
    
    let jobs = [];

    firebase.database().ref('public/jobs').once('value').then((snapshot) => {

        jobs = snapshot.val();

        for (let i = 0; i < jobs.length; i++) {
            firebase.database().ref('public/jobs/' + i).update({
                taken: 0
            });
        }

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

                    const memberElements = [];

                    for (let j = 0; j < members; j++) {
                        let memberBox = document.createElement('div');
                        memberBox.setAttribute('class', 'memberBox');

                        memberElements.push(memberBox);

                        memberBox.addEventListener('click', () => {
                            
                            firebase.database().ref(`public/jobs/${i}/taken`).once('value').then((snapshot) => {
                                
                                let taken = snapshot.val();
                                
                                memberBox.classList.toggle('selected');

                                if (memberBox.className.includes('selected') && taken+1 <= members) {
                                    taken++;
                                } else {
                                    taken--;
                                }

                                firebase.database().ref('public/jobs/' + i).update({
                                    taken: taken
                                });

                                if (taken === members) {
                                    newJob.style.background = 'rgba(255, 0, 0, 0.596)';                            
                                } else {
                                    newJob.style.background = 'white';
                                }
                            });
                        });

                        memberWrapper.setAttribute('class', 'memberWrapper');
                        memberWrapper.appendChild(memberBox);
                    }

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

                    const memberElements = [];

                    for (let j = 0; j < members; j++) {
                        let memberBox = document.createElement('div');
                        memberBox.setAttribute('class', 'memberBox');

                        memberElements.push(memberBox);

                        memberBox.addEventListener('click', () => {
                            
                            firebase.database().ref(`public/jobs/${i}/taken`).once('value').then((snapshot) => {
                                
                                let taken = snapshot.val();
                                
                                memberBox.classList.toggle('selected');

                                if (memberBox.className.includes('selected') && taken+1 <= members) {
                                    taken++;
                                } else {
                                    taken--;
                                }

                                firebase.database().ref('public/jobs/' + i).update({
                                    taken: taken
                                });

                                if (taken === members) {
                                    newJob.style.background = 'rgba(255, 0, 0, 0.596)';                            
                                } else {
                                    newJob.style.background = 'white';
                                }
                            });
                        });

                        memberWrapper.setAttribute('class', 'memberWrapper');
                        memberWrapper.appendChild(memberBox);
                    }

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

        clearBtn.addEventListener('click', () => {
            const memberElements = document.getElementsByClassName('memberBox');
            const jobElements = document.getElementsByClassName('job');
    
            for (const element of memberElements) {
                element.classList.remove('selected');            
            }
    
            for (const element of jobElements) {
                element.style.background = 'white';            
            }
    
            for (let i = 0; i < jobs.length; i++) {
                firebase.database().ref('public/jobs/' + i).update({
                    taken: 0
                });
            }
        });
    });
});
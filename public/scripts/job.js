window.addEventListener('load', () => {
    const parent = document.getElementById('jobs');
    const socket = getSocket();

    socket.emit('request jobs', null);

    socket.on('jobs', data => {
        removeAllChildren(parent);
        
        
    });
});

function selectWorkplace(jobId) {
    const icons = document.querySelectorAll(`#job${jobId} .userwrapper svg`);

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
    const icons = document.querySelectorAll(`#job${jobId} .userwrapper svg`);

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
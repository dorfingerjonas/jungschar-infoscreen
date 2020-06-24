let checkSvg;
let crossSvg;
let isCreated = false;

window.addEventListener('load', () => {
    socket = getSocket();

    socket.emit('request check svg', null);

    socket.on('check svg', data => {
        checkSvg = data;
    });

    socket.emit('request cross svg', null);

    socket.on('cross svg', data => {
        crossSvg = data;        
    });

    
});

function showFeedbackMessage(success, headline) {
    if (!isCreated) createFeedbackMessage();

    document.getElementById('feedback').style.right = '1.5vw';
    
    if (success) {
        document.getElementById('crossSvg').classList.add('hide');
        document.getElementById('checkSvg').classList.remove('hide');
    } else {
        document.getElementById('checkSvg').classList.add('hide');
        document.getElementById('crossSvg').classList.remove('hide');
    }
    
    document.getElementById('feedbackText').textContent = headline;

    setTimeout(() => {
        document.getElementById('feedback').style.right = '-15vw';
    }, 3000);
}

function createFeedbackMessage() {
    if (!isCreated) {
        const parent = document.getElementById('feedback');
        const iconWrapper = document.createElement('div');
        
        iconWrapper.innerHTML += checkSvg;
        iconWrapper.innerHTML += crossSvg;

        iconWrapper.children[0].setAttribute('id', 'checkSvg');
        iconWrapper.children[1].setAttribute('id', 'crossSvg');

        const span = document.createElement('span');
        span.setAttribute('id', 'feedbackText');

        parent.appendChild(iconWrapper);
        parent.appendChild(span);

        isCreated = true;
    }
}
let socket;

function getSocket() {
    if (socket === undefined) {
        socket = io();
    }

    return socket;
}

function removeAllChildren(parent) {
    if (parent !== null && parent !== undefined) {
        if (parent.length !== undefined) {
            if (document.getElementById(parent) !== null) {
                parent = document.getElementById(parent);
            } else {
                return false;
            }
        }

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        return true;
    }

    return false;
}

function createNoElementsMessage(message) {
    const text = document.createElement('p');
    text.textContent = message || 'Keine Elemente vorhanden.';
    text.style.color = 'red';
    
    return text;
}
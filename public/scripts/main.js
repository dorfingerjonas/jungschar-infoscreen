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
            parent = document.getElementById(parent);
        }

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        return true;
    }

    return false;
}
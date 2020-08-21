window.addEventListener('load', () => {
    const parent = document.getElementById('manageMedia');
    const socket = getSocket();

    socket.emit('get all videos', null);
    socket.emit('get all images', null);

    socket.on('all videos', data => {
        removeAllChildren(parent);
        printShortcutButtons();
        printUploadMediaWindow();

        printVideos(data);
    });

    socket.on('all images', data => {
        printImages(data);
    });

    function printShortcutButtons() {
        const newButtonBar = document.createElement('div');
        const row = document.createElement('div');
        const refresh = document.createElement('div');
        const refreshPresentation = document.createElement('div');
        const uploadMedia = document.createElement('div');
    
        refresh.textContent = 'Aktualisieren';
        refreshPresentation.textContent = 'Präsentation aktualisieren';
        uploadMedia.textContent = 'Medien hochladen';
    
        refresh.setAttribute('id', 'refreshUploadMediaBtn');
        refresh.classList.add('jobShortCutButton');
        refreshPresentation.setAttribute('id', 'refreshPresentationUploadMediaBtn');
        refreshPresentation.classList.add('jobShortCutButton');
        uploadMedia.classList.add('jobShortCutButton');
        newButtonBar.classList.add('jobShortCutBar');
        row.classList.add('shortCutRow');
    
        refresh.addEventListener('click', () => {
            socket.emit('get all videos', null);
            socket.emit('get all images', null);
            showFeedbackMessage(true, 'Medien aktualisiert');
        });
    
        refreshPresentation.addEventListener('click', () => {
            socket.emit('request videos', null);
            socket.emit('request logos', null);
            showFeedbackMessage(true, 'Präsentation aktualisiert');
        });
    
        uploadMedia.addEventListener('click', () => {
            const uploadMediaWindow = document.getElementById('uploadMediaWindow');
            const disableCreateWindow = document.getElementById('disableUploadMediaWindow');
            const nav = document.getElementsByTagName('nav')[0];
            const currentPageBar = document.getElementById('currentPageBar');
            uploadMediaWindow.classList.remove('hide');
            disableCreateWindow.classList.remove('hide');
    
            setTimeout(() => {
                uploadMediaWindow.style.opacity = 1;
                uploadMediaWindow.style.transform = 'scale(1)';
                parent.style.opacity = .3;
                nav.style.opacity = .3;
                currentPageBar.style.opacity = .3;
            }, 5);
        });
    
        row.appendChild(refreshPresentation);
        row.appendChild(refresh);
        row.appendChild(uploadMedia);
        newButtonBar.appendChild(row);
        parent.appendChild(newButtonBar);
    }

    function printUploadMediaWindow() {
        const uploadMedia = document.createElement('div');
        const text = document.createElement('h2');
        const form = document.createElement('form');
        const fileInput = document.createElement('input');
        const label = document.createElement('label');
        const buttonBar = document.createElement('div');
        const uploadButton = document.createElement('input');
        const cancelButton = document.createElement('div');
        const disableUploadMediaWindow = document.createElement('div');
        const currentPageBar = document.getElementById('currentPageBar');

        fileInput.type = 'file';
        uploadButton.type = 'submit';
        uploadButton.disabled = true;

        form.action = '/fileupload';
        form.method = 'post';
        form.enctype = 'multipart/form-data';

        label.setAttribute('for', 'fileInput');
        label.id = 'fileInputStyle';
        label.textContent = 'Medien hochladen';

        fileInput.accept = 'image/png, image/jpeg, video/mp4';
        fileInput.name = 'filetoupload';
        fileInput.multiple = false;
        fileInput.id = 'fileInput';

        text.textContent = 'Neue Medien hochladen';
        uploadButton.value = 'Hochladen';
        cancelButton.textContent = 'Abbrechen';

        uploadMedia.setAttribute('class', 'hide');
        uploadMedia.setAttribute('id', 'uploadMediaWindow');
        buttonBar.setAttribute('id', 'buttonBar');
        disableUploadMediaWindow.setAttribute('id', 'disableUploadMediaWindow');
        disableUploadMediaWindow.setAttribute('class', 'hide');

        cancelButton.addEventListener('click', () => {
            const uploadMediaWindow = document.getElementById('uploadMediaWindow');
            const disableUploadMediaWindow = document.getElementById('disableUploadMediaWindow');
            const nav = document.getElementsByTagName('nav')[0];

            uploadMediaWindow.style.opacity = 0;
            uploadMediaWindow.style.transform = 'scale(.6)';
            parent.style.opacity = 1;
            nav.style.opacity = 1;
            currentPageBar.style.opacity = 1;

            setTimeout(() => {
                disableUploadMediaWindow.classList.add('hide');
                uploadMediaWindow.classList.add('hide');
                fileInput.value = '';
                uploadButton.disabled = true;
            }, 310);
        });

        disableUploadMediaWindow.addEventListener('click', () => {
            cancelButton.click();
        });

        fileInput.addEventListener('input', () => {
            if (fileInput.value.trim() === '') {
                uploadButton.disabled = true;
            } else {
                uploadButton.disabled = false;
            }
        });

        uploadButton.addEventListener('click', () => {
            cancelButton.click();
        });

        socket.on('uploadResult', res => {
            if (res)
            document.getElementById('refreshUploadMediaBtn').click();
            else showFeedbackMessage(false, 'Upload fehlgeschlagen');
        });

        buttonBar.appendChild(uploadButton);
        buttonBar.appendChild(cancelButton);

        form.appendChild(label);
        form.appendChild(fileInput);
        form.appendChild(buttonBar);

        uploadMedia.appendChild(text);
        uploadMedia.appendChild(form);
        document.body.appendChild(uploadMedia);
        document.body.appendChild(disableUploadMediaWindow);
    }

    function printVideos(videos) {
        const videosWrapper = document.createElement('div');

        const headline = document.createElement('h1');
        headline.textContent = 'Videos';

        videosWrapper.appendChild(headline);

        for (const video of videos) {
            const newVideo = document.createElement('div');
            const previewWrapper = document.createElement('div');
            const interactionWrapper = document.createElement('div');
            let timeout;

            const previewVideo = document.createElement('video');
            previewVideo.src = `../media/video/${video}`;
            previewVideo.controls = false;
            previewVideo.muted = true;
            previewVideo.loop = true;

            previewVideo.addEventListener('mouseover', () => {
                previewVideo.play();

                timeout = setTimeout(() => {
                    previewVideo.pause();
                    previewVideo.currentTime = 0;
                }, 7000);
            });

            previewVideo.addEventListener('mouseout', () => {
                previewVideo.pause();
                previewVideo.currentTime = 0;

                clearTimeout(timeout);
            });

            const title = document.createElement('p');
            title.textContent = video;

            const deleteBtn = document.createElement('div');
            deleteBtn.textContent = 'Löschen';

            deleteBtn.addEventListener('click', () => {
                socket.emit('delete video', video);
                videosWrapper.removeChild(newVideo);

                socket.emit('request videos', null);
                socket.emit('request logos', null);
                showFeedbackMessage(true, 'Video gelöscht');
            });

            interactionWrapper.classList.add('interactionWrapper');
            previewWrapper.classList.add('previewWrapper');
            newVideo.classList.add('manageMediaVideo');
            deleteBtn.classList.add('manageMediaDeleteVideoBtn');
            
            interactionWrapper.appendChild(title);
            interactionWrapper.appendChild(deleteBtn);
            previewWrapper.appendChild(previewVideo);
            newVideo.appendChild(previewWrapper);
            newVideo.appendChild(interactionWrapper);
            videosWrapper.appendChild(newVideo);
        }

        videosWrapper.classList.add('videosWrapper');
        parent.appendChild(videosWrapper);
    }

    function printImages(images) {
        const imageWrapper = document.createElement('div');

        const headline = document.createElement('h1');
        headline.textContent = 'Bilder';

        imageWrapper.appendChild(headline);

        for (const image of images) {
            const newImage = document.createElement('div');
            const previewWrapper = document.createElement('div');
            const interactionWrapper = document.createElement('div');

            const previewImage = document.createElement('img');
            previewImage.src = `../media/img/${image}`;

            const title = document.createElement('p');
            title.textContent = image;

            const deleteBtn = document.createElement('div');
            deleteBtn.textContent = 'Löschen';

            deleteBtn.addEventListener('click', () => {
                socket.emit('delete image', image);
                imageWrapper.removeChild(newImage);

                socket.emit('request videos', null);
                socket.emit('request logos', null);
                showFeedbackMessage(true, 'Bild gelöscht');
            });

            interactionWrapper.classList.add('interactionWrapper');
            previewWrapper.classList.add('previewWrapper');
            newImage.classList.add('manageMediaImage');
            deleteBtn.classList.add('manageMediaDeleteImageBtn');
            
            interactionWrapper.appendChild(title);
            interactionWrapper.appendChild(deleteBtn);
            previewWrapper.appendChild(previewImage);
            newImage.appendChild(previewWrapper);
            newImage.appendChild(interactionWrapper);
            imageWrapper.appendChild(newImage);
        }

        imageWrapper.classList.add('imageWrapper');
        parent.appendChild(imageWrapper);
    }
});
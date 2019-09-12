window.addEventListener('load', initVideos);

let timeouts = [];

window.addEventListener('keydown', (event) => {

  
  if (event.key === 'v') {
    let wrapper = document.getElementById('videoWrapper');
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }

    for (const timeout of timeouts) {
      clearTimeout(timeout);
    }

    initVideos();
  }
});

function initVideos() {
  firebase.database().ref('public/videos/counter').once('value').then((snapshot) => {
    sessionStorage.setItem('videoCounter', snapshot.val());
    printVideos();
  });

  function printVideos() {
    let first = true;

    const howMany = sessionStorage.getItem('videoCounter');

    for (let i = 0; i < howMany; i++) {
      
      const contentWrapper = document.getElementById('videoWrapper');
      const newVideo = document.createElement('video');
      const source = document.createElement('source');

      newVideo.alt = 'cannot display video';
      newVideo.draggable = false;
      newVideo.muted = true;
      source.src = `./video/video_${i}.mp4`;
      source.type = 'video/mp4';

      if (!first) {
        newVideo.setAttribute('class', 'hide');
        newVideo.style.opacity = 0;
      }

      first = false;

      newVideo.appendChild(source);

      contentWrapper.appendChild(newVideo);
    }

    document.getElementsByTagName('video')[0].play();
    document.getElementsByTagName('video')[0].setAttribute('id', 'currentVid');

    let timeout = setTimeout(() => {
      let timeout2 = setTimeout(() => {
        nextVideo();
      }, document.getElementsByTagName('video')[0].duration * 1000 + 100);
      timeouts.push(timeout2);
    }, 60);
    timeouts.push(timeout);
  }

  function nextVideo() {
      const videos = document.getElementById('videoWrapper').getElementsByTagName('video');
      let visibleIndex = -1;

      document.getElementById('currentVid').removeAttribute('id', 'currentVid');

      for (let i = 0; i < videos.length; i++) {

          if (!videos[i].className.includes('hide')) visibleIndex = i;

          videos[i].style.opacity = 0;

          let timeout = setTimeout(() => {
              videos[i].setAttribute('class', 'hide');
          }, 500);

          timeouts.push(timeout);
      }

      let timeout = setTimeout(() => {
          if (visibleIndex === videos.length - 1) visibleIndex = 0;
          else visibleIndex++;

          videos[visibleIndex].removeAttribute('class', 'hide');
          videos[visibleIndex].style.opacity = 1;
          videos[visibleIndex].setAttribute('id', 'currentVid');
          videos[visibleIndex].play();
          let timeout2 = setTimeout(() => {
            nextVideo();
          }, videos[visibleIndex].duration * 1000 + 500);
          timeouts.push(timeout2);
      }, 700);
      timeouts.push(timeout)
  }
}
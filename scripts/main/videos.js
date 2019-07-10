window.addEventListener('load', () => {

  // console.log(document.getElementsByTagName('video')[0].duration);

  //   setInterval(() => {
  //     nextNews();
  // }, 15000);

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

      source.src = `./video/video_${i}.mp4`;
      newVideo.alt = 'cannot display video';
      newVideo.draggable = false;
      newVideo.muted = true;
      source.type = 'video/mp4';

      if (!first) {
        newVideo.setAttribute('class', 'hide');
        newVideo.style.opacity = 0;
      }

      first = false;

      newVideo.appendChild(source);

      contentWrapper.appendChild(newVideo);
      console.log(`${i+1}. video added to dom`);
    }

    console.log(document.getElementsByTagName('video'));
    
    // document.getElementsByTagName('video')[0].play().then(() => { console.log('started playing video');}).catch((error) => { console.log(error.message); });
    document.getElementsByTagName('video')[0].play();

    // promise.catch((error) => {
    //   console.log(error);
    // });

    // promise.then(() => {
    //   console.log('started playing video');
    // });
  }





  // function nextNews() {
  //     const news = document.getElementById('newsWrapper').getElementsByTagName('div');
  //     let visibleIndex = -1;

  //     for (let i = 0; i < news.length; i++) {

  //         if (!news[i].className.includes('hide')) visibleIndex = i;

  //         news[i].style.opacity = 0;

  //         setTimeout(() => {
  //             news[i].setAttribute('class', 'hide');
  //         }, 500);
  //     }

  //     setTimeout(() => {
  //         if (visibleIndex === news.length - 1) visibleIndex = 0;
  //         else visibleIndex++;

  //         news[visibleIndex].removeAttribute('class', 'hide');
  //         news[visibleIndex].style.opacity = 1;
  //     }, 700);
  // }
});
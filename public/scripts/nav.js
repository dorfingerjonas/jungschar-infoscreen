window.addEventListener('load', () => {
    const currentPageBar = document.getElementById('currentPageBar');
    const elements =[
        {nav: document.getElementById('navDashboard'), screen: document.getElementById('dashboard')},
        {nav: document.getElementById('navManageJobs'), screen: document.getElementById('manageJobs')},
        {nav: document.getElementById('navEditJobs'), screen: document.getElementById('editJobs')},
        {nav: document.getElementById('navEditNews'), screen: document.getElementById('editNews')},
        {nav: document.getElementById('navEditWeather'), screen: document.getElementById('editWeather')},
        {nav: document.getElementById('navMediaContent'), screen: document.getElementById('mediaContent')},
        {nav: document.getElementById('navHelp'), screen: document.getElementById('help')}
    ];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        
        element.nav.addEventListener('click', () => {
            currentPageBar.style.left = `${i * 14.285}vw`;
            hideAll();
            element.screen.classList.remove('hide');
        });
    }

    function hideAll() {
        for (const element of elements) {
            element.screen.classList.add('hide');
        }
    }
});
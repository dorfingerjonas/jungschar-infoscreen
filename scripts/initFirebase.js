function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCNE1gB1GE1pFiC4MRcWpQjX0oi7YjB7XQ",
        authDomain: "jungscharlager-infoscreen.firebaseapp.com",
        databaseURL: "https://jungscharlager-infoscreen.firebaseio.com",
        projectId: "jungscharlager-infoscreen",
        storageBucket: "jungscharlager-infoscreen.appspot.com",
        messagingSenderId: "590263811336",
        appId: "1:590263811336:web:a74fb5400dc96ce7"
    };
      
    firebase.initializeApp(firebaseConfig);
}
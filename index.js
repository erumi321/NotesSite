window.onload = handleClientLoad;

const CLIENT_ID = '961981860273-m3c4b6mcqrhn23jpiqn4nc9ahncbt0jn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB5xjYMeoRF-RAtENXZcgQ8gxZ__-KpnYo';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

var SCOPES = 'https://www.googleapis.com/auth.drive';

var signinBtn = document.getElementById("auth-signin")
var signoutBtn = document.getElementById("auth-signout")

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function(){
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        //check initital signin state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        signinBtn.onclick = handleSignin;
        signoutBtn.onclick = handleSignout;
    }, function(err) {
        console.error(err);
    })

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            signinBtn.style.display = 'none';
            signoutBtn.style.display = 'block';
        }else{
            signinBtn.style.display = 'block';
            signoutBtn.style.display = 'none';
        }
    }
}
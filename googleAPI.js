var API_KEY = "AIzaSyBLkDtRqvHF4xFko8V3ZHE6VfMM758i9q4";
var client;
var access_token;

function onTokenResponse(tokenResponse) {
    console.log("YOOO")
    access_token = tokenResponse.access_token;
    refresh_token = tokenResponse.refresh_token;

    console.log(access_token);
    getToken();
    console.log(access_token);
}

function initClient() {
    console.log("yo")
    client = google.accounts.oauth2.initTokenClient({
        client_id: '961981860273-m3c4b6mcqrhn23jpiqn4nc9ahncbt0jn.apps.googleusercontent.com',
        callback: "onTokenResponse",
        prompt: '',
        scope: 'https://www.googleapis.com/auth/drive'
    });
    //onTokenResponse();
}
function getToken() {
    client.requestAccessToken();
}
function revokeToken() {
    google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
}
function loadCalendar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/drive/v3/files?key=' + API_KEY);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log(JSON.parse(xhr.response).files[0].name);
        }
    }
    xhr.send();
}
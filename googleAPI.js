var API_KEY = "AIzaSyBLkDtRqvHF4xFko8V3ZHE6VfMM758i9q4";
var client;
var access_token;

function initClient() {
    console.log("yo")
    client = google.accounts.oauth2.initTokenClient({
        client_id: '961981860273-m3c4b6mcqrhn23jpiqn4nc9ahncbt0jn.apps.googleusercontent.com',
        callback: (tokenResponse) => {
            access_token = tokenResponse.access_token;
            refresh_token = tokenResponse.refresh_token;
        },
        prompt: '',
        scope: 'https://www.googleapis.com/auth/drive'
    });
    getToken();
}
function getToken() {
    client.requestAccessToken();
}
function revokeToken() {
    google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
}

function getThumbnail(file, API_KEY, index) {
    var imageXHR = new XMLHttpRequest();
    imageXHR.open('GET', "https://www.googleapis.com/drive/v3/files/" + file.id + "?fields=thumbnailLink&key=" + API_KEY);
    imageXHR.setRequestHeader('Authorization', 'Bearer ' + access_token);
    
    imageXHR.onreadystatechange = () => {
        if (imageXHR.readyState === 4) {
            var imageElement = document.getElementById('sidebarImage' + index);
            console.log(imageXHR.response);
            console.log(imageElement);
            console.log(JSON.parse(imageXHR.response));
            console.log(JSON.parse(imageXHR.response).thumbnailLink);
            if (JSON.parse(imageXHR.response).thumbnailLink != null){

            imageElement.setAttribute('src', JSON.parse(imageXHR.response).thumbnailLink); 
        }
        }
    }
    imageXHR.send();
}

function loadCalendar() {
    var xhr = new XMLHttpRequest();

    requestURLParameters = [
        'orderBy', 'modifiedTime%20desc',
        'fields', 'files(id,name,hasThumbnail,thumbnailLink,iconLink)',
        'key', API_KEY
    ]

    requestURL = 'https://www.googleapis.com/drive/v3/files?'
    for(var i = 0; i < requestURLParameters.length; i+=2) {
        requestURL += requestURLParameters[i] + "=" + requestURLParameters[i + 1] + "&";
    }

    requestURL = requestURL.slice(0, -1);
    console.log(requestURL);

    xhr.open('GET', requestURL);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.setRequestHeader('Accept', 'json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            xhrJson = JSON.parse(xhr.response);
            
            cardContainer = document.getElementById("context-bar").children[1];
            
            for(var i = 0; i < xhrJson.files.length; i++){
                var file = xhrJson.files[i];
                
                var container = document.createElement('div');
                container.classList.add('context-card');

                var image = document.createElement('img');
                image.setAttribute('id', 'sidebarImage' + i);

                //image.setAttribute('src', file.iconLink);
                image.classList.add('context-card-image');

                container.appendChild(image);

                getThumbnail(file, API_KEY, i);

                var text = document.createElement('p');
                text.innerText = xhrJson.files[i].name;

                container.appendChild(text);
                cardContainer.appendChild(container);
            }
        }
    }
    xhr.send();
}
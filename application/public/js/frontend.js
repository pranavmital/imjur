// // function to slowly fade out flash messages once (and if) they appear

function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMesageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 3000);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message')
    innerFlashDiv.setAttribute('class', 'alert alert-info')
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

let flashElement = document.getElementById('flash-message');

if (flashElement) {
    setFlashMessageFadeOut(flashElement);
}


function createCard(postData) {
    return `<div class="col-sm-3" style="margin-top:10px; margin-bottom:10px;">
    <div id="post-${postData.id}}" class="card">
        <img class="card-img-top" src="${postData.thumbnail}" alt="Missing image">
        <div class="card-body">
            <h5 class="card-title">${postData.title}</h5>
            <p class="card-text">${postData.description}</p>
        </div>

        <div class="card-body">
            <a href="/post/${postData.id}" class="btn btn-primary">Post Details</a>
            <!-- <a href="#" class="card-link">Another link</a> -->
        </div>
    </div>
</div>`;
}


// checking if search button is present in DOM
// and then assigning it an onClick event
let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = executeSearch;
}

// function to execute the search when search button is pressed
function executeSearch() {
    var searchTerm = document.getElementById('search-bar').value;
    if(!searchTerm) {
        location.replace('/');
        return;
    }

    let mainContentHTML = document.getElementById('access-to-mainContent-of-page-in-dom');
    let searchURL = `/posts/search?search=${searchTerm}` 

    fetch (searchURL)
    .then ((data) => {
        return data.json();
    })
    .then ((data_json) => {
        let newMainContentHTML = '';
        data_json.results.forEach((row) => {
            newMainContentHTML += createCard(row);
        })

        console.log(newMainContentHTML);

        // I'm using bootstrap's grid system so I contained the content inside a "row" div for proper alignment
        mainContentHTML.innerHTML = `<div class="row" style="margin-top: 100px;">` + newMainContentHTML + "</div>";
        if(data_json.message) {
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch ((err) => console.log(err));

}


// frontend validation

function validate_registration(e) {

    // validate username
    let username = document.getElementById('username-input').value;
    
    if(username.length < 3) {
        alert('Your username must be at least 3 alphanumeric characters long!');
        e.preventDefault();
    }

    if(!((/[a-zA-Z]/).test(username.charAt(0)))) {
        alert('Your username must begin with a character! (a-z or A-Z)');
        e.preventDefault();
    }

    // validate password
    let password = document.getElementById('password-input').value;

    if(password.length < 8) {
        alert('Your password must be at least 8 characters long!');
        e.preventDefault();
    }

    // Creating RegEx to check for presence of uppercase, numerical, and special character
    let check_forUppercase = new RegExp("^(?=.*[A-Z])")
    let check_forNumber = new RegExp("^(?=.*\\d)")
    let check_forSpecialChar = new RegExp("^(?=.*[-+_!@#$%^&*., ?])")

    if(!(check_forUppercase.test(password))) {
        alert('Your password must contain at least one uppercase character!')
        e.preventDefault();
    }

    if(!(check_forNumber.test(password))) {
        alert('Your password must contain at least one number!')
        e.preventDefault();
    }

    if(!(check_forSpecialChar.test(password))) {
        alert('Your password must contain at least one special character!')
        e.preventDefault();
    }

    // validate password-confirm
    let passwordConfirm = document.getElementById('confirm-password').value;

    if(!(password == passwordConfirm)) {
        alert('Passwords do not match!');
        e.preventDefault();
    }
}

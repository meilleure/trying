const battleButton = document.getElementById('battle-button');
const reselectButton = document.getElementById('reselect-button');
const resultcontainer = document.getElementById('resultcontainer');
const start = document.getElementById('start');
const part = document.getElementById('part');
const parts = document.getElementById('parts')
const results = document.getElementById('results')
const timeout = document.getElementById('timeout');
const btnn = document.getElementById('btnn');
const out = document.getElementById('scores');
const startover = document.getElementById('startover');
var confirm = document.getElementById('confirm');
var outcome = document.getElementById('outcome');
var outcame = document.getElementById('outcame');

window.onload = () => {

    document.innerHTML =`

    <div class="container">
    <h1 class="title">Github Battle</h1>
    <p1 class="para">Some battles are worth fighting</p1>
    <button class="btn" type="submit" id="btnn">Get Started</button>
    </div>
    `
    part.style.visibility = 'hidden'
    parts.style.visibility = 'hidden'
    results.style.visibility = 'hidden';
    resultcontainer.style.visibility = 'hidden';

}



btnn.addEventListener('click', () => {

    part.style.visibility = 'visible';
    parts.style.visibility = 'hidden';
    results.style.visibility = 'hidden';
    start.style.visibility = 'hidden';
    resultcontainer.style.visibility = 'hidden';
   
});


let player1Data = null;
let player2Data = null;


function showError(message) {
    resultcontainer.innerHTML = `<p style="color: red">${message}</p>`;
    resultcontainer.style.visibility = 'visible';
}
function calculateScore(data) {
    const followersScore = data.followers;
    const followingScore = data.following;
    const reposScore = data.public_repos / 2;
    return followersScore + followingScore + reposScore;

}

document.getElementById("player1Form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const player1Username = document.getElementById("player1Username").value;

    if (!player1Username) {
        showError("Player One username is required.");
        return;
    }

    fetch(`https://api.github.com/users/${player1Username}`)

        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                showError("Player One not found on GitHub.");
                return;
            }

            console.log(data);

            player1Data = data;
            document.getElementById("player1DetailsDiv").removeAttribute("hidden");
            document.getElementById("player1Score").innerHTML = `Score: ${data.followers+data.following+data.public_repos/2}`;
            document.getElementById("player1Avatar").innerHTML= `<div img src=""></div>`;
            document.getElementById("player1Name").innerHTML = `Name: ${data.name}`;
            document.getElementById("playerUsername").innerHTML = `Username: ${data.login}`;
            document.getElementById("player1FollowerCount").innerHTML = `Followers: ${data.followers}`;
            document.getElementById("player1FollowingCount").innerHTML = `Following: ${data.following}`;
            document.getElementById("player1public_reposCount").innerHTML = `Public Repos: ${data.public_repos}`;
            document.getElementById("player1Avatar").src = data.avatar_url;
            part.style.visibility = 'hidden';
            parts.style.visibility = 'visible';
            results.style.visibility = 'hidden';
            resultcontainer.style.visibility = 'hidden';
            startover.style.visibility = 'hidden';

        
        })
        .catch(error => console.error(error));
});


document.getElementById("player2Form").addEventListener("submit", (event) => {
    event.preventDefault();

    const player2Username = document.getElementById("player2Username").value;

    
    fetch(`https://api.github.com/users/${player2Username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                showError("Player Two not found on GitHub.");
                return;
            }
            setTimeout(() =>  {
            player2Data = data;
            document.getElementById("player2DetailsDiv").removeAttribute("hidden");
            document.getElementById("player2Score").innerHTML = `Score: ${data.followers+data.following+data.public_repos/2}`;
            document.getElementById("player2Avatar").innerHTML = `<div img src=""></div>`;
            document.getElementById("player2Name").innerHTML = `Name: ${data.name}`;
            document.getElementById("playerUsername1").innerHTML = `Username: ${data.login}`;
            document.getElementById("player2FollowerCount").innerHTML = `Followers: ${data.followers}`;
            document.getElementById("player2FollowingCount").innerHTML = `Following: ${data.following}`;
            document.getElementById("player2public_reposCount").innerHTML = `Public Repos: ${data.public_repos}`;
            document.getElementById("player2Avatar").src = data.avatar_url;
            player1Score.style.visibility = 'hidden';
            player2Score.style.visibility ='hidden';
            out.innerHTML = ``;
            timeout.innerHTML = ``;
            part.style.visibility = 'hidden';
            parts.style.visibility = 'hidden';
            results.style.visibility = 'visible';
            resultcontainer.style.visibility = 'hidden';
            battleButton.style.visibility = 'visible';
            reselectButton.style.visibility = 'visible';
           
        }, 1000); 

        if (!player2Username) {

            showError("Player Two username is required.");
    
        }

        const timeout = document.getElementById('timeout');

        setTimeout (() => {
        results.style.visibility = 'hidden';
        parts.style.visibility = 'hidden';
        timeout.innerHTML = `<h1>One Second.....</h1>`

}), 4000;

        })
        .catch(error => console.error(error));
});



function displayResults() {

setTimeout (() => {

    player1Score.style.visibility = 'visible';
    player2Score.style.visibility ='visible';
    confirm.innerHTML = `<h1>Winner</h1>`;
    

        if (player1Data && player2Data) {
            let player1Score = player1Data.followers + player1Data.following + player1Data.public_repos / 2;
            let player2Score = player2Data.followers + player2Data.following + player2Data.public_repos / 2;

            let resultMessage = "";
            if (player1Score > player2Score) {
                outcame.innerHTML = `<p>Loser</p>`;
                outcome.innerHTML = `<p>Winner</p>`;

            } else if (player2Score > player1Score) {
                outcame.innerHTML = `<p>Winner</p>`;
                outcome.innerHTML = `<p>Loser</p>`;

            } else {

                resultMessage = "It's a tie!";
            }
        

            resultcontainer.innerHTML = `<h3>${resultMessage}</h3>`;
            resultcontainer.style.visibility = 'visible';
            results.style.visibility = 'visible';
            startover.style.visibility = 'visible';
            battleButton.style.visibility = 'hidden';
            reselectButton.style.visibility = 'hidden';
            out.innerHTML = ``
        } 
    
    
        scrollTo(0,0);

    }, 1000);

    const out = document.getElementById('scores');

    setTimeout (() => {
    scrollTo(0,0);
    results.style.visibility = 'hidden';
    parts.style.visibility = 'hidden';
    out.innerHTML = `<h1>One Moment....</h1>`


}), 4000;

    };


reselectButton.addEventListener('click', () => {
    part.style.visibility = 'visible'
    player1Username.value = '';
    player2Username.value = '';
    parts.style.visibility = 'hidden'
    results.style.visibility = 'hidden';
    resultcontainer.style.visibility = 'hidden';
    battleButton.style.visibility = 'hidden';
    reselectButton.style.visibility = 'hidden';
    scrollTo(0,0);
});


startover.addEventListener('click', () => {
    part.style.visibility = 'visible';
    player1Username.value = '';
    player2Username.value = '';
    parts.style.visibility = 'hidden'
    results.style.visibility = 'hidden';
    resultcontainer.style.visibility = 'hidden';
    startover.style.visibility = 'hidden';
    player1Score.style.visibility = 'hidden';
    player2Score.style.visibility ='hidden';
    confirm.innerHTML = `<h1>Confirm Players</h1>`;
    outcame.innerHTML = `<p>Player 2</p>`;
    outcome.innerHTML = `<p>Player 1</p>`;
    scrollTo(0,0);
});
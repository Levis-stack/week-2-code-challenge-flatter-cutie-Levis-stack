function characterNames() {
    fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        displayCharacterNames(data);
        addCharacterClickListener(data); 
    })
    .catch(error => console.error("Error fetching data:", error)); 
}

function displayCharacterNames(characters) {
    var characterList = document.getElementById('character-bar');

    characters.forEach(character => { 
        const span = document.createElement('span');
        span.innerText = character.name;  
        span.style.cursor = "pointer";  
        characterList.appendChild(span);
    });
}

function addCharacterClickListener(characters) {
    var characterList = document.getElementById('character-bar');

    characterList.addEventListener('click', event => {
        const clickedCharacter = characters.find(character => character.name === event.target.innerText);
        if (clickedCharacter) {
            displayCharacterDetails(clickedCharacter);
        }
    });
}

function displayCharacterDetails(character) {
    var detailDiv = document.getElementById('detailed-info');
    detailDiv.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}" width="300px"/>
        <h4>Total Votes: <span id="vote-count">0</span></h4>
        <form id="votes-form">
          <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
          <input type="submit" value="Add Votes" />
        </form>
        <button id="reset-btn">Reset Votes</button>
    `;
}

characterNames();  

function addVoteFunctionality() {
    document.getElementById('detailed-info').addEventListener('submit', event => {
        event.preventDefault();
        let voteCountElement = document.getElementById('vote-count');
        let votesInput = document.getElementById('votes');
        let newVotes = parseInt(votesInput.value);
        if (!isNaN(newVotes)) {
            let currentVotes = parseInt(voteCountElement.innerText);
            voteCountElement.innerText = currentVotes + newVotes;
        }
        votesInput.value = '';
    });

document.getElementById('detailed-info').addEventListener('click', event => {
    if (event.target.id === 'reset-btn') {
        document.getElementById('vote-count').innerText = '0';
    }
});
}
addVoteFunctionality();

function updateVotes(characterId) {
    fetch(`http://localhost:3000/characters/${characterId.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(characterId)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error updating votes:", error));
}
updateVotes();
let endgame = false;
let boxes = document.querySelectorAll(".grid div"); //get all boxes DOM elements
let freeBoxesArray = Array.from(document.querySelectorAll(".grid div")); // Convert to array

// Choose X
function playX(event){
    let box = event.target;
    if(!endgame && box.innerText === ""){ // make sure the box is empty and game not ended, Then play for X
        box.innerText = "X"; // place X
        let index = freeBoxesArray.indexOf(box);
        freeBoxesArray.splice(index, 1); // remove box from freeBoxesArray
        console.log("X placed in box", box);
        if(checkWin("X")) return; // check if X wins
        if(freeBoxesArray.length === 0){ // if no free boxes left, it's a draw
            alert("It's a draw!");
            endgame = true;
            return;
        }

        setTimeout(playO, 200); // let O play after 200ms (To make it seem as if AI is thinking)

    }
}

// Choose O
function playO(){
    if(endgame) return; // if game ended, do nothing
    let randomIndex = Math.floor(Math.random() * freeBoxesArray.length);
    // Now I have a random Index from the freeBoxesArray array
    let box = freeBoxesArray[randomIndex]; // assigning the random DOM element to box
    box.innerText = "O"; // place O inside a random box
    freeBoxesArray.splice(randomIndex, 1); // remove box from freeBoxesArray

    if(checkWin("O")) return; // check if O wins
    if(freeBoxesArray.length === 0){ // if no free boxes left, it's a draw
        alert("It's a draw!");
        endgame = true;
        return;
    }

    
}


function checkWin(player){
    const winCombinations = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [1,4,7], [0,3,6], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];
    for(let pattern of winCombinations){
        if(boxes[pattern[0]].innerText === player &&
           boxes[pattern[1]].innerText === player &&
           boxes[pattern[2]].innerText === player){
                highlightBoxes([boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]], player);
                alert(`${player} wins!`);
                endgame = true;
               return true; // player wins
           }
    }
    return false; // no win
}

// Add event listeners to each box
boxes.forEach(box => {
    box.addEventListener("click", playX);
});

function highlightBoxes(boxes, player){
    if(player === "X"){
        boxes.forEach(box => box.style.backgroundColor = "#d1e7dd"); // light green for X
    }
    else if(player === "O"){
        boxes.forEach(box => box.style.backgroundColor = "#f8d7da"); // light red for O
    }
}

function resetBoxColors(){
    boxes.forEach(box => box.style.backgroundColor = "white"); // reset to white
}

// Reset Game
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    boxes.forEach(box => box.innerText = ""); // Clear all boxes
    freeBoxesArray = Array.from(document.querySelectorAll(".grid div"));; // Reset free boxes array
    endgame = false; // Reset endgame flag
    resetBoxColors(); // Reset box colors
});
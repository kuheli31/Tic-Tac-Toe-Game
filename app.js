let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    removeLine(); // Remove line on reset
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked.");
        if (turnO) { // Player O
            box.innerText = "0";
            turnO = false;
        } else { // Player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    drawLine(pattern); // Draw the line after the winner is found
};

const removeLine = () => {
    const line = document.querySelector(".line");
    if (line) line.remove();
};

const drawLine = (pattern) => {
    // Get the positions of the winning pattern
    const box1 = boxes[pattern[0]];
    const box2 = boxes[pattern[1]];
    const box3 = boxes[pattern[2]];

    const line = document.createElement("div");
    line.classList.add("line");
    document.querySelector(".game").appendChild(line);

    const rect1 = box1.getBoundingClientRect();
    const rect2 = box2.getBoundingClientRect();
    const rect3 = box3.getBoundingClientRect();

    // Calculate the start and end points for the line
    const startX = rect1.left + rect1.width / 2;
    const startY = rect1.top + rect1.height / 2;
    const endX = rect3.left + rect3.width / 2;
    const endY = rect3.top + rect3.height / 2;

    // Calculate line length and rotation
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    // Set the styles for the line
    line.style.width = `${length}px`;
    line.style.top = `${startY}px`;
    line.style.left = `${startX}px`;
    line.style.transform = `rotate(${angle}deg)`;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        console.log(
            boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText
        );

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("WINNER!", pos1Val);
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

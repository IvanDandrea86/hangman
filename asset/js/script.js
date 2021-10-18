(() => {
    let generateRandomWord = () => { console.log("Random Word Generated") }
    let generateKeybord = () => {
        console.log("Keybord Generated")
    }

    let createMain = () => {
        let intro = document.getElementById("enter_game")
        intro.style.display = "none";
        let main = document.getElementById("main_game")
        main.style.display = "flex";
        generateRandomWord()
        generateKeybord()
        console.log("Main Loading")
    }


    let runHangman = () => {
        createMain()
        console.log("It Works Hangman Started")
    }

    document.getElementById("start_game").addEventListener("click", () => {
        console.log("It Works Hangman Started")
        runHangman()

    })

})();
(() => {
    const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const vocab = ["console", "javascript", "react", "quiz", "nobody", "asynchronous", "languages","fetch","mammamia","superhero","limitless","panda"]
    /**
     * Generate rundom Item.
     * 
     * @param {Array} arr - Array of elements
     * @return {String} - Randome Item from the given array 
     */
    const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
   
    /**
     * Generate random word and create nth span elment for each charachter
     * 
     * @param {Array} word - Array of elements
     * @return {String} - random word
     */
    let generateRandomWord = (word) => {
        let secret = getRandomItem(word)
        console.log("Random Word Generated")
        secret_word = Array.from(secret)
        for (elem in secret_word) {
            let head = document.getElementById("secret_word")
            let b = document.createElement("span")
            b.classList.add("sec_word")
            b.setAttribute("id", "secret-" + elem)
            b.innerHTML = secret[elem]
            head.appendChild(b)
        }
        return secret
    }
    /** 
    * Generate Keyboard creating n buttons html element based on the alphabet lenght
    * 
    * @param {Array} alphabet- Array of strings
    * 
    */
    const generateKeybord = ((alphabet) => {
       
        let head = document.getElementById("keybord")
        for (elem in alphabet) {
            let b = document.createElement("button")
            b.classList.add("letters")
            b.setAttribute("id", "let-" + alphabet[elem].toLocaleLowerCase())
            b.innerHTML = alphabet[elem]
            head.appendChild(b)
        }
        console.log("Keybord Generated")
    });
    /** 
    * Generate main_game page creating n buttons html element based on the alphabet lenght
    */
    let createMain = () => {
        let intro = document.getElementById("enter_game")
        intro.style.display = "none";
        let main = document.getElementById("main_game")
        main.style.display = "flex";
        main.style.flexDirection = "column"
        console.log("Main Loaded")
    }
    /** 
    * Lose a try modifiy the style og svg
    * @param {string} html_elem- parentnode
    * @param {Number} counter- counter for the number of try
    * @returns {Number} - counter for the number of try
    */
    let loseTray = (html_elem,counter) => {
        counter++
        console.log(html_elem)
        html_elem[counter-1].removeAttribute("display")
        return counter 
    }
    /** 
    * Show one letter of the the secret word
    * changing style.color
    * @param {Number} index- counter for the number of try
    *  
    */
    let getLetter = ((
        index) => {
        let l = document.getElementById("secret-" + index)
        l.style.color = "#000"
        console.log("Lettra" + index)
    })
     /** 
    * Check win condition pairing win_counter and  word_leght
    * 
    * @param {Number} win_counter- counter for the number of try
    * @param {Number} word_lenght- secret word lenght 
    * @return {Boolean} -
    */
    let isWin = ((w_counter, word_lenght) => {
        if (w_counter == word_lenght) return true
        else return false
    })
     /** 
    * Check lose condition pairing win_counter and  word_leght
    * 
    * @param {Number} counter- counter for the number of try
    * @return {Boolean} -
    */
    let isLost = ((counter) => {
        if (counter == 6) return true
        else return false
    })

     /** 
    * Find an element inside a string.
    * 
    * @param {String} elem -character to compare
    * @param {String} string-word to be compaired
    * @return {Array} result -array of finding charachter
    */
    let find = ((elem, string) => {
        var results = [];
        var idx = string.indexOf(elem);
        console.log("Ciao " + elem)
        while (idx != -1) {
            results.push(idx);
            idx = string.indexOf(elem, idx + 1);
        }
        return results;
    })
     /** 
    * Set and show the win meassage
    */
    let youWin = () => {
        document.querySelector("#game_end_title h2").textContent = "YOU WIN"
        console.log("You win")
    }
     /** 
    * Set and show the lose message
    */
    let youLost = () => {
        const keys = document.querySelectorAll('#keybord button')
        keys.forEach(elem => elem.disabled = true)
        document.querySelector("#game_end_title h2").textContent = "YOU LOST";
        console.log("You Lost");
    }
 /** 
    * Show secret frase wen u lost calling the getLetter() function
    * 
    * @param {Number} index -index of the letter to show
    */
let showTheSecret = ((index) => {
    for (let i = 0; i < index; i++) {
        getLetter(i)
    }
})
 /** 
    * Check win condition pairing win_counter and  word_leght
    * 
    * @param {Numbers} score- actual score
    * @param {Numbers} new_score- word to be compaired
    * @return {Numbers} - returning the higher score between the two parametrs
    */
let checkBest=((score,new_score)=>{
    if (new_score >score){
        window.localStorage.setItem("counter-best-score",new_score)
        return new_score 
    }
    window.localStorage.setItem("counter-best-score",score)
    return score
})

    /** 
    * Hangman main game 
    */
    let runHangman = () => {
        
        var score=0
        var count = 0
        var w = 0
        var result_tag=document.getElementById("try_result")
        result_tag.innerHTML=count
        console.log("It Works Hangman Started")
        createMain()
        const hang = generateRandomWord(vocab)
        console.log(hang)
        generateKeybord(alpha)
        Array.from(document.querySelectorAll("button.letters")).forEach(btn =>
            btn.addEventListener(
                "click",
                () => {
                    let char = btn.innerHTML
                    char = char.toLocaleLowerCase()
                    let found = find(char, hang)
                    var len = found.length
                    if (len == 0) {
                        console.log("You lost one try")
                        let parent =document.querySelectorAll(".svg_selector")
                        count = loseTray(parent,count)
                        console.log("lost counter:", count)
                       result_tag.innerHTML = count
                        if (isLost(count)) {
                            youLost()
                            document.getElementById("best_result").innerHTML= checkBest(score, best_score)
                            showTheSecret(hang.length)
                        }
                    } else {
                        for (elem in found) {
                            getLetter(found[elem])
                            console.log("Congratulation you the letter" + found[elem])
                            document.getElementById("let-" + char).disabled = true;
                            w++
                            console.log("win counter:", w)
                            if (isWin(w, (hang.length))) { 
                                youWin() 
                            }
                        }
                        let t= result_tag.innerHTML
                        score +=  ((len*5) -(t*0.5)) 
                        document.getElementById("score_result").innerHTML = score
                        document.getElementById("best_result").innerHTML= checkBest(score, best_score)
                    }
                })
        )
    }
    
    /** 
    * Reset Exit Function
    */
    let resetGame = () => {
        console.log("exit")
        document.getElementById("try_result").innerHTML = 0
        document.getElementById("score_result").innerHTML = 0
        document.getElementById("enter_game").removeAttribute("style")
        const parentNode = document.getElementById("main_game")
        document.getElementById("main_game").removeAttribute("style")
        const title=document.getElementById("won")
        title.innerHTML=""
        parentNode.children[2].textContent = ""
        parentNode.children[3].textContent = ""
        const key = document.getElementById("keybord")
        while (key.lastElementChild) {
            key.removeChild(key.lastElementChild);
        }
        html_elem=document.querySelectorAll(".svg_selector")
        for(let i=1; i< html_elem.length; i++){
            html_elem[i].setAttribute("display","none")
            }
        parentNode.style.display = "none"
    }
    /** 
    * Play Again function
    */
    let again = () => {
            console.log("again")
            document.getElementById("try_result").innerHTML = 0
            document.getElementById("score_result").innerHTML = 0
            const parentNode = document.getElementById("main_game")
            const title=document.getElementById("won")
            title.innerHTML=""
            parentNode.children[2].textContent = ""
            parentNode.children[3].textContent = ""
            const key = document.getElementById("keybord")
            while (key.lastElementChild) {
                key.removeChild(key.lastElementChild);
            }
            html_elem=document.querySelectorAll(".svg_selector")
            for(let i=1; i< html_elem.length; i++){
                html_elem[i].setAttribute("display","none")
                }
        runHangman()
        }
        /*----------------
               Main
        ----------------*/
//Declare localStorage best score
var best_score=window.localStorage.getItem("counter-best-score")
document.getElementById("best_result").innerHTML=best_score
//Enter the game button listener
document.getElementById("start_button").addEventListener("click", () => {
    runHangman()
    })
//Reset game button listener
document.getElementById("back").addEventListener("click", () => {
    resetGame()
    console.log("restart")
    })
//Play Again button listener    
document.getElementById("again").addEventListener("click", () => {
    again()
    console.log("again")
    })
})();


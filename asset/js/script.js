(() => {
    const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const vocab = ["console", "javascript", "react", "quiz", "nobody", "asynchronous", "languages","fetch","mammamia","superhero","limitless","panda"]
    const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    //Generate Random Word
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
    //Generate Keyboard
    let generateKeybord = ((alphabet) => {
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
    // Create main game section
    let createMain = () => {
        let intro = document.getElementById("enter_game")
        intro.style.display = "none";
        let main = document.getElementById("main_game")
        main.style.display = "flex";
        main.style.flexDirection = "column"
        console.log("Main Loaded")
    }
    // Lose a life function
    let loseTray = (c) => {
        let t = document.getElementById("try_result")
        c++
        t.innerHTML = c
        let img
        let imghead = document.getElementById("image_hangman")
        if (c == 1) {
            console.log(c)
            img = document.createElement("img")
            img.setAttribute("src", "./asset/img/hmframes/hang_" + c + ".png")
            img.setAttribute("id", "hang")
        } else {
            console.log(c)
            img = document.getElementById("hang")
            img.setAttribute("src", "./asset/img/hmframes/hang_" + c + ".png")

        }
        imghead.appendChild(img)
        return c
    }

    //Showing Letter FUnction
    let getLetter = ((i) => {
        let l = document.getElementById("secret-" + i)
        console.log(l)
        l.style.color = "#000"
        console.log("Lettra" + i)

    })

    //Win Condition
    let isWin = ((w_counter, word_lenght) => {
        if (w_counter == word_lenght) return true
        else return false
    })
    // Lost Condition
    let isLost = ((c) => {
        if (c === 6) return true
        else return false
    })
    //Find element in string custom function
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


    //Hangman main game function
    let runHangman = () => {
        var score=0
        var count = 0
        var w = 0
        
        console.log("It Works Hangman Started")
        createMain()
        const hang = generateRandomWord(vocab)
        console.log(hang)
        generateKeybord(alpha)

        Array.from(document.querySelectorAll("button.letters")).forEach(btn =>
            btn.addEventListener(
                "click",
                () => {
                    console.log(isWin(w, (hang.length)))
                    console.log(isLost(count))
                    let char = btn.innerHTML
                    char = char.toLocaleLowerCase()
                    let found = find(char, hang)
                    var len = found.length
                    if (len == 0) {
                        console.log("You lost one try")
                        count = loseTray(count)
                        console.log("lost counter:", count)
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
                        let t = document.getElementById("try_result").innerHTML
                        score +=  ((len*5) -(t*0.5)) 
                        document.getElementById("score_result").innerHTML = score
                        document.getElementById("best_result").innerHTML= checkBest(score, best_score)
                    }

                })
        )
    }

    // Win and Lose visualization Function
    let youWin = () => {
        document.querySelector("#game_end_title h2").textContent = "YOU WIN"
        console.log("You win")
    }
    let youLost = () => {
        const keys = document.querySelectorAll('#keybord button')
        keys.forEach(elem => elem.disabled = true)
        document.querySelector("#game_end_title h2").textContent = "YOU LOST";
        console.log("You Lost");
    }
    //Show secret word function
    let showTheSecret = ((index) => {
        for (i = 0; i < index; i++) {
            getLetter(i)
        }

    })
    // Check Best Score Function
    let checkBest=((s,new_s)=>{
        if (new_s >s){
            window.localStorage.setItem("counter-best-score",new_s)
            return new_s
            
        }
        window.localStorage.setItem("counter-best-score",s)
        return s
    })
    // Reset  function
    let resetGame = () => {
        console.log("exit")
        document.getElementById("try_result").innerHTML = 0
        document.getElementById("score_result").innerHTML = 0
        document.getElementById("enter_game").removeAttribute("style")
        const parentNode = document.getElementById("main_game")
        document.getElementById("main_game").removeAttribute("style")
        const title=document.getElementById("won")
        title.innerHTML=""
        console.log("target :"+title)
        parentNode.children[1].textContent = ""
        parentNode.children[2].textContent = ""
        parentNode.children[3].textContent = ""
        const key = document.getElementById("keybord")
        while (key.lastElementChild) {
            key.removeChild(key.lastElementChild);
        }
        parentNode.style.display = "none"
    }
    // Play Again function
    let again = () => {
            console.log("again")
            document.getElementById("try_result").innerHTML = 0
            document.getElementById("score_result").innerHTML = 0
            const parentNode = document.getElementById("main_game")
            const title=document.getElementById("won")
            title.innerHTML=""
            console.log("title :"+title)
            parentNode.children[1].textContent = ""
            parentNode.children[2].textContent = ""
            parentNode.children[3].textContent = ""
            const key = document.getElementById("keybord")
            while (key.lastElementChild) {
                key.removeChild(key.lastElementChild);
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
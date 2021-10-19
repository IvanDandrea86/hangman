(() => {
    const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const vocab = ["console", "javascript", "react", "quiz", "nobody", "asynchronous", "languages"]
    const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

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
    let createMain = () => {
        let intro = document.getElementById("enter_game")
        intro.style.display = "none";
        let main = document.getElementById("main_game")
        main.style.display = "flex";
        main.style.flexDirection = "column"
        console.log("Main Loaded")
    }

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

    let getLetter = ((i) => {

        let l = document.getElementById("secret-" + i)
        console.log(l)
        l.style.color = "#000"
        console.log("Lettra" + i)

    })
    let isWin = ((w_counter, word_lenght) => {
        if (w_counter == word_lenght) return true
        else return false
    })
    let isLost = ((c) => {
        if (c === 6) return true
        else return false
    })

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

    let runHangman = () => {
        var score
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
                            showTheSecret(hang.length)
                        }
                    } else {
                        for (elem in found) {
                            getLetter(found[elem])
                            console.log("Congratulation you the letter" + found[elem])

                            document.getElementById("let-" + char).disabled = true;
                            w++
                            console.log("win counter:", w)
                            if (isWin(w, (hang.length))) { youWin() }
                        }
                        let t = document.getElementById("try_result").innerHTML
                        score = +(len * 12) - t
                        document.getElementById("score_result").innerHTML = score
                    }

                })
        )
    }
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
    let showTheSecret = ((index) => {
        for (i = 0; i < index; i++) {
            getLetter(i)
        }

    })

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

    document.getElementById("start_button").addEventListener("click", () => {
        runHangman()
    })
    document.getElementById("back").addEventListener("click", () => {
        resetGame()
        console.log("restart")
    })
    document.getElementById("again").addEventListener("click", () => {
        again()
        console.log("again")
    })


})();
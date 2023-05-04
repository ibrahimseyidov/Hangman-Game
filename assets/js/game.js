class HangmanGame {
    constructor() {
        this.section1 = document.querySelector("#section-1");
        this.playBtn = document.querySelector("#play-btn");
        this.section2 = document.querySelector("#section-2");
        this.inputArea = document.querySelector("#guess-input");
        this.myScore = document.querySelector("#myScore");
        this.hangmanImg = document.querySelectorAll("#hangman");
        this.section3 = document.querySelector("#section-3");
        this.resultScore = document.querySelector("#resultScore");
        this.myMusic = document.querySelector("#myMusic");
        this.tryBtn = document.querySelector("#try-btn")

        this.count = 0;
        this.hangmanImgIndex = 0;

        this.wordsArr = ["be", "have", "do", "say", "get", "know", "give", "work", "seem", "feel", "want", "call", "leave", "reason", "developer", "javascript", "rice", "love", "accept", "request"];

        this.playBtn.addEventListener("click", this.changePage.bind(this));
        this.tryBtn.addEventListener("click", this.tryAgain.bind(this))
    }

    changePage() {
        const newSection = this.section1;
        const newSection2 = this.section2;

        newSection.style.display = "none";
        newSection2.style.display = "block";

        this.playMusic()

        const newUnderScore = this.getRandomValue();
        this.inputArea.value = newUnderScore;
    }

    tryAgain() {
        window.location.reload()
    }


    getRandomValue() {
        var randomNum = Math.floor(Math.random() * 20);
        var randomValue = this.wordsArr[randomNum];
        var underScore = [];

        for (let i = 0; i < randomValue.length; i++) {
            underScore.push("_");
        }

        var newUnderScore = underScore.join("");
        this.inputArea.value = newUnderScore;

        this.keyupHandler = (e) => {
            if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122) {
                this.findTrueKey(e, randomValue);
            }

        };

        window.addEventListener("keyup", this.keyupHandler);

        return newUnderScore;
    }

    findTrueKey(e, randomValue) {
        var key = e.key;
        var inputArr = this.inputArea.value.split("");
        var newRandomValue = randomValue.split("");

        this.checkValue(key, newRandomValue, inputArr)

    }

    checkValue(key, newRandomValue, inputArr) {

        var result = newRandomValue.every((element) => {
            return element != key
        })



        if (result) {
            this.hangmanImg[this.hangmanImgIndex].style.display = "block";
            this.hangmanImgIndex++
            if (this.hangmanImgIndex == 6) {
                this.endGame()

            }
        }

        for (let i = 0; i < newRandomValue.length; i++) {
            if (newRandomValue[i] == key) {
                inputArr.splice(i, 1, key);
                var newInput = inputArr.join("");
                this.inputArea.value = newInput;
                var result2 = inputArr.every((element) => {
                    return element != "_";
                });
                if (result2) {
                    this.count += 10;
                    this.myScore.textContent = this.count;
                    this.resultScore.textContent = this.count;
                    window.removeEventListener("keyup", this.keyupHandler);
                    this.getRandomValue();
                    this.hangmanImgIndex = 0;
                    this.hangmanImg[0].style.display = "none";
                    this.hangmanImg[1].style.display = "none";
                    this.hangmanImg[2].style.display = "none";
                    this.hangmanImg[3].style.display = "none";
                    this.hangmanImg[4].style.display = "none";
                    this.hangmanImg[5].style.display = "none";
                    break;

                }
            }

        }
    }


    endGame() {
        this.section3.style.display = "block";
        this.section2.style.display = "none";
        this.resultScore.textContent = this.count;

    }

    playMusic() {
        this.myMusic.play()
    }

}

const newHangman = new HangmanGame()

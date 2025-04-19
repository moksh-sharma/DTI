class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement
        this.words = words
        this.txt = ''
        this.wordIndex = 0
        this.wait = parseInt(wait, 10)
        this.type()
        this.isDeleting = false
    }

    type() {
        const current = this.wordIndex % this.words.length
        const fullTxt = this.words[current]

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

        let typeSpeed = 100

        if (this.isDeleting) {
            typeSpeed /= 2
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait
            this.isDeleting = true
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false
            this.wordIndex++
            typeSpeed = 500
        }

        setTimeout(() => this.type(), typeSpeed)
    }
}

document.addEventListener('DOMContentLoaded', init)

function init() {
    const darkmode = new Darkmode()
    darkmode.showWidget()

    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')
    new TypeWriter(txtElement, words, wait)
}

const targets = document.querySelectorAll('.animate')

const lazyLoad = target => {
    const io = new IntersectionObserver(
        (entries, observer) => {
            console.log(entries)

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.classList.add('fade')

                    observer.disconnect()
                }
            })
        },
        {
            threshold: 1
        }
    )
    io.observe(target)
}

targets.forEach(lazyLoad)

const lawyerModal = document.getElementById("lawyerModal");
const lawerReadMore = document.getElementById("lawyerReadMore");
const lawyerClose = document.getElementsByClassName("close")[0];

lawyerReadMore.onclick = function () {
    lawyerModal.style.display = "block";
}

lawyerClose.onclick = function () {
    lawyerModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        lawyerReadMore.style.display = "none";
    }
}

const politicsModal = document.getElementById("politicsModal");
const politicsReadMore = document.getElementById("politicsReadMore");
const politicsClose = document.getElementsByClassName("close")[1];

politicsReadMore.onclick = function () {
    politicsModal.style.display = "block";
}

politicsClose.onclick = function () {
    politicsModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == politicsModal) {
        politicsReadMore.style.display = "none";
    }
}

const freedomModal = document.getElementById("freedomModal");
const freedomReadMore = document.getElementById("freedomReadMore");
const freedomClose = document.getElementsByClassName("close")[2];

freedomReadMore.onclick = function () {
    freedomModal.style.display = "block";
}

freedomClose.onclick = function () {
    freedomModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == freedomModal) {
        freedomReadMore.style.display = "none";
    }
}


const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

function updateClock() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let ampm = "AM";

    if (h > 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;
    setTimeout(() => {
        updateClock();
    }, 1000);
}

updateClock();








const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

const apiURL = "https://api.quotable.io/random";

async function getQuote() {
    try {

        quoteEl.innerText = "Updating...";
        authorEl.innerText = "Updating...";
        const response = await fetch(apiURL);
        const data = await response.json();
        const quoteContent = data.content;
        const quoteAuthor = data.author;
        quoteEl.innerText = quoteContent;
        authorEl.innerText = "~ " + quoteAuthor;

        console.log(data);
    } catch (error) {
        console.log(error);
        quoteEl.innerText = "An error happened, try again later";
        authorEl.innerText = "An error happened";

    }
}

getQuote()

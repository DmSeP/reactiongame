const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const retry = document.querySelector('#retry')

const colors = ['#FFFF00', '#FFFF00', '#00FF00', '#00FF00']
let time = 0
let score = 0



let timerID = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
   
    screens[1].classList.add('up')
    startGame()
  }
})
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})
retry.addEventListener('click', (event) => {
  // const prime = document.querySelector('.primary')
  // prime.remove()
  screens[1].classList.remove('up')
})

function startGame() {
  board.innerHTML = ``
  score = 0
  timerID = setInterval(decreaseTime, 1000)
  setTimeout(() => {
    finishGame()
    clearInterval(timerID)
    console.log('CLEARINTERVAL')
  }, time * 1000)
  createRandomCircle()
  timeEl.parentNode.classList.remove('hide')

  setTime(time)
}
function decreaseTime() {
  //if (time === 0) {
  // finishGame()
  //} else {
  let current = --time
  if (current < 10) {
    current = `0${current}`
  }
  setTime(current)
  // }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}
function finishGame() {
  timeEl.parentNode.classList.add('hide')
  retry.classList.remove('hide')
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  setColor(circle)
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 10px ${color},0 0 15px ${color}`
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
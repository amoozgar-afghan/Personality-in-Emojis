// Const Variables
const emojiContainer = document.getElementById("emoji-container")
const emojiInput = document.getElementById("emoji-input")
const pushBtn = document.getElementById("push-btn")
const unshiftBtn = document.getElementById("unshift-btn")
const popBtn = document.getElementById("pop-btn")
const shiftBtn = document.getElementById("shift-btn")
const sizeSlec = document.getElementById("emoji-size")
const weeklyBtn = document.getElementById("weekly-btn")
const annualBtn = document.getElementById("annual-btn")
const categorySpn = document.getElementById("catagory")
const clearBtn = document.getElementById("clear-btn")
const saveBtn = document.getElementById("save-btn")

// Let variables
let weeklyEmojis
let annoulEmojis
let myEmojis
let isWeekly

// Functions
function initEmojis(){
    if(localStorage.getItem("weeklyEmojis")){
        weeklyEmojis = JSON.parse(localStorage.getItem("weeklyEmojis"))       
    } else {
        weeklyEmojis = []
    }
    
    if(localStorage.getItem("annualEmojis")){
        annoulEmojis = JSON.parse(localStorage.getItem("annualEmojis"))
    } else {
        annoulEmojis = []
    }
    
    configureEmojis(true)    
}

initEmojis()

function configureEmojis(weekly){
    if(weekly){
        categorySpn.textContent = "Weekly"
        myEmojis = weeklyEmojis
        isWeekly = true            
    }else {
        categorySpn.textContent = "Annual"
        myEmojis = annoulEmojis
        isWeekly = false
    }
    renderEmojis(myEmojis, emojiContainer)        
}

function renderEmojis(emojArr, container) {
    if(emojArr.length < 1){
        container.textContent = "Express yourself by emojis"
        return false        
    }
    container.innerHTML = ""
    for (let i = 0; i < emojArr.length; i++) {
        const emoji = document.createElement('span')
        emoji.textContent = emojArr[i].shape
        emoji.setAttribute("class", emojArr[i].importance)
        container.append(emoji)
    }
}

function modifyEmojis(action, emojArr){
    let enteredEmoji = {
        shape: emojiInput.value.trim(),
        importance: sizeSlec.value
    }
    
    if(action === "push" && enteredEmoji.shape){
        myEmojis.push(enteredEmoji)    
    } else if (action === "unshift" && enteredEmoji){
        myEmojis.unshift(enteredEmoji)        
    } else if (action === "pop"){
        myEmojis.pop()
    } else if (action === "shift"){
        myEmojis.shift()
    } else {
        return false
    }
        
    emojiInput.value = ""
    renderEmojis(myEmojis, emojiContainer)
}

// Event Listeners
pushBtn.addEventListener("click", function(){
    modifyEmojis("push", myEmojis)
})

unshiftBtn.addEventListener("click", function(){
    modifyEmojis("unshift", myEmojis)
})

popBtn.addEventListener("click", function() {
    modifyEmojis("pop", myEmojis)
})

shiftBtn.addEventListener("click", function() {
    modifyEmojis("shift", myEmojis)
})

weeklyBtn.addEventListener("click", function(){
    configureEmojis(true)
})

annualBtn.addEventListener("click", function(){
    configureEmojis(false)
})

clearBtn.addEventListener("click", function(){
    localStorage.clear()
    weeklyEmojis = []
    annoulEmojis = []
    configureEmojis(isWeekly)
})

saveBtn.addEventListener("click", function(){
    if(isWeekly){
        localStorage.setItem("weeklyEmojis", JSON.stringify(myEmojis))    
    } else {
        localStorage.setItem("annualEmojis", JSON.stringify(myEmojis))
    }
})
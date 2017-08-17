function updateScreen() {
    docElement.userNameDisplay.innerHTML = userData.name; //get the username and display one screen.
    
    var frenchPercentage = Math.round((userData.frenchCorrect / (userData.frenchWrong + userData.frenchCorrect)) * 100) || 0; //calculate the french score.
    var spanishPercentage = Math.round((userData.spanishCorrect / (userData.spanishWrong + userData.spanishCorrect)) * 100) || 0; //calculate the spanish score.
    var germanPercentage = Math.round((userData.germanCorrect / (userData.germanWrong + userData.germanCorrect)) * 100) || 0; //calculate the german score.
    
    document.getElementById("frenchKnowledge").value = frenchPercentage; //display the percentages into the progress bars.
    document.getElementById("spanishKnowledge").value = spanishPercentage;
    document.getElementById("germanKnowledge").value = germanPercentage;
    
    if (frenchPercentage >= 33) {
        document.getElementById("frL2").disabled = false; //if the percentage is higher that 33%, it will unlock level 2.
        document.getElementById("frL3").disabled = true;
        if (frenchPercentage >= 66) {
            document.getElementById("frL3").disabled = false; //if it is higher than 66% it will unlock level 3.
        }
    } else {
        document.getElementById("frL2").disabled = true; //otherwise it will unlock both.
        document.getElementById("frL3").disabled = true;
    }
    
    if (spanishPercentage >= 33) {
        document.getElementById("spL2").disabled = false; //if the percentage is higher that 33%, it will unlock level 2.
        document.getElementById("spL3").disabled = true;
        if (spanishPercentage >= 66) {
            document.getElementById("spL3").disabled = false; //if it is higher than 66% it will unlock level 3.
        }
    } else {
        document.getElementById("spL2").disabled = true; //otherwise it will unlock both.
        document.getElementById("spL3").disabled = true;
    }
    
    if (germanPercentage >= 33) {
        document.getElementById("grL2").disabled = false; //if the percentage is higher that 33%, it will unlock level 2.
        document.getElementById("grL3").disabled = true;
        if (germanPercentage >= 66) {
            document.getElementById("grL3").disabled = false; //if it is higher than 66% it will unlock level 3.
        }
    } else {
        document.getElementById("grL2").disabled = true; //otherwise it will unlock both.
        document.getElementById("grL3").disabled = true;
    }
    
    for (i = 0; i < userData.userAbility.length; i++) { //for each language.
        document.getElementById("abilityOutput" + i).innerHTML = ""; //Clear the inner HTML of that language.
        for (x = 0; x < userData.userAbility[i].length; x++) { //for each rating.
            var skillsLookup = ["School", "Home", "Transport", "Sports"]; //create a lookup table.
            if (userData.userAbility[i][x] <= 7) { //if less than seven set as bad.
                document.getElementById("abilityOutput" + i).innerHTML += "<span class=\"tag bad\">-" + skillsLookup[x] + "</span>";
            } else if (userData.userAbility[i][x] >= 13) { //if more than 13 set as good.
                document.getElementById("abilityOutput" + i).innerHTML += "<span class=\"tag good\">+" + skillsLookup[x] + "</span>";
            }
        }
        if (document.getElementById("abilityOutput" + i).innerHTML == "") { //If empty, then display a message telling to try more levels.
            document.getElementById("abilityOutput" + i).innerHTML = "No suggested topics yet, try some more levels.";
        }
    }
}

function saveData() {
    localStorage.setItem(userData.name.toLowerCase() + "saved", JSON.stringify(userData)); //save the data to local storage.
}

function removeData() {
    localStorage.removeItem(userData.name.toLowerCase() + "saved"); //remove the saved item from local storage.
    window.location.reload(); //reload the window.
}

function removeAllData() {
    for (var item in localStorage) { //local storage is set by keys, for each key in local storage we will remove it.
      localStorage.removeItem(item); //therefor remeoving all items as requested
    }
    window.location.reload(); //reload the window.
}

function loadData(playerName) {
	if (localStorage.getItem(playerName.toLowerCase() + "saved") === null) { //check if the user actually exists.
		console.log("Account doesn't exist.");
	} else {
		userData = JSON.parse(localStorage.getItem(playerName.toLowerCase() + "saved")); //load the saved data
		docElement.menu.style.display = "none"; //remove the menu window.
		
		document.title = "LearnLanguage - Account Page";
		updateScreen(); //update the screen.
	}
}

function newGame(playerName) {
    userData.name = playerName; //set the data to our object
    docElement.menu.style.display = "none"; //remove the menu window.
    
    document.title = "LearnLanguage - Account Page";
    updateScreen(); //update the screen.
}

function startQuiz(language, difficulty) {
    userData.quizData.quizLength = 10; //set the question count to 10
    userData.quizData.currentLanguage = language; //set the language to the passed through language
    userData.quizData.currentDifficulty = difficulty; //set the difficulty to the passed through difficulty.
    questions[difficulty].sort(function(a, b){return 0.5 - Math.random()}); //randomly sort the questions. from W3 Schools Array Randomisation site: https://www.w3schools.com/js/js_array_sort.asp
    
    userData.quizData.currentAnswer = questions[difficulty][userData.quizData.quizLength][1][userData.quizData.currentLanguage]; //Set the current location using the diff, length, then the current langaueg.
    
    document.title = "LearnLanguage - Play Lanaguage Quiz";
    docElement.question.style.display = "flex"; //display as flex to keep our centering working well.
    docElement.question.style.backgroundImage = "url(img/words/" + questions[difficulty][userData.quizData.quizLength][0] + ".jpg)"; //set the background image to the name in the words folder.
    docElement.userAnswer.value = ""; //remove the previously inputed value.
}

function userClickAnswer(userGuess) {
    if (userGuess.toLowerCase() == userData.quizData.currentAnswer.toLowerCase()) { //if the user guess and current answer are equal it is right.
        if (userData.quizData.currentLanguage == 0) {
            userData.frenchCorrect++ //increment if french language.
        } else if (userData.quizData.currentLanguage == 1) {
            userData.spanishCorrect++ //increment if spanish.
        } else if (userData.quizData.currentLanguage == 2) {
            userData.germanCorrect++ //increment if german langauge.
        }
        userData.userAbility[userData.quizData.currentLanguage][questions[userData.quizData.currentDifficulty][userData.quizData.quizLength][2]]++; //increment the count of topics they know.
        docElement.answerFeedback.innerHTML = "You are correct, answer was " + userData.quizData.currentAnswer + ".";
        docElement.answer.style.display = "block";
    } else {
        if (userData.quizData.currentLanguage == 0) {
            userData.frenchWrong++ //increment the wrong french count.
        } else if (userData.quizData.currentLanguage == 1) {
            userData.spanishWrong++ //increment the spanish wrong count.
        } else if (userData.quizData.currentLanguage == 2) {
            userData.germanWrong++ //increment the german wrong count.
        }
        userData.userAbility[userData.quizData.currentLanguage][questions[userData.quizData.currentDifficulty][userData.quizData.quizLength][2]]--; //minus from the count so that it knows what topics the user struggles with.
        docElement.answerFeedback.innerHTML = "Wrong, answer was " + userData.quizData.currentAnswer + ".";
        docElement.answer.style.display = "block";
    }
    
    if (1 < userData.quizData.quizLength) { //if more Q's left.
        userData.quizData.quizLength--; //-1 from the Q's left.
        
        userData.quizData.currentAnswer = questions[userData.quizData.currentDifficulty][userData.quizData.quizLength][1][userData.quizData.currentLanguage]; //set next answer.
		console.log(userData.quizData.currentAnswer);
        docElement.question.style.backgroundImage = "url(img/words/" + questions[userData.quizData.currentDifficulty][userData.quizData.quizLength][0] + ".jpg)"; //change thhe background.
        docElement.userAnswer.value = ""; //remove any value left over.
    } else {
        document.getElementById("question").style.display = "none"; //if no more, then display none.
        document.title = "LearnLanguage - Account Page";
        updateScreen(); //update the menu variables.
    }
}
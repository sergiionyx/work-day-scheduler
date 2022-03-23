var currentDay = document.querySelector("#currentDay");
const timeStartsAt = 8;
var index;
var tasks = [];

currentDay.textContent = "Today is " + moment().format('MMMM Do YYYY, HH:mm');

// EDIT <p> by changing to <textarea> 
$(".col-10").on("click", function () {
    var text = $(this).find("p")
        .text()
        .trim();
    //add text-area
    var textInput = $("<textarea>")
        .addClass("col-10")
        .val(text);
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");
});

// GET text from <textarea> and put in new created <p>
$(".col-10").on("blur", "textarea", function () {
    // get the textarea's current text
    var text = $(this)
        .val()
        .trim();
    if (!text) {
        text = "";
    };
    // get index
    index = $(this).closest("div").attr("id");
    index = JSON.parse(index);
    console.log(text);
    tasks[index] = text;
    //saveTask();
    // create and fill <p> element
    var taskP = $('<p>')
        .text(text);
    console.log(taskP);
    // replace <textarea> with <p> element
    $(this).replaceWith(taskP);
});

// CHECK TASK AND CHANGE THE CLASS
function checkTask () {
    //convert index into time of time-block
    time = timeStartsAt;
    var currentTime = moment().hour();
    for (let i = 0; i < 8; i++) {
        var taskEl = $("#" + i);
        // add new class
        if (currentTime > time) {
            $(taskEl).addClass("past");
        } else if (currentTime < time) {
            $(taskEl).addClass("future");
        } else if (currentTime === time) {
            $(taskEl).addClass("present");
        }
        time += 1;
    }
};

// SAVE TASK
function saveTask () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// SAVE BUTTON
$(".saveBtn").on("click", function () {
    saveTask();
    checkTask();
});

function loadTasks () {

    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
    //put values into their respective spots and audit it.
    for (var i = 0; i < 8; i++) {
        $("#" + i).find("p").text(tasks[i]);
    }

    //Give the time
    //$("#currentDay").text("Today is " + moment().format("dddd, MMMM Do YYYY, h:mm a"));
};

loadTasks();
checkTask();
var currentDay = document.querySelector("#currentDay");
const indexConvertToTime = 8;
var index;
var tasks = [];

//
currentDay.textContent = "Today is " + moment().format('MMMM Do YYYY, HH:mm');

// EDIT <p> by changing to <textarea> 
$(".col-10").on("click", function() {
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
$(".col-10").on("blur","textarea",function(){
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
    //console.log(index);
    tasks[index] = text;
    //saveTask();
    // create and fill <p> element
    var taskP = $('<p>')
    .text(text);
    
    // replace <textarea> with <p> element
    $(this).replaceWith(taskP);

    // Pass task's p element into auditTask() to check due time
    checkTask($(taskP));
});

function newOne (params) {
    console.log();
}

// CHECK TASK AND CHANGE THE CLASS
var checkTask = function(taskEl) {
    //convert index into time of time-block
    time = index + indexConvertToTime;
    var currentTime = moment().hour();

    // remove any old classes from parent div
    $(taskEl).closest("div").removeClass("past present future");

    // add new class
    if (currentTime > time) {
        $(taskEl).closest("div").addClass("past");
    } else if (currentTime < time) {
        $(taskEl).closest("div").addClass("future");
    } else if (currentTime === time) {
        $(taskEl).closest("div").addClass("present");
    }
};

// SAVE TASK
var saveTask = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// SAVE BUTTON
$(".saveBtn").on("click", function() {
    saveTask();
    checkTask();
});

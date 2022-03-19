var currentDay = document.querySelector("#currentDay");



currentDay.textContent = "Today is " + moment().format('MMMM Do YYYY, HH:mm');

tasks = [];
// EDIT <p> by changing to <textarea> 
$(".time-block").on("click", function() {
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
$(".time-block").on("blur","textarea",function(){
    // get the textarea's current text
    var text = $(this)
    .val()
    .trim();
    if (!text) {
        text = "";
    };
    // get index
    var index = $(this).closest("div").attr("id");
    index = JSON.parse(index);
    //console.log(index);
    tasks[index] = text;
    // create and fill <p> element
    var taskP = $('<p class="col-10">')
    .text(text);
    
    // replace <textarea> with <p> element
    $(this).replaceWith(taskP);

});






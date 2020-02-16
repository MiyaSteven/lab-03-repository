'use strict';



$('.pagination').click(function(){  
    page = $(this).attr(${page});  renderJSON(page, defaultSort);
});

//Getting data from the JSON file using AJAX
$.ajax(`data/page-${page}.json`, {method: 'GET' , dataType: 'JSON'})
.then(hornObjects => {
    hornObjects.forEach(hornThing => {
        new Horn(hornThing).render();
    })
    uniqueArray();
    addDropDownMenu();
    userSelection();
})

//Globar variables
let page = 
let hornsArray = [];
let keywordsArray = [];
let hornsArray2 = [];
let keywordsArray2 = [];

//Constructor function
function Horn (hornThing){
    this.image_url = hornThing.image_url;
    this.title = hornThing.title;
    this.description = hornThing.description;
    this.keyword = hornThing.keyword;
    this.horns = hornThing.horns;
    hornsArray.push(this);
}

Horn.prototype.render = function(){
    const hornTemplate = $('#photo-template').html();
    const $newSection = $('<section></section>');
    const $newOption = $('<option></option>');
    $newSection.html(hornTemplate);
    $newSection.find('h2').text(this.title);
    $newSection.addClass('section').attr('class', this.keyword);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('p').text(this.description);
    $('main').append($newSection);
}

const uniqueArray = () => {
    hornsArray.forEach(horn => {
        if (!keywordsArray.includes(horn.keyword)){
            keywordsArray.push(horn.keyword)
        }
    })
}

function addDropDownMenu(){
    const $dropdown = $('select');
    keywordsArray.forEach(keywords => {
        console.log(keywords)
        const $newOption = $(`<option value = '${keywords}'>${keywords}</option>`);
        $dropdown.append($newOption);
    });
};

let userSelection = () => {

    $('select').on('change', function() {
        let selected = this.value;
        console.log('value',selected);
        $('section').hide();
        hornsArray.forEach(image => {
            if(selected === image.keyword) {
                var keyword = selected;
                $("." + keyword).show();
            };
        });
    });
};




console.log(hornsArray);
console.log(keywordsArray);
console.log(hornsArray2);
console.log(keywordsArray2);


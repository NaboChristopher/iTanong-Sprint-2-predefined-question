// Created by Michael Wehar
var max_num_of_items = 5;
var lower_thresh = 0.7;
var buffered_word = "";
var rLock = -1;
var rList = [];

let start_char = 0;
let new_word = '';
let letter_holder = '';
let word_holder_container = [];//container for for speller
let mispell_ctr = 0;//counter for mispellings

let user_letter_containers =[];//container for per letter inputs
let user_word_containers =[];//user input no speller

let container_value_to_display = [];
let container_user_live_inputs = '';

let combined_words = '';

//================ no speller just user input group =================================
function set_user_letter_containers(input){
    console.log('\nstoring '+input);
    user_letter_containers.push(input);
    console.log('\n pushed letter to:'+user_letter_containers[user_letter_containers.length-1]);
}
function pop_user_letter_containers(){
    user_letter_containers.pop();
    console.log('\n deleted letter to:'+user_letter_containers[user_letter_containers.length-1]);
}
function clear_user_letter_containers(){
    user_letter_containers = [];
}
function set_user_letter_to_word_containers(){
    let word = ''
    try{       
        for(var i=0; i<user_letter_containers.length; i++){
            word = word.concat(user_letter_containers[i]);
            //no_speller = no_speller.concat( user_word_containers[i] );
            // console.log("user input/letter concat");
            // console.log('\n========'+user_letter_containers[i]+"=========\n");
        }  
    }catch(e){};
    user_letter_containers=[]; //reset the container
     user_word_containers.push(word);

}
function get_user_word_containers(){
    let no_speller = '';
    try{       
        for(var i=0; i<user_word_containers.length; i++){
            no_speller = no_speller.concat(' ', user_word_containers[i] );
            console.log("user input/letter concat");
            console.log('\n========'+user_word_containers[i]+"=========\n");
        }
        
    }catch(e){};  
    console.log('\n======== returning =========\n');
    console.log('\n========'+no_speller+"=========\n");
    return no_speller;
}

//========================================================================================

function nospeller_speller_combi(){// combining no speller and and speller suggestion


}
//============================ accept spelling group ======================================

function accept_speller(){//when tab is pressed and accepted the speller
    
    try{
        if(word_holder_container.length-1 <= 1){
            console.log('\n=====[1]===from '+user_word_containers[user_word_containers.length-1]);
            user_word_containers.pop();
            console.log('\n: into :'+user_word_containers[user_word_containers.length-1]);
            user_word_containers.push(word_holder_container[word_holder_container.length-1]);
            console.log('\n: into :'+user_word_containers[user_word_containers.length-1]+'/'+word_holder_container[word_holder_container.length-1]);
           
            //container_value_to_display.push(combined_words);

            // insert into a container the combined words
            combined_words = user_word_containers.join(' ');

            //combined_words = user_word_containers[user_word_containers.length-1].concat(' ',word_holder_container[word_holder_container.length-1]);
            //combined_words = combined_words+' ' +word_holder_container[word_holder_container.length-1];

            console.log('\n combined letter to:'+ combined_words.toLowerCase());
            //if(word_holder_container.length-1<2)
            document.getElementById("search_txt_query").value =   combined_words.toLowerCase();

        }
        else if(word_holder_container.length-1 > 1){
            console.log('\n=====[*]===from '+user_word_containers[user_word_containers.length-1]);
            user_word_containers.pop(); //remove last word
            console.log('\n: into :'+user_word_containers[user_word_containers.length-1]);
            user_word_containers.push(word_holder_container[word_holder_container.length-1]);//replace last word
            console.log('\n: into :'+user_word_containers[user_word_containers.length-1]+'/'+word_holder_container[word_holder_container.length-1]);
            
            // insert into a container the combined words
            combined_words = user_word_containers.join(' ');// combine all into a variable

            //combined_words = user_word_containers[user_word_containers.length-1].concat(' ',word_holder_container[word_holder_container.length-1]);
            //combined_words = combined_words+' ' +word_holder_container[word_holder_container.length-1];

            console.log('\n combined letter to:'+ combined_words.toLowerCase());
            //if(word_holder_container.length-1<2)
            document.getElementById("search_txt_query").value =   combined_words.toLowerCase();
        }else{
            document.getElementById("search_txt_query").value = word_holder_container[word_holder_container.length-1];
        }
    }catch(e){console.error("Error accepting speller")};


}


//========================================================================================
function hello_home(){
    //console.log("hello home");
}



function wordTyped() {
    var word_container = document.getElementById("search_txt_query");
    
    var get_word = word_container.value.toLowerCase();
    var last_char = get_word[get_word.length-1];
    
    // var user_inputs = get_user_word_containers(get_user_word_containers.length-1);
    // console.log("\n\nuser inputs: "+user_inputs+"\n");//display the live user input

    if(get_whole_word_sentence()!=''){//check if there is already a word in the container

    }
    //console.log("\nspell checker starting...\n")

    // const splitInput = inputWord.split(/\s+/);
    // let wordArray = [splitInput];
    // wordArray.forEach(element => console.log(element));
    //-------------------------------------------------------
    //for each element, do this:
    letter_holder = letter_holder.concat(last_char);
    new_word = letter_holder;
    //console.log("holding "+last_char+' to '+letter_holder)

    if(last_char==' '){
        new_word = letter_holder;
        letter_holder = '';
        start_char = new_word.length;

       // console.log("space is entered: "+new_word);

    }
    else if( get_word == ''){
        start_char = 0;
        new_word = '';
        letter_holder = '';
        document.getElementById("results").innerHTML = "";
    }
    else if (new_word.length >= 2 && new_word != buffered_word) {
        buffered_word = new_word;
        //console.log("buffering word");
        if (rLock < 1) {
            rLock = 1;
            setTimeout(function () { makeRecommendation(new_word); }, 180);
        }
    }
    //console.log("space is entered "+last_char+' from '+start_char)

}


function makeRecommendation(new_word) {
    if (rLock == 1) {
        rLock = 0;
        if (buffered_word == new_word) {
            rLock = -1;
            rList = find_similar(new_word, lower_thresh)[0];
            displayRecommendation(new_word);
        }
        else {
            buffered_word = "";
            wordTyped();
        }
    }
}

function displayRecommendation(new_word) {
    if (rList.length > 0) {
        var num = Math.random();
        var dots;
        if (num <= 0.25) dots = ".";
        else if (num <= 0.5) dots = "..";
        else if (num <= 0.75) dots = "...";
        else dots = "....";

        //jsx integration return a <p> tag with values
        var code_out = "<p  class='lead' style='color: #777777;'></p><span style='max-width: 250px; display: block;  border:none'>";

        //for (var i = 0; i < rList.length && i < max_num_of_items; i++) {
            for (var i = 0; i < rList.length && i < 1; i++) { // limit the suggestion into 3 instead of all
            if (i == 0 && rList[0].toLowerCase() == new_word) {
                code_out += "<a href='#' class='list-group-item list-group-item-success'>"
                    + rList[i] + "</a>";
            }
            else code_out += "<a href='#' class='list-group-item'>" + rList[i] + "</a>";
        }
        code_out += "</span>";

        document.getElementById("results").innerHTML = code_out;
    }
}

// added
//make arrray storage where the letter or words are stacked together
function get_inline_speller(){
    var suggested_list = rList;
    //console.log("\n rList: " + rList[0]+"\n");
    return suggested_list;
}

function set_word_to_sentence(){
    word_holder_container.push(rList[0]);
    //console.log('\nstoring to container:'+word_holder_container[word_holder_container.length-1]);
}

function get_word_sentence(){
    return word_holder_container[word_holder_container.length-1];
}

function get_whole_word_sentence(){
    var whole_word = '';
    //console.log("\n concat this words:"+whole_word)
    for(var i=0;i<word_holder_container.length;i++){
        whole_word = whole_word.concat(' ',word_holder_container[i])
        console.log("\n==========="+i+':'+word_holder_container[i]+"===========");
    }
    //console.log("\n returning sentence: " +whole_word);
    return whole_word;
}

function speller_click(){
   
    var selected_word = rList[0]   
    var text_container = '';

    var text_input_search_value = document.getElementById("search_txt_query");

    text_container = text_input_search_value.value+" /"+selected_word +"/";
    text_input_search_value.value = text_container;
    // console.log("\n adding spelling to search results\n"+
    //             "container: " + text_container+
    //             "\n text value: " + text_input_search_value.value+
    //             "\n selected word: " + selected_word);
}

function get_mispell_ctr(){
    return mispell_ctr;
}

let button_add = document.getElementById("button-add");
let modal_box = document.getElementsByClassName("modal-box");
let overlay = document.getElementsByClassName("overlay");
let close_btn = document.getElementById("close-modal-btn");

button_add.onclick = openBookModal;
close_btn.onclick = closeModal;

function openBookModal(){
    overlay[0].classList.add("actived");
    modal_box[0].classList.add('actived');
}

function closeModal(){
    console.log(close_btn);
    overlay[0].classList.remove("actived");
    modal_box[0].classList.remove('actived');
}



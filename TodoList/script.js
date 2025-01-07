function check(){
    console.log('pressed');
    let checked=document.getElementsByClassName('check-box');
    for(let check of checked){
        let note=check.nextElementSibling;
        if(check.checked){
            note.classList.add('checked');
        }else{
            note.classList.remove('checked');
        }
    }
}
function addTask(){
    let add=document.getElementById('add-note');
    let body=document.body;
    add.style.display='flex';
    body.classList.add('darken');
}
function cancel(){
    let add=document.getElementById('add-note');
    let body=document.body;
    add.style.display='none';
    body.classList.remove('darken');
    document.querySelector('#addnote').value='';
}
function save(){
    let ul=document.querySelector('#list');

    let newnote=document.createElement('div');
    newnote.classList.add('check');
    let text=document.querySelector('#addnote').value;
    document.querySelector('#addnote').value='';

    let input=document.createElement('input');
    input.type='checkbox';
    input.setAttribute('onclick','check()');
    input.classList.add('check-box');

    let note=document.createElement('li');
    note.classList.add('note');
    note.innerHTML=text;

    newnote.appendChild(input);
    newnote.appendChild(note);

    ul.appendChild(newnote);

    let add=document.getElementById('add-note');
    let body=document.body;
    add.style.display='none';
    body.classList.remove('darken');
}
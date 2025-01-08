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
function toggletoDark(){
    let body=document.body;
    body.classList.toggle('dark-mode');
    let addNote=document.querySelector('#add-note');
    addNote.classList.toggle('dark-mode');
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
    console.log(text);
    if(text!=''){
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
    }
    let add=document.getElementById('add-note');
    let body=document.body;
    add.style.display='none';
    body.classList.remove('darken');
}
function all(){
    let notes=document.getElementsByClassName('check');
    for(let note of notes){
        note.style.display='flex';
    }
}
document.addEventListener('click',()=>{
    let selected=document.getElementById('task').selectedIndex;
    let option=document.getElementById('task').options[selected];
    console.log(option.value);
    if(option.value==='all'){
        all();
    }else if(option.value==='complete'){
        complete();
    }else{
        incomplete();
    }
    });


function complete(){
    let notes=document.getElementsByClassName('check');
    for(let note of notes){
        let fistchild=note.firstChild.nextElementSibling;
        console.log( fistchild ,fistchild.checked)
        if(fistchild.checked !==true) note.style.display='none';
        else note.style.display='flex';
    }
}
function incomplete(){
    let notes=document.getElementsByClassName('check');
    for(let note of notes){
        let fistchild=note.firstChild.nextElementSibling;
        if(fistchild.checked !==true) note.style.display='flex';
        else note.style.display='none';
    }
}
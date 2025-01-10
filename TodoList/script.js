let notes=[
    {
        content:'NOTE #1',
        status:'pending'
    },
    {
        content:'NOTE #2',
        status:'pending'
    },
    {
        content:'NOTE #3',
        status:'pending'
    }
]

function rander(){
    let ulElement=document.getElementById('list');
    ulElement.innerHTML='';
    for(let i=0;i<notes.length;i++){
        let newnote=document.createElement('li');
        newnote.classList.add('check');
        newnote.id=i;

        let input=document.createElement('input');
        input.type='checkbox';
        input.setAttribute('onclick','check(this)');

        let image=document.createElement('img');
        image.src='delete.png';
        image.setAttribute('onclick','del(this.parentNode.id)');

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[i].content;
        if(notes[i].status==='completed'){
            input.checked=true;
            note.classList.add('checked');
        }

        newnote.appendChild(input);
        newnote.appendChild(note);

        ulElement.appendChild(newnote);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    let ulElement=document.getElementById('list');
    for(let i=0;i<notes.length;i++){
        let newnote=document.createElement('li');
        newnote.classList.add('check');
        newnote.id=i;

        let input=document.createElement('input');
        input.type='checkbox';
        input.setAttribute('onclick','check(this)');

        let image=document.createElement('img');
        image.src='delete.png';
        image.setAttribute('onclick','del(this.parentNode.id)');

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[i].content;
        if(notes[i].status==='completed'){
            input.checked=true;
            note.classList.add('checked');
        }

        newnote.appendChild(input);
        newnote.appendChild(note);

        ulElement.appendChild(newnote);
    }
});
document.getElementById('taskdiv').addEventListener('click',(event)=>{
    let add=document.getElementById('add-note');
    add.style.display='none';
    document.getElementById('taskdiv').style.display='none';
    document.querySelector('#addnote').value='';
});
document.getElementById('task').addEventListener('click',()=>{
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

function check(event){
    console.log(notes[event.parentNode.id]);
    let note=event.nextElementSibling;
    note.classList.toggle('checked');
    if(event.checked){
        notes[event.parentNode.id].status='completed';
    }else{
        notes[event.parentNode.id].status='pending';
    }
    console.log(notes[event.parentNode.id]);
}
function toggletoDark(){
    let body=document.body;
    body.classList.toggle('dark-mode');
    let addNote=document.querySelector('#add-note');
    addNote.classList.toggle('dark-mode');
    if(addNote.classList.contains('dark-mode')){
        addNote.style.backgroundColor='black';
        document.getElementById('addnote').style.backgroundColor='black';
        document.getElementById('addnote').style.color='white';
        document.getElementById('search').style.backgroundColor='black';
        document.getElementById('search').style.color='white';
    }else{
        addNote.style.backgroundColor='aliceblue';
        document.getElementById('addnote').style.backgroundColor='aliceblue';
        document.getElementById('addnote').style.color='black';
        document.getElementById('search').style.backgroundColor='white';
        document.getElementById('search').style.color='darkgray';
    }
}
function addTask(){
    document.getElementById('taskdiv').style.display='flex';
    let add=document.getElementById('add-note');
    add.style.display='flex';
}
function cancel(){
    let add=document.getElementById('add-note');
    add.style.display='none';
    document.getElementById('taskdiv').style.display='none';
    document.querySelector('#addnote').value='';
}
function save(){
    let ulElement=document.querySelector('#list');

    let newnote=document.createElement('div');
    newnote.classList.add('check');
    let text=document.querySelector('#addnote').value;
    console.log(text);
    if(text!=''){
        let newnote=document.createElement('li');
        newnote.classList.add('check');
        newnote.id=notes.length;

        notes.push({content:text,status:'pending'})

        let input=document.createElement('input');
        input.type='checkbox';
        input.setAttribute('onclick','check(this)');

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[notes.length-1].content;

        newnote.appendChild(input);
        newnote.appendChild(note);

        ulElement.appendChild(newnote);
    }
    let add=document.getElementById('add-note');
    add.style.display='none';
    document.getElementById('taskdiv').style.display='none';
}
function all(){
    let notes=document.getElementsByClassName('check');
    for(let note of notes){
        note.style.display='flex';
    }
}


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

function search(){
    let search=document.getElementById('search').value;
    search=search.toLowerCase();
    console.log(search);
    let notes=document.getElementsByClassName('note');
    for(let note of notes){
        console.log(note.parentNode);
        let str=note.innerHTML.toLowerCase();
        if(str.startsWith(search)){
            note.parentNode.style.display='flex';
        }else{
            note.parentNode.style.display='none';
        }
    }
}

function del(index){
    console.log(index);
    let li=document.getElementsById(index);
    document.getElementById('list').removeChild(li);
}
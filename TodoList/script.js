// to get notes array form local storage for after page reload accessing
let notes=JSON.parse(localStorage.getItem('notes'));
//checking if it's for first time
if(!notes){
    notes=[
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
    localStorage.setItem('notes',JSON.stringify(notes));
}else{//else load from the last time
    notes=JSON.parse(localStorage.getItem('notes'));
}
let searchbar=document.getElementById('search');
searchbar.addEventListener('input',search);
function rander(array){
    localStorage.setItem('current',JSON.stringify(array));
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
        image.alt='delete'
        image.setAttribute('onclick','del(this.parentNode.id)');

        let edit=document.createElement('img');
        edit.src-'edit.png';
        edit.alt='edit';
        edit.setAttribute('onclick','edit(this)');

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[i].content;
        if(notes[i].status==='completed'){
            input.checked=true;
            note.classList.add('checked');
        }
        if(array.includes(notes[i].status)){
            newnote.appendChild(input);
            newnote.appendChild(note);
            newnote.appendChild(edit);
            newnote.appendChild(image);
            ulElement.appendChild(newnote);
            ulElement.appendChild(document.createElement('hr'));
        }
    }
}
//for window refresh loading
document.addEventListener('DOMContentLoaded',()=>{
   rander(['pending','completed']);
   let ulElement=document.getElementById('list');
   ulElement.lastChild.style.display='none';
});
//to close the pop up when some other place is clicked
document.getElementById('taskdiv').addEventListener('click',(event)=>{
    let add=document.getElementById('add-note');
    if(!add.contains(event.target)){
        add.style.display='none';
    document.getElementById('taskdiv').style.display='none';
    document.querySelector('#addnote').value='';
    }
});
//to call the drop downs
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
//for checking the check-box
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
//to togle between dark and light
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
//for note model pop up
function addTask(){
    document.getElementById('taskdiv').style.display='flex';
    let add=document.getElementById('add-note');
    add.style.display='flex';
}
//for canceling the add note modem
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
    document.querySelector('#addnote').value='';
    console.log(text);
    if(text!=''){
        let newnote=document.createElement('li');
        newnote.classList.add('check');
        newnote.id=notes.length;

        notes.push({content:text,status:'pending'})

        let input=document.createElement('input');
        input.type='checkbox';
        input.setAttribute('onclick','check(this)');

        let image=document.createElement('img');
        image.src='delete.png';
        image.alt='delete'
        image.setAttribute('onclick','del(this.parentNode.id)');

        let edit=document.createElement('img');
        edit.src-'edit.png';
        edit.alt='edit';
        edit.setAttribute('onclick','edit(this)');

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[notes.length-1].content;

        newnote.appendChild(input);
        newnote.appendChild(note);
        newnote.appendChild(edit);
        newnote.appendChild(image);
        ulElement.appendChild(document.createElement('hr'));
        ulElement.appendChild(newnote);
    }
    localStorage.setItem('notes',JSON.stringify(notes));
    console.log(notes);
    let add=document.getElementById('add-note');
    add.style.display='none';
    document.getElementById('taskdiv').style.display='none';
}

//for the drop downs
function all(){
    rander(['pending','completed']);
    let ulElement=document.getElementById('list');
   ulElement.lastChild.style.display='none';
}
function complete(){
    rander(['completed']);
    let ulElement=document.getElementById('list');
   ulElement.lastChild.style.display='none';
}
function incomplete(){
    rander(['pending']);
    let ulElement=document.getElementById('list');
   ulElement.lastChild.style.display='none';
}
//for search
function search(){
    let search=document.getElementById('search').value;
    search=search.toLowerCase();
    let notes=document.getElementsByClassName('note');
    for(let note of notes){
        console.log(note.parentNode);
        let str=note.innerHTML.toLowerCase();
        if(str.startsWith(search)){
            note.parentNode.style.display='flex';
            note.parentNode.nextElementSibling.style.display='block';
        }else{
            note.parentNode.style.display='none';
            if(note.parentNode.previousElementSibling)
                note.parentNode.previousElementSibling.style.display='none';
        }
    }
    let ulElement=document.getElementById('list');
   ulElement.lastChild.style.display='none';
}
//for delete
function del(index){
    notes.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notes));
    rander(JSON.parse(localStorage.getItem('current')));
    let ulElement=document.getElementById('list');
   ulElement.lastChild.style.display='none';
}
//for editing the note
function edit(index){
    let note=index.previousElementSibling;
    let text=note.innerHTML;
    let addnote=document.getElementById('addnote');
    addnote.value=text;
    addTask();
    del(index.parentNode.id);
}
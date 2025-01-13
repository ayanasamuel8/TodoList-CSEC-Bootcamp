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

        let inputstorage=document.createElement('div');
        inputstorage.id='inputstorage';

        let input=document.createElement('input');
        input.id='check--box';
        input.type='checkbox';
        input.setAttribute('onclick','check(this)');

        inputstorage.appendChild(input);

        let imagestorage=document.createElement('div');
        imagestorage.id='imgstorage';

        let edit=document.createElement('img');
        edit.id='pen';
        edit.src='/pen.png';
        edit.alt='edit';
        edit.setAttribute('onclick','edit(this)');

        let image=document.createElement('img');
        image.id='pen'
        image.src='/delete.png';
        image.alt='delete'
        image.setAttribute('onclick','del(this.parentNode.id)');

        imagestorage.appendChild(edit);
        imagestorage.appendChild(image);

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[i].content;
        if(notes[i].status==='completed'){
            input.checked=true;
            note.classList.add('checked');
        }

        inputstorage.appendChild(note);
        if(array.includes(notes[i].status)){
            newnote.appendChild(inputstorage);
            newnote.appendChild(imagestorage);
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
    console.log(event.parentNode.lastChild);
    let note=event.parentNode.lastChild;
    note.classList.toggle('checked');
    if(event.checked){
        notes[event.parentNode.parentNode.id].status='completed';
    }else{
        notes[event.parentNode.parentNode.id].status='pending';
    }
    console.log(notes[event.parentNode.parentNode.id]);
}
//to togle between dark and light
function toggletoDark(){
    let body=document.body;
    body.classList.toggle('dark-mode');
    let addNote=document.querySelector('#add-note');
    addNote.classList.toggle('dark-mode');
    if(addNote.classList.contains('dark-mode')){
        addNote.style.backgroundColor='rgb(37,37,37)';
        document.getElementById('addnote').style.backgroundColor='rgb(37,37,37)';
        document.getElementById('addnote').style.color='white';
        document.getElementById('search').style.backgroundColor='rgb(37,37,37)';
        document.getElementById('search').style.color='white';
        document.getElementsByClassName('cancel')[0].style.backgroundColor='rgb(37,37,37)';
        document.getElementById('empty-image').src='/darkempty.png';
        document.getElementById('check--box').style.accentColor='rgb(37,37,37)';
        document.getElementById('empty').style.backgroundColor='rgb(37,37,37)';
        console.log(document.getElementById('check--box'));
    }else{
        addNote.style.backgroundColor='aliceblue';
        document.getElementById('addnote').style.backgroundColor='aliceblue';
        document.getElementById('addnote').style.color='rgb(37,37,37)';
        document.getElementById('search').style.backgroundColor='rgb(250, 248, 248)';
        document.getElementById('search').style.color='darkgray';
        document.getElementsByClassName('cancel')[0].style.backgroundColor='rgb(250, 248, 248)';
        document.getElementById('check--box').style.backgroundColor='rgb(250, 248, 248)';
        document.getElementById('empty').style.backgroundColor='rgb(250, 248, 248)';
        document.getElementById('empty-image').src='/lightempty.png';

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

    let text=document.querySelector('#addnote').value;
    document.querySelector('#addnote').value='';
    if(text!=''){
        let newnote=document.createElement('li');
        newnote.classList.add('check');
        newnote.id=notes.length;

        notes.push({content:text,status:'pending'})

        let inputstorage=document.createElement('div');
        inputstorage.id='inputstorage';

        let input=document.createElement('input');
        input.id='check--box';
        input.type='checkbox';
        input.setAttribute('onclick','check(this)');

        inputstorage.appendChild(input);

        let imagestorage=document.createElement('div');
        imagestorage.id='imgstorage';

        let image=document.createElement('img');
        image.id='pen';
        image.src='/delete.png';
        image.alt='delete'
        image.setAttribute('onclick','del(this.parentNode.id)');

        let edit=document.createElement('img');
        edit.id='pen';
        edit.src='/pen.png';
        edit.alt='edit';
        edit.setAttribute('onclick','edit(this)');

        imagestorage.appendChild(edit);
        imagestorage.appendChild(image);

        let note=document.createElement('div');
        note.classList.add('note');
        note.innerHTML=notes[notes.length-1].content;

        inputstorage.appendChild(note);
        newnote.appendChild(inputstorage);
        newnote.appendChild(imagestorage);
        ulElement.appendChild(document.createElement('hr'));
        ulElement.appendChild(newnote);
    }
    localStorage.setItem('notes',JSON.stringify(notes));
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
    let found=false;
    for(let note of notes){
        let str=note.innerHTML.toLowerCase();
        if(str.startsWith(search)){
            found=true;
            note.parentNode.parentNode.style.display='flex';
            note.parentNode.parentNode.nextElementSibling.style.display='block';
        }else{
            note.parentNode.parentNode.style.display='none';
            if(note.parentNode.parentNode.previousElementSibling)
                note.parentNode.parentNode.previousElementSibling.style.display='none';
        }
    }
    if(!found){
        document.getElementById('empty').style.display='flex';
    }else{
        document.getElementById('empty').style.display='none';
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
    let parent=index.parentNode;
    let secondparent=parent.previousElementSibling;
    let note=secondparent.lastChild;
    let text=note.innerHTML;
    let addnote=document.getElementById('addnote');
    addnote.value=text;
    addTask();
    del(index.parentNode.id);
}
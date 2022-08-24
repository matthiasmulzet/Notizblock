let titles = []
let notes = []

let titlesArchiv = []
let notesArchiv = []

let titlesDelete = []
let notesDelete = []

load();
loadTrash();
loadArchiv();


//Notizen, Archiv and Papierkorb appear beside the icons
function showIcons() {
    document.getElementById('icons-blue').classList.add('background-onclick-blue');
    document.getElementById('archiv-white').classList.add('background-onclick-white');
    document.getElementById('trash-white').classList.add('background-onclick-white');
    document.getElementById('notizen-button').classList.remove('d-none');
    document.getElementById('archiv-button').classList.remove('d-none');
    document.getElementById('trash-button').classList.remove('d-none');
    document.getElementById('icons-blue').classList.remove('background-blue');
    document.getElementById('archiv-white').classList.remove('background-white');
    document.getElementById('trash-white').classList.remove('background-white');
    document.getElementById('padding-trash').classList.add('padding-left-trash');
    document.getElementById('responsive-open-image').classList.add('d-none');
    document.getElementById('responsive-close-image').classList.remove('d-none');
}


//Notizen, Archiv and Papierkorb disappear beside the icons and you only see the icons
function closeIcons() {
    document.getElementById('icons-blue').classList.remove('background-onclick-blue');
    document.getElementById('archiv-white').classList.remove('background-onclick-white');
    document.getElementById('trash-white').classList.remove('background-onclick-white');
    document.getElementById('notizen-button').classList.add('d-none');
    document.getElementById('archiv-button').classList.add('d-none');
    document.getElementById('trash-button').classList.add('d-none');
    document.getElementById('icons-blue').classList.add('background-blue');
    document.getElementById('archiv-white').classList.add('background-white');
    document.getElementById('trash-white').classList.add('background-white');
    document.getElementById('padding-trash').classList.remove('padding-left-trash');
    document.getElementById('responsive-close-image').classList.add('d-none');
    document.getElementById('responsive-open-image').classList.remove('d-none');
}



//all notes who are in the arrays titles and notes you will see on the "index.html" page
function render() {
    let content = document.getElementById('note');
    content.innerHTML = '';
    document.getElementById('pint-note').innerHTML = '';
    content.innerHTML += /*html*/`
        <div class="div-note" onclick="typeInNote()">
            <input id="input-field-small" class="input-field-note" placeholder="Notiz schreiben...">
        </div>`;

    pintNote();
    emptyNote();
}


function pintNote() {
    for (i = 0; i < notes.length; i++) {
        const saveTitle = titles[i];
        const saveNote = notes[i];

        document.getElementById('pint-note').innerHTML += /*html*/ `
        <div class="textarea-field-big-pint-note margin-left-right" >
            <div class="field-title-container">
                <div>
                    <textarea id="textarea-title" class="textarea-field-title-pint-note">${saveTitle}</textarea>
                </div>
            </div>
            <textarea id="textarea-write-note" class="textarea-field-write-note-pint-note">${saveNote}</textarea>
            <div class=icons-container>
                    <img class="icons" src="img/box-archive-solid.svg" alt="archive" onclick="moveToArchiv(${i})">
                    <img class="icons" src="img/trash-can-solid.svg" alt="trash" onclick='moveToTrash(${i})'>
            </div>
        </div>`;
    }
}


// renderTrash will be load in trash.html. Every note who gets delete will go to
// the trash
function renderTrash() {
    let trash = document.getElementById('pint-note');
    trash.innerHTML = '';

    pintTrash();
    emptyTrash();
}


function pintTrash() {
    for (i = 0; i < notesDelete.length; i++) {
        const trashTitle = titlesDelete[i];
        const trashNote = notesDelete[i];

        document.getElementById('pint-note').innerHTML += /*html*/`
        <div class="textarea-field-big-pint-note margin-left-right" >
            <div class="field-title-container">
                <div>
                    <textarea id="textarea-title" class="textarea-field-title-pint-note">${trashTitle}</textarea>
                </div>
            </div>
            <textarea id="textarea-write-note" class="textarea-field-write-note-pint-note">${trashNote}</textarea>
            <div class=icons-container>
                    <img class="icons" src="img/file-solid.svg" alt="file" onclick="FromTrashBackToNotes(${i})">
                    <img class="icons" src="img/trash-can-solid.svg" alt="trash" onclick="deleteCompletely(${i})">
            </div>
        </div>`;
    }
}


// renderArchiv will be load in archiv.html. Every note who gets archived will go to
// the archiv 
function renderArchiv() {
    let archiv = document.getElementById('pint-note');
    archiv.innerHTML = '';

    pintArchiv();
    emptyArchiv();
}


function pintArchiv () {
    for (i = 0; i < notesArchiv.length; i++) {
        const archivTitle = titlesArchiv[i];
        const archivNote = notesArchiv[i];

        document.getElementById('pint-note').innerHTML += /*html*/`
        <div class="textarea-field-big-pint-note margin-left-right" >
            <div class="field-title-container">
                <div>
                    <textarea id="textarea-title" class="textarea-field-title-pint-note">${archivTitle}</textarea>
                </div>
            </div>
            <textarea id="textarea-write-note" class="textarea-field-write-note-pint-note">${archivNote}</textarea>
            <div class=icons-container>
                    <img class="icons" src="img/file-solid.svg" alt="file" onclick="FromArchivBackToNotes(${i})">
                    <img class="icons" src="img/trash-can-solid.svg" alt="trash" onclick="FromArchivMoveToTrash(${i})">
            </div>
        </div>`;
    }
}


//if you click in the index.html file on "Notiz schreiben..." the typeInNote function
//is carried out and you can type in your note
function typeInNote() {
    document.getElementById('note').innerHTML = /*html*/`
            <div id = "note-big" class="textarea-field-big">
            <div class="field-title-container">
                <div>
                    <textarea id="textarea-title" class="textarea-field-title" placeholder="Titel"></textarea>
                </div>
                <div>
                    <img onclick="addNote()" class="icons" src="img/thumbtack-solid.svg" alt="thumbtack">
                </div>
            </div>
            <textarea id="textarea-write-note" class="textarea-field-write-note" placeholder="Notiz schreiben..."></textarea>
         </div > `;
    document.getElementById('note-big').classList.add('z-index1');
}



//if you click in the typeInNote function on the thumbtack, the title and the note will
//get to the array titles and notes. Then the render and the save function will be carried out
// and the note gets pinned
function addNote() {
    let writenTitle = document.getElementById('textarea-title');
    let writenNote = document.getElementById('textarea-write-note');

    titles.push(writenTitle.value);
    notes.push(writenNote.value);

    render();
    save();
}



//the function saves the elements from the array titles and notes as text in the localStorage
function save() {
    let titleAsText = JSON.stringify(titles);
    let noteAsText = JSON.stringify(notes);
    localStorage.setItem('titles', titleAsText);
    localStorage.setItem('notes', noteAsText);
}


//the function saves the elements from the array titlesDelte and notesDelete as text
// in the localStorage
function saveTrash() {
    let deleteTitleAsText = JSON.stringify(titlesDelete);
    let deleteNoteAsText = JSON.stringify(notesDelete);
    localStorage.setItem('titlesDelete', deleteTitleAsText);
    localStorage.setItem('notesDelete', deleteNoteAsText);
}


//the function saves the elements from the array titlesArchiv and notesArchiv as text
// in the localStorage
function saveArchiv() {
    let archivTitleAsText = JSON.stringify(titlesArchiv);
    let archivNoteAsText = JSON.stringify(notesArchiv);
    localStorage.setItem('titlesArchiv', archivTitleAsText);
    localStorage.setItem('notesArchiv', archivNoteAsText);
}



//the function gets the text elements from the titles and notes localStorage and 
//generates again a JS Array. But only if the localStorage is not empty
function load() {
    let titleAsText = localStorage.getItem('titles');
    let noteAsText = localStorage.getItem('notes');
    if (titleAsText && noteAsText) {
        titles = JSON.parse(titleAsText);
        notes = JSON.parse(noteAsText);
    }
}


//the function gets the text elements from the titlesDelete and notesDelete localStorage and 
//generates again a JS Array. But only if the localStorage is not empty
function loadTrash() {
    let deleteTitleAsText = localStorage.getItem('titlesDelete');
    let deleteNoteAsText = localStorage.getItem('notesDelete');
    if (deleteTitleAsText && deleteNoteAsText) {
        titlesDelete = JSON.parse(deleteTitleAsText);
        notesDelete = JSON.parse(deleteNoteAsText);
    }
}


//the function gets the text elements from the titlesArchiv and notesArchiv localStorage and 
//generates again a JS Array. But only if the localStorage is not empty
function loadArchiv() {
    let archivTitleAsText = localStorage.getItem('titlesArchiv');
    let archivNoteAsText = localStorage.getItem('notesArchiv');
    if (archivTitleAsText && archivNoteAsText) {
        titlesArchiv = JSON.parse(archivTitleAsText);
        notesArchiv = JSON.parse(archivNoteAsText);
    }
}



//if you click in the index.html on the trash, moveToTrash gets carried out and the note
// you click on will get to the titlesDelete and notesDelete array and gets delete from
//the titles and notes array
function moveToTrash(i) {
    titlesDelete.push(titles[i]);
    notesDelete.push(notes[i]);
    titles.splice(i, 1)
    notes.splice(i, 1)
    render();
    save();
    saveTrash();
}


//notes from the index.html file gets to the archiv.html file
function moveToArchiv(i) {
    titlesArchiv.push(titles[i]);
    notesArchiv.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
    saveArchiv();
}


//notes will be delete completely from the trash
function deleteCompletely(i) {
    titlesDelete.splice(i, 1);
    notesDelete.splice(i, 1);
    renderTrash();
    saveTrash();
}


//delete notes will get back to the normal notes
function FromTrashBackToNotes(i) {
    titles.push(titlesDelete[i])
    notes.push(notesDelete[i])
    titlesDelete.splice(i, 1)
    notesDelete.splice(i, 1)
    renderTrash();
    saveTrash();
    save();
}

//notes from the archiv gets back to the normal notes
function FromArchivBackToNotes(i) {
    titles.push(titlesArchiv[i])
    notes.push(notesArchiv[i])
    titlesArchiv.splice(i, 1)
    notesArchiv.splice(i, 1)
    renderArchiv();
    saveArchiv();
    save();
}


//notes from the archiv will go to the trash
function FromArchivMoveToTrash(i) {
    titlesDelete.push(titlesArchiv[i])
    notesDelete.push(notesArchiv[i])
    titlesArchiv.splice(i, 1)
    notesArchiv.splice(i, 1)
    renderArchiv();
    saveArchiv();
    saveTrash();
}


//if no note is saved this function get carried out
function emptyNote() {
    if (notes.length == 0) {
        document.getElementById('pint-note').innerHTML = /*html*/`
    <div class="empty-field">
        <p>Hier werden hinzugefügte Notizen angezeigt</p>
    </div> `;
    }
}


//if no note is in the trash this function get carried out
function emptyTrash() {
    if (notesDelete.length == 0) {
        document.getElementById('pint-note').innerHTML = /*html*/`
    <div class="empty-field">
        <p>Keine Notizen im Papierkorb</p>
    </div> `;
    }
}


//if no note is in the archiv this function get carried out
function emptyArchiv() {
    if (notesArchiv.length == 0) {
        document.getElementById('pint-note').innerHTML = /*html*/`
    <div class="empty-field">
        <p>Hier werden archivierte Notizen angezeigt</p>
    </div> `;
    }
}






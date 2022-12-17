
$(document).ready( function(){
    renderChoreList()
    $('#submitButton').on('click', addChores)
    $('body').on('click','.deleteButton', deleteChore)
});

//Render Function.
function renderChoreList(){
    $.ajax({
        type: 'GET',
        url: '/toDo'
    }).then((response) => {
        $('#listedChores').empty();
        console.log(response);
        for ( let chore of response){
            $('#listedChores').append(`
                <tr>
                    <td>${chore.task}</td>
                    <td>${chore.notes}</td>
                    <td>${chore.complete}</td>
                    <td><button class="completeButton" data-id="${chore.id}">Complete</button>
                    <td><button class="deleteButton" data-id="${chore.id}">Delete</button>
                </tr>
            `)
        }
    }).catch((error) => {
        console.log('GET BROKE', error);
    }) 
}   

//POSTS and Inputs are succesful
function addChores() {
    console.log('Hi');
    let task = $('#addChore').val();
    let notes = $('#addNotes').val();

    let newChore = {
        task,
        notes,
        complete: 'false'
    }
    console.log(newChore);
    $.ajax({
        method: 'POST',
        url: '/toDo',
        data: newChore
    }).then ((response) => {
        renderChoreList();
    }).catch ((error) => {
        console.log('something went wrong in the POST', error);
    })
}

// Build Delete Function
function deleteChore(){
    let deleteThisChore = $(this).data().id;
    console.log(deleteThisChore);

    $.ajax({
        method: 'DELETE',
        url: `/toDo/${deleteThisChore}`,
    }).then((response) => {
        renderChoreList();
    }).catch((error) =>{
        console.log('something broke in the DELETE', error);
    })
}//end delete
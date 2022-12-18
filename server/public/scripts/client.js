
$(document).ready( function(){
    renderChoreList()
    $('#submitButton').on('click', addChores)
    $('#submitButton').on('click', showItsComplete)
    $('body').on('click', '.closeButton', clearAlert )
    $('body').on('click','.deleteButton', deleteChore)
    $('body').on('click', '.completeButton', updateChoreStatus)
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
            if (chore.complete === 'yes'){
                $('#listedChores').append(`
                    <tr class="bg-danger">
                        <td class="fw-bold">${chore.task}</td>
                        <td class="fw-light">${chore.notes}</td>
                        <td class="fw-bold">${chore.complete} </td>
                        <td><button class="completeButton" data-id="${chore.id}">Complete</button>
                        <td><button class="deleteButton" data-id="${chore.id}">Delete</button>
                    </tr>
                `)
            } else{
                $('#listedChores').append(`
                <tr class="table-striped">
                    <td class="fw-bold">${chore.task}</td>
                    <td class="fw-light">${chore.notes}</td>
                    <td class="fw-bold">${chore.complete} </td>
                    <td><button class="completeButton" data-id="${chore.id}">Complete</button>
                    <td><button class="deleteButton" data-id="${chore.id}">Delete</button>
                </tr>
            `)

            } 
        }
    }).catch((error) => {
        console.log('GET BROKE', error);
    }) 
}   

//POSTS and Inputs 
function addChores() {
    console.log('Hi');
    let task = $('#addChore').val();
    let notes = $('#addNotes').val();

    showItsComplete(task);

    let newChore = {
        task,
        notes,
        complete: 'no'
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
    clearInputs()
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
}

// Update Function
function updateChoreStatus(){
    let updateThisChore = $(this).data().id;
    console.log(updateThisChore);

    $.ajax({
        method: 'PUT',
        url: `/toDo/${updateThisChore}`,
        data: {
            complete: 'yes'
        }
    }).then((response) => {
        renderChoreList(); 
    }).catch((error) => {
        console.log('something broke in PUT', error);
    })

}

//create alert that shows you entered a chore. Create alert that shows
function showItsComplete(task){
    if ( $('#addChore').val() !== '' ) {
        $('#submissionStatus').append(`
        <div class="alert alert-light" role="alert" >
            Death to Procrastination!
            
            <button type="button" class="closeButton" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `)
        clearInputs();
    }
    else if( task === '' ){
        clearInputs();
        $('#submissionStatus').append(`
        <div class="alert alert-light" role="alert" >
            Idle Hands and Whatnot... try again. 
            
            <button type="button" class="closeButton" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `)
        return newChore;
    }
}

//clear inputs after submission
function clearInputs() {
    $('#addChore').val('');
    $('#addNotes').val('');

}

function clearAlert(){
    $('#submissionStatus').empty();
}
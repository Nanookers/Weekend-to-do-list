$(document).ready( function(){
    renderChoreList()
    $('#submitButton').on('click', addChores)
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
                </tr>
            `)
        }
    }).catch((error) => {
        console.log('GET BROKE', error);
    }) 
}   

function addChores() {
    
}
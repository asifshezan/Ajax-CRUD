$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    }
});


//  Create Task
$('#createTaskForm').submit(function(e){
    e.preventDefault();

    let msg = $('#createTaskMessage');
    let input = $('#createTaskForm input[name="name"]');
    let formData = {
        name: $(input).val()
    }


    $.ajax({
        type : 'post',
        url : '/task/store',
        data : formData,
        success: function(data){

            $(msg).html('');

            $(msg).append('<div class="alert alert-success"> Task Created Successfully</div>');

            $(input).val('');

            $('#taskTableBody').append('<tr data-id="'+data.id+'"> <td>'+ data.id +'</td> <td>'+ data.name +'</td> <td style="width: 250px;"> <a href="#"  data-toggle="modal" data-target="#editTask" class="btn btn-sm btn-primary edit">Edit</a> <a href="#" data-toggle="modal" data-target="#deleteTask" class="btn btn-sm btn-danger delete">Delete</a></td></tr>');

        },
        error: function(error){
            $(msg).html('');

            $(msg).append('<ul id="errorMsg" class="alert alert-danger"></ul>')

            $.each(error.responseJSON.errors, function(index,value){
                console.log(value[0]);
                $(msg).find('#errorMsg').append(' <li>'+ value[0] +'</li>')
            });
        }
    })
});

// End  Create Task


//  Edit Task

$(document).on('click', '.edit', function(){

    let task = $(this).closest('tr').data('id');
    let modal = $('#editTaskForm');

    $.ajax({
        type: 'GET',
        url: 'task/edit/'+task,
        success: function(data){
            $(modal).find('#editInput').val(data.name);
            $(modal).attr('data-id', data.id);
        },
        error: function(data){
            console.log(data);
        }
    })
});

//  End Edit Task


// Update Task

$('#editTaskForm').submit(function(e){
    e.preventDefault();

    let msg = $('#editTaskMessage');
    let id = $('#editTaskForm').data('id');
    let input = $('#editTaskForm #editInput');
    let formData = {
        name:  $(input).val()
    }

    $.ajax({
        type: 'PUT',
        url: '/task/update/'+id,
        data: formData,
        success: function (data){
            $(msg).html('');
            $(msg).append('<div class="alert alert-success"> Task Updated Successfully.</div>')
            $(input).val('');

            let taskRow = $('#taskTableBody').find('tr[data-id="'+id+'"]');
                $(taskRow).find('td.task-name').text(data.name);
        },

        error: function(error){
            $(msg).html('');
            $(msg).append('<ul id="errorMsg" Class="alert alert-danger"></ul>')

            $.each(error.responseJSON.errors, function(index, value){
                console.log(value[0]);
                $(msg).find('#errorMsg').append('<li>'+ value[0] +'</li>')
            });
        }
    })
});

// Update Task end


// Delete Task Popup Start

$(document).on('click', '.delete', function(){

    let task = $(this).closest('tr').data('id');
    let modal = $('#deleteTaskForm');
    $(modal).attr('data-id', task);


});

// Delete Task Popup End


// Delete Task Confirmation Start


$('#deleteTaskForm').submit(function(e){
    e.preventDefault();

    let msg = $('#deleteTaskMessage');
    let id = $('#deleteTaskForm').data('id');

    $.ajax({
        type: 'POST',
        url: '/task/delete/'+id,
        success: function(data){
            $(msg).html('');
            $('#deleteTaskForm').find('h4').remove();
            $('#deleteTaskForm').find('button[type="submit"]').remove();

            $(msg).append('<div class="alert alert-success">Task Deleted Successfully.</div>')

        let taskRow = $('#taskTableBody').find('tr[data-id="'+id+'"]');
        $(taskRow).remove();

        },
        error: function(data){

        }
    })
});

// Delete Task Confirmation End



$('#deleteTaskForm').submit(function (e) {
    e.preventDefault();
});

// create modal set to default
$('#createTask').on('hidden.bs.modal', function (e) {
    $('#createTaskForm').find('#createTaskMessage').html('');
})

// edit modal set to default
$('#editTask').on('hidden.bs.modal', function (e) {
    $('#editTaskForm').find('#editTaskMessage').html('');
})

// delete modal set to default
$('#deleteTask').on('hidden.bs.modal', function (e) {
    modal = $('#deleteTaskForm');
    $(modal).find('#deleteTaskMessage').html('');
    $(modal).find('.modal-body').html('').append(`
        <div id="deleteTaskMessage"></div>
        <h4>Are you you want to delete this?</h4>
    `);
    $(modal).find('.modal-footer').html('').append(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-danger">Yes, Delete</button>
    `);
})

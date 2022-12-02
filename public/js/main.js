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

            $('#taskTableBody').append('<tr> <td>'+ data.id +'</td> <td>'+ data.name +'</td> <td style="width: 250px;"><a href="#" class="btn btn-sm btn-primary">Edit</a> <a href="#" class="btn btn-sm btn-danger">Delete</a></td></tr>')

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


//  edit Task

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


// Update Task

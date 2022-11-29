$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    }
});


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

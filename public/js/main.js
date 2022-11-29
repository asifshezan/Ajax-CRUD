$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    }
});


$('#createTaskForm').submit(function(e){
    e.preventDefault();

    let input = $('#createTaskForm input[name="name"]');
    let formData = {
        name: $(input).val()
    }
    console.log(formData);

    $.ajax({
        type : 'post',
        url : '/task/store',
        data : formData,
        success: function(data){
            let msg = $('#createTaskMessage');
            $(msg).append('<div class="alert alert-success"> Task Created Successfully</div>');
            $(input).val('');
        },
        error: function(error){
            console.log(error);
        }
    })
});

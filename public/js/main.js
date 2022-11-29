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

            $(msg).append('<div class="alert alert-success"> Task Created Successfully</div>');

            $(input).val('');

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

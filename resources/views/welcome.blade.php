<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <title>Laravel & Ajax CRUD Application...</title>
</head>
<body>
    <header class="mt-5 mb-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <h1>Laravel & Ajax Application!</h1>
                </div>
            </div>
        </div>
    </header>
    <section class="body">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-iteams-center">
                            <h3 class="mb-0">All Task</h3>
                            <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#createTask">Create Task</a>
                        </div>
                        <div class="card-body">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th> ID </th>
                                        <th> Task Name </th>
                                        <th style="width: 250px;"> Action </th>
                                    </tr>
                                </thead>
                                <tbody id="taskTableBody">
                                    @foreach ($tasks as $task)
                                    <tr data-id="{{ $task->id }}">
                                        <td> {{ $task->id }} </td>
                                        <td> {{ $task->name }} </td>
                                        <td style="width: 250px;">
                                            <a href="#"  data-toggle="modal" data-target="#editTask" class="btn btn-sm btn-primary edit">Edit</a>
                                            <a href="#" class="btn btn-sm btn-danger">Delete</a>
                                        </td>
                                    </tr>
                                    @endforeach

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


<!-- Create Modal -->
<div class="modal fade" id="createTask"  role="dialog" tabindex="-1" aria-labelledby="createTaskTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <form action="" id="createTaskForm">
        <div class="modal-header">
        <h5 class="modal-title" id="createTaskTitle">Create Task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <div id="createTaskMessage"></div>
            <div class="form-group">
                <label for="">Enter Task Name</label><br>
                <input type="text" class="form-control" name="name" placeholder="Enter Task Name">
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success">Create Task</button>
        </div>
    </form>
    </div>
    </div>
</div>
<!--End Create Modal -->

<!-- Edit Modal -->
<div class="modal fade" id="editTask"  role="dialog" tabindex="-1" aria-labelledby="editTaskTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <form action="" id="editTaskForm">
        <div class="modal-header">
        <h5 class="modal-title" id="editTaskTitle">Edit Task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <div id="editTaskMessage"></div>
            <div class="form-group">
                <label for="">Enter Task Name</label><br>
                <input type="text" class="form-control" id="editInput" name="name" placeholder="Enter Task Name">
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success">Update Task</button>
        </div>
    </form>
    </div>
    </div>
</div>
<!--End Create Modal -->

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{asset('js')}}/main.js"></script>


</body>
</html>

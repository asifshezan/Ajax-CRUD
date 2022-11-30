<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;




Route::get('/', [TaskController::class, 'index'])->name('task.index');
Route::post('/task/store', [TaskController::class, 'store']);
Route::get('/task/edit/{id}', [TaskController::class, 'edit']);
Route::put('/task/update/{id}', [TaskController::class, 'update'])->name('task.update');
Route::post('/task/delete/{id}', [TaskController::class, 'destroy'])->name('task.destroy');














Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

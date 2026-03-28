<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('welcome_message');
    }

    // 🔥 TAMBAHKAN INI
    public function hash()
    {
        echo password_hash("123456", PASSWORD_DEFAULT);
    }
}
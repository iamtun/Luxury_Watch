//on
let res = document.querySelector('#login-click');
res.addEventListener("click", function(){
    document.querySelector('.overlay').style.display = 'flex'
})

let click_overlay = document.querySelector('#close');
click_overlay.onclick = function(){
    document.querySelector('.overlay').style.display = 'none';
    
}

//off
let submit = document.querySelector('#submit');
submit.onclick = function(){
    document.querySelector('.overlay').style.display = 'none';
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if(username == 'tuan123' && password == '12345678'){
        alert('Đăng nhập thành công');
        let icon = document.querySelector('#login-click');
        let list = document.querySelector('.list-top');

        icon.innerHTML = '<li class="item-top" id="user"><a href="#"><i class="fas fa-user"></i></a></li>';
        icon.classList.add('#user');
        icon.id = "";//xóa id login-click nhưng vẫn nhấn được ???

        let regis = document.querySelector('#regis');
        regis.style.display = 'none';
        
    }else{
        alert('Tài khoản hoặc mật khẩu không chính xác');
    }
}

//search-click
let find = document.querySelector('.header-line .control-box>a>.fa-search');
find.onclick = function(){
    document.querySelector('.header-line .control-box>.search').style.display = 'inline';
}

find.ondblclick = function(){
    document.querySelector('.header-line .control-box>.search').style.display = 'none';
}

// let list = document.querySelector('.list-top');
// console.log(list);




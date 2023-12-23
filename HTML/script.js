document.addEventListener('DOMContentLoaded', function(){
    var menuBar = document.getElementById('menu-bar');
    var navbarlinks = document.getElementById('nav-links');
    var body = document.body;


    menuBar.addEventListener('click',function(){
        if (navbarlinks.classList.toggle('active')){
        document.body.style.overflowY = 'hidden'
        } else {
        document.body.style.overflowY = 'auto';
        }

    });

    window.addEventListener('resize',function(){
                // Check if the screen width is more than 600px

        if (window.innerWidth > 600){
            // If so, ensure the nav-links are not in the 'active' state
            navbarlinks.classList.remove('active')

        }
    });

});
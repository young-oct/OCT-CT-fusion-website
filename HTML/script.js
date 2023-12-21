document.addEventListener('DOMContentLoaded', function(){
    var menuBar = document.getElementById('menu-bar');
    var navbarlinks = document.getElementById('nav-links');

    menuBar.addEventListener('click',function(){
        navbarlinks.classList.toggle('active')
    });

    window.addEventListener('resize',function(){
                // Check if the screen width is more than 600px

        if (window.innerWidth > 600){
            // If so, ensure the nav-links are not in the 'active' state
            navbarlinks.classList.remove('active')

        }
    });

});
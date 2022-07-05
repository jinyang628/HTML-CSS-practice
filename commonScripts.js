function menuToggle(){
    var MenuItems = document.getElementById("MenuItems");
    if (MenuItems.style.maxHeight == "0px"){
        MenuItems.style.maxHeight = "200px";
    }
    else{
        MenuItems.style.maxHeight = "0px";
    }
}
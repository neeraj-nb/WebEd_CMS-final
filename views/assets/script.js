function dark_data(checkbox) {
    if (checkbox.checked == true) {
        sessionStorage.setItem('darkmode', true);
    } else {
        sessionStorage.setItem('darkmode', false);
    };

};

const bg_white = document.getElementsByClassName("bg-white");


function changedarkmode() {
    let darkmodestate = sessionStorage.getItem('darkmode');
    console.log(darkmodestate);

    if (darkmodestate == "true") {
        var class_list = bg_white.classList;
        class_list.toggle("bg-dark");

    };
};

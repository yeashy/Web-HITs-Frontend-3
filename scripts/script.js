function modal(number) {
    let value = document.getElementById(`button-${number}`).value
    document.getElementById('h-modal').value = getS(value);
    value = deleteS(value);
    document.getElementById('p-modal').value = getS(value);
    value = deleteS(value);
    console.log(value);
    document.getElementById('prior').value = parseInt(getS(value));
    value = deleteS(value);
    let id = parseInt(getS(value));
    value = deleteS(value);
    $("#submit-modal").attr("onsubmit", `alert('Форма была успешно отправлена на сервер!');postEditItem(itemGetURL, ${value}, ${id});return false`)
}

function getS(value) {
    let title = [];
    let i = 0;
    while (value[i] != '_') {
        title.push(value[i]);
        i++;
    }
    return title.join("");
}

function deleteS(value) {
    let i = 0;
    value = value.split("");
    while (value[i] != '_') {
        delete value[i];
        i++;
    }
    delete value[i];
    return value.join("");
}

var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);
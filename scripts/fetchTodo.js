const authURL = "https://sas.front.kreosoft.space/api/auth";
const listGetURL = "https://sas.front.kreosoft.space/api/ToDoList";
const itemGetURL = "https://sas.front.kreosoft.space/api/ToDoItem";
const checkGetURL = "https://sas.front.kreosoft.space/api/ToDoItem/check";

const authBody = {
    "username": "yeashy",
    "password": "5632"
};

function authRequest(url, body) {
    let headers = {
        'Content-type': 'application/json'
    };
    console.log(JSON.stringify(body));
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(error => {
            const e = new Error('Не залогинилось чеееееел')
            e.data = error;
            throw e;
        })
    })
}

let token = authRequest(authURL, authBody)
    .then(data => getRequest(listGetURL, data.accessToken)
        .then(dat => createLists(dat))
        .catch(erro => console.log(erro)))
    .catch(err => console.log(err));

let authHeader = {}

let accessToken;

function getRequest(url, data) {
    accessToken = data;
    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(authHeader);
    return fetch(url, {
        method: 'GET',
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(error => {
            const e = new Error('шо?')
            e.data = error;
            throw e;
        });
    });
}

function postListRequest(url) {
    let body = {
        "name": document.getElementById('title').value
    }

    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(JSON.stringify(body));

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            getRequest(listGetURL, accessToken)
                .then(dat => createLists(dat));
        }
    });

}

function deleteListRequest(url, id) {
    let body = {
        "id": id
    }

    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(JSON.stringify(body));

    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            getRequest(listGetURL, accessToken)
                .then(dat => createLists(dat));
        }
    });
}

function postCreateItem(url) {
    let body = {
        "name": document.getElementById('text').value,
        "description": document.getElementById('description').value,
        "priority": parseInt(document.getElementById('priority').value),
        "listId": parseInt(document.getElementById('list-ch').value)
    }

    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(JSON.stringify(body));

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            getRequest(listGetURL, accessToken)
                .then(dat => createLists(dat));
        }
    });
}

function postEditItem(url, id, lId) {
    let body = {
        "id": id,
        "name": document.getElementById('h-modal').value,
        "description": document.getElementById('p-modal').value,
        "priority": parseInt(document.getElementById('prior').value),
        "listId": lId
    }

    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(JSON.stringify(body));

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            getRequest(listGetURL, accessToken)
                .then(dat => createLists(dat));
        }
    });
}

function postDeleteItem(url, id) {
    let body = {
        "ownerId": "cf2b3cc3-53a2-44b8-a4eb-08d998a923ec",
        "id": id
    }

    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(JSON.stringify(body));

    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            getRequest(listGetURL, accessToken)
                .then(dat => createLists(dat));
        }
    });
}

function postCheckItem(url, id) {
    let body = {
        "ownerId": "cf2b3cc3-53a2-44b8-a4eb-08d998a923ec",
        "id": id
    }

    authHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
    console.log(JSON.stringify(body));

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader
    }).then(response => {
        if (response.ok) {
            getRequest(listGetURL, accessToken)
                .then(dat => createLists(dat));
        }
    });
}

function createLists(data) {
    console.log(data);
    $("#all-li").empty();
    $("#all-lists").empty();
    $("#list-ch").empty();
    for (let i = 0; i < data.length; i++) {
        $template = $("#li-template");
        $liList = $template.clone();
        $liList.removeClass("d-none");
        $liList.addClass("d-flex");
        $liList.attr("id", "list-" + data[i].id);
        $liList.find(".list-title").attr("id", "tab-" + data[i].id);
        $liList.find(".list-title").attr("href", "#home-" + data[i].id);
        $liList.find(".list-title").attr("aria-controls", "home-" + data[i].id);
        $liList.find(".list-title").html(`Список дел №${i + 1} - ${data[i].name}`);
        $("#all-li").append($liList);

        $template = $("#tab-template");
        $tabList = $template.clone();
        $tabList.removeClass("d-none");
        if (i > 0) {
            $tabList.removeClass("active");
        }
        $tabList.attr("id", "home-" + data[i].id)
        $tabList.find(".tab-pane").attr("aria-labelledby", "tab-" + data[i].id)
        $tabList.find(".list-title").attr("id", "h-" + data[i].id)
        $tabList.find(".list-title").html(`Список дел №${i + 1} - ${data[i].name}`)
        $tabList.find(".list-group").attr("id", "group-" + data[i].id)
        $tabList.find(".list-btn").attr("onclick", `deleteListRequest(listGetURL, ${data[i].id})`);
        $("#all-lists").append($tabList);
        createItems(data[i].items, data[i].id);

        $template = $("#opt-template");
        $opt = $template.clone();
        $opt.removeAttr("id");
        $opt.removeClass("d-none");
        $opt.attr("value", data[i].id);
        $opt.html(`Список дел №${i + 1} - ${data[i].name}`);
        $("#list-ch").append($opt);
    }

    function getFormattedDate(datetime) {
        var date = new Date(datetime);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return day + '.' + month + '.' + year;
    }

    function createItems(n, id) {
        $(`#group-${id}`).empty();
        for (let i = 0; i < n.length; i++) {
            if (!n[i].isDone) {
                $template = $("#item-template");
                $liItem = $template.clone();
                $liItem.removeClass("d-none");
                $liItem.attr("id", "item-" + n[i].id);
                $liItem.find(".item-title").html(n[i].name);
                $liItem.find(".item-date").html(getFormattedDate(n[i].createDateTime));
                $liItem.find(".item-description").html(n[i].description);
                $liItem.find(".item-btn").attr("id", "button-" + n[i].id);
                $liItem.find(".item-btn").attr("value", `${n[i].name}_${n[i].description}_${n[i].priority}_${id}_${n[i].id}`);
                $liItem.find(".item-btn").attr("onclick", `modal(${n[i].id})`);
                $liItem.find(".item-suc").attr("onclick", `postCheckItem(checkGetURL, ${n[i].id})`);
                $liItem.find(".item-delete").attr("onclick", `postDeleteItem(itemGetURL, ${n[i].id})`);
                $liItem.addClass(getBg(n[i].priority));
                $(`#group-${id}`).append($liItem);
            }
            else {
                $template = $("#check-template");
                $chItem = $template.clone();
                $chItem.removeClass("d-none");
                $chItem.attr('id', "item-" + n[i].id);
                $chItem.find(".check-text").html(n[i].name);
                $chItem.find(".check-date").html(getFormattedDate(n[i].createDateTime));
                $chItem.find(".check-description").html(n[i].description);
                $chItem.addClass(getBg(n[i].priority));
                $(`#group-${id}`).append($chItem);
            }
        }

        function getBg(pr) {
            if (pr == 1) return "bg-light";
            if (pr == 2) return "bg-warning";
            if (pr == 3) return "bg-danger";
        }
    }
}


const getURL = 'https://sas.front.kreosoft.space/api/News';
const postURL = 'https://sas.front.kreosoft.space/api/News/like';

function getRequest(method, url) {
    return fetch(url, {
        method: method,
    }).then(response => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then(error => {
            const e = new Error('вау!')
            e.data = error;
            throw e;
        });
    });
}

let allNews = getRequest('GET', getURL)
    .then(data => loadNews(data))
    .catch(err => console.log(err));

function loadNews(data) {
    for (let i = 0; i < data.length; i++) {
        $("#accordion-holder").empty();
        $template = $("#news-template");
        $newsCard = $template.clone();
        $newsCard.removeClass("d-none");
        $newsCard.attr("id", "news-" + data[i].id);
        $newsCard.find(".card-header").attr("id", "heading-" + data[i].id);
        $newsCard.find(".btn").attr("data-target", "#collapse-" + data[i].id);
        $newsCard.find(".btn").attr("aria-controls", "collapse-" + data[i].id);
        $newsCard.find(".collapse").attr("id", "collapse-" + data[i].id);
        $newsCard.find(".collapse").attr("id", "collapse-" + data[i].id);
        $newsCard.find(".collapse").attr("aria-labelledby", "heading-" + data[i].id);
        $newsCard.find(".collapse").attr("data-parent", "#news-" + data[i].id);
        $newsCard.find(".news-title").text(data[i].title);
        $newsCard.find(".news-content").text(data[i].content);
        $newsCard.find(".news-tags").text(data[i].tags);
        $newsCard.find(".news-date").text(getFormattedDate(data[i].date));
        $newsCard.find(".news-likes").text(data[i].serviceInfo.likes);
        $newsCard.find(".news-likes").attr("id", "likes-" + data[i].id);
        $newsCard.find(".image").attr("src", `${findSrc(data[i].id)}`);
        $newsCard.find(".fa-heart").on("click", function () { changeLikes(data[i].id) });
        $("#all-news").append($newsCard);
    }
    function getFormattedDate(datetime) {
        var date = new Date(datetime);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return day + '.' + month + '.' + year;
    }

    function findSrc(n) {
        if (n == 1) return "https://git.hits.tsu.ru/Subject-Web/Web-Frontend-Manual/-/raw/master/Current/2.%20Bootstrat%20and%20fetch/media/news/img-spacex-1.jpg";
        if (n == 2) return "https://git.hits.tsu.ru/Subject-Web/Web-Frontend-Manual/-/raw/master/Current/2.%20Bootstrat%20and%20fetch/media/news/Crew-2.png";
        if (n == 3) return "https://git.hits.tsu.ru/Subject-Web/Web-Frontend-Manual/-/raw/master/Current/2.%20Bootstrat%20and%20fetch/media/news/falcon9.jpg";
        if (n == 4) return "https://git.hits.tsu.ru/Subject-Web/Web-Frontend-Manual/-/raw/master/Current/2.%20Bootstrat%20and%20fetch/media/news/SpaceX-Logo.png";
    }
}

function postRequest(method, url, body) {
    const headers = {
        'Content-type': 'application/json'
    };

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(error => {
            const e = new Error('Лайк не поставлен')
            e.data = error;
            throw e;
        })
    })
}

function post(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    })
}

function changeLikes(id) {

    document.getElementById(`likes-${id}`).innerHTML = parseInt(document.getElementById(`likes-${id}`).innerHTML) + 1;
    post('https://sas.front.kreosoft.space/api/News/like', { "id": id })
        .then(data => {
            let response = fetch('https://sas.front.kreosoft.space/api/news', {
                headers: new Headers({
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    $("#likes" + id).text(json[id - 1].serviceInfo.likes);
                })
        })
        .catch(error => console.error(error))
}






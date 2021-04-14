"use strict";
// Get people
getall();
function getall() {
    var url = "http://localhost:8080/people";
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            var ourData = JSON.parse(xhr.responseText);
            parseResponse(ourData);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}


// Get person
function getPerson(id) {
    var url = "http://localhost:8080/people/" + id;
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            var ourData = JSON.parse(xhr.responseText);
            parseResponse(ourData);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}

// Post person
function post() {
    var url = "http://localhost:8080/people";
    var data = {};
    data.surname = document.getElementById("post-surname").value;
    data.name = document.getElementById("post-name").value;
    data.number = document.getElementById("post-number").value;
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "201") {
            var ourData = JSON.parse(xhr.responseText);
            parseResponse(ourData);
        } else {
            console.error("post-error");
        }
    }
    xhr.send(json);
}

// Put person
function put(id) {
    var url = "http://localhost:8080/people/" + id;

    var data = {};
    data.surname = document.getElementById("put-surname").value;
    data.name = document.getElementById("put-name").value;
    data.number = document.getElementById("put-number").value;
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            var ourData = JSON.parse(xhr.responseText);
            parseResponse(ourData);
        } else {
            console.error("put-error");
        }
    }
    xhr.send(json);
}

// Delete person
function del(id){
    var url = "http://localhost:8080/people/" + id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            var ourData = JSON.parse(xhr.responseText);
            parseResponse(ourData);
        } else {
            console.error("delete-error");
        }
    }
    xhr.send(null);
}

//zpracování odpovědi
function parseResponse(ourData) {
    console.log(ourData);
    if (Object.prototype.toString.call(ourData) === '[object Object]') {
        var result = [];
        result.push(ourData);
        ourData = result;
    }
    document.getElementById("table").innerText = "";
    for (const i in ourData) {
        var s = ourData[i].surname + ", " + ourData[i].name + ", " + ourData[i].number;
        document.getElementById("table").append(s);
        var linebreak = document.createElement("br");
        document.getElementById("table").appendChild(linebreak);
    }
}

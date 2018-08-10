// const e = React.createElement;
const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
const urlWithCA = 'https://cors-anywhere.herokuapp.com/' + url;

// const api = function() {
//         req = new XMLHttpRequest();
//         req.open('GET',url, true);
//         req.withCredentials = false;
//         req.onload = function() {
//             console.log("Works");
//         };
//         req.send();
//     }

// class QuoteText extends React.Component {
//     constructor() {
//         super();
//         this.state = {text: 'Hello World'};
//     }
//     render() {
//         return e('span', {className: 'text'}, this.state.text);
//     }
// }

function api() {
    // var req = new XMLHttpRequest();
    // req.overrideMimeType("application/json");
    // req.open('GET', urlWithCA, true);
    // req.onload  = function() {
    //     var jsonResponse = JSON.parse(req.responseText);
    //     return jsonResponse;
    // };
    // req.send(null);
    fetch(urlWithCA)
    .then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        return jsonResponse;
    }) 
}
var data = api();
console.log(data);

// const app = document.getElementById('quote-box');
// ReactDOM.render( e(QuoteText), app );
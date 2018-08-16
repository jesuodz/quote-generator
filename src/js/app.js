const e = React.createElement;
const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
const urlCORS = 'https://cors-anywhere.herokuapp.com/' + url;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            author: null
        }
    }
    
    componentWillMount() {
        this.getData();
    }

    getData() {
        fetch(urlCORS, {
            headers : {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) =>
                this.setState({
                    text: data.quoteText,
                    author: data.quoteAuthor
        }))
        .catch((error) => { console.log(error) });
    };

    newQuote() {
        this.getData();
    }

    tweetQuote() {
        const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            this.state.text +
            this.state.author +
            '&via=jesuodz';

        window.open(url, '_blank');
    }

    render() {
        return [
            e('span', {key: 'quote', className: 'text'}, this.state.text),
            e('span', {key: 'author', className: 'author'}, this.state.author),
            e('button', {key: 'new-quote', className: 'new-quote', onClick: this.newQuote.bind(this)}, 'New Quote'),
            e('a', {key: 'tweet-quote', className: 'button', title: 'Tweet this quote', onClick: this.tweetQuote.bind(this)}, 
                e('i', {key: 'icon', className: 'fab fa-twitter'}, null)    
            )
        ];
    }
}

const app = document.getElementById('quote-box');
ReactDOM.render( e(App), app );

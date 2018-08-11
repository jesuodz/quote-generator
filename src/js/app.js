const e = React.createElement;
const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
const urlCORS = 'https://cors-anywhere.herokuapp.com/' + url;

class QuoteText extends React.Component {
    constructor() {
        super();
        this.state = {text: 'Lorem'};
    }
    render() {
        return e('span', {className: 'text'}, this.state.text);
    }
}

class QuoteAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: this.props.children.author
        };
    }
    
    render() {
        return e('span', {className: 'author'}, this.state.author);
    }
}

class newQuoteBtn extends React.Component {
    constructor() {
        super();
        this.state = {newQuote: 'Lorem'};
    }
    render() {
        return e('button', {className: 'new-quote'}, this.state.newQuote);
    }
}

class tweetQuoteBtn extends React.Component {
    constructor() {
        super();
        this.state = {tweetQuote: 'Lorem'};
    }
    render() {
        return e('a', {className: 'tweet-quote'}, this.state.tweetQuote);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "please ",
            author: "wait"
        }
        }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(urlCORS)
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    text: data.quoteText,
                    author: data.quoteAuthor
                }))
            .catch((error) => { console.log(error) });
    };

    render() {
        return [
            e(QuoteText, {key: "quote"} , {text: this.state.text}), 
            e(QuoteAuthor, {key: "author"}, {author: this.state.author}),
            e(newQuoteBtn, {key: "new-quote"}, {newQuote: 'New Quote'}),
            e(tweetQuoteBtn, {key: "tweet"}, {tweetQuote: 'Tweet!'})
        ];
    }
}

const app = document.getElementById('quote-box');
ReactDOM.render( e(App), app );
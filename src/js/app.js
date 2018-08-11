const e = React.createElement;

class QuoteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.children.text
        }
    }
    render() {
        return e('span', {className: 'text'}, this.state.text);
    }
}

class QuoteAuthor extends React.Component {
    constructor() {
        super();
        this.state = {author: 'Lorem'};
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
    render() {
        return [
            e(QuoteText, {key: "quote"} , {text: 'Here goes a quote'}), 
            e(QuoteAuthor, {key: "author"}, {author: 'Author of quote'}),
            e(newQuoteBtn, {key: "new-quote"}, {newQuote: 'New Quote'}),
            e(tweetQuoteBtn, {key: "tweet"}, {tweetQuote: 'Tweet!'})
        ];
    }
}

const app = document.getElementById('quote-box');
ReactDOM.render( e(App), app );
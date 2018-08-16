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
        fetch(urlCORS)
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

    render() {
        return [
            e('span', {key: 'quote', className: 'text'}, this.state.text),
            e('span', {key: 'author', className: 'author'}, this.state.author),
            e('button', {key: 'new-quote', className: 'new-quote', onClick: this.newQuote.bind(this)}, 'New Quote'),
            e('a', {key: 'tweet-quote', className: 'tweet-quote'}, this.state.tweetQuote)
        ];
    }
}

const app = document.getElementById('quote-box');
ReactDOM.render( e(App), app );

const e = React.createElement;
const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
const urlCORS = 'https://cors-anywhere.herokuapp.com/' + url;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            author: null,
            title: 'Quote Generator',
            attr: 'Made by ',
            name: 'Jesus Ordosgoitty',
            color : {
                color: 'black'
            },
            backgroundColor: {
                backgroundColor: 'black'
            }
        }
    }
    
    componentWillMount() {
        this.getData();
    }

    getData() {
        // Get random color
        let color = this.randomColor();

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
                author: data.quoteAuthor,
                color: {
                    'color': color          // Change colors
                },
                backgroundColor: {
                    backgroundColor: color
                }
            }) 
        )
        .catch((error) => {
            console.log(error);
        });
    };

    newQuote() {
        this.getData();
    }

    randomColor() {
        let colors = ['#01579b', '#b0bec5', '#283593', '#757575', '#3e2723', '#795548', '#ff7043', '#bf360c', 
                        '#ff6d00', '#ff9800', '#ffa000', '#ffc400', '#ffd600', '#ffeb3b', '#cddc39', '#006064',
                        '#8bc34a', '#64dd17', '#43a047', '#f50057', '#00897b', '#00bfa5', '#4dd0e1', '#00e5ff',
                        '#455a64', '#9c27b0', '#448aff', '#1976d2', '#212121', '#5c6bc0', '#4527a0', '#6200ea',
                        '#e040fb', '#00b0ff', '#ad1457', '#00c853', '#c62828', '#ef5350', '#263238', '#9e9d24'];

        let colorNum = Math.floor(Math.random() * 40);           
        let randomColor = colors[colorNum];

        return randomColor;
    }

    tweetQuote() {
        const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            this.state.text +
            this.state.author +
            '&via=jesuodz';

        window.open(url, '_blank');
    }

    render() {
        // Update backround color
        document.querySelector('body').style.backgroundColor = this.state.color['color'];
        return ([
            // Render header
            e('header', {key: 'header', className: 'title-header'}, 
                e('h1', {key: 'title', className: 'title'}, this.state.title)
            ),

            e('span', {key: 'quote', className: 'text'}, this.state.text),
            e('span', {key: 'author', className: 'author'}, this.state.author),
            e('button', {key: 'new-quote', className: 'new-quote-btn', onClick: this.newQuote.bind(this), style: this.state.backgroundColor}, 'New Quote'),
            e('a', {key: 'tweet-quote', className: 'twitter-btn', title: 'Tweet this quote', onClick: this.tweetQuote.bind(this), style: this.state.backgroundColor}, 
                e('i', {key: 'icon', className: 'fab fa-twitter'}, null)    
            ),

            // Render footer
            e('footer', {key: 'footer'},[
                e('p', {key:'attr', className:'attr' }, [
                    this.state.attr,
                    e('a', {key: 'link', href:"https://jesuodz.me", target: '_blank', style: this.state.color}, this.state.name)
                ])
            ])
        ]);
    }
}

const app = document.getElementById('quote-box');
ReactDOM.render( e(App), app );

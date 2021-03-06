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
            name: 'jesuodz',
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
        let color = this.getRandomColor();

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

    getRandomColor() {
        let colors = ['#263238', '#212121', '#3e2723', '#bf360c', '#e65100',
                    '#ff6f00', '#ffd600', '#827717', '#33691e', '#1b5e20',
                    '#004d40', '#006064', '#01579b', '#0d47a1', '#1a237e',
                    '#311b92', '#4a148c', '#880e4f', '#b71c1c', '#2962ff'];

        let colorNum = Math.floor(Math.random() * 20);           
        let randomColor = colors[colorNum];

        return randomColor;
    }

    tweetQuote() {
        const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            this.state.text +
            this.state.author +
            '&via=jesuodz';
        
        // Open tweet in a new tab
        window.open(url, '_blank');
    }

    render() {
        // Update backround color
        document.querySelector('body').style.backgroundColor = this.state.color['color'];
        let author = (this.state.author === "") ? "Anonymous" : this.state.author;
        return ([
            // Render header
            e('header', {key: 'header', className: 'header'}, 
                e('h1', {key: 'title', className: 'title-header'}, this.state.title)
            ),

            // Render quote elements
            e('span', {key: 'quote', className: 'text'}, this.state.text),
            e('span', {key: 'author', className: 'author'}, "— " + author),

            // Render buttons
            e('button', {   key: 'new-quote', 
                            className: 'new-quote-btn', 
                            onClick: this.newQuote.bind(this), 
                            style: this.state.backgroundColor
                        }, 
                        'New Quote'
                    ),
            e('a', {    key: 'tweet-quote', 
                        className: 'twitter-btn', 
                        title: 'Tweet this quote', 
                        onClick: this.tweetQuote.bind(this), 
                        style: this.state.backgroundColor
                    },  
                        // Element <i> inside anchor
                        e('i', {key: 'icon', className: 'fab fa-twitter'}, null)
                    ),

            // Render footer or
            // "Create anchor elem inside p elem inside footer elem"
            e('footer', {   key: 'footer', 
                            className: 'footer'
                        },
                        e('p', {    key:'attr',
                                    className:'attr'
                                }, [ // String followed by an anchor element
                                    this.state.attr,
                                    e('a', {    key: 'link',
                                                className: 'link',
                                                href:"https://jesuodz.me",
                                                target: '_blank',
                                                style: this.state.color
                                            }, 
                                            this.state.name
                                        )
                                    ]        
                            )
                )
        ]);
    }
}

const app = document.getElementById('quote-box');
ReactDOM.render( e(App), app );

class App extends React.Component {
    render() {
        return React.createElement('h1', null, this.props.message + '!');
    }
}

const application = document.getElementById('root');
ReactDOM.render(
    React.createElement(App, {message: 'Hola mundo'}),
    application
);
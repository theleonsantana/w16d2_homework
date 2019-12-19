class App extends React.Component {
    state = {
        lorems: []
    }

    render() {
        return(
            <div>
                <h1>Lorem Simpson</h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
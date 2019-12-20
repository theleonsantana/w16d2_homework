class App extends React.Component {
    state = {
        lorems: [],
        text: ''
    }

    componentDidMount() {
        fetch('/lorem')
        .then(response =>  response.json())
        .then(lorems => 
            this.setState({
                lorems: lorems
            })
        );
    }

    handleChange = (event) =>{
        this.setState({ [event.target.id]: event.target.value })
    }
      
    handleSubmit = (event) =>{
        event.preventDefault()
        fetch('/lorem', {
            body: JSON.stringify({text: this.state.text}),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(createdLorem => {
            return createdLorem.json();
        }).then(jsonedLorem => {
            this.setState({
                text: '',
                lorems: [jsonedLorem, ...this.state.lorems]
            })
        }).catch(error => console.log(error));
    }

    render() {
        return(
            <div>
                <h1>Lorem Simpson</h1>
                <ul>
          {ipsums.map(item => <li>{item}</li>)}
        </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
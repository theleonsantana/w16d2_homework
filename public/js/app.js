class App extends React.Component {
        state = {
        activeLorem: '',
        lorems: [],
        title: '',
        data: ''        
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
            body: JSON.stringify({title: this.state.title, data: this.state.data}),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(createdLorem => {
            return createdLorem.json();
        }).then(jsonedLorem => {
            this.setState({
                title: '',
                data: '',
                lorems: [jsonedLorem, ...this.state.lorems]
            })
        }).catch(error => console.log(error));
    }

    randomLorem = (event) => {
        event.preventDefault()
        let result = 'Lorem Simpson';
        let length = ipsums.length;
        for(let i=1;i<=20;i++) {
            console.log('in for loop')
            if (i%3===0) {
                result+=' '+ipsums[Math.floor((Math.random()*(length/3)+(2*length)/3))];
            } else if (i%2===0) {
                result+=' '+ipsums[Math.floor((Math.random()*(length/3)+(length)/3))];
            } else {
                result += ' ' + ipsums[Math.floor(Math.random()*length/3)];
            }
        }

        this.setState({
            activeLorem:result
        }) 
    }

    render() {
        return(
            <div>
                <h1>Lorem Simpson</h1>
                <form onSubmit={this.randomLorem}>
                    <input type='submit' value="D'oH" />
                </form>
                <div> {this.state.activeLorem}</div>
                <form onSubmit={this.handleSubmit}>
                    <label label='title'>Title</label>
                    <input type='text' value={this.state.description} onChange={this.handleChange} id='title' />
                    <input type='hidden' id='data' name='data' value={this.state.activeLorem} />
                    <input type='submit' value='Save Lorem' />
                </form>
                {/* <form>

                </form> */}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
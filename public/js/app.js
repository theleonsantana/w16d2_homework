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

    randomLorem = () => {
        let result = 'Lorem Simpson';
        let length = ipsums.length;
        for(let i=1;i<=5;i++) {
            console.log('in for loop')
            if (i%3===0) {
                result+=' '+ipsums[Math.floor((Math.random()*(length/3)+(2*length)/3))];
            } else if (i%2===0) {
                result+=' '+ipsums[Math.floor((Math.random()*(length/3)+(length)/3))];
            } else {
                result += ' ' + ipsums[Math.floor(Math.random()*length/3)];
            }
        }

        return result;
    }

    render() {
        return(
            <div>
                <h1>Lorem Simpson</h1>
                <div> {this.randomLorem()}</div>
                {/* <ul>
                {ipsums.map(item => <li>{item}</li>)}
                </ul> */}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
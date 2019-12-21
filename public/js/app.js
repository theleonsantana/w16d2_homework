class App extends React.Component {
        state = {
        activeLorem: '',
        lorems: [],
        title: '',
        size: 10        
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
            body: JSON.stringify({title: this.state.title, data: this.state.activeLorem}),
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
        console.log(this.state.size)
        let result = 'Lorem Simpson';
        let thirdLength = Math.floor(ipsums.length/3);
        // let punctuation = ['.', '!', ',', '?', ' ', ';']
        // let randomIpsum = ipsums[Math.floor(Math.random() * ipsums.length)]
        // let randomPunctuation = punctuation[Math.floor((Math.random() * punctuation.length))];
        // if(this.state.size === 'Short'){
        //     for(let i = 0; i > (Math.floor((Math.random() * 8) + 1)); i++){
        //         result += '' + randomIpsum;
        //         console.log(result);
        //     }
        // }else if(this.state.size === 'Medium'){
        //     for(let i = 0; i = (Math.floor((Math.random() * 20) + 9)); i++){
        //         result += '' + ipsums[Math.floor(Math.random() * ipsums.length)] + randomPunctuation;
        //     }
        // }else {
        //     for(let i = 0; i = (Math.floor((Math.random() * 40) + 15)); i++){
        //         result += '' + ipsums[Math.floor(Math.random() * ipsums.length)] + randomPunctuation;
        //     }
        // }
        // if(this.state.size==='short') 
            for(let i=1;i<=this.state.size;i++) {
                if (i%3===0) {
                    result+=' '+ipsums[Math.floor((Math.random()*thirdLength)+(2*thirdLength))];
                } else if (i%2===0) {
                    result+=' '+ipsums[Math.floor((Math.random()*thirdLength)+thirdLength)];
                } else {
                    result += ' ' + ipsums[Math.floor(Math.random()*thirdLength)];
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
                    <label htmlFor='size'>Length of Lorem:</label>
                    <select value={this.state.size} onChange={this.handleChange} id='size'>
                        <option value={10}>Short</option>
                        <option value={20}>Medium</option>
                        <option value={30}>Long</option>
                    </select>
                    <input type='submit' value="D'oH" />
                </form>
                <div> {this.state.activeLorem}</div>
                <form onSubmit={this.handleSubmit}>
                    <label label='title'>Title</label>
                    <input type='text' value={this.state.description} onChange={this.handleChange} id='title' />
                    <input type='submit' value='Save Lorem' />
                </form>
                {/* <form>

                </form> */}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
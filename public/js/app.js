// const icon = require('../images/kisspng-duff-beer-moe-szyslak-dr.png');

class App extends React.Component {
	state = {
		activeLorem: '',
		lorems: [],
		title: '',
        size: 10,
		readMode: false,
		readLoremId: 0,
		readLoremIndex: 0,

	};
	componentDidMount() {
		fetch('/lorem')
			.then(response => response.json())
			.then(lorems =>
				this.setState({
					lorems: lorems,
				})
			);
	}
	handleChange = event => {
		this.setState({ [event.target.id]: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		fetch('/lorem', {
			body: JSON.stringify({
				title: this.state.title,
				data: this.state.activeLorem,
			}),
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		})
			.then(createdLorem => {
				return createdLorem.json();
			})
			.then(jsonedLorem => {
				this.setState({
					title: '',
					data: '',
					lorems: [jsonedLorem, ...this.state.lorems],
				});
			})
			.catch(error => console.log(error));
	};

	// Runs just like handleSubmit but only changes the name of an existing
	// Lorem and resets the fields to empty strings

	updateLorem = (event) => {
		event.preventDefault();
		fetch('/lorem', {
			body: JSON.stringify({
				title: this.state.title,
			}),
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		})
			.then(updatedLorem => {
				return updatedLorem.json();
			})
			.then(updatedLorem => {
				this.state.lorems[this.state.readLoremIndex].title=updatedLorem.title;
				this.setState({
					title: '',
					data: ''
			})
		})
			.catch(error => console.log(error));
	}
	
	deleteLorem = (id, index) => {
		fetch('lorem/' + this.state.readLoremId, {
			method: 'DELETE'
		}).then((data) => {
			this.setState({
				lorems: [ ...this.state.lorems.slice(0, this.state.readLoremIndex), 
						  ...this.state.lorems.slice(this.state.readLoremIndex + 1)],
				readMode: !this.state.readMode,
				activeLorem: '',
				title: ''
			})
		})
	}

	randomLorem = event => {
		event.preventDefault();
		// Starting text for all lorems
		let result = 'Lorem Simpson';
		// punctuation that is randomly distributed at the end
		// of each quote
		let punctuation = ['.', '!', ',', '?', ' ', ';'];
		for (let i = 1; i <= this.state.size; i++) {
			// Random quote + random punctuation
			let randomIpsum = ipsums[Math.floor(Math.random() * ipsums.length)];
			let randomPunctuation =
				punctuation[Math.floor(Math.random() * punctuation.length)];
			result += ' ' + randomIpsum + randomPunctuation;
		}
		this.setState({
			activeLorem: result,
			readMode: false
		});
    };
	
	// View saved lorem as well as title which becomes editable upon viewing

    viewLorem = (lorem, index) => {
        this.setState({
            readMode: !this.state.readMode,
			activeLorem: lorem.data,
			title: lorem.title,
			readLoremId: lorem._id,
			readLoremIndex: index,
			readLoremTitle: lorem.title
        })
    }

	render() {
		return (
			<div>
				<h1 className="app-title drop-shadow">Lorem Simpson</h1>
				<div className="app-container">
                <ul className='ipsumList'>
                {this.state.lorems.map((lorem, index) => {
                    return(<li onClick={() => this.viewLorem(lorem, index)}>{lorem.title}</li>)
                    })}
                </ul>
				<button onClick = {() => this.deleteLorem(event.target._id, event.target.index)}>Delete</button>
                <div>
                    <div>
					<form className="generate-form" onSubmit={this.randomLorem}>
						<label className="form-label drop-shadow" htmlFor="size">
							Paragraph Length:{' '}
						</label>
						<select
							className="select-css"
							value={this.state.size}
							onChange={this.handleChange}
							id="size"
						>
							{/* integer values are passed into randomLorem
							for loop to create lorems of different sizes */}
							<option value={10}>Short</option>
							<option value={20}>Medium</option>
							<option value={30}>Long</option>
						</select>

						<label style={{ margin: 40 }} htmlFor="generate-lorem">
							<img
								className="generate-icon"
								src="../images/kisspng-duff-beer-moe-szyslak-dr.png"
							/>
						</label>
						<input id="generate-lorem" type="submit" value="D'oH" />
						<span className="instructions">
							***Click the Duff can to generate lorem Simpson
						</span>
					</form>
					{/* Submit button either saves new random lorem or
					edits title of existing lorem depending on whether we are
					viewing a random or saved lorem */}
					<form onSubmit={this.state.readMode ? this.updateLorem : this.handleSubmit}>
						<label className="form-label drop-shadow" label="title">
							Title:{' '}
						</label>
						<input
							type="text"
							value={this.state.title}
							onChange={this.handleChange}
							id="title"
						/>
						<input type="submit" value="Save Lorem" />
					</form>
					<p className="output-text">{this.state.activeLorem}</p>
                    </div>
                </div>
			</div>
            </div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));

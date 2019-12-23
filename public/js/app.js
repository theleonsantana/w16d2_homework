// const icon = require('../images/kisspng-duff-beer-moe-szyslak-dr.png');

class App extends React.Component {
	state = {
		activeLorem: '',
		lorems: [],
		title: '',
        size: 10,
		readMode: false,
		editMode: false,
		readLorem: '',
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
		this.setState({ updateTitle: event.target.value });
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
	deleteLorem = (lorem, index) => {
		fetch('lorem/' + this.state.readLoremId, {
			method: 'DELETE'
		}).then((data) => {
			this.setState({
				lorems: [ ...this.state.lorems.slice(0, this.state.readLoremIndex), ...this.state.lorems.slice(this.state.readLoremIndex + 1)],
				readMode: !this.state.readMode
			})
		})
	}
	editLorem = (lorem, index) => {
		this.setState({
			editMode: !this.state.editMode
		})
	}

	// submitUpdateLorem = (event) => {
	// 	event.preventDefault();
	// 	this.state.readLoremTitle = this.state.updateTitle;
	// 	fetch('lorem/' + this.state.readLoremId, {
	// 		body: JSON.stringify(this.state.readLoremTitle),
	// 		method: 'PUT',
	// 		headers: {
	// 			Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json'
	// 		}
	// 	})
	// 	.then((updatedLorem) => updatedLorem.json())
	// 	.then((jsonedLorem) => {
	// 		fetch('/lorem').then((response) => response.json()).then((lorems) => {
	// 			this.setState({ lorems: lorems,
	// 			editMode: !this.state.editMode,
	// 			updateTitle: ''})
	// 		})
	// 	})
	// }
	randomLorem = event => {
		event.preventDefault();
		console.log(this.state.size);
		let result = 'Lorem Simpson';
		let thirdLength = Math.floor(ipsums.length);
		let punctuation = ['.', '!', ',', '?', ' ', ';'];
		for (let i = 1; i <= this.state.size; i++) {
			let randomIpsum = ipsums[Math.floor(Math.random() * ipsums.length)];
			let randomPunctuation =
				punctuation[Math.floor(Math.random() * punctuation.length)];
			result += ' ' + randomIpsum + randomPunctuation;
		}
		this.setState({
			activeLorem: result,
		});
    };
    
    viewLorem = (lorem, index) => {
        this.setState({
            readMode: !this.state.readMode,
			readLorem: lorem.data,
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
                <div>
                {this.state.readMode ? 
                    <div>
                        <p>{this.state.readLorem}</p>
						<button onClick = {() => this.deleteLorem(event.target._id, event.target.index)}>Delete</button>
						<button onClick = {() => this.editLorem(event.target._id, event.target.index)}>Edit Title</button>
						{this.state.editMode && ( 
							<form 
								onSubmit={(e) => {
								e.preventDefault();
								this.submitUpdateLorem(e)
								}}
							>
								<h2>Update Title</h2>
									<label htmlFor="title">Title:</label>
									<input
										type="text"
											default={this.state.readLoremTitle}
											value={this.state.updateTitle}
											onChange={this.handleChange}
											id="title"
										/>
								<input type="submit" />
							</form>
						)}
                    </div> :
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
					<form onSubmit={this.handleSubmit}>
						<label className="form-label drop-shadow" label="title">
							Title:{' '}
						</label>
						<input
							type="text"
							value={this.state.description}
							onChange={this.handleChange}
							id="title"
						/>
						<input type="submit" value="Save Lorem" />
					</form>
					<p className="output-text">{this.state.activeLorem}</p>
                    </div>}
                </div>
			</div>
            </div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));

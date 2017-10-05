import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './Question.css';

class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      input: ""
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }



  handleInput (e) {
    e.preventDefault()
    this.setState({
      input: e.target.value
    })
    console.log(this.state.input)
  }

  componentDidMount () {
    axios.get('http://localhost:4000/api/questions').then(response => this.setState({
        data: response.data
      })
    )
  }

  onSubmit(e){
    console.log("in onSubmit:", e.target.value)
    axios.post('http://localhost:4000/api/questions', {content: this.state.input})
         .then(response => console.log('response', response))
         .catch(err => console.log('error:', err))
  }

  render() {

    var data = this.state.data
    var questions = data.map((question, i) => {
      return (
        <h3>{i + 1} {question.content}</h3>
      )
    })
    return (
      <div className="Question">
        <h1>Questions</h1>
        {questions}
        <form onSubmit={ this.onSubmit }>
          <input onChange={this.handleInput} type="text" placeholder="Enter a question"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Question;

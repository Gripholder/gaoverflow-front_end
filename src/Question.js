import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './Question.css';

class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      input: "",
      currentQuestion: [],
      editMode: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.viewQuestion = this.viewQuestion.bind(this)
    this.editQuestion = this.editQuestion.bind(this)
    this.handleEditInput = this.handleEditInput.bind(this)
    this.onEditSubmit = this.onEditSubmit.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }



  handleInput (e) {
    e.preventDefault()
    this.setState({
      input: e.target.value
    })
  }

  componentDidMount () {
    axios.get('http://localhost:4000/api/questions').then(response => this.setState({
        data: response.data
      })
    )
  }

  onSubmit(e){
    axios.post('http://localhost:4000/api/questions', {content: this.state.input})
         .then(response => console.log('response', response))
         .catch(err => console.log('error:', err))
  }

viewQuestion(e) {
  this.setState({
    currentQuestion: e
  })
  this.viewAnswerForm
}

editQuestion(){
  this.setState({
    editMode: true
  })
}

handleEditInput(e){
  this.setState({
    input: e.target.value
  })
}

onEditSubmit(e){
  var link = `http://localhost:4000/api/questions/${this.state.currentQuestion._id}/edit`
  axios.post(link, {content: this.state.input})
  .then(response => console.log('response:', this.state.input))
  .catch(err => console.log('error:', err))
}

deleteQuestion(){
  var link = `http://localhost:4000/api/questions/${this.state.currentQuestion._id}/delete`
  axios.post(link).then(response => console.log('response:', response))
  .catch(err => console.log('error:', err))
}

  render() {
    var data = this.state.data
    console.log(data)
    var questions = data.map((question, i) => {
      return (
        <h3 onClick={() => this.viewQuestion(question)}>{i + 1} {question.content}</h3>
      )
    })

    var show = (
              <div className="answerForm">
              {this.state.currentQuestion.content}
              <br />
              {this.state.currentQuestion.answer}
              <form onSubmit={ this.answerOnSubmit }>
                <input onChange={ this.answerHandleInput } type="text" placeholder="Enter a answer"></input>
                <button type="submit">Submit</button>
              </form>
              <button onClick={ this.editQuestion }>Edit</button>
              <button onClick={ this.deleteQuestion }>Delete</button>
            </div>
    )

    var edit = (
      <div>
        <form onSubmit={ this.onEditSubmit }>
          <input onChange={ this.handleEditInput} type="text" placeholder={ this.state.currentQuestion.content }></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
    return (
      <div className="Question">
        <h1>Questions</h1>
        {questions}
        <form onSubmit={ this.onSubmit }>
          <input onChange={this.handleInput} type="text" placeholder="Enter a question"></input>
          <button type="submit">Submit</button>
        </form>
        {this.state.currentQuestion.length !== 0 && show}
        {this.state.editMode && edit}
      </div>
    );
  }
}

export default Question;

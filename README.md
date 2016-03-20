# Ember-quiz

A simple quiz component

## Installation

	ember install ember-quiz

## Usage

	{{!my-template.hbs}}
	{{basic-quiz quiz=quiz canRetry=true attemptsAllowed=3}}


--
		
	/* model */
	quiz: {
  	title: 'My Quiz',
  	  questions: [
        {
      	  id: '0',
      	  question: 'What is 2 + 2?',
      	  choices: ['1','3','4'],
      	  answer: '4'
    	},
    	{
      	  id: '1',
      	  question: 'What is 5 x 2?',
      	  choices: ['1','7','4','10'],
      	  answer: '10'
    	}
      ]
	}

## Configuration


**canRetry** *false* - Signal that retries are allowed

**attemptsAllowed** *Infinity* - Define how many retry attempts are allowed


## Demo

<http://crodriguez1a.github.io/ember-quiz/>

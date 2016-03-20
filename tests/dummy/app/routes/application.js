import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
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
            choices: ['1','7','4', '10'],
            answer: '10'
          },
          {
            id: '2',
            question: 'Who was the 16th president of the United States?',
            choices: ['Barack Obama', 'Abraham Lincoln', 'Thomas Jefferson', 'George Jefferson'],
            answer: 'Abraham Lincoln'
          }
        ]
      }
    };
  }
});

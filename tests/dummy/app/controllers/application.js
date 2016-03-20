import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { get, set } = Ember;

export default Ember.Controller.extend({
  // Block syntax demo
  myQuiz: {},

  // Demo quiz
  @computed('model.quiz', 'model.quiz.questions')
  theQuiz(quiz, questions) {
    return quiz;
  },

  // New Question
  question: null,
  answer: null,
  @computed('choiceA', 'choiceB', 'choiceC')
  choices() {
    return Ember.A([...arguments]);
  },
  actions: {
    // Add a new question to model
    add() {
      let quizQuestions = get(this, 'model.quiz.questions');

      Ember.A(quizQuestions).pushObject({
        id: `${quizQuestions.length + 1}`,
        question: get(this, 'question'),
        choices: get(this, 'choices'),
        answer: get(this, 'answer')
      });

      set(this, 'model.quiz.questions', quizQuestions);
      set(this, 'question', null);

      set(this, 'added', true);
      Ember.run.later(() => {
        set(this, 'added', false);
      }, 1500);
    }
  }
});

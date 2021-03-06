import Ember from 'ember';
import layout from '../templates/components/basic-quiz';
import computed from 'ember-computed-decorators';

const { get, set } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['basic-quiz'],

  /**
    Signal that retries are allowed

    @property canRetry
    @public
    @returns Boolean
  */
  canRetry: false,

  /**
    Save of number of retries attempted

    @property retryAttempts
    @private
    @returns Number
  */
  _retryAttempts: 0,

  /**
    Define how many retry attempts are allowed

    @property attemptsAllowed
    @public
    @returns Number
  */
  attemptsAllowed: Infinity,

  /**
    Signal that user has submitted their answers

    @property _didSumbit
    @private
    @returns Boolean
  */
  _didSumbit: false,

  /**
    Show user confirm dialogue

    @property _showConfirmDialogue
    @private
    @returns Boolean
  */
  _showConfirmDialogue: false,

  /**
    Numerical percentage value of correct answers

    @property _percentage
    @private
    @returns Number
  */
  _percentage: 0,

  /**
    Calculated percentage of correct answers

    @property _results
    @private
    @retuns String
  */
  @computed('_percentage')
  _results(_percentage) {
    return `${_percentage}%`;
  },

  /**

  */
  @computed('submitResults')
  _canSubmitResults(action) {
    return !!action;
  },

  /**
    Calculate the percentage of correct answers

    @method _calcPercentage
    @private
  */
  _calcPercentage(details) {
    let percentage = Math.round( (details.passed/details.total) * 100 );
    // update percentage property
    set(this, '_percentage', percentage);
    // update quiz with results
    set(details, 'percentage', percentage);
    set(this, 'resultDetails', details);
  },

  /**
    Some needed config for qunit

    @method configQunit
    @private
  */
  _configQunit() {
    QUnit.config.scrolltop = false;
    QUnit.config.altertitle = false;
  },

  /**
    Warn the consumer if needed data is missing

    @method _warnAboutModel
    @private
  */
  _warnAboutModel() {
    let quiz = Ember.A(this.get('quiz.questions'));

    if (!quiz) {
      console.error('No quiz data was provided');
    } else {
      quiz.forEach((q) => {
        if(!q.question || !q.choices || !q.answer || q.choices.length < 2) {
          console.warn('Please provide and adequate number of choices, and also the answer for each question. Otherwise, the quiz may break or not be graded accurately.');
        }
      });
    }
  },

  didInitAttrs() {
    this._configQunit();
    this._warnAboutModel();
  },
  actions: {
    /**
      Hide/show confirmation dialogue

      @method _confirm
      @private
    */
    _confirm(confirmed) {
      set(this, '_showConfirmDialogue', confirmed);
    },
    /**
      Grade the quiz

      @method grade
      @private
    */
    _grade() {
      let quiz = get(this, 'quiz');

      this.setProperties({
        _retryAttempts: get(this, '_retryAttempts') + 1,
        _didGrade: true,
        _showConfirmDialogue: false
      });

      //generate a qunit module
      QUnit.module( get(this, 'quiz.title') || 'Quiz', () => {
        //iterate through questions
        get(quiz, 'questions').forEach((q) => {
          QUnit.test( get(q, 'question'), function( assert ) {
            let done = assert.async();
            assert.equal( get(q, 'userAnswer'), get(q, 'answer') );
            done();
          });
        });
      });

      //calc results
      QUnit.moduleDone(( details ) => {
        this._calcPercentage(details);
      });
    },

    /**
      Block syntax

      @method pushAnswer
      @public
    */
    pushAnswer() {

    },
    /**
      Provide results object to action

      @method submitResults
      @public
    */
    submitResults() {
      let action = get(this, 'submitResults');
      let results = get(this, 'resultDetails');
      if (action && results) {
        this.sendAction("submitResults", results);
        this.setProperties({
          canRetry: false,
          _canSubmitResults: false
        })
      }
    }
  }
});

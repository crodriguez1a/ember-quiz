import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let sample = {
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
};

moduleForComponent('basic-quiz', 'Integration | Component | basic quiz', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{basic-quiz}}`);

  assert.equal(this.$().text().trim(), '', 'It renders with nothing in it');

  // Template block usage:
  this.render(hbs`
    {{#basic-quiz}}
      template block text
    {{/basic-quiz}}
  `);

  assert.equal(this.$().text().trim(), 'Not yet supported.      template block text', 'It displays appropriate message when used as block');
});

test('it assembles quiz', function(assert) {
  this.set('sample', sample);
  this.render(hbs`{{basic-quiz quiz=sample}}`);

  assert.equal(this.$('.question').length, 2, 'Correct number of questions were added');
  assert.equal(this.$('.radio').length, 7, 'Correct number of choices were added');
});

test('it grades the quiz properly', function(assert) {
  this.set('sample', sample);
  this.render(hbs`{{basic-quiz quiz=sample}}`);

  this.$('.submit-answers').click();
  this.$('.confirm').click();

  assert.ok(this.$('.has-results').text() !== '', 'A result was calculated and displayed');
});

test('it accepts and processes the "canRetry" parameter', function(assert) {
  this.set('sample', sample);
  this.render(hbs`{{basic-quiz quiz=sample canRetry=true}}`);

  this.$('.submit-answers').click();
  this.$('.confirm').click();

  assert.equal(this.$('.retry').length, 1, 'A retry button is available when canRetry is set to true');
});

test('it accepts and processes the "attemptsAllowed" parameter', function(assert) {
  this.set('sample', sample);
  this.render(hbs`{{basic-quiz quiz=sample canRetry=true attemptsAllowed=1}}`);

  this.$('.submit-answers').click();
  this.$('.confirm').click();

  assert.equal(this.$('.retry').length, 1, 'A retry button is available');

  this.$('.retry').click();
  assert.equal(this.$('.retry').length, 0, 'Max attempts were reached and a retry button is no longer available');
});

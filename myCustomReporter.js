const Mocha = require('mocha');
const { EVENT_TEST_PASS, EVENT_TEST_FAIL } = Mocha.Runner.constants;

class MyCustomReporter extends Mocha.reporters.Base {
  constructor(runner) {
    super(runner);
    runner.on(EVENT_TEST_PASS, (test) => {
      console.log('✔️😊 Passed:', test.title);
    });
    runner.on(EVENT_TEST_FAIL, (test, err) => {
      console.log('❌ Failed:', test.title, 'with error:', err.message);
    });
  }
}

module.exports = MyCustomReporter;

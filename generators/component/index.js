const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'confirm',
      name: 'frontEndComponent',
      default: true,
      message: 'Is it a front component?',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? 'A component or container with this name already exists' : true
        }
        return 'The name is required'
      },
    },
    {
      type: 'confirm',
      name: 'wantCSS',
      default: true,
      message: 'Does it have styling?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
  ],
  actions: (data) => {
    // let module = data.frontEndComponent ? 'frontend' : 'backoffice'
    const actions = [{
      type: 'add',
      path: `../src/components/{{properCase name}}/{{properCase name}}.js`,
      templateFile: './component/es6.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `../tests/components/{{properCase name}}/{{properCase name}}.spec.js`,
      templateFile: './component/test.js.hbs',
      abortOnFail: true,
    }]
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: `../src/components/{{properCase name}}/{{properCase name}}.less`,
        templateFile: './component/styles.less.hbs',
        abortOnFail: true,
      })
    }
    return actions
  },
}

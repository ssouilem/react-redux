const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'confirm',
      name: 'frontEndContainer',
      default: true,
      message: 'Is it a front container?',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
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
    // let module = data.frontEndContainer ? 'frontend' : 'backoffice'
    const actions = [
      {
        type: 'add',
        path: `../src/containers/{{properCase name}}/{{properCase name}}.js`,
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../tests/containers/{{properCase name}}/{{properCase name}}.spec.js`,
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
    ]
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: `../src/containers/{{properCase name}}/{{properCase name}}.less`,
        templateFile: './container/styles.css.hbs',
        abortOnFail: true,
      })
    }

    return actions
  },
}

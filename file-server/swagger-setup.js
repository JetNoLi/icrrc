const swaggerExpress = require('express-jsdoc-swagger');

module.exports = {
    info: {
        version: '1.0.0',
        title: 'ICRRC Documentation',
        description: "This is an interactive documentation experience for the ICRRC system, which allows you to actually execute api requests to the running ICRRC server",
        license: {
          name: 'MIT',
        },
      },
      security: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
      baseDir: __dirname,
      // Glob pattern to find your jsdoc files (multiple patterns can be added in an array) 
      filesPattern: './routes/*.js',
      // URL where SwaggerUI will be rendered
      swaggerUIPath: '/docs',
      // Expose OpenAPI UI
      exposeSwaggerUI: true,
      // Expose Open API JSON Docs documentation in `apiDocsPath` path.
      exposeApiDocs: false,
      // Open API JSON Docs endpoint.
      apiDocsPath: '/v3/api-docs',
      // Set non-required fields as nullable by default
      notRequiredAsNullable: false,
      // You can customize your UI options.
      // you can extend swagger-ui-express config. You can checkout an example of this
      // in the `example/configuration/swaggerOptions.js`
      swaggerUiOptions: {},
      // multiple option in case you want more that one instance
      multiple: true,
}


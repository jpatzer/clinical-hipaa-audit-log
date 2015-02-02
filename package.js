Package.describe({
  summary: "HIPAA audit log.",
  version: "1.0.2",
  git: "https://github.com/jpatzer/clinical-hipaa-audit-log",
  name: "jeffpatzer:hipaa-audit-log"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.export('HipaaLogger');
  api.export('Hipaa');

  api.use('meteor-platform', ['client','server']);
  api.use('iron:router@1.0.0', 'client');
  api.use('nemo64:bootstrap@3.3.0', 'client');
  api.use('mrt:momentjs@2.0.0', 'client');
  api.use('less', 'client');
  api.use('fortawesome:fontawesome@4.0.0', 'client');
  api.use('alanning:roles@1.0.0', ['client','server']);

  api.addFiles('hipaa.audit.html', "client");

  api.addFiles('hipaa.logging.js', ["client","server"]);
  api.addFiles('hipaa.shared.js', ["client","server"]);
  api.addFiles('hipaa.server.js', "server");
  api.addFiles('hipaa.client.js', "client");
  api.addFiles('hipaa.less', "client");
});

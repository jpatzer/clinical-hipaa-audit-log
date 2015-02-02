Package.describe({
  summary: "HIPAA audit log for ClinicalFramework. Forked from clinical:hipaa-audit-log. Updated packages for compatibility and altered some of the implementation.",
  version: "1.0.1",
  git: "https://github.com/jpatzer/clinical-hipaa-audit-log",
  name: "jeffpatzer:hipaa-audit-log"
});

Package.on_use(function (api) {
  api.export('HipaaLogger');
  api.export('Hipaa');

  api.use('meteor-platform', ['client','server']);
  api.use('iron:router', 'client');
  api.use('nemo64:bootstrap', 'client');
  api.use('mrt:momentjs', 'client');
  api.use('less', 'client')
  api.use('fortawesome:fontawesome', 'client')

  //api.use('clinical-ui-syntax', 'client')

  api.addFiles('hipaa.audit.html', "client");

  api.addFiles('hipaa.logging.js', ["client","server"]);
  api.addFiles('hipaa.shared.js', ["client","server"]);
  api.addFiles('hipaa.server.js', "server");
  api.addFiles('hipaa.client.js', "client");
  api.addFiles('hipaa.less', "client");
});

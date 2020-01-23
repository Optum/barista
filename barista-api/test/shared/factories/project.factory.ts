import { Project } from '@app/models';
import Factory from 'factory-girl';

Factory.define('Project', Project, {
  name: Factory.seq('Project.name', n => `Test-Project-${n}`),
  gitUrl: Factory.seq('Project.gitUrl', n => `http://github.com/test-project-${n}.git`),
});

# Contributing to *barista*

## Introduction

### Welcome to project barista!

>Thank you for considering a contribution to *barista*. Your support of this project within Optum InnerSource directly contributes the mission of Optum and UHG to help people live healthier lives and to help make the health system work better for everyone.

## Code of Conduct
This project and everyone participating in it is governed by the [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [Kevin Nelson](mailto:pknelson@optum.com).

## How to Contribute

### Issues

#### Report a bug

Before you report, please [check to see if it's already reported](https://github.com/Optum/barista/issues?utf8=%E2%9C%93&q=is%3Aissue).

We value good bug reports. Please be as detailed as possible in your report. What steps will reproduce the issue? What browser and OS experience the problem? What outcome did you expect? These details will help us resolve your issue faster.

#### Request a feature

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

### Pull Requests

You are responsible for pitching your changeset, responding to code review feedback, and finally, merging the code and seeing it all the way through to **production**. Since it's your code and you know it best, it's your job to make sure it doesn't have any surprises once it goes live.

1. Create a branch, write some tests, write some code
1. Open a Pull Request for your changeset for code review and feedback
  1. Write a summary of the changeset (what does it fix? why is this necessary? etc)
  1. Request a review from one or more of the following project maintainers (only one is required):
    1.  Randy Olinger @rolinge
    1.  Kevin Barnes @kbarne42
    1.  Vincil Bishop @vbishop2
    1.  Kevin Nelson @pnels22
  1.  You're looking for :+1: or :-1: from at least one project maintainer to decide whether to move forward or try a different approach.  Additional input from any team member is encouraged and welcome.
1. If your changes depend on an alteration to the project database, create a separate branch & PR for any new database migrations using the [Sequelize-js syntax](http://docs.sequelizejs.com/manual/getting-started.html).  Add your migration(s) to the project [here](https://github.optum.com/OPTUMSource/barista/tree/master/server/migrations).
  1. Database migrations need to be independent of supporting code changes
  1. Your database migration PR needs to be merged and deployed before any supporting code changes are merged
  1. Please reference the associated database migration PR in the primary changeset PR so your reviewer(s) can see the entire context.
1. If you've got at least one :+1: from a maintainer and the test suite is green, then proceed with a merge from your branch to master. :shipit:
  1. Merge (or request a merge) the Pull Request and Delete the branch
  1. Build (or request a build) of the appropriate jenkins pipeline.
  1. After shipping your PR, monitor **barista dev** to ensure there aren't any unintended performance issues or bugs.
  1.  Coordinate with Kevin Nelson @pnels22 to arrange promotion to **production** with the next release.
  1.  Monitor **production** to ensure successful deployment without unexpected results.

# Bootstrapping your development environment

## Dependencies:

1. Install node.js version 12.4.0++
1. Install npm version 6.9.0+
1. Install postgres version 9.6+
1. Install python version 3.5+ (we have a server requirement that we use 3.5.x)
1. (Optional) If you're on a Mac, you can do this easily enough using homebrew. In that case, you can use "services" to manage your local postgres instance:
    ```
    $ brew tap homebrew/services
    ```
1. Install pm2 version 3.5.1+ (https://github.com/Unitech/pm2/tree/master/bin):
    ```
    $ npm install -g pm2
    ```
    To make sure npm and pm2 are installed correctly, run `$ ls -Alh /usr/local/lib/node_modules` and verify that they are installed with `admin` group permissions but not as `root`.

## Development environment:
1. Pull source from git.
1. Grab dependencies: (execute from the `/server` directory)
    `$ npm install`
1. Start a local postgres instance. Using homebrew services,
    `$ brew services start postgresql@9.6`  (or a newer version of postgres, e.g., postgresql@11)
1. Configure local postgres barista database:
    ```
    $ createdb barista_dev
    $ DB_DATABASE=barista_dev npm run-script db:migrate
    ```
1. Start the project from the project directory in the command line or use the included Visual Studio Project file and run/debug from within the IDE (environment variables may need to be passed along dependening on your database setup).
    ```
    $ DB_DATABASE=barista_dev pm2-dev start src/server.js
    ```
1. In a web browser, navigate to http://localhost:8099/
1. Add your first project. Let's [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) Barista. So add that as your first project with https://github.optum.com/OPTUMSource/barista as the repo URL.

## Scanning components:
1. A binary of [Fossology's](https://wiki.fossology.org/start) `nomossa` tool (as well as a macos version, `mac_nomossa`) can be found in the `server/util` directory. (The `S`tand-`A`lone version of the `nomos` tool without database dependency.)
   This tool scans for a file or set of files for licenses using regular expression matching heuristics
1. The [OWASP](https://www.owasp.org/index.php/Main_Page) [`dependency-check`](https://www.owasp.org/index.php/OWASP_Dependency_Check) tool should be downloaded directly.
   _Beware: At the time of this writing, the homebrew version of `dependency-check` was behind a couple releases and therefore had different behavior and JSON output. It's best to get version 5.0+._
   **`dependency-check` requires Java in order to run**

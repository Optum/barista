---
id: barista-on-docker
title: Building and Running Barista using Docker
sidebar_label: barista-on-docker
---


While you are free to buid and run Barista on your own, we find it easiest to use docker images to manage the process.  Using [docker-compose](https://docs.docker.com/compose/), one can get a demo version of Barista up and running in a short time with very few customizations.
The compose configuration will build the application with docker and  run the 5 major components with a single command.
- Postgres Database - stores the state of the application.
- Redis Server - a queue and ephemeral store for inter-server communication.
- barista-web - A web server (nginx) that presents the application to the user's browser and also performs as a reverse proxy for the browser to transact with the API server.
- barista-api - The main processing to manage the state of the application and service the users.
- barista-scan - The engine that takes care of scanning, building, and evaluating the software under test.

While a deployment based on docker-compose is certainly viable for a small instance, it would be a very good idea to use a system like [Kubernetes](https://kubernetes.io/) to to manage and schedule the containers.  This gives the administrator finer grained control over things like secrets, resources, and monitoring.  We have built out templates for [Openshift OKD](https://www.okd.io/) and [Helm](https://helm.sh/), contact the authors for more info.

## OK, lets get on with it...

This set of files are used to build the application with docker and to deploy the components via docker-compose.  Follow these steps to deploy the system in your environment.

### Dependancies
- Download the code from github.

   `git clone https://github.com/optum/Barista.git`
- Ensure [docker](https://docs.docker.com/install/) is running on your workstation or server.  Docker version 19.0.3 or greater is preferred, but anything over 18 should work.  (but has not been tested)
  - Be aware that RHEL and CentOs and others may ship earlier versions of docker and not be viable
  - Be aware that Fedora dropped support for docker and moved to podman, which is supposed to be compatible, but we have not tested it.  Your mileage may vary...
- Ensure [docker-compose](https://docs.docker.com/compose/install/) is installed

### Optional - skip this step unless you want to build from source
  - Run commands to replace some specific symlinks with actual files.  (only needed if you do not use the pre-built docker images)

    ```cd barista;
    rm -fr barista-scan/src/{models,services,shared} &&
    cp -r barista-api/src/{models,services,shared} barista-scan/src;
    ```

### Customizations
- check the settings in the file barista-compose.env .  Make modifications as necessary.  (Things like SMTP server, usernames and passwords for internal Git servers, personal access token for public github server if private repos are in play)

### Run the program
- Start the program using docker-compose, wait about 3 minutes for initialization (or watch the logs), then seed with basic data if you wish..

```
      docker-compose up -d redis database ;  # let the database initialize the first time you run this...
      sleep 30 ;                             # wait 30 seconds
      docker-compose up -d ;                 # start the rest of the modules...
```

### Get to know your new friend
- Point your browser to [http://your_servername/signin] (default username is Admin, password is $barista@admin, all case sensitive)
- Add a project and initiate a scan.  There should be some projects already defined under "Organization", and you can easily add more using the plus button.  (See the [documentation](https://optum.github.io/barista/docs/overview) for more info)
- When the scan module is first run, it downloads and installs pythons version 2.7 and 3.7.5 into virtual environments.   This takes a few (like 5) minutes so if you have python projects to scan, ensure this is complete.
- You can watch container logs using "docker logs" command, or use
`docker-compose logs [-f] [--tail=xxx] [component...]`  (where component is one or more of barista-api, barista-scan, barista-web, database, redis)
- You can "reset to factory defaults" with the following command, which stops all containers and deletes the volumes

   `docker-compose down -v`

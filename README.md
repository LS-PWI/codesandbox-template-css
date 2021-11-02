To fully run the application with: api server, build-watch, and browsersync, use the following commands:

You will see that some commands make use of a docker network. Use `docker network create --subnet=172.18.0.0/16 npm-net` to create a user defined network.

To start browsersync on ports 3000 and 3001.
```bash
docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app -p 3000:3000 -p 3001:3001 --net npm-net node:16-alpine npm run dev:livereload
```

To start the build-watch loop
```bash
docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app node:16-alpine npm run dev:build-watch
```

To start the api server
```bash
docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app -p 8080:8080 --net npm-net --ip 172.18.0.8 node:16-alpine npm run start
```

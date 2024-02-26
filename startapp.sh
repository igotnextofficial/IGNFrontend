docker build --no-cache -t ign-frontend .
docker run -p 3000:3000 --name ign-frontend -v ${PWD}:/usr/src/app/ignfrontend ign-frontend

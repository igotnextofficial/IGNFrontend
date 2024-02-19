docker build -t ign-frontend .

docker run -p 3000:3000  --name ign-frontend ign-frontend

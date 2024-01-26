# ezc-backend
A React Native development environment using Docker Compose.

## Getting Started
Download and install Docker for Mac or Windows.

Clone this repository:

git clone https://github.com/devopsifyco/ezc-backend.git
Change directories to the new repository:

cd ezc-backend/.ci

## How To Use
Start the Docker containers:

Create .env under .ci folder as sample
'''
NODE_ENV=production
MONGODB_URI=mongodb+srv://thaihoang:CHANGEPASSWORD_HERE@atlascluster.ff6acs7.mongodb.net/graduation_project
'''

Running this step for the first time builds the container images. This process can take a while.
'''
docker compose up -d
'''
this starts a Node.js server to keep the container running.

Stop the running containers:

'''
docker compose down
'''

## Helpful Resources

* [Docker Compose](https://medium.com/@indusasikala93/deploying-a-react-application-using-a-jenkins-ci-cd-pipeline-4c2a7dcf1efb)
* [Docker Cleanup Commands](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)
* [React Native Docs](https://facebook.github.io/react-native/docs/getting-started.html)
* [Jenkins CICD React](https://medium.com/@indusasikala93/deploying-a-react-application-using-a-jenkins-ci-cd-pipeline-4c2a7dcf1efb)
* [React / Express / MySQL](https://github.com/docker/awesome-compose/tree/master/react-express-mysql)


echo "Building server"
docker build -t react-ticket-server:latest .\server


echo "Tagging server"
docker image tag react-ticket-server:latest zacke/react-ticket-server:latest


echo "Pushing server"
docker push zacke/react-ticket-server:latest

echo "Done!"


pause
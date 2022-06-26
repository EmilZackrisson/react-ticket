
echo "Building client"
docker build -t react-ticket-client:latest .\client


echo "Tagging client"
docker image tag react-ticket-client:latest zacke/react-ticket-client:latest

echo "Pushing client"
docker push zacke/react-ticket-client:latest

@REM echo "Building"
@REM docker build -t react-ticket:latest .

@REM echo "Tagging"
@REM docker image tag react-ticket:latest zacke/react-ticket:latest

@REM echo "Pushing"
@REM docker push zacke/react-ticket:latest

pause
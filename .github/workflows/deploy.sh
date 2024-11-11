#!/bin/bash
echo "Running deploy script"
# TAG=$([ "$BRANCH" == "main" ] && echo "latest" || echo "dev")
TAG = "latest"

echo "Logging in to AWS"
aws ecr get-login-password --region ${AWS_REGION} |
  docker login --username AWS --password-stdin "${AWS_ECR}"
echo "Logged in successfully"

echo "Building Docker image for ${BRANCH}"
# if [ "$BRANCH" == "main" ]; then
docker build -t owa --no-cache .
# else
#   docker build -t owa --no-cache --file Dockerfile-dev .
# fi

echo "Tagging image with latest"
docker tag owa "${AWS_ECR}/owa:latest"

echo "Pushing image"
docker push "${AWS_ECR}/owa:latest"

echo "Forcing new deployment"
aws ecs update-service --cluster ${AWS_ECS_CLUSTER} --service ${AWS_ECS_SERVICE} --force-new-deployment --region ${AWS_REGION}

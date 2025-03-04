# order-management-prototype

Order Management Prototype

# Build Docker images for all services defined in the docker-compose.yml file

make build

# Start Docker containers

make up

# Build Docker images for all services and start Docker containers

make run

# Start the database and backend services, then run tests

make test

# Stop all Docker containers

down:
docker-compose down

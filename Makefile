# Makefile for building and running the app
# 

# Build Docker images for all services defined in the docker-compose.yml file
build:    
	docker-compose build

# Start Docker containers
up:    
	docker-compose up

# Build Docker images for all services and start Docker containers
run:    
	docker-compose up --build

# Start the database and backend services, then run tests
test:   
	docker-compose up -d backend
	docker-compose exec backend pytest --maxfail=1 --disable-warnings -q
	docker-compose down

# Stop all Docker containers
down:
	docker-compose down
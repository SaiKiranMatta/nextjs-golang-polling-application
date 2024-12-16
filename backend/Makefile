# Simple Makefile for a Go project

# Variables 
IMAGE_NAME := polling-backend
TAG := latest
CONTAINER_NAME := polling-backend-container
PORT := 6565

# Build the application
all: build test

build:
	@echo "Building for the current platform..."
	@go build -o build/api ./cmd/api

# Cross-platform builds
#Build for Windows
build-windows:
	@echo "Building for Windows..."
	set GOOS=windows && set GOARCH=amd64 && go build -o build/windows/api.exe ./cmd/api

# Build for Linux
build-linux:
	@echo "Building for Linux..."
	set GOOS=linux && set GOARCH=amd64 && go build -o build/linux/api ./cmd/api

# Build for macOS
build-darwin:
	@echo "Building for macOS..."
	set GOOS=darwin && set GOARCH=amd64 && go build -o build/darwin/api ./cmd/api

# Run the application
run:
	@go run cmd/api/main.go

# Test the application
test:
	@echo "Testing..."
	@go test ./... -v

# Integration Tests for the application
itest:
	@echo "Running integration tests..."
	@go test ./internal/database -v

# Clean the binary
clean:
	@echo "Cleaning..."
	@rm -f main

# Live Reload
watch:
	@powershell -ExecutionPolicy Bypass -Command "if (Get-Command air -ErrorAction SilentlyContinue) { \
		air; \
		Write-Output 'Watching...'; \
	} else { \
		Write-Output 'Installing air...'; \
		go install github.com/air-verse/air@latest; \
		air; \
		Write-Output 'Watching...'; \
	}"

.PHONY: all build run test clean watch itest


# Build the Docker image
docker-build:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Run the Docker container
docker-run:
	docker run -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME):$(TAG)

# Stop and remove the Docker container
docker-stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Remove the Docker image
clean-image:
	docker rmi $(IMAGE_NAME):$(TAG) || true

# Clean up unused Docker images and containers
prune:
	docker system prune -f

# Rebuild the image from scratch
rebuild: stop clean-image build

# Tail the container logs
logs:
	docker logs -f $(CONTAINER_NAME)

# Help message
help:
	@echo "Makefile Commands:"
	@echo "  build         Build the Docker image"
	@echo "  run           Run the Docker container"
	@echo "  stop          Stop and remove the container"
	@echo "  clean-image   Remove the Docker image"
	@echo "  prune         Remove unused images and containers"
	@echo "  rebuild       Rebuild the image from scratch"
	@echo "  logs          Tail the container logs"
	@echo "  help          Show this help message"

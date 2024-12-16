# Stage 1: Build
FROM golang:1.23-alpine AS builder
WORKDIR /app

# Copy Go mod files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the application code
COPY . .

# Build the application
RUN go build -o main ./cmd/api

# Stage 2: Runtime
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
COPY .env .env

# Expose port 6565
EXPOSE 6565
CMD ["./main"]

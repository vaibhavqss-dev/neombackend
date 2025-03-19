# Makefile for database operations

# Default target
.PHONY: all
all: help

# Help target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make seed    - Seeds the database with initial data"

# Seed the database
.PHONY: seed
seed:
	@echo "Seeding database..."
	node dist/seeders/seed.js
	@echo "Database seeded successfully!"

run:
	node dist/server.js



MESSAGE ?= "update"
.PHONY: commit
commit:
	git add .
	git commit -m $(MESSAGE)
	git push origin main
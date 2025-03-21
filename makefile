.PHONY: all
all: help

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make seed    - Seeds the database with initial data"
	@echo "  make run     - Runs the server"
	@echo "  make commit  - Commits the changes to the repository"

.PHONY: seed
seed:
	@echo "Seeding database..."
	node dist/seeders/seed.js
	@echo "Database seeded successfully!"

run:
	node dist/server.js

MESSAGE ?= "status: bug fixing and updation"
.PHONY: commit
commit:
	git add .
	git commit -m $(MESSAGE)
	git push origin main
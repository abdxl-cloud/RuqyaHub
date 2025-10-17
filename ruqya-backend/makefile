.PHONY: help install dev prod test migrate seed clean format lint docker-build docker-up docker-down

# Variables
PYTHON := python
PIP := pip
UVICORN := uvicorn
ALEMBIC := alembic
PYTEST := pytest

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "Ruqya Healing Hub Backend - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	@echo "📦 Installing dependencies..."
	$(PIP) install -r requirements.txt
	@echo "✅ Dependencies installed!"

install-dev: ## Install development dependencies
	@echo "📦 Installing development dependencies..."
	$(PIP) install -r requirements.txt
	$(PIP) install black flake8 mypy
	@echo "✅ Development dependencies installed!"

dev: ## Run development server with auto-reload
	@echo "🚀 Starting development server..."
	$(UVICORN) app.main:app --reload --host 0.0.0.0 --port 8000

prod: ## Run production server
	@echo "🚀 Starting production server..."
	$(UVICORN) app.main:app --host 0.0.0.0 --port 8000 --workers 4

test: ## Run tests
	@echo "🧪 Running tests..."
	$(PYTEST) tests/ -v --cov=app --cov-report=html --cov-report=term

test-watch: ## Run tests in watch mode
	@echo "🧪 Running tests in watch mode..."
	$(PYTEST) tests/ -v --watch

migrate-init: ## Initialize Alembic migrations
	@echo "🗄️  Initializing migrations..."
	$(ALEMBIC) init alembic
	@echo "✅ Migrations initialized!"

migrate-create: ## Create a new migration (use MSG="message")
	@echo "🗄️  Creating migration: $(MSG)"
	$(ALEMBIC) revision --autogenerate -m "$(MSG)"
	@echo "✅ Migration created!"

migrate-up: ## Apply all pending migrations
	@echo "🗄️  Applying migrations..."
	$(ALEMBIC) upgrade head
	@echo "✅ Migrations applied!"

migrate-down: ## Rollback last migration
	@echo "🗄️  Rolling back migration..."
	$(ALEMBIC) downgrade -1
	@echo "✅ Migration rolled back!"

migrate-history: ## Show migration history
	@echo "📜 Migration history:"
	$(ALEMBIC) history

migrate-current: ## Show current migration version
	@echo "📍 Current migration:"
	$(ALEMBIC) current

seed: ## Seed database with initial data
	@echo "🌱 Seeding database..."
	$(PYTHON) scripts/seed_data.py
	@echo "✅ Database seeded!"

seed-admin: ## Create admin user only
	@echo "👤 Creating admin user..."
	$(PYTHON) scripts/create_admin.py
	@echo "✅ Admin user created!"

clean: ## Clean up generated files
	@echo "🧹 Cleaning up..."
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.coverage" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "htmlcov" -exec rm -rf {} + 2>/dev/null || true
	@echo "✅ Cleaned up!"

format: ## Format code with Black
	@echo "🎨 Formatting code..."
	black app/ tests/
	@echo "✅ Code formatted!"

lint: ## Lint code with Flake8
	@echo "🔍 Linting code..."
	flake8 app/ tests/ --max-line-length=100 --exclude=__pycache__,alembic
	@echo "✅ Code linted!"

type-check: ## Type check with MyPy
	@echo "🔎 Type checking..."
	mypy app/ --ignore-missing-imports
	@echo "✅ Type check complete!"

check: format lint type-check ## Run all code quality checks

db-create: ## Create database (PostgreSQL)
	@echo "🗄️  Creating database..."
	createdb ruqya_db
	@echo "✅ Database created!"

db-drop: ## Drop database (PostgreSQL)
	@echo "⚠️  Dropping database..."
	dropdb ruqya_db
	@echo "✅ Database dropped!"

db-reset: db-drop db-create migrate-up seed ## Reset database completely
	@echo "🔄 Database reset complete!"

logs: ## Show application logs
	@echo "📋 Showing logs..."
	tail -f logs/app.log

shell: ## Open Python shell with app context
	@echo "🐍 Opening Python shell..."
	$(PYTHON) -i scripts/shell.py

routes: ## Show all API routes
	@echo "🛣️  API Routes:"
	$(PYTHON) scripts/show_routes.py

backup: ## Backup database
	@echo "💾 Creating database backup..."
	pg_dump ruqya_db > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup created!"

docker-build: ## Build Docker image
	@echo "🐳 Building Docker image..."
	docker build -t ruqya-backend .
	@echo "✅ Docker image built!"

docker-up: ## Start Docker containers
	@echo "🐳 Starting Docker containers..."
	docker-compose up -d
	@echo "✅ Docker containers started!"

docker-down: ## Stop Docker containers
	@echo "🐳 Stopping Docker containers..."
	docker-compose down
	@echo "✅ Docker containers stopped!"

docker-logs: ## Show Docker logs
	@echo "📋 Docker logs:"
	docker-compose logs -f

setup: install migrate-up seed ## Complete initial setup
	@echo "🎉 Setup complete! Run 'make dev' to start the server."

quick-start: ## Quick start for development
	@echo "⚡ Quick starting..."
	@make install
	@make migrate-up
	@make seed
	@make dev
	
.PHONY: help install dev prod test migrate seed clean check-db docker-*

# Variables
PYTHON := python
PIP := pip
UVICORN := uvicorn
ALEMBIC := alembic
DOCKER_COMPOSE := docker-compose

# Colors
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
RED := \033[0;31m
MAGENTA := \033[0;35m
NC := \033[0m

.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "$(BLUE)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║           Ruqya Backend - Available Commands             ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(MAGENTA)⚡ Quick Start:$(NC)"
	@echo "  $(GREEN)make setup$(NC)               - Complete Docker setup (recommended)"
	@echo "  $(GREEN)make dev$(NC)                 - Start development (Docker)"
	@echo ""
	@echo "$(MAGENTA)🐳 Docker Commands:$(NC)"
	@echo "  $(YELLOW)make docker-up$(NC)           - Start all services"
	@echo "  $(YELLOW)make docker-down$(NC)         - Stop all services"
	@echo "  $(YELLOW)make docker-logs$(NC)         - View logs"
	@echo "  $(YELLOW)make docker-shell$(NC)        - Open backend shell"
	@echo "  $(YELLOW)make docker-migrate$(NC)      - Run migrations"
	@echo "  $(YELLOW)make docker-seed$(NC)         - Seed database"
	@echo "  $(YELLOW)make docker-reset$(NC)        - Complete reset"
	@echo ""
	@echo "$(MAGENTA)💻 Local Commands (without Docker):$(NC)"
	@echo "  $(YELLOW)make local-setup$(NC)         - Setup locally"
	@echo "  $(YELLOW)make local-dev$(NC)           - Run locally"
	@echo ""
	@echo "$(MAGENTA)🔧 Other Commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | grep -v -E "^(docker-|local-|setup|dev|help)" | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-25s$(NC) %s\n", $$1, $$2}'
	@echo ""

# ============================================================================
# MAIN COMMANDS (Docker-based)
# ============================================================================

setup: docker-up-build docker-wait docker-migrate docker-seed ## Complete setup with Docker (DEFAULT)
	@echo ""
	@echo "$(GREEN)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║              ✅ SETUP COMPLETE!                            ║$(NC)"
	@echo "$(GREEN)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)🔗 Backend API:$(NC) http://localhost:8000"
	@echo "$(YELLOW)📚 API Docs:$(NC) http://localhost:8000/docs"
	@echo "$(YELLOW)📖 ReDoc:$(NC) http://localhost:8000/redoc"
	@echo ""
	@echo "$(YELLOW)🔑 Admin Credentials:$(NC)"
	@echo "  • Email: admin@ruqyahealinghub.com"
	@echo "  • Password: admin123"
	@echo ""
	@echo "$(MAGENTA)💡 Useful Commands:$(NC)"
	@echo "  • make logs          - View application logs"
	@echo "  • make shell         - Open backend shell"
	@echo "  • make docker-down   - Stop all services"
	@echo "  • make docker-reset  - Reset everything"
	@echo ""

dev: docker-up ## Start development environment (Docker)
	@echo "$(GREEN)✅ Development environment started!$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:8000$(NC)"
	@echo "$(YELLOW)API Docs: http://localhost:8000/docs$(NC)"
	@echo ""
	@make logs

logs: docker-logs ## View application logs

shell: docker-shell ## Open shell in backend container

stop: docker-down ## Stop all services

restart: docker-restart ## Restart all services

reset: docker-reset ## Complete reset (clean and rebuild)

# ============================================================================
# DOCKER COMMANDS
# ============================================================================

docker-build: ## Build Docker images
	@echo "$(BLUE)🔨 Building Docker images...$(NC)"
	@$(DOCKER_COMPOSE) build
	@echo "$(GREEN)✅ Images built!$(NC)"

docker-up: ## Start Docker services
	@echo "$(BLUE)🐳 Starting Docker services...$(NC)"
	@$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)✅ Services started!$(NC)"

docker-up-build: ## Build and start Docker services
	@echo "$(BLUE)🔨 Building and starting Docker services...$(NC)"
	@$(DOCKER_COMPOSE) up -d --build
	@echo "$(GREEN)✅ Services started!$(NC)"

docker-wait: ## Wait for services to be ready
	@echo "$(BLUE)⏳ Waiting for services to be ready...$(NC)"
	@sleep 5
	@for i in 1 2 3 4 5 6 7 8 9 10; do \
		if docker exec ruqya_backend python -c "from app.database import engine; engine.connect()" 2>/dev/null; then \
			echo "$(GREEN)✅ Backend is ready!$(NC)"; \
			sleep 2; \
			break; \
		else \
			echo "  Attempt $$i/10: Services not ready, waiting..."; \
			sleep 3; \
		fi; \
		if [ $$i -eq 10 ]; then \
			echo "$(RED)❌ Services failed to start$(NC)"; \
			exit 1; \
		fi; \
	done

docker-down: ## Stop Docker services
	@echo "$(YELLOW)⏹️  Stopping Docker services...$(NC)"
	@$(DOCKER_COMPOSE) down
	@echo "$(GREEN)✅ Services stopped!$(NC)"

docker-restart: ## Restart Docker services
	@echo "$(BLUE)🔄 Restarting Docker services...$(NC)"
	@$(DOCKER_COMPOSE) restart
	@echo "$(GREEN)✅ Services restarted!$(NC)"

docker-logs: ## View Docker logs (all services)
	@$(DOCKER_COMPOSE) logs -f

docker-logs-backend: ## View backend logs only
	@$(DOCKER_COMPOSE) logs -f backend

docker-logs-db: ## View database logs only
	@$(DOCKER_COMPOSE) logs -f db

docker-ps: ## Show running containers
	@$(DOCKER_COMPOSE) ps

docker-shell: ## Open shell in backend container
	@echo "$(BLUE)🐚 Opening shell in backend container...$(NC)"
	@docker exec -it ruqya_backend /bin/bash

docker-db-shell: ## Open PostgreSQL shell
	@echo "$(BLUE)🐚 Opening database shell...$(NC)"
	@docker exec -it ruqya_db psql -U postgres ruqya_db

docker-migrate: ## Run migrations in Docker
	@echo "$(BLUE)⬆️  Running migrations...$(NC)"
	@docker exec ruqya_backend alembic upgrade head
	@echo "$(GREEN)✅ Migrations applied!$(NC)"

docker-migrate-create: ## Create migration in Docker (use MSG="message")
	@if [ -z "$(MSG)" ]; then \
		echo "$(RED)❌ Error: MSG is required$(NC)"; \
		echo "$(YELLOW)Usage: make docker-migrate-create MSG=\"your message\"$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)📝 Creating migration...$(NC)"
	@docker exec ruqya_backend alembic revision --autogenerate -m "$(MSG)"
	@echo "$(GREEN)✅ Migration created!$(NC)"

docker-seed: ## Seed database in Docker
	@echo "$(BLUE)🌱 Seeding database...$(NC)"
	@docker exec ruqya_backend python scripts/seed_data.py
	@echo "$(GREEN)✅ Database seeded!$(NC)"

docker-clean: ## Remove all containers, volumes, and images
	@echo "$(RED)🧹 Cleaning Docker resources...$(NC)"
	@$(DOCKER_COMPOSE) down -v --remove-orphans
	@docker system prune -f
	@echo "$(GREEN)✅ Cleaned!$(NC)"

docker-reset: docker-clean docker-up-build docker-wait docker-migrate docker-seed ## Complete Docker reset
	@echo "$(GREEN)✅ Docker environment reset complete!$(NC)"

# ============================================================================
# LOCAL COMMANDS (Without Docker)
# ============================================================================

local-install: ## Install dependencies locally
	@echo "$(BLUE)📦 Installing dependencies...$(NC)"
	@$(PIP) install -r requirements.txt
	@echo "$(GREEN)✅ Dependencies installed!$(NC)"

local-setup: local-install create-env local-db-start wait-for-local-db local-migrate-up local-seed ## Complete local setup (without Docker)
	@echo "$(GREEN)✅ Local setup complete!$(NC)"
	@echo "$(YELLOW)Run 'make local-dev' to start the server$(NC)"

create-env: ## Create .env file
	@if [ ! -f .env ]; then \
		echo "$(BLUE)📝 Creating .env file...$(NC)"; \
		if [ -f .env.example ]; then \
			cp .env.example .env; \
		else \
			echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ruqya_db" > .env; \
			echo "SECRET_KEY=dev-secret-key-change-in-production-min-32-chars" >> .env; \
			echo "FRONTEND_URL=http://localhost:3000" >> .env; \
			echo "ENVIRONMENT=development" >> .env; \
		fi; \
		echo "$(GREEN)✅ .env file created$(NC)"; \
	else \
		echo "$(YELLOW).env file already exists$(NC)"; \
	fi

local-db-start: ## Start PostgreSQL locally
	@echo "$(BLUE)🗄️  Starting PostgreSQL...$(NC)"
	@if docker ps -a --format '{{.Names}}' | grep -q '^ruqya_postgres$$'; then \
		if docker ps --format '{{.Names}}' | grep -q '^ruqya_postgres$$'; then \
			echo "$(YELLOW)PostgreSQL already running$(NC)"; \
		else \
			docker start ruqya_postgres; \
			echo "$(GREEN)✅ PostgreSQL started!$(NC)"; \
		fi; \
	else \
		docker run -d \
			--name ruqya_postgres \
			-e POSTGRES_USER=postgres \
			-e POSTGRES_PASSWORD=postgres \
			-e POSTGRES_DB=ruqya_db \
			-p 5432:5432 \
			-v ruqya_postgres_data:/var/lib/postgresql/data \
			postgres:15-alpine && echo "$(GREEN)✅ PostgreSQL started!$(NC)"; \
	fi

wait-for-local-db: ## Wait for local database
	@echo "$(BLUE)⏳ Waiting for database...$(NC)"
	@for i in 1 2 3 4 5 6 7 8 9 10; do \
		if docker exec ruqya_postgres pg_isready -U postgres > /dev/null 2>&1; then \
			echo "$(GREEN)✅ Database ready!$(NC)"; \
			sleep 2; \
			break; \
		else \
			echo "  Attempt $$i/10: Waiting..."; \
			sleep 2; \
		fi; \
	done

local-db-stop: ## Stop local PostgreSQL
	@echo "$(YELLOW)⏹️  Stopping PostgreSQL...$(NC)"
	@docker stop ruqya_postgres 2>/dev/null || true
	@echo "$(GREEN)✅ PostgreSQL stopped!$(NC)"

local-migrate-up: ## Run migrations locally
	@echo "$(BLUE)⬆️  Running migrations...$(NC)"
	@$(ALEMBIC) upgrade head
	@echo "$(GREEN)✅ Migrations applied!$(NC)"

local-seed: ## Seed database locally
	@echo "$(BLUE)🌱 Seeding database...$(NC)"
	@$(PYTHON) scripts/seed_data.py
	@echo "$(GREEN)✅ Database seeded!$(NC)"

local-dev: ## Run development server locally
	@echo "$(BLUE)🚀 Starting local development server...$(NC)"
	@echo "$(YELLOW)Server: http://localhost:8000$(NC)"
	@echo "$(YELLOW)API Docs: http://localhost:8000/docs$(NC)"
	@echo ""
	@$(UVICORN) app.main:app --reload --host 0.0.0.0 --port 8000

# ============================================================================
# UTILITIES
# ============================================================================

clean: ## Clean up generated files
	@echo "$(BLUE)🧹 Cleaning up...$(NC)"
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@echo "$(GREEN)✅ Cleaned!$(NC)"

health: ## Check API health
	@echo "$(BLUE)🏥 Checking API health...$(NC)"
	@curl -s http://localhost:8000/health | python -m json.tool 2>/dev/null || echo "$(RED)❌ Server is not running$(NC)"

routes: ## Show all API routes
	@docker exec ruqya_backend python scripts/show_routes.py 2>/dev/null || $(PYTHON) scripts/show_routes.py

backup: ## Backup database
	@echo "$(BLUE)💾 Creating database backup...$(NC)"
	@mkdir -p backups
	@docker exec ruqya_db pg_dump -U postgres ruqya_db > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✅ Backup created!$(NC)"

info: ## Show project information
	@echo "$(BLUE)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║              Ruqya Backend - Information                  ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)⚡ Quick Start:$(NC)"
	@echo "  make setup    - Complete Docker setup"
	@echo "  make dev      - Start development"
	@echo "  make logs     - View logs"
	@echo ""
	@echo "$(YELLOW)🔗 URLs:$(NC)"
	@echo "  • API: http://localhost:8000"
	@echo "  • Docs: http://localhost:8000/docs"
	@echo "  • ReDoc: http://localhost:8000/redoc"
	@echo ""
	@echo "$(YELLOW)🔑 Admin Credentials:$(NC)"
	@echo "  • Email: admin@ruqyahealinghub.com"
	@echo "  • Password: admin123"
	@echo ""
	@echo "$(YELLOW)🏗️  Technology:$(NC)"
	@echo "  • FastAPI + PostgreSQL + Docker"
	@echo "  • SQLAlchemy 2.0 + Alembic"
	@echo "  • WebSocket support"
	@echo ""

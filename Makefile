up:
	@docker compose up -d

down:
	@docker compose down

build:
	@docker compose build

bash:
	@docker compose exec app bash

log:
	@docker compose logs

run:
	@docker compose run app bash
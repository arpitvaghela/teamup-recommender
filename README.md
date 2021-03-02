# teamup-recommender

A recommendation system that makes the task of choosing group mates simpler, easier and faster

## Setup

### API

```sh
python -m venv venv

pip install fastapi[all] uvicorn[standard] sqlalchemy psycopg2

cd backend/

uvicorn api.main:app --reload --port 5000
```

### App

```sh
cd app/
npm i
npm start
```

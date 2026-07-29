from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import usuarios
from app.data.db import engine
from app.data import usuarioDB


# Crear las tablas que todavía no existan
usuarioDB.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="API de usuarios",
    description="Ivan Isay Guerra",
    version="1.0.0",
)


# Orígenes permitidos para Expo Web
origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://localhost:19006",
    "http://127.0.0.1:19006",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "Accept",
        "Authorization",
        "Content-Type",
        "Origin",
    ],
)


@app.get("/")
def inicio():
    return {
        "ok": True,
        "mensaje": "API funcionando correctamente",
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "database": "configured",
    }


app.include_router(usuarios.router)
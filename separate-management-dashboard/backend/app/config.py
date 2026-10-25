import os
from pydantic_settings import BaseSettings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_SUBFOLDER_PATH = os.path.join(os.path.dirname(BASE_DIR), "database", "edutrack.db")

if os.path.exists(os.path.dirname(DB_SUBFOLDER_PATH)):
    DEFAULT_DB_PATH = DB_SUBFOLDER_PATH.replace("\\", "/")
else:
    DEFAULT_DB_PATH = os.path.join(BASE_DIR, "edutrack.db").replace("\\", "/")

class Settings(BaseSettings):
    PROJECT_NAME: str = "ODAIHUB Management Dashboard API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{DEFAULT_DB_PATH}"
    )
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "edutrack_alexandria_secret_key_2026_super_secure")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    MAX_UPLOAD_SIZE_MB: int = 10

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

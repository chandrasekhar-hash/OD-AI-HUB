import os
from pydantic_settings import BaseSettings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))

# Prioritize the shared active database used by the management dashboard
MGMT_DB_PATH = os.path.join(REPO_ROOT, "separate-management-dashboard", "database", "edutrack.db")
SHARED_ROOT_DB = os.path.join(REPO_ROOT, "database", "edutrack.db")
LOCAL_DB_SUBFOLDER = os.path.join(os.path.dirname(BASE_DIR), "database", "edutrack.db")

if os.path.exists(MGMT_DB_PATH):
    DEFAULT_DB_PATH = MGMT_DB_PATH.replace("\\", "/")
elif os.path.exists(SHARED_ROOT_DB):
    DEFAULT_DB_PATH = SHARED_ROOT_DB.replace("\\", "/")
elif os.path.exists(os.path.dirname(LOCAL_DB_SUBFOLDER)):
    DEFAULT_DB_PATH = LOCAL_DB_SUBFOLDER.replace("\\", "/")
else:
    DEFAULT_DB_PATH = os.path.join(BASE_DIR, "edutrack.db").replace("\\", "/")

# Shared uploads directory from management dashboard
MGMT_UPLOADS = os.path.join(REPO_ROOT, "separate-management-dashboard", "backend", "uploads")
if os.path.exists(MGMT_UPLOADS):
    DEFAULT_UPLOAD_DIR = MGMT_UPLOADS
else:
    DEFAULT_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

class Settings(BaseSettings):
    PROJECT_NAME: str = "ODAIHUB Public Landing API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{DEFAULT_DB_PATH}"
    )
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "edutrack_alexandria_secret_key_2026_super_secure")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", DEFAULT_UPLOAD_DIR)
    MAX_UPLOAD_SIZE_MB: int = 10

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

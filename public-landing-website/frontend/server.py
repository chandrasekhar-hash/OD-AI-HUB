import os
import uvicorn
from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI(title="OD AI HUB Public Website Frontend Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def no_cache_static(request: Request, call_next):
    response = await call_next(request)
    path = request.url.path
    if path.endswith(".css") or path.endswith(".js") or path == "/" or path.endswith(".html"):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    return response

FRONTEND_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(os.path.dirname(FRONTEND_DIR), "backend")
STATIC_DIR = os.path.join(BACKEND_DIR, "static")
IMAGES_DIR = os.path.join(STATIC_DIR, "images")

# Proxy API calls directly to Public Backend on port 8001
PUBLIC_BACKEND_URL = "http://localhost:8001"
client = httpx.AsyncClient(base_url=PUBLIC_BACKEND_URL, timeout=30.0)

@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"], include_in_schema=False)
async def proxy_api(path: str, request: Request):
    url = f"/api/{path}"
    headers = dict(request.headers)
    headers.pop("host", None)
    content = await request.body()
    try:
        rp_resp = await client.request(
            method=request.method,
            url=url,
            headers=headers,
            params=request.query_params,
            content=content
        )
        return Response(
            content=rp_resp.content,
            status_code=rp_resp.status_code,
            headers=dict(rp_resp.headers)
        )
    except Exception as e:
        return Response(content=f'{{"detail": "Public Backend unavailable on port 8001: {str(e)}"}}', status_code=502, media_type="application/json")

@app.get("/images/{file_path:path}", include_in_schema=False)
def serve_images(file_path: str):
    target = os.path.join(IMAGES_DIR, file_path)
    if os.path.isfile(target):
        return FileResponse(target)
    target_web = os.path.join(FRONTEND_DIR, "images", file_path)
    if os.path.isfile(target_web):
        return FileResponse(target_web)
    return FileResponse(os.path.join(FRONTEND_DIR, "logo.jpg"))

app.mount("/website", StaticFiles(directory=FRONTEND_DIR), name="website_static")

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/", include_in_schema=False)
def index():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

@app.get("/programs", include_in_schema=False)
@app.get("/programs.html", include_in_schema=False)
def programs():
    return FileResponse(os.path.join(FRONTEND_DIR, "programs.html"))

@app.get("/soon", include_in_schema=False)
def soon():
    return FileResponse(os.path.join(FRONTEND_DIR, "soon.html"))

@app.get("/{full_path:path}", include_in_schema=False)
def fallback(full_path: str):
    candidate = os.path.join(FRONTEND_DIR, full_path)
    if os.path.isfile(candidate):
        return FileResponse(candidate)
    return RedirectResponse(url=f"/#/{full_path}")

if __name__ == "__main__":
    import socket
    port = int(os.environ.get("PORT", 5000))
    def is_port_in_use(p):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            return s.connect_ex(('127.0.0.1', p)) == 0
    if is_port_in_use(port) and "PORT" not in os.environ:
        port = 5001
        print(f"Port 5000 is in use (e.g. macOS AirPlay). Using fallback port {port}")
    print(f"Starting Public Website Frontend on http://localhost:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)


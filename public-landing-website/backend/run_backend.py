import uvicorn

if __name__ == "__main__":
    print("Starting Public Website Backend on http://localhost:8001")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=False)

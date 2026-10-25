import uvicorn

if __name__ == "__main__":
    print("Starting Management Dashboard Backend on http://localhost:8002")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8002, reload=False)

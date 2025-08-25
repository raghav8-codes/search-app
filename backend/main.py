from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from crud import save_results, get_results
from models import KeywordRequest

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict later to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔍 Search GitHub repos
@app.post("/search")
def search_keyword(req: KeywordRequest):
    keyword = req.keyword.strip()
    if not keyword:
        raise HTTPException(status_code=400, detail="Keyword cannot be empty")

    try:
        response = requests.get(
            f"https://api.github.com/search/repositories?q={keyword}",
            headers={"Accept": "application/vnd.github.v3+json"}
        )
        response.raise_for_status()

        items = response.json().get("items", [])
        results = [{"name": i["name"], "url": i["html_url"]} for i in items[:10]]

        # ✅ Save into DB
        save_results(keyword, results)

        return {"message": "Results saved successfully!", "results": results}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"API request failed: {str(e)}")


# 📂 Fetch results from MongoDB
@app.get("/results")
def list_results():
    data = get_results()
    if not data:
        return {"message": "No results yet. Try searching first!", "results": []}
    return {"message": "Previous results fetched", "results": data}

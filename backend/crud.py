
db_memory = []

def save_results(keyword, data):
    db_memory.append({"keyword": keyword, "data": data})

def get_results():
    return db_memory

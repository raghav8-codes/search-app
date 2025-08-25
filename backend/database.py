from pymongo import MongoClient

client = MongoClient("mongodb://atlas-sql-68abd27b51d29623e2ce266b-v6mbmq.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin")
db = client["keyword_search_db"]
collection = db["results"]
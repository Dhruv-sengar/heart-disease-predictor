import requests
import json

url = "https://heart-disease-predictor-alqg.onrender.com/predict"
data = {
    "age": 60,
    "sex": 1,
    "cp": 1,
    "trestbps": 140,
    "chol": 260,
    "fbs": 0,
    "restecg": 1,
    "thalach": 140,
    "exang": 1,
    "oldpeak": 2.0,
    "slope": 1,
    "ca": 0,
    "thal": 3
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

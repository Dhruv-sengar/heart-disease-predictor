from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Heart Disease Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_path = os.path.join("backend", "model.joblib")
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    model = None
    print(f"Warning: Model not found at {model_path}. Please train the model first.")

class PatientData(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API is running"}

@app.post("/predict")
def predict_heart_disease(data: PatientData):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([data.dict()])
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]
        
        return {
            "prediction": int(prediction),
            "probability": float(probability),
            "risk_level": "High" if probability > 0.5 else "Low"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

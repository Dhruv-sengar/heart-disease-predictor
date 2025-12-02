# Heart Disease Predictor 🫀

An AI-powered heart disease prediction system with a beautiful, modern UI built with React and FastAPI.

## Features

- 🤖 Machine Learning model trained on UCI Heart Disease dataset
- 🎨 Premium, glassmorphic UI with dark/light mode
- 📊 Real-time risk assessment with probability scores
- 🔬 Clinical parameter input with tooltips
- 📈 Model accuracy: 86% | ROC AUC: 0.95

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- Axios

### Backend
- FastAPI
- scikit-learn
- pandas
- uvicorn

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Download and process the dataset:
```bash
python backend/download_data.py
```

3. Train the model:
```bash
python backend/train_model.py
```

4. Start the backend server:
```bash
python backend/main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Fill in the patient data form with clinical parameters
4. Click "Analyze Risk Profile" to get the prediction
5. View the risk assessment and probability score

## API Endpoints

- `GET /` - Health check
- `POST /predict` - Predict heart disease risk
  - Request body: Patient data (age, sex, cp, trestbps, chol, etc.)
  - Response: Prediction, probability, and risk level

## Model Information

- **Algorithm**: Random Forest Classifier
- **Dataset**: UCI Heart Disease Dataset (Cleveland)
- **Features**: 13 clinical parameters
- **Performance**: 
  - Accuracy: 86.67%
  - Precision: 83.33%
  - Recall: 83.33%
  - F1 Score: 83.33%
  - ROC AUC: 94.91%

## License

MIT

## Author

Dhruv Sengar

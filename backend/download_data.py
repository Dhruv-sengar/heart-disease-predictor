import pandas as pd
import requests
import io
import os

def download_and_process_data():
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data"
    
    # Column names based on UCI documentation
    columns = [
        "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", 
        "thalach", "exang", "oldpeak", "slope", "ca", "thal", "target"
    ]
    
    print(f"Downloading data from {url}...")
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to download data")
        return

    # Read data
    content = response.content.decode('utf-8')
    df = pd.read_csv(io.StringIO(content), names=columns, na_values="?")
    
    print("Data downloaded. Shape:", df.shape)
    
    # Handle missing values (drop rows with NaN for simplicity as they are few)
    print("Missing values before drop:\n", df.isna().sum())
    df.dropna(inplace=True)
    print("Shape after dropping missing values:", df.shape)
    
    # Convert target to binary: 0 = no disease, 1-4 = disease
    df['target'] = df['target'].apply(lambda x: 1 if x > 0 else 0)
    
    # Save to CSV
    output_path = os.path.join("backend", "data", "heart.csv")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"Processed data saved to {output_path}")

if __name__ == "__main__":
    download_and_process_data()

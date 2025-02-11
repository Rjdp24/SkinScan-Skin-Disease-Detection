from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
import numpy as np
import cv2
import io
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware

# Load Model
MODEL_PATH = "D:\\SkinScan_2\\backend\\model\\skin_disease_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)


# Define Class Labels
class_names = [
    "Acne and Rosacea", "Actinic Keratosis", "Atopic Dermatitis",
    "Bacterial Infections", "Eczema", "Exanthems and Drug Eruptions",
    "Herpes & STDs", "Pigmentation Disorders", "Lupus and Connective Tissue Diseases",
    "Melanoma", "Poison Ivy & Contact Dermatitis", "Psoriasis",
    "Seborrheic Keratosis", "Systemic Disease", "Fungal Infections",
    "Urticaria Hives", "Vascular Tumors", "Vasculitis", "Warts & Viral Infections"
]

# Initialize FastAPI App
app = FastAPI()

# Enable CORS (Allows React Frontend to Access API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prediction Function
def predict_skin_disease(img_array):
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    predicted_label = class_names[predicted_class]
    return predicted_label

# API Endpoint to Receive Images & Predict Disease
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image file
    contents = await file.read()
    img = image.load_img(io.BytesIO(contents), target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0  # Normalize

    # Get Prediction
    predicted_label = predict_skin_disease(img_array)
    return {"prediction": predicted_label}

# Run API
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

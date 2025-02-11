import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

# Define model paths
MODEL_PATH_H5 = "backend/model/skin_disease_model.h5"
MODEL_PATH_SAVEDMODEL = "backend/model/saved_model"

# Try loading the model
try:
    if os.path.exists(MODEL_PATH_H5):
        model = tf.keras.models.load_model(MODEL_PATH_H5)
        print("✅ Model loaded from H5 file.")
    elif os.path.exists(MODEL_PATH_SAVEDMODEL):
        model = tf.keras.models.load_model(MODEL_PATH_SAVEDMODEL)
        print("✅ Model loaded from SavedModel directory.")
    else:
        raise FileNotFoundError("❌ Model file not found. Please retrain the model.")
except Exception as e:
    print(f"❌ Error loading model: {e}")

# Define Class Labels
class_names = [
    "Acne and Rosacea", "Actinic Keratosis", "Atopic Dermatitis",
    "Bacterial Infections", "Eczema", "Exanthems and Drug Eruptions",
    "Herpes & STDs", "Pigmentation Disorders", "Lupus and Connective Tissue Diseases",
    "Melanoma", "Poison Ivy & Contact Dermatitis", "Psoriasis",
    "Seborrheic Keratosis", "Systemic Disease", "Fungal Infections",
    "Urticaria Hives", "Vascular Tumors", "Vasculitis", "Warts & Viral Infections"
]

# Function to Make Prediction
def predict_skin_disease(image_data):
    try:
        print("🛠 Received Image for Prediction...")

        # ✅ Preprocess Image
        img = preprocess_image(image_data)

        # ✅ Check if Image Processed Correctly
        if img is None:
            print("❌ Error: Preprocessed image is None!")
            return "Error in preprocessing"

        print("🛠 Image Preprocessed Successfully. Shape:", img.shape)

        # ✅ Make Prediction
        prediction = model.predict(img)

        # ✅ Print Raw Prediction Values
        print(f"🛠 Raw Model Prediction: {prediction}")

        predicted_class = np.argmax(prediction)
        predicted_label = class_names[predicted_class]

        print(f"✅ Predicted Class: {predicted_class}, Label: {predicted_label}")
        return predicted_label

    except Exception as e:
        print(f"❌ Prediction Error: {e}")
        return "Error in Prediction"


# Test Prediction
TEST_IMAGE = "D:\\Dataset_SkinScan\\test\\Acne and Rosacea Photos\\acne-cystic-19.jpg"  # Change this to your test image path
result = predict_skin_disease(TEST_IMAGE)
print(f"✅ Predicted Skin Disease: {result}")

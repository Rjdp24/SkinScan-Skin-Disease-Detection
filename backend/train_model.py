import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

# Define dataset paths
DATASET_PATH = "D:\\Dataset\\"
TRAIN_DIR = os.path.join(DATASET_PATH, "train")
VAL_DIR = os.path.join(DATASET_PATH, "val")

# Image size and batch size
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Data Augmentation for Training
train_datagen = ImageDataGenerator(
    rescale=1.0/255.0,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

# Validation data (No augmentation)
val_datagen = ImageDataGenerator(rescale=1.0/255.0)

# Load Training Data
train_data = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

# Load Validation Data
val_data = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

# Get number of classes
NUM_CLASSES = len(train_data.class_indices)

# Load Pretrained MobileNetV2
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze base model layers
base_model.trainable = False

# Create Model
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(NUM_CLASSES, activation='softmax')
])

# Compile Model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train the Model
EPOCHS = 20
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=EPOCHS
)

# Save the Model
MODEL_PATH = "model/skin_disease_model.h5"
os.makedirs("model", exist_ok=True)
model.save(MODEL_PATH)
print(f"✅ Model saved at {MODEL_PATH}")

# Save the model in both formats
MODEL_PATH_H5 = "backend/model/skin_disease_model.h5"
MODEL_PATH_SAVEDMODEL = "backend/model/saved_model.keras"

# Ensure directory exists
import os
os.makedirs("backend/model", exist_ok=True)

# Save in HDF5 (.h5) format
model.save(MODEL_PATH_H5)

# Save in TensorFlow's recommended format
model.save(MODEL_PATH_SAVEDMODEL)

print(f"✅ Model saved in:\n- H5 format: {MODEL_PATH_H5}\n- SavedModel format: {MODEL_PATH_SAVEDMODEL}")


import matplotlib.pyplot as plt

# Plot Accuracy
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.legend()
plt.title("Model Accuracy")
plt.show()

# Plot Loss
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.legend()
plt.title("Model Loss")
plt.show()


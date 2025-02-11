import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
from tqdm import tqdm

DATASET_PATH = "D:\\Dataset_SkinScan\\train"
IMG_SIZE = (224, 224)  # Resize images to this size
BATCH_SIZE = 32  # Number of images per batch

# Data Augmentation: Apply transformations to increase dataset diversity
datagen = ImageDataGenerator(
    rescale=1.0/255.0,  # Normalize pixel values (0-1 range)
    rotation_range=20,   # Randomly rotate images
    width_shift_range=0.1,  # Shift images horizontally
    height_shift_range=0.1, # Shift images vertically
    shear_range=0.2,  # Shear transformations
    zoom_range=0.2,   # Zoom in/out
    horizontal_flip=True,  # Flip images
    validation_split=0.2   # Split dataset (80% train, 20% validation)
)

# Load Training Data
train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

# Load Validation Data
val_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Get class names
class_names = list(train_data.class_indices.keys())
print("✅ Classes Loaded: ", class_names)

def show_images(images, labels):
    fig, axes = plt.subplots(3, 3, figsize=(8, 8))
    axes = axes.flatten()
    for img, lbl, ax in zip(images[:9], labels[:9], axes):
        ax.imshow(img)
        ax.set_title(class_names[np.argmax(lbl)])
        ax.axis('off')
    plt.tight_layout()
    plt.show()

# Fetch a batch and display images
sample_images, sample_labels = next(train_data)
show_images(sample_images, sample_labels)

from collections import Counter

# Count number of images per class
class_counts = Counter(train_data.classes)

# Visualize class distribution
plt.figure(figsize=(12, 5))
sns.barplot(x=list(class_counts.keys()), y=list(class_counts.values()))
plt.xticks(rotation=90)
plt.xlabel("Class Labels")
plt.ylabel("Number of Images")
plt.title("Dataset Class Distribution")
plt.show()

import os
import shutil
from sklearn.model_selection import train_test_split

# Define paths
original_train_dir = "D:\\Dataset_SkinScan\\train"  # Your existing training dataset
val_dir = "D:\\Dataset_SkinScan\\val"  # Directory for validation set

# Create validation directory if not exists
os.makedirs(val_dir, exist_ok=True)

# Function to split and move files
def split_train_val(class_name):
    class_path = os.path.join(original_train_dir, class_name)
    val_class_path = os.path.join(val_dir, class_name)

    # Create validation folder for this class
    os.makedirs(val_class_path, exist_ok=True)

    # List all images in the class folder
    images = os.listdir(class_path)

    # Split into 80% train, 20% validation
    train_imgs, val_imgs = train_test_split(images, test_size=0.2, random_state=42)

    # Move validation images
    for img in val_imgs:
        shutil.move(os.path.join(class_path, img), os.path.join(val_class_path, img))

    print(f"✅ Moved {len(val_imgs)} images to validation set for {class_name}")

# Apply function to all class folders
for class_name in os.listdir(original_train_dir):
    split_train_val(class_name)

print("✅ Validation dataset created successfully!")

for class_name in os.listdir(original_train_dir):
    train_count = len(os.listdir(os.path.join(original_train_dir, class_name)))
    val_count = len(os.listdir(os.path.join(val_dir, class_name)))
    print(f"Class: {class_name} → Train: {train_count} | Validation: {val_count}")

from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define Image Size and Batch
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

# No Augmentation for Validation, only Rescaling
val_datagen = ImageDataGenerator(rescale=1.0/255.0)

# Load Training Data
train_data = train_datagen.flow_from_directory(
    original_train_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

# Load Validation Data
val_data = val_datagen.flow_from_directory(
    val_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

# Print Class Names
class_names = list(train_data.class_indices.keys())
print("✅ Classes Loaded: ", class_names)

import matplotlib.pyplot as plt
import numpy as np

# Function to show images
def show_images(images, labels):
    fig, axes = plt.subplots(3, 3, figsize=(8, 8))
    axes = axes.flatten()
    for img, lbl, ax in zip(images[:9], labels[:9], axes):
        ax.imshow(img)
        ax.set_title(class_names[np.argmax(lbl)])
        ax.axis('off')
    plt.tight_layout()
    plt.show()

# Fetch a batch and display images
sample_images, sample_labels = next(train_data)
show_images(sample_images, sample_labels)


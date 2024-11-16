# # Load the saved model
# from keras.models import load_model

# # from keras_contrib.layers.normalization.instancenormalization import InstanceNormalization

# import numpy as np 
# import pandas as pd 
# import tensorflow as tf
import keras.backend as K
# from sklearn.model_selection import train_test_split
# import matplotlib.pyplot as plt
# import os
# import cv2
# from keras_contrib.layers.normalization.instancenormalization import InstanceNormalization
# # Custom objects for instance normalization and dice coefficient
# custom_objects = {'InstanceNormalization': InstanceNormalization, 'dice_coef': dice_coef}
# loaded_model = load_model('unet_model.h5', custom_objects=custom_objects)
# def process_image(image_path):
#     # Preprocess image
#     img = cv2.imread('./imagess/after.jpg')
#     img = cv2.resize(img, (256, 256))
#     img = img / 255.0
#     img = np.expand_dims(img, axis=0)  # Add batch dimension

#     # Predict the mask
#     pred_mask = loaded_model.predict(img)
#     pred_mask = (pred_mask > 0.5).astype(np.uint8)  # Threshold the mask
    
#     return pred_mask

# # Example usage
# processed_mask = process_image('./sample_data/test_image.jpg')
# plt.imshow(processed_mask[0, :, :, 0], cmap='gray')
# plt.show()

# def calculate_green_percentage(image):
#     # Convert image to HSV to isolate green color
#     hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
#     # Define green color range in HSV (you might need to adjust these values)
#     lower_green = np.array([35, 40, 40])
#     upper_green = np.array([85, 255, 255])
    
#     # Create a binary mask where green pixels are 1
#     mask = cv2.inRange(hsv_image, lower_green, upper_green)
    
#     # Calculate the percentage of green pixels
#     green_pixels = np.sum(mask == 255)
#     total_pixels = mask.size
#     green_percentage = (green_pixels / total_pixels) * 100
    
#     return green_percentage

# # Load before and after images
# before_image = cv2.imread('./imagess/after.jpg')
# after_image = cv2.imread('./imagess/before.jpg')

# # Calculate green percentage in both images
# before_percentage = calculate_green_percentage(before_image)
# after_percentage = calculate_green_percentage(after_image)

# # Calculate percentage change
# percentage_change = ((after_percentage - before_percentage) / before_percentage) * 100

# print(f"Greenery Percentage Change: {percentage_change:.2f}%")


# # Evaluate model on test dataset
from keras.models import load_model
import numpy as np
import cv2
import matplotlib.pyplot as plt
from keras_contrib.layers.normalization.instancenormalization import InstanceNormalization

# Dice coefficient (placeholder function, ensure your custom function matches this definition)
def dice_coef(y_true, y_pred):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    return (2. * intersection) / (K.sum(y_true_f) + K.sum(y_pred_f) + K.epsilon())

# Load the pre-trained model
custom_objects = {'InstanceNormalization': InstanceNormalization, 'dice_coef': dice_coef}
loaded_model = load_model('unet_model.h5', custom_objects=custom_objects)
results = loaded_model.evaluate('sample_data')
print(f"Test Loss: {results[0]}, Dice Coefficient: {results[1]}, Binary Accuracy: {results[2]}")
# Preprocess image
def preprocess_image(image_path, size=(256, 256)):
    img = cv2.imread(image_path)
    img = cv2.resize(img, size)
    img = img / 255.0  # Normalize pixel values to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Predict mask for an image
def predict_mask(image_path):
    preprocessed_img = preprocess_image(image_path)
    pred_mask = loaded_model.predict(preprocessed_img)
    pred_mask = (pred_mask > 0.5).astype(np.uint8)  # Apply threshold
    return pred_mask[0, :, :, 0]  # Return the 2D mask

# Calculate green percentage
def calculate_green_percentage(image, mask):
    # Apply mask to the original image
    masked_image = cv2.bitwise_and(image, image, mask=mask)
    
    # Convert to HSV for green detection
    hsv_image = cv2.cvtColor(masked_image, cv2.COLOR_BGR2HSV)
    
    # Define green color range (adjust values as needed)
    lower_green = np.array([35, 40, 40])
    upper_green = np.array([85, 255, 255])
    
    # Create a binary mask for green pixels
    green_mask = cv2.inRange(hsv_image, lower_green, upper_green)
    
    # Calculate green pixel percentage
    green_pixels = np.sum(green_mask == 255)
    total_pixels = green_mask.size
    green_percentage = (green_pixels / total_pixels) * 100
    
    return green_percentage

# Main logic to compare before and after images
def compare_greenery(before_path, after_path):
    # Predict masks
    before_mask = predict_mask(before_path)
    after_mask = predict_mask(after_path)
    
    # Load original images
    before_image = cv2.imread(before_path)
    after_image = cv2.imread(after_path)
    
    # Calculate greenery percentages
    before_percentage = calculate_green_percentage(before_image, before_mask)
    after_percentage = calculate_green_percentage(after_image, after_mask)
    
    # Calculate percentage change
    percentage_change = ((after_percentage - before_percentage) / before_percentage) * 100
    
    return before_percentage, after_percentage, percentage_change

# Example usage
before_path = './imagess/before.jpg'
after_path = './imagess/after.jpg'

before_percentage, after_percentage, percentage_change = compare_greenery(before_path, after_path)

print(f"Greenery Before: {before_percentage:.2f}%")
print(f"Greenery After: {after_percentage:.2f}%")
print(f"Greenery Percentage Change: {percentage_change:.2f}%")

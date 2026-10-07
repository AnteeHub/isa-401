# Model and dataset card

## Purpose

This deliberately small, frozen classifier supports an HCI teaching lab about inspecting predictions and progressive evaluation. It is not a production OCR system. Students do not train or tune it.

## Architecture and training

- Architecture: 784 flattened pixels, 48 ReLU hidden units, 10 softmax outputs.
- Learned parameters: 38,170, including biases.
- Inputs: original 28 by 28 MNIST grayscale pixels divided by 255. Black background, white strokes. No browser centering or resizing transformation.
- Training: 20,000 images selected without replacement from the 60,000 MNIST training images, seed 20260923. Four epochs, batch size 128, Adam learning rate 0.001, cross-entropy loss.
- The teacher trained the model with NumPy. The browser runs the same matrix operations with TensorFlow.js CPU tensors. There is no browser training or optimizer.
- Frozen weight SHA-256: 3b83f09a61435fa56ef9ecdffd5072d227c7df7aaa6e7cd383bf57484e07376a.

## Evaluation and classroom set

- Full original MNIST test set: 10,000 images, accuracy 93.88%.
- Classroom set: 800 distinct test images, 80 randomly selected per label using seed 40103, then shuffled with that same generator.
- Classroom result: 739 correct, 61 errors, accuracy 92.375%.
- Classroom test images are separate from training images. The balanced selection was made without using model predictions. The weights were not selected using this classroom result.
- This stratified classroom sample does not represent real deployment frequencies. Small categories and partial batches have limited evidence. No production performance or calibrated confidence claim is made.

The page computes every prediction from the bundled pixels and weights. It does not read saved prediction labels. The immutable label is used to evaluate a prediction, never as model input. Model scores are softmax outputs, not guaranteed correctness.

## Provenance and redistribution

MNIST authors: Yann LeCun, Corinna Cortes and Christopher J. C. Burges. Data mirror: https://github.com/cvdfoundation/mnist . Download used: https://storage.googleapis.com/tensorflow/tf-keras-datasets/mnist.npz . Source archive SHA-256: 731c5ac602752760c8e48fbffcf8c3b850d9dc2a2aedcf2cc48468fc17b673d1.

The package contains an unmodified pixel/label subset encoded as a local JavaScript asset. Each record retains its original test-set index in its ID. Keep source attribution and original dataset terms. Model weights were produced for this teaching project. Library and paper notices are in NOTICE.md.

## Limits of the input experiment

Erasing a stroke changes the input while keeping the model fixed. This measures local sensitivity. A large edit can change the digit itself and make the original label inappropriate. Edited inputs do not affect dataset records or evaluation statistics. Inspecting errors or pixel sensitivity does not provide a complete causal explanation of model behavior.

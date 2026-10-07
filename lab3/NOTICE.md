# Sources and third-party notices

## Libraries

- D3 7.9.0, ISC license. https://github.com/d3/d3 . License retained in vendor/D3-LICENSE.txt.
- TensorFlow.js 4.22.0, Apache-2.0 license. https://github.com/tensorflow/tfjs . License retained in vendor/TFJS-LICENSE.txt.

Both libraries are bundled unmodified for local classroom operation.

## Data and model

MNIST handwritten digits by Yann LeCun, Corinna Cortes and Christopher J. C. Burges. Dataset mirror: https://github.com/cvdfoundation/mnist . Original dataset site: http://yann.lecun.com/exdb/mnist/ . This package includes 800 original test images and labels, with source indices preserved. See docs/MODEL_CARD.md for selection, preprocessing, training and hashes. The small MLP weights were trained for this teaching project. Source attribution and the dataset's original terms remain applicable.

## Research and teaching references

- Badam, Elmqvist and Fekete (2017), Steering the Craft. https://doi.org/10.1111/cgf.13205
- Patil, Richer, Jermaine, Moritz and Fekete (2023), Studying Early Decision Making with Progressive Bar Charts. https://doi.org/10.1109/TVCG.2022.3209426
- Fekete and Primet (2016), Progressive Analytics. https://arxiv.org/abs/1607.05162
- Burrell (2016), How the machine ‘thinks’: Understanding opacity in machine learning algorithms. https://doi.org/10.1177/2053951715622512
- Lipton (2016), The Mythos of Model Interpretability. https://arxiv.org/abs/1606.03490
- D3 introduction. https://d3js.org/what-is-d3
- TensorFlow.js digit classification tutorial. https://www.tensorflow.org/js/tutorials/training/handwritten_digit_cnn

The supplied neural network is an MLP, not the CNN from the TensorFlow.js tutorial. Paper PDFs retain their original author and publisher notices and are not relicensed by this package. Our progressive interface is a teaching adaptation, not an experimental replication. Screenshots in the lesson show this project's actual computed results.

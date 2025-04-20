---
title: ICE-4005 - Weeks 22 Building the model
date: 2025-03-24
---
# Work done

After figuring out that torch-rnn library was I a precursor of PyTorch, I resolved to build my LSTM cell with PyTorch in this second [Jupyter notebook](https://github.com/Oktogazh/sudogen/blob/master/2%20Training.ipynb)

# Discussions
I proposed to Bill to continue by doing a visualisation work on some indices of the hidden state vector of the LSTM cell, similar to what [Karpathy did in his blog](https://karpathy.github.io/2015/05/21/rnn-effectiveness/#visualizing-the-predictions-and-the-neuron-firings-in-the-rnn). Bill proposed to use seaborn library, and I eventually noticed that [seaborn's heatmap](https://seaborn.pydata.org/examples/spreadsheet_heatmap.html) could indeed be used for this purpose. The visualisation would replace the testing of the generated words.

# Next Goal
I will try to add a spellchecker in the words-generating function to ensure that no real words are retrieve by the LSTM cell and write a function to save the "pseudo-dictionary".
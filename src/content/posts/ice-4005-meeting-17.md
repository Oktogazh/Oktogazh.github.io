---
title: ICE-4005 - Weeks 17 Understanding LSTM
date: 2025-03-10
---
# Reading
I learned about [Andrej Karpathy's char-rnn](https://github.com/karpathy/char-rnn) which tries to predict the next character for natural texts. Although my model is supposed to train on dictionaries, not text, the idea is similar to mine in many ways. So I read [his blog post](https://karpathy.github.io/2015/05/21/rnn-effectiveness/) on the topic. Learned about RNN, backpropagation, the vanishing gradient problem and the LSTM architecture and capabilities and its variant the [GRU](https://en.wikipedia.org/wiki/Gated_recurrent_unit).

# Testing
In terms of testing, I consider using the previously mentioned idea of using Bite Paire tokenizer to capture the most common n-grams, but order them in terms of frequency, and then use a [Spearman rank correlation](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient) to measure the fidelity of the pseudo words to the original dictionary.



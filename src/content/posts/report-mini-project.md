---
date: 2024-12-26
title: Report mini-project
---
### Module ICE-4005-0: MSc Generalist Mini-project 2024/25

# LSTM-based Pipeline to Learn Languages Orthographic Rule and Generate Pseudo-Words

![](https://www.world-education.eu/uploads/c2c8e0e5d955e5667355e58e42dfa863cebb8c03.png)

## Content
1. Abstract
2. Background
3. Aims and Objectives
4. Methods Studied
5. Data Collection
6. Training the Models
7. Visualization
8. Conclusion

# Abstract


# Introduction
This mini-project took many directions and shapes during the months, as can testify the logbook. Initially oriented towards a Welsh spellchecker, it became a planed mini vocabulary test, before settling on the question of generating pseudo words for said vocabulary tests.  

# Background
This work finds its root on a wider interest on the questions and challenges of second language aquisition. In the context of Language Technologies, this interest leads naturally towards the question of language and vocabulary vocabulary testing, as testing, and the metrics it provides is the only ways to caliber and reinforce a system able to filter the most relevant language learning content. Such metric does not exist yet, but studies suggest that vocabulary tests based on the ability to recognize real words from so-called pseudo-words be at the core of such testing framework. This is due to the simplicity and speed at which relevant scores can be optained.  However, a big problem of these test is the capacity to scale these tests, due to the fact that so far, the pseudo-words used in psycholinguist experiment have to be handcrafted, which requires both a lot of time and an advanced expertise on the language for which we want to create these pseudo-words. Scaling both vertically, large-scale in English, and horizontally, port the testing methodology to more languages, could be ease if it were possible to create high quality pseudo-words for any language by learning from a list of real words their orthographic and phonotactic rules programatically, in order to later generated large quantity plausible words.  
The problem has been identified before, and different methods were proposed to solve the problem. The most common method used so far is to consider words as Hidden Markov Model (HMM) and to extract n-grams of characters from a matrix of real words for any given position of the words. Then, attach together the n-grams that share characters at the same given index. This works reasonably well to build short list of pseudo-words for most languages, but the method has a range of issues. First, it is not possible to create plausible really short words, if the list of word is really long, a two or three characters long word could be deduced as being a real word based on logic only. Second, some language have what we call long distance relationship, like vowel harmony in Turkish, and this aspect cannot be preserved in a simple Markov model approach. These problems leaved us with a large space for improvement, which turned out to be the topic of this generalist mini-project.

# Aims and Objectives
The goals for this project can be listed as follows:
- Find an algorithm able to learn the rules specific to a language orthography and phonotactics.
- Exploit the learned rules to generate arbitrarly long list of plausible words or pseudo-words.
- Publish a pipeline to enable others to generate such list for as many languages as possible.
- Produce visualizations to help these people understand what they do.

# Methods Studied
In order to solve 
## Weighted or non-weighted HMM


MAXENT
RNN: LSTM cells
# Data Collection


# Training the Models


# Visualization


# Conclusion

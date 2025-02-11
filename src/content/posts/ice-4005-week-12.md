---
date: 2025-01-20
title: ICE-4005 - Week 12 (learning MAXENT)
---
## Work Report

**Work done:**  
As generating phonotactically correct words may include a variaty of different long distance relationships between the characters, the algorithm to generate them should be able to learn those relationships somehow. After finding out about the work of Hayes and Wilson (2008), I spent the week to learn the MAXENT model and the maths it relies on. Then I figured out that these MAXENT grammars are only testing phonotactic constraints violiation, but that the model can build the rules on its own. The conversation started on this basis.

**Meeting:**
- Alan asked if neural nets may be the best way to "learn" the phonotactic of a language to generate pseudo-words. Bill proposed to read Brownlee's Deep Learning For Natural Language Processing.
- Bill said that the objective of creating a pseudo-word generator uniquely is good if the surrounding work is done properly, that is, making a comparison of different algorithms using different metrics. The metrics he proposes are compression (using Tawa), and the Levenshtein algorithm. Alan agrees with the idea of compression, but preferes the Jaro-Winkler formula to the Levenstein, and also proposes to use Hayes' MAXENT grammar as a metric, which is agruably the best system to test phonotaticity.

**Action Items:**
- Start programming the testing/evaluating scripts in python, to plot the results of the ngram based algorithm.
- Read Brownlee's book.

**References:**
Complexity Explorer [WWW Document], n.d. URL [https://www.complexityexplorer.org/courses/33-maximum-entropy-methods/segments/3780?summary](https://www.complexityexplorer.org/courses/33-maximum-entropy-methods/segments/3780?summary) (accessed 1.20.25).
Brownlee. "Deep Learning For Natural Language Processing", n.d. MachineLearningMastery.com. URL [https://www.machinelearningmastery.com/deep-learning-for-nlp/](https://www.machinelearningmastery.com/deep-learning-for-nlp/) (accessed 1.27.25).
Hayes, B., Wilson, C., 2008. A Maximum Entropy Model of Phonotactics and Phonotactic Learning. Linguistic Inquiry 39, 379–440. [https://doi.org/10.1162/ling.2008.39.3.379](https://doi.org/10.1162/ling.2008.39.3.379)


## [Mini-project Dashboard](<./ice-4005-dashboard>)
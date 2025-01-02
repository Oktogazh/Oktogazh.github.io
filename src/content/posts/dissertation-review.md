---
title: Outstanding Dissertation Review
date: 2025-01-01
---
This review focuses on [this M.Sc. dissertation](../assets/outstanding-dissertation.pdf).  

Introduction (100 words):
- What is the main research question/hypothesis?  Why is this research significant in its field?  
Identifying whether the base language used to make speech-to-text model through transfer learning influences the quality of the models and if yes, to which extent and what are the main elements influencing the quality of a model in general.
This research closes several gaps in the litterature on learning transfer for speech to text model generation. It is especially relevant for lower resources languages like Welsh and Breton, which have to rely on smaller datasets for their training. An optimisation of the learning transfer technic would allow the technology, and its derivating integrations to be extended to more languages, which is significant for the field, but also for those linguistic communities.


Research Design & Methodology (150 words):
- What methods did the researcher use?  Were these methods appropriate for the research questions?  How was the data collected and analyzed?  
To answer the research question, several models were built in order to analyze their accuracy. The character error rate (CER) is the main metric used to measure the accuracy of the models. It is based on the Levenshtein distance algorithm, commonly used in spellchecker algorithm. The CER is calculated by dividing the raw result (distance between strings) by the length of the input. This normalisation gives a score to the models that is independent from the language the model focuses on or the length of the data used in the study, which allows other to reproduce similar analysis on diferent datasets in the future aswell as comparing results between different languages, which hardly ever have datasets of the same size.
This metric (CER) was prefered over either word or phonem based variations of the algorithm because of its bigger accuracy and versatility respectively. 
The datasets used were from Common Voice's tenth version, which is an open repository crowdsourcing recordings from any around the world. Different ways to split the dataset (for training, validating and testing) were tested to optimise the quality of the result despite the small size of the dataset.

Key Findings & Arguments (250 words):

- What are the main findings/conclusions?
A first finding is that monolingual models outperformed multilingual model for transfer learning.
- How well are these findings supported by evidence?
- What is the original contribution to knowledge?

Critical Evaluation (200 words):

- How convincing are the arguments?
- What are the strengths and limitations?
I am surprised that no mention was made of the influence of prosody in when the surprising outperformance of the French model gave better results for Breton. Despite the absence of correlation between Euclidian distance and the accuracy difference, no other hypothesis was raised. This is unfortunate, as it seems to be the only explenation for this significant impact on performance of learning transfer based training is significant.
- How does this work connect to existing literature?

Conclusion (100 words):

- What is the overall significance of this research?
- What are the implications for future research?


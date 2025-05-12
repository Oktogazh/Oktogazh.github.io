---
date: 2025-01-06
title: ICE-4005 - Meeting 10
---
## Work Report

**Work done:**  
I spent most of my time last week to make a review of an [outstanding dissertation](dissertation-review) for the Research Method module.
This reading was the occasion for me to discover the concept of [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance). I will use it at some point in my design to select the pseudo words that are more likely to be real words my calculating the distance between the pseudo-words created making all the chains of 3-grams possible and selecting the "closest pseudo-words". For recall, I was able to create more than 7000 pseudo-words of 6 characters of length form around 600 real words of the same length. In order to select the same number of pseudo-words as there are real words, I simply randomly selected the words.
Using the Levenshtein disctance would solve the problem of the fiew phonotactically invalid pseudo words generated due to artifacts found in the Hunspell disctionary (cf. previous week report). But despite the useffullness of selecting pseudo-word using the Levenshtein distance, I won't be giving this aspect a high level of priority, since it is merely an optimisation of the desing.

**Action Items:**
- Load the items in a sqlite database
- create a small front end for the application


**Next:**
- use the Levenshtein distance instead of randomly selecting the pseudowords generated 
- show the words in the front end
- update the ratings in the backend

## [Mini-project Dashboard](<./ice-4005-dashboard>)
---
date: 2024-11-25
title: ICE-4005 - Week 5
category: cyfarfodydd
---
## Meeting

**Attendance**: Alan, Bill

**Agenda**:
  - Discussing after Alan presents the algorithm implementation for his [vocabulary test implementation](https://github.com/Oktogazh/leximenter/releases/tag/v0.1.0).
  
**Actions**:
- **Alan**:
	- Add the list of words ordered by frequency, a list of fake words. Add Welsh and English versions.
	- investigate the points raised by Bill

**Discussions**
- Bill made several remarks on how to calculate the number of words based on the results of the test, including:
	- [Positive predictive value](https://en.wikipedia.org/wiki/Positive_predictive_value) from [WikipediaConfusion matrix](https://en.wikipedia.org/wiki/Confusion_matrix#Table_of_confusion)
	- cross entropy (maybe not the right one)
	- relative entropy (Kullback-Liebler divergeance)
	- substract the cross entropy



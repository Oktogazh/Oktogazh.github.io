---
date: 2024-11-18
title: Corpora Meeting 1
project: corpora
---
## Meeting

**Attendance**: Alan, Bill

**Agenda**:
  - Present 

**Main discussion points**:

**Actions**:

## Noteworthy commits

As I started the Welsh module for LT on a fork that I could not run `mvn clean install` on, I had to create a patch file of the commits that I made in this old fork (with `git format-patch`) and apply the patch on the fork from the updated repo (see previous post) with the `git am` command. The first time I used this git command. This is why we can see three commits made at the same time [here](https://github.com/Oktogazh/languagetool/commits/master/?since=2024-11-04&until=2024-11-04)

## New concepts
- Java:
- Hunspell dictionaries:
	- the .aff file format
- HAL: Hyperspace Analog Language, how words proximity can be considered as an analog to their semantic proximity (articles: [Nasharuddin](https://researchinbox.wordpress.com/2010/03/22/introduction-to-hyperspace-analogue-to-language-hal/) and her [example here](https://researchinbox.wordpress.com/2012/10/09/hal-example/))
	- weight (in the case, the proximity between two words), and how one may use similar weights patterns in parallel text to find words translations.
	- window size, used to define the wieghts
	- Tuples as vectors: I understood that vectors can have many more dimentions that defined in the Euclidian space, and that the maths still holds, especially for the following:
	- cosines similarity, Euclidian norm, vector normalisation 
	- See my conversation with [mistral](https://chat.mistral.ai/chat/43cc0557-f51f-4849-a542-ee5acebcfd71) as I digested the new concept
- [Vector space model](https://en.wikipedia.org/wiki/Vector_space_model): same concepts as HAL, but used more to categorize document instead of analizing the relationship between words

## Read articles
Found in the wikipedia article "n-gram"
- Claude E. Shannon: The Redundancy of English. Aus: Cybernetics. The Macy Conferences 1946–1953. The Complete Transactions

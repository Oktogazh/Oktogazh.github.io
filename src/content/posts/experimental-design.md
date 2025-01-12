---
title: Fast and Versatile Vocabulary Test
date: 2024-12-27
---
# Background

Minority language need better teaching framework to support their growth.
Teaching efficiently means testing efficiently (precisely, often), therefore, we need a test that is as fast as possible, and versatile, that is, easy to port to other languages and tailor to the specific needs of the language.

# Litterature Review
Psycholinguistic studies have show that there is vocabulary knowledge is a good correlate to other aspects of language profficiency.
The stated goal then becomes to test vocabulary knowledge as fast and accurately  as possible.
Here are the history of vocabulary measurement methods:
Large (or not) random selection from dictionary and asking people if they know the words or not, or find synonyms. 
- Statistical vocabulary size estimates
	- words versus non-words, ratio of words found versus ratio of false positives
	- good because: the protocoles can be perfected
	- problems: cumbersome, needs the full synomym list (impractical for low resources languages), dependent on both change and judgement of the examinator, precision depends on the size of the sample, the same method yielded significantly different results, it has a low reproductibility 
- Wechsler Intelligence Scales:
	- task: giving synonyms of words, finding semantic connection between words
	- good because: it does not rely on CEFR levels, it place examinees on a normal scale for their age which is more objective 
	- bad because it is a lot of preparation for building the test, it is hard to translate to other languages, it needs to be tested in order to map the normal distribution to an index, and it relies on a professional to test people, assessing the validity of the answer, which is prone to the subjective assessment of the psychologist... the same problem as commercial tests.
- Peabody Scale:
	- task: point one image on a matrix of four when earing a word
	- good because it does not rely on writing and the assessment is more objective, less prone to the psychologist judgement, it is fearly easy to translate, potentially easy to scale
	- bad because the precision of the result is not great with a limited amount of images/words sets, as for Wechsler's scale, it needs a preliminary study to get a sense of what an expected normal result is. As we shall see later, working out the expectation is key here.
- Meara's work and LexTale: A first improvement comes from Paul Meara's in vocabulary testing, using pseudo words and asking whether the testee recognise them.
	- pseudo-words and word recognition to test ranges of words ordered by frequency
	- good because tested, minimalist, LexTale is really fast, usually less than five minutes to complete, and sort testees between tree CEFR levels (B2 to C2), which shows well that the 4 or more hours sent in most commercial tests are not about testing fluency, but also, say, the ability to pass hours long exams or competitions. Meara's work also shows that the size of individuals' vocabulary size, for a given age and language, is proportional to their proficiency in the language, regardless of whether the language is L1 or L2. This almost validates the protocols aiming to answer the question "how many words do people know" as possible proficiency tests. This is why we will have a look at those protocols too.
	- inconvenient because relying on curated lists of words and non-words

Attempting to automate the workflow that would produce tests without spending time currating the vocabulary list we can think of using a list of words ranked by frequency, but this design comes with significant flaws for our stated goals:
- the spaghetti paradox, the best known words are not necessarly the most frequent, and every corpus has its own frequency distribution.
- The pseudo-words still need to be currated, wich is impractical in the context where preliminary study are made less relevant by the sheer scarcity of the language speakers.
- Even making a frequency list can be challenging depending on the language, some languages simply don't have good lemmatizers, nor even enough accessible digitalized texts!

This impracticality of making preliminary studies only leave us with one choice: reusing the data from the test to assess the items difficulty, and deduce the relative vocabulary level of the testees. Pelánek (2016) informs us of a few facts about item selection:
- a random selection of item is good (precise), yet it is impractical as the number of items becomes larger because more items need to be tested before getting meaningful data
- then we can use the proportion of correct answers: items are ordered in a scale from the most recognised to the less recognised and assessees are ordered in terms of the same ratio. We can then give people a score between 0 (no word recognised) and 1 (all words recognised). The problem is that this does not work well to study the evolution through time, (the previous bad answers penalise the future score, even though the assessees become better), this leads to requiring to restart the test every time, which is not efficient.
- To manage small adjustments, we can use the Elo rating system. => displegañ ar sistem
- Pelánek (2016) shows that despite the ordering, some level of randomness is benefitial to obtain a precise result faster. The advantage of the Elo system over the proportion of correct answers is that Elo system is based on statistcal predictions of the outcome, so using items need to have the same rating as the examinees to give an accurate account of their level.

Protocol:


Analysis, Applications and Perspectives:
Use IRT to analyze the distribution of vocabulary accross different population, be used as a main language progression meter in other psycholinguistic experiments.




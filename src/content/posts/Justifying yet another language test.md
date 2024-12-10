---
date: 2024-12-09
title: Why do we need yet a new testing framework
category: testing
---

## Context
## From scalable teaching framework to dynamic testing
Teaching low ressources languages poses a great deal of challenges. Logically, a good teaching framework for those would be highly scalable, so that it would be easy to port to other low resources languages. Scalability and portability become the key features that could allow the concentration of the strengths and efforts of low resources languages advocates, otherwise scattered across the diversity of the languages they work for.
Today, the only way to create a scalable language teaching framework is through a swoftware solution. The challenge then become to design a software architecture that a could, given a small set of standardized input for a given language, "automatically" produce the most efficient teaching material for that language and for the largest population, which would include, going as far as adapting its teaching material to each individual's learning abilities and habbits.
Such a hypothetical teaching framework would be able to assess the value and effects of the teaching material it presents its users with, favoring the exposition of the material that yelds the best results. But what would be those result ? This idea supposes the existence of a testing framework that would, not only assess the proficiency level of a person with a high precision, but it would also have to be easy and short enough to take so that it could be taken regularly, say, every one or two week, or even twice in a day if we wanted to study the immediate impact of a learning session. The goal here is not only to test the level of the examinees, but to study the evolution of that level at the highest frequency as possible and understand the *short term dynamics* of language acquisition (and loss). And such a test does not exist. Not yet at least.

## Current testing methods
If there are no such ideal test, there is at least a wide range protocols that have the virtue of existing, among which a good proportion was scientifically tested. They come from different fields of science or industry and usually aim at validating that a person "passes" a certain threshold, often time a CEFR level or the required mark expected by the intitution requiring the test (universities, business, immigration administration etc...). Those are what one may call the commercial tests, and despite there widespread usage, they hold their legitimity from the institutions requiring them, not scientific research. They can for example be critizied for confusing linguistic and scholarly skills, but that might be preciselly why these institutions rely on them so much, they are not only language test. Thus, I will sideline them on the ground that the results those give are ofter not a reflection of the language proficiency alone, they primarly select people.
In the field of cognitive psychology, we find the first standardized tests, designed to assess people, often children, in their mother tonge: 

- Wechsler Intelligence Scales:
	- task: giving synonyms of words, finding semantic connection between words
	- good because: it does not rely on CEFR levels, it place examinees on a normal scale for their age which is more objective 
	- bad because it is a lot of preparation for building the test, it is hard to translate to other languages, it needs to be tested in order to map the normal distribution to an index, and it relies on a professional to test people, assessing the validity of the answer, which is prone to the subjective assessment of the psychologist... the same problem as commercial tests
- Peabody Scale:
	- task: point one image on a matrix of four when earing a word
	- good because it does not rely on writing and the assessment is more objective, less prone to the psychologist judgement, it is fearly easy to translate, potentially easy to scale
	- bad because the precision of the result is not great with a limited amount of images/words sets
- Meara's work and LexTale:
	- pseudo-words and word recognition to test ranges of words ordered by frequency
	- good because tested, minimalist, fast
	- bad because relying on curated lists of words and non-words
- Using a custom algorithm to place people on frequency lists instead of testing ranges
	- variations of the binary tree sorting algorithm to find a location on a sorted list quickly, with an speed noted $O = log(n)$
	- good because the list of items being bigger, different items are seen every time the test is taken, the word list needs less work (no preliminary study to find "level difining" items), hypothetically more precise
	- bad because finding a good frequency list, especially with lemmas, is not so easy when corpora are restricted (which is the case of low resources languages), word frequency and 'popularity' are not strictly related

## Our solution
- Using an Elo rating/Rasch system
	- assess both the items difficulty, their distributions (to get an idea of how precise the measurement can be), and the testees themselves
	- good because a random large list of word is enough, even without their frequencies, it works better as it scales, hard to falsify the data, even when some people cheat, adds the strength of the $K$ value to quickly calibrate in the begining, then lowering it to avoid volatility between tests.
	- Bad if only using a written for (for dyslexic people), would need an audio adaptation
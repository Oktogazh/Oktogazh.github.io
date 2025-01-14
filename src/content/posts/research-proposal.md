---
title: Fast and Versatile Vocabulary Test
date: 2025-01-14
---
I'w wneud: ffeindio Cwestiwn Ywmchwil.

# 1 Introduction (320 words)
A recurrent critique levelled at psycholinguistics is its focus on predominantly educated Western populations, most likely English-speaking, and the risk of wrongly be generalizing potentially biased findings. Its status as lingua franca make English the main focus even on L2 research (citation_needed maybe Paul Nation) and little account is given in the litterature on lower resource languages, apart from code-switching, which is in a way an extension of the research on the "stronger" languages, rather than studies on the other languages. For example, if a correlation is found between a higher proficiency in L2 and in L1 where English is one of the two langauges, can we predict that all bilinguals are likely to speak better than average in their L1? The sociolinguistic background of people from developed countries learning English, or vice versa may well bias conclusions on this matter. In looking for such correlations, it is essential to gather data from as many language pairs as possible to offset potential bias. The experimental design below presents a protocol to answer the following question: "Do above-than-average proficiencies in L2 and L1 correlate?". 
The protocol introduced below thus attempts at providing some standard for language proficiency assessment suitable for low resource languages. It does so by drawing largely from already established and tested protocols in the field, but optimizing each steps upstrean and during the experiment to aleviate the gap in resources most languages around the world experience compared with English (time, linguistic expertise, people to run preliminary studies etc...). However minimalist the design is made by these constrains, the test itself does not yield minimalist nor aproximate results. The relatively simple aspect of the design also allows for modifications an tailoring to specific needs and incremental improvements, thus making it a basis for a new approach in psycholinguistic research in general. Especially when testing skill variations through time, the dynamic aspect of its underlying framework may be able to find application behind mere vocabulary testing.

# 2 Litterature Review (870 words)
As studies have found vocabulary knowledge to be a good indicator of general language proficiency (Lemhöfer and Broersma 2012), this section will give an account of the different approaches used to assess vocabulary mastery through history, comparing their strengths and weaknesses regarding the requirements of building a test scalable for lower-resource language, yet revalizing with those used for higher-resource languages.

## 2.1 Defining Vocabulary Mastery
As pointed out by Brysbaert et al. (2016), the measure of vocabulary size will depend on the definition of what a word is (alphabetical type, lemma or word family) and the criteria used to validate that a tested word is knows. Should the word be recognised, understood, translated or described with other words? Should a mastery of all the semantic aspects of word be displayed for that word to be truly understood? And how to deal with homonyms? This section scrutinizes the different aproaches to this problem.

### 2.1.1 Cross Product of Systematic Sampling of Dictionaries
Hartmann (1946) and Goulden et al. (1990) used a cross product based on systematic sampling from dictionaries and the size of the dictionary themselves to deduce vocabulary length. In Hartman, the testees were asked to describe the word without time limits (Brysbaert et al. 2016). In the other study, they were asked if they recognised the words. Significantly different result were found by the two studies: 215 000 by Hartmann and 17 200 by Goulden. Although Goulden's study excluded proper nouns, derived words, and compounds (ibid.), the threshold for word knowledge was also arguably lower, which would indicate a small difference between the ability to recognise words and describe them, at least partially. Relying on self reported recognition of the words is however trustworthy as long as the testees don't have an interest in lying. The best way to make sure that the data gathered by a test are valid is to make it dificult to cheat.

### 2.1.2 Vocabulary Assessment in Intelligence Tests
Because they face the same problem of having to be non-falsifiable, IQ tests came up with their own protocoles to assess vocabulary mastery:
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

# Protocol



# Analysis


# Applications and Perspectives
Use IRT to analyze the distribution of vocabulary accross different population, be used as a main language progression meter in other psycholinguistic experiments.
Adapt to small groups.  
Use recordings instead of written words, so that the experiment can be extended to illiterate populations and languages not using phonological alphabets.

# References




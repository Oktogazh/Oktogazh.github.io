---
title: Dissertation Ideas
date: 2025-06-12
---
# Key concepts

- During a time, the rise of GAI rose concern of potential digital death of lower-resources languages.
	- On the contrary, GAI seems to produce better and more data, even for under-resourced languages. 
	- This opens doors to these languages: news, translation, education, testing etc...
	- In the perspective of minority languages, one key element to the preservation and growth of the language is two-fold, social use (the goal is not to have robots speaking Welsh, but humans) and education. One is about the desirability, willingness, appeal of using the language by those who can, the other is about ensuring this ability, for those who want to speak it, but find their language skills limited and may fold to another language because of these limitations.
	- Although much as been said, and still have to be discussed on the desirability of minority languages, this work will focus on this second aspect, education. 
	- Education can be devided in two parts, teaching and assessment. And since it would be futile to build a teaching system without first having a mean to test its efficiency (especially for minority languages), this work turns on assessment.
	- different assessment systems have been attempted in the past, using LLMs, to create adaptive tests
	- Here, we instead generate testing items, and leverage the Elo rating system to assess their difficulty level, a testing paradigm that could easily be scale to many sorts of constructs
	- however, we limit the test to a vocabulary test
- Why vocabulary test
	- vocabulary is corrolated with many other skills, and is interresting at all levels of profeciency (vocabulary tests in general)
	- simple vocabulary tests have been developped for English and some other languages at various ends (Yes/No tests)
	- academic gap in the field of minority languages, because these tests are not scalable
- How to use to scale the test
	- generation of pseudo-words with LSTM cells
	- rating system: calibrate the results with the Elo rating system.
	- use an open web platform to run the test globally as a mega-study
- The goal is twofold. First, prove the viability of generated data to use as reliable psychometric test. Second, achieve the first goal with an equal success in a minority language and a higher resourced language. In the second goal, we don't only create a tool "just in case" someone decides to use it, we test whether the speaking population of the language actually uses the tool.

# Notes
Attempt have been made to use LLMs for testing purposes, in this work we present a different approach, generating the items, and using the Elo rating system sort the items by relative difficulty.



digital extinction => need to focus on data collection => nobody to gather data

GAI => produces better than beginner result in minority languages => let's use these result to teach

###### AI and minority languages
AI for minority language exists, despite specific challenges (Zhong 2024) => Languages with growth problem have a two-fold problem prestige and education. One is about the desirability, willingness, appeal of using the language by those who can, the other is about ensuring the ability to use the language for those who want to speak it, but may find their language skills limited and may fold to another language because of these limitations.
###### AI and Education
AI for education existed forever in AI (Doroudi 2023) => no AI for minority languages education (Henkel et al. 2025), (except a few execption (Ariely et al., 2023) and Horbach et al. (2024)) => it is essential to bring equity among students around the world to build high standard education for everyone => but improvement in education cannot exist without solid testing framework first 
###### Vocabulary Test
vocabulary tests are relevant because... 
their limited because:
- low adaptivity
- low scalability (vertical and horizontal)

in this paper we present a vocabulary test that uses generated distractors (Kumar et al. 2023)

---
title: NLP final exam
date: 2025-05-20
---
**1. Discuss the characteristics of Natural Language that makes it difficult to process, especially considering the material that has been covered in lectures and labs for this module. Also explain the ramifications for each characteristic when it comes to implementing Natural Language Processing systems.**
Several features of natural languages (NL) can make them both a fascinating field of research and challenging problems at the same time
- Modalities: NL can be produced and consumed in different modalities, spoken and written
- Support media: these modalities are ported in different formats, which may make the processing more challenging. If a book has been numerized by taking pictures of the pages, we want to make sure the optical character recognition (OCR) system we use handles the problem properly. The same apply to the quality of eventual recordings. But where high resolution is important, it also quickly become a resource management problem too.
- A same language can be written in different scripts and orthographic conventions.
- Some languages may lack specific tools, like tokenizers and lemmatizers and may still have complex morphology (lesser problem since the advent of transformers).
- Unavailability of training corpora to develop the said tooling especially as data-driven solution become more and more prominent.
- Language-specific skills, not anybody can work on any given language.
- The scarcity of available information, relating to the Zipf Law.
- The fact that, despite their redundancy, NL structures are complex and hidden under the meaning of the words and their pragmatic context:

<img src="https://upload.wikimedia.org/wikipedia/commons/7/79/Major_levels_of_linguistic_structure.svg" style="width: 40%"/>

**2. Identify the noun phrases, the verb phrases and the named entities in the following sentence:** 
	Trump announced deals totaling more than $200bn between the United States and the United Arab Emirates – including a $14.5bn commitment among Boeing, GE Aerospace and Etihad Airways – as he pledged to strengthen ties with the Gulf state during a multi-day trip to the Middle East.

| named entities           | verb phrases  | noun phrases         |
| ------------------------ | ------------- | -------------------- |
| Trump                    | announced     | deals                |
| the United States        | totaling      | a $14.5bn commitment |
| the United Arab Emirates | including     | ties                 |
| Boeing                   | he pledged    | the Gulf state       |
| GE Aerospace             | to strengthen | a multi-day trip     |
| Etihad Airways           |               |                      |
| Middle East              |               |                      |
**3. Design an NLP pipeline to extract named entities and relations from biomedical text. Detail each stage of the NLP pipeline.**
The nature of the text does not matter, only the language in which it is written. Supposing the text is in English, a pipeline would be constituted of three sections. First, we would preprocess the text and tokenizing the sentences with NLTK, second, we would use NLTK's Part of Speech (POS) tagging and chunking modules and finally, we would filter all the different categories of named entities, be it ORGs, LOCs and so on.

**4. List some of the problems that might arise by using this NLP pipeline.**
Each layer of a pipeline is dependent on the precedent one. So the chunking layer is dependent on the part of speech tagging. However, the model responsible for this POS tagging is not flawless and may fail at its task. This would unequivocally affect the end results.

**5. The following bigram probabilities have been estimated from a training corpus:**
- I like to go 
	- Unigram probability: 4% * 2% * 5% * 4% = 0.00016%
	- Bigram probabilities: 10% * 30% * 10% * 20 % = 0.06%
- They like to come 
	- Unigram probability: 2% * 2% * 5% * 2% = 0.00004%
	- Bigram probabilities (and unigram to find the probability of "come"): 5% * 30% * 10% * 2% = 0,003%
- We like to come and go : let's just pretend that it was on purpose that no probabilities were given for the token "and" in order to fail students using ChatGPT.

**6. In light of your answers to question 5), highlight some of the shortcomings to using this approach for Natural Language Processing.**
In order to calculate probabilities in this way, one must have access to a large training dataset, otherwise there is a risk of encountering tokens absent from the model, like "and" above. But even this problem can be managed by using a special "unknown token" and calculating its probability against other corpora.

**7. Build a bigram word model from the words in this training corpus.**
	we all live in a yellow submarine  
	yellow submarine yellow submarine  
	you all live in a purple submarine  
	purple submarine purple submarine

| bigrams          | probs | bigrams          | probs |
| ---------------- | ----- | ---------------- | ----- |
| \<start> We      | 25%   | submarine \<end> | 100%  |
| We all           | 100%  | \<start> yellow  | 25%   |
| all live         | 100%  | \<start> you     | 25%   |
| live in          | 100%  | you all          | 100%  |
| in a             | 100%  | a purple         | 50%   |
| a yellow         | 50%   | purple submarine | 100%  |
| yellow submarine | 100%  | \<start> purple  | 25%   |
| submarine yellow | 50%   | submarine purple | 50%   |


**8. Next, assuming you have already seen the word “all”, test your model that you built in question 7) by estimating the probabilities for the following testing data:**
There would be a probability of 100% to have the word "live" following the word "all".

**9. Discuss the inadequacies of estimating probabilities using the approaches used in  
question 8).**
Bigram models predict probabilities of relationships. For n+1 number of items, combinatorics theory teaches us that there is $\frac{n(n+1)}{2}$ [possible combination](https://en.wikipedia.org/wiki/Triangular_number). But languages being redundant structures, some perfectly reasonable connection may be absent from even fairly large corpora.

**10. Discuss how these simple language models can be modified to significantly improve their performance and how their performance can be evaluated experimentally.**
 In the case of short, especially really short training sets, like the one in question 7) it may be more relevant to use a unigram model which focuses only on token distributions rather than relationships. Another option is to train neural networks initiated with random values, which will never produce 0% or 100% probabilities. To come back to bigram models, another way to avoid 0% probabilities is to add one to the count of all possible bigrams in the set, which is called Laplace smoothing. Combined with the addition of an unknown token, we can tremendously increase the performance of this sort of models.
 
**11. Describe two different approaches to automatically annotating text with parts of  
speech. Discuss the advantages and disadvantages of both approaches.**
One can use dedicated libraries, such as Spacy and NLTK to tag the tokens of a corpus. These are powerful tools, but they are restricted to high-resourced languages and are not always accurate. Another technique is to create a rule based system, using the suffixes, dictionaries and so on. This is less efficient but might work better for some languages that have limited resources and regular grammatical and lexical structures.

**12. Explain why parts of speech and named entity tagging are so useful when processing natural language text, and also provide several sample applications that make use of parts of speech.**
Honestly, transformer based technology made part of speech tagging completely obsolete. There is no task where POS tagging shines. Not even in a context of low computational resources, as there are now efficient SLM that can run on a normal laptop. POS tagging used to be used to find the relationship between different named entities, as well as helping to identify them.

**13. The following is a short query and a collection comprising four documents that are being used for an information retrieval system:**
		Query: Bangor Wales  
		Doc 1: Bangor is in North Wales.  
		Doc 2: Bangor is in Northern Ireland.  
		Doc 3: Bangor is in Maine, USA.  
		Doc 4: It is in Wales!
**For each word in the collection (ignoring punctuation), calculate the term frequency (tf) for that word in the query, the word’s document frequency (df) from the collection and the word’s inverse document frequency (idf) from the collection.**

Here is a table that shows the tf(n) in the query, the df(n) from the collection and the idf(n) from collection for all n words in the collections. The idf calculation is made using the log base 10.

| Words    | tf in the query | Df from collection | idf from collenction |
| -------- | --------------- | ------------------ | -------------------- |
| Bangor   | 50%             | 3                  | log(4/3) = 12        |
| is       | 0               | 4                  | log(4/4) = 0         |
| in       | 0               | 4                  | log(4/4) = 0         |
| North    | 0               | 1                  | log(4/1) = 0,6       |
| Wales    | 50%             | 2                  | log(4/2)=0,3         |
| Northern | 0               | 1                  | log(4/1) = 0,6       |
| Ireland  | 0               | 1                  | log(4/1) = 0,6       |
| Maine    | 0               | 1                  | log(4/1) = 0,6       |
| USA      | 0               | 1                  | log(4/1) = 0,6       |
| It       | 0               | 1                  | log(4/1) = 0,6       |


**14. Create an inverted index from the four documents in the collection listed in question 13).**

| Words    | docs    |
| -------- | ------- |
| Bangor   | 1,2,3   |
| is       | 1,2,3,4 |
| in       | 1,2,3,4 |
| North    | 1       |
| Wales    | 1,4     |
| Northern | 2       |
| Ireland  | 2       |
| Maine    | 3       |
| USA      | 3       |
| It       | 4       |

**15. Explain why entropy (as first defined by Shannon) is important when evaluating the output of a Natural Language Processing system.**
In information theory, entropy is a measure of uncertainty, the higher the entropy, the higher the uncertainty of the system (or the complexity of the model). Retaking the earlier examples of idf score, one would be more surprised if finding the word "it" in a random document, but the uncertainty is lowered by the fact that there are only four documents to choose from in the first place, hence the small uncertainty of -1/4 * log(1/4) = 0,15. Entropy is the sum of the uncertainty for all the probabilities in the system. It is complementary to probability as it is used to evaluate distributions of probabilities as well as the quality of a model (through cross entropy). 

**16. Calculate the entropy for a speech understanding system that can only recognize seven words (the words that are days of the week i.e. ‘Monday’ to ‘Sunday’) using a unigram model. Assume the probabilities for each of the seven words are equal.**
Using a log base ten, here is the entropy of the system:
<!-- $$H(X)=-\sum_{i=1}^{n}p(x_i)\log(p(x_i))$$ -->
$H(X)=7(-1/7\times\log(1/7))=-\log_{10}(1/7)=\log_{10}(7) \approx 0.845$

Not that other valid results may exist as a consequence of using different bases for the logarithm. But my calculator does not allow me to use a base 2.
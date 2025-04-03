---
title: NLP Lab 3
date: 2025-03-19
---
> The repository for this class can be found [here on GitHub](https://github.com/Oktogazh/NLP/tree/master/Lab_03).
# Exercise 3.1 Comparing Spacy and NLTK

In order to extract the noun phrases, verbs and named entities with NLTK we need to parse the sentences by tokenizing and then tagging them. After this we use custom parsers to extract the required entities. The task is thus way more tedious than with spacy `doc` API, but luckly, it builds on the work done in the previous practical.
```python
import nltk

def parse_noun_phrases(tagged_paragraph) -> list[str]:
    np_grammar = r"""
		NP: {<POS>?(<DT>?<PRP\$>?<\#>?<CC>?<RB>?<JJS?R?>*<VBG>*<NNP?S?|(CD)>+)+}
    """
    np_parser = nltk.RegexpParser(np_grammar)
    parsed = np_parser.parse(tagged_paragraph)
    nps = [part for part in parsed if not isinstance(part, tuple)]
    np_text = [" ".join([word for word, tag in part.leaves()]) for part in nps]
    return np_text


def find_verbs(tagged_paragraph) -> list[str]:
    verbs = [token for token, tag in tagged_paragraph if tag[0] == "V"]
    return verbs


def find_entities(tagged_paragraph) -> list[str]:
    ne_parsed = nltk.ne_chunk(tagged_paragraph)
    nes = [part for part in ne_parsed if not isinstance(part, tuple)]
    ne_text = [" ".join([word for word, tag in part.leaves()]) for part in nes]
    print(ne_text)
    return ne_text


tokenized_paragraph = nltk.word_tokenize(text)
tagged_paragraph = nltk.pos_tag(tokenized_paragraph)

nltk_analysis = {
    "Noun phrases": parse_noun_phrases(tagged_paragraph),
    "Verbs": find_verbs(tagged_paragraph),
    "Entities": find_entities(tagged_paragraph),
}

spacy_analysis = {
    "Noun phrases": [chunk.text for chunk in doc.noun_chunks],
    "Verbs": [token.lemma_ for token in doc if token.pos_ == "VERB"],
    "Entities": [entity.text for entity in doc.ents],
}
```
The above code shows how a single pagraph is parse. For the noun phrases parser, I reused the NP regex I created for the previous lab. Note that I also refactored the way the spacy analysis is done for the results to share a common interface.

After this, we can easily write a for loop that compares the two results.
```python
differences = {}

for key in spacy_analysis.keys():
    not_in_spacy = [
        item for item in nltk_analysis[key] if item not in spacy_analysis[key]
    ]
    not_in_nltk = [
        item for item in spacy_analysis[key] if item not in nltk_analysis[key]
    ]
    differences[key] = {"Not in SpaCy": not_in_spacy, "Not in NLTK": not_in_nltk}
```

Finally, we can add three more paragraph to find more cases where the two parsers differ from one another.
```python
text = (
    "Megan Rapinoe criticized President Donald Trump's executive order banning transgender athletes from women's sports, labeling it \"cruel and depraved.\""
    'Rapinoe urged other athletes to speak out, stating, "Players, actually, are always the most powerful people in sports."'
    "She highlighted recent events that disprove the claim that gender battles in women's sports do not exist."
    "She expressed concerns about the implications of a Trump presidency, suggesting that the order disregards the rights of transgender individuals in sports."
    "When Sebastian Thrun started working on self-driving cars at "
    "Google in 2007, few people outside of the company took him "
    "seriously. “I can tell you very senior CEOs of major American "
    "car companies would shake my hand and turn away because I wasn't "
    "worth talking to,” said Thrun, in an interview with Recode earlier "
    "this week."
    "The European Union has mandated that Apple improve compatibility of its iPhone and iPad operating systems with rival technologies, the first such enforcement under the Digital Markets Act."
    "The EU Commission stated that Google has not adequately complied with the Digital Markets Act, favoring its own services in search results."
    "Google fails to allow app developers to inform users about cheaper options outside its Google Play Store, according to preliminary findings by the Commission."
)
```

And here are the results:
```python
{
    "Noun phrases": {
        "Not in SpaCy": [
            "President Donald Trump",
            "'s executive order banning transgender athletes",
            "women",
            "'s sports",
            "powerful people",
            "women",
            "'s sports",
            "2007",
            "\u201d",
            "this week"
        ],
        "Not in NLTK": [
            "President Donald Trump's executive order",
            "transgender athletes",
            "women's sports",
            "it",
            "the most powerful people",
            "She",
            "that",
            "women's sports",
            "She",
            "him",
            "I",
            "you",
            "I"
        ]
    },
    "Verbs": {
        "Not in SpaCy": [
            "criticized",
            "banning",
            "labeling",
            "depraved",
            "urged",
            "stating",
            "are",
            "highlighted",
            "do",
            "exist.She",
            "expressed",
            "suggesting",
            "disregards",
            "started",
            "working",
            "took",
            "\u201c",
            "was",
            "talking",
            "said",
            "has",
            "mandated",
            "operating",
            "stated",
            "has",
            "complied",
            "favoring",
            "fails",
            "according"
        ],
        "Not in NLTK": [
            "criticize",
            "ban",
            "label",
            "urge",
            "state",
            "highlight",
            "exist",
            "express",
            "suggest",
            "disregard",
            "start",
            "work",
            "drive",
            "take",
            "talk",
            "say",
            "mandate",
            "state",
            "comply",
            "favor",
            "fail",
            "accord"
        ]
    },
    "Entities": {
        "Not in SpaCy": [
            "Megan",
            "CEOs",
            "European Union",
            "Digital Markets Act",
            "EU Commission",
            "Digital Markets Act"
        ],
        "Not in NLTK": [
            "Megan Rapinoe",
            "Trump",
            "2007",
            "earlier this week",
            "The European Union",
            "first",
            "the Digital Markets Act",
            "The EU Commission",
            "Google Play Store"
        ]
    }
}
```

Regarding the noun phrases, we can see that my regex grammar struggles mostly with the genetive constructions and the recognition of personal pronouns. The only noun phrase that my NLTK parser got right but was missed by spacy was "this week". 
For the verbs, we can see another big limitation of NLTK, the absence of lemmatization. This means that even when the two system agree that a word should be recognised as a verb, they don't store it in the same format. Although, the lemmatisation in spacy does not look perfect. The irregular verbs "have", "do" and "be" are not in the list of verbs found by spacy, and we know it is not because these types are not in the orignial paragraphs, so there is no chance to find them in the NLTK analysis.
Finally we have the named entity parsing. The NLTK based parser fails to recognise the full name of Megan Rapinoe and "Google Play Store", but surprisingly does less mistakes that spacy. Spacy recognizes 2007, "earlier this week", "first" as named entities and add the article "the" to "EU Commission" and "Digital Market Act".
In conclusion, we see that despite none of the two systems being perfect, spacy is much more advanced and precise, in addition to be easier to use. It does have the extra advantage to integrate a lemmatizer. The only risk with spacy is its tendency to add too many entities (pronouns as NP, "first" as NE) to a given category and to be "maximalist" when parsing longer chunks of text (President Donald Trump's executive order). But spacy is overall more precise and easy to use, and its mistakes are in nature more easy to fix. One strength of NLTK however is its flexibility, and the ability to create our own custom parsers, also I bet spacy can accept custom parsers too.
# 3.2 Language recognition

For this language recognition challenge, I try to recognize four languages at a time: Breton, French, Welsh and English.
```python
import re

frequent_types = {
    "cy": ["yn", "yr", "yng", "i", "a", "yw", "'n", "'r", "mae", "o"],
    "en": ["the", "a", "and", "of", "be", "that", "is", "it", "for", "not", "in"],
    "br": ["an", "ar", "eo", "e", "o", "a", "ez", "ha", "da", "en"],
    "fr": ["le", "la", "de", "ne", "n'", "et", "un", "pas", "se", "les", "et"],
}

texts = [
    "Ret eo din [boulc'hañ hag echuiñ] skrivañ ar brezegenn-mañ a-raok embannadur statistikoù an niveridigezh a voe warlene war stad ar C'hembraeg e Kembre. Rakwelet a ran e vo ar sifroù a embannor a-benn nebeut ur feuk hag ur vezh evit ar re ac'hanomp a gav dezho ne c'hall ket Kembre bezañ Kembre hep ar C'hembraeg. Diouganiñ a ran ivez e vo diwezh d'ar C'hembraeg evel yezh vev, ha padout a rafe an tuadur a-vremañ, dre zeroù ar c'hentañ kantved warn-ugent, bezet e vo tud c'hoazh war Enez Vreizh da neuze.",
    "Rhaid imi [gychwyn a gorffen] sgrifennu'r ddarlith hon cyn cyhoeddi ystadegau'r cyfrifiad a fu y llynedd ar y Cymry Cymraeg yng Nghymru. Mi ragdybiaf y bydd y ffigurau a gyhoeddir cyn hir yn sioc ac yn siom i'r rheini ohonom sy'n ystyried nad Cymru fydd Cymru heb y Gymraeg. Mi ragdybiaf hefyd y bydd terfyn ar y Gymraeg yn iaith fyw, ond parhau'r tueddiad presennol, tua dechrau'r unfed ganrif ar hugain, a rhoi bod dynion ar gael yn Ynys Prydain y pryd hynny.",
    "A dra sur n'en doa ket gellet Doue faziañ ha kuzhet e oa ster an istor-se tu bennak met ne oa ket en addisplegoù.",
    "Certainement Dieu n'avait pu se tromper et le sens de cette histoire se cachait quelque part, mais non dans les commentaires.",
    "The big difference between a physical and a digital Zettelkasten is that in a digital one, one does not need to store the notes in different boxes, this is because the indexation and link system are core features of the app the app.",
]

for text in texts:
    counter = {}
    most_likely_language = {"name": "", "value": 0}
    for key, list in frequent_types.items():
        counter[key] = 0
        for type in list:
            counter[key] += len(re.findall(rf"{type}\b", text.lower()))
        if most_likely_language["value"] < counter[key]:
            most_likely_language = {"name": key, "value": counter[key]}
    print(
        "Found",
        most_likely_language["name"],
        "with a confidence of",
        f'{most_likely_language["value"] * 100 // sum(counter.values())}%,',
        " details: ",
        counter,
    )

# output:
"""
Found br with a confidence of 55%,
details:  {'cy': 16, 'en': 13, 'br': 48, 'fr': 10}

Found cy with a confidence of 62%,
details:  {'cy': 28, 'en': 7, 'br': 10, 'fr': 0}

Found br with a confidence of 35%,
details:  {'cy': 6, 'en': 6, 'br': 14, 'fr': 13}

Found fr with a confidence of 44%,
details:  {'cy': 0, 'en': 3, 'br': 7, 'fr': 8}

Found en with a confidence of 41%,
details:  {'cy': 4, 'en': 18, 'br': 18, 'fr': 3}
"""
```

The sentences chosen were reasonably long, but it turned  out not to be that easy to have the system work. I had to edit the short words list not to end up with all my sentences being recognised as Breton! The case of the last sentence is particularly insightful, as the Breton counter had the same value (18) as the English one (right answer). The only reason it gave the right answer is the order of the lists of frequent words in the `frequent_types` dictionary. 
Despite this "almost a mistake" case, the level of confidence of the system of this sentence is not the lowest. This experience shows the limitations of this method for recognising a language among larger sets of languages.

# 3.3 Assessing accuracy
Previously, we gave scores of likelihood to the results of our language recogniser. In this section, we're going to assess the accuracy of this algorithm against a corpus of 128 parallel sentences French and Breton extracted from [this wiki](https://style.miraheze.org/wiki/Rummad:Korpus_fr-br). We can wrap the previous code in a function and assess the result of the this function for the sentences we know what language they are already written in.
```python
import re
import json


def detect_language(texts: list[str]) -> list[str]:
    frequent_types = {
        "cy": ["yn", "yr", "yng", "i", "a", "yw", "'n", "'r", "mae", "o"],
        "en": ["the", "a", "and", "of", "be", "that", "is", "it", "for", "not", "in"],
        "br": ["an", "ar", "eo", "e", "o", "a", "ez", "ha", "da", "en"],
        "fr": ["le", "la", "de", "ne", "n'", "et", "un", "pas", "se", "les", "et"],
    }
    result = []
    for text in texts:
        counter = {}
        most_likely_language = {"name": "", "value": 0}
        for key, list in frequent_types.items():
            counter[key] = 0
            for type in list:
                counter[key] += len(re.findall(rf"{type}\b", text.lower()))
            if most_likely_language["value"] < counter[key]:
                most_likely_language = {"name": key, "value": counter[key]}
        result.append(most_likely_language["name"])
    return result


with open("../Tech Iaith/corpus_content.json") as f:
    # If your JSON has a 'text' field
    parallel_corpus = json.load(f)

fr_sentences = [sent["fr"] for sent in parallel_corpus]
br_sentences = [sent["br"] for sent in parallel_corpus]
corpus_size = len(fr_sentences)
print(
    "Accuracy in detecting French sentences:",
    f'{100
    * len([val for val in detect_language(fr_sentences) if val == "fr"])
    // corpus_size}%',
)
print(
    "Accuracy in detecting Breton sentences:",
    f'{100
    * len([val for val in detect_language(br_sentences) if val == "br"])
    // corpus_size}%',
)

# output
# Accuracy in detecting French sentences: 25%
# Accuracy in detecting Breton sentences: 97%
```

As we can see, the system may over-recognise Breton with this method. As I logged the precise results, I noticed that a majority of the French sentences where actually recognised as "br". So the high level of the accuracy over the Breton sentences is in fact misleading. The system just tends to label most sentences as Breton. And this is why extensive testing is essential to avoid blidly mislabelling corpora and end up; and the subsequent "garbage in garbage out" problem.

# 3.4 Confusion matrix
A confusion matrix is a 2 by 2 representation of the accuracy of a bidimensional signal processing (we call them truthy and falsy value). If the signal is perfectly processed, two of the table's cell should equal zero: the counter of falsy signal processed as truthy, and the counter of truthy signals processed as falsy. If noise is introduce during the processing, the values in the cell would become increasingly random.
The docstrings of the confusion_matrix function indicates that:

> the count of true negatives is C_{0,0}, false negatives is C_{1,0}, true positives is C_{1,1} and false positives is C_{0,1}.

Based on this we can analyse the result `[[ 24,  91], [ 24, 859]]` as having the following meaning:
a) 24 negative reviews were rightfully categorized as negative reviews.
b) 24 positive reviews were wrongfully categorized as negative reviews.
c) 859 reviews were righfully categorized as positive reviews.
d) 91 negative reviews were wrongfully categorized as positive reviews.

There are overall good results, but a sensible positivity bias for the wrong answers which leads to thing that a lot of the true positives are actually du to pure luck.

# 3.5 Definitions
- **Accuracy:** The total of correct guesses over the total of items
- **Precision:** for one of the two possible values (1 and 0), the number of correct guesses of that value divided by all predictions of that value.
- **Recall:** for one of the two possible values (1 and 0), the number of correct guesses of that value divided by the actual number for that value.
- **F-1:** The mean between the recall and precision.

The other terms used in the results:
- **support:** the total number of items used in the calculation.
- **average:** the average of the above values when both outcomes (0 and 1) are taken in consideration. The macro average is independant for the number of items (support) and the weighted average is weighted to the support values (in the two first lines).
# 3.6 Sampling the dataset
As indicated in the title, we can simply use pandas own `sample` method to downsize and shuffle the dataset:

```python
df = df.sample(frac=0.1, random_state=87)
```

Then, the only modification is to split the sample after all the preprocessing is done and run the analysis twice in a for loop.

```python
sets = np.split(
    df,
    [1000],
)

for set in sets:
    # apply get_sentiment function
    set["sentiment"] = set["reviewText"].apply(get_sentiment)
    print(set)
    print(confusion_matrix(set["Positive"], set["sentiment"]))
    print(classification_report(set["Positive"], set["sentiment"]))

```

And here is the actual outputs.

```
                                              reviewText  Positive  sentiment
17591  graphic look sharp function htc incredible 2 w...         1          0
13541  would work kindle fire hdx . deleted . wish co...         0          1
13431  wow rating . ignore one star rating . app well...         1          1
8687   've used app month . confident 'll continue lo...         1          1
14727  first 'm guessing game like season one , ( rea...         1          1
...                                                  ...       ...        ...
8420   app work fine although kindle fire ... soooo ....         1          1
9751   app everything scientific calculator supposed ...         1          0
13013  sucks.i would n't recommend wasting memory dev...         0          1
17787            like app lot fun lot fun spend lot time         1          1
9699   look awesome k-fire ! bad burried search mix t...         1          1

[1000 rows x 3 columns]
[[ 54 188]
 [ 29 729]]
              precision    recall  f1-score   support

           0       0.65      0.22      0.33       242
           1       0.79      0.96      0.87       758

    accuracy                           0.78      1000
   macro avg       0.72      0.59      0.60      1000
weighted avg       0.76      0.78      0.74      1000

                                              reviewText  Positive  sentiment
8149   n't say . absolutely nothing waste time . crap...         0          1
18519  pointless game earth . ` even game .... anybod...         0          1
10369  sleep sound forest campfire . reminds summer a...         1          1
19200  game great direction are1 . tap pause . 2. swi...         1          1
17917  really like game wish different bonus level . ...         1          1
...                                                  ...       ...        ...
4920   best calculator homework thomas jefferson clas...         1          1
11624  gave surfing net silk browser . silk slow bugg...         1          1
3763   great resource anyone interested chemistry , p...         1          1
19070  give picture bear pet bear thing.its dumb pict...         0          0
4467   helpful hint game maker : making game free use...         0          1

[1000 rows x 3 columns]
[[ 57 196]
 [ 31 716]]
              precision    recall  f1-score   support

           0       0.65      0.23      0.33       253
           1       0.79      0.96      0.86       747

    accuracy                           0.77      1000
   macro avg       0.72      0.59      0.60      1000
weighted avg       0.75      0.77      0.73      1000
```

As we can see, the results are really consistent with most deviating values doing so by only 1%.
The biggest differences are coming from the support columns, where the repartition between actual ones and zeros varies. This makes the value of the weighted averages vary the most.
So in a practical case of sampling data it sounds more reasonable to use macro averages instead.

Finally, let's compare these results with the original one:

```
              precision    recall  f1-score   support

           0       0.50      0.21      0.29       115
           1       0.90      0.97      0.94       883

    accuracy                           0.88      998
   macro avg       0.70      0.59      0.62      998
weighted avg       0.86      0.88      0.86      998
```

In these original results, the precision scores descrepency for the two values is the most striking. This indicates a tendency to over-classify as 0 values that should have been 1. The interesting aspect about this discrepency is that it is actually compensated for by the imbalance between the support values of actual ones and zeros. This underlines the agency the scientists have when publishing statistical results (how "natural" or ingeniered the dataset should be) and the importance of using several metrics together in order to get a less biased view of the results.

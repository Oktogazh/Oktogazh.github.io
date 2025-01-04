---
title: Outstanding Dissertation Review
date: 2025-01-01
---
This review focuses on [this M.Sc. dissertation](../assets/outstanding-dissertation.pdf).  

Introduction (100 words):
- What is the main research question/hypothesis?  Why is this research significant in its field?  
The dissertation stated goal is to confirm or disprove the hypothesis that the base language used to make speech-to-text models through transfer learning influences the perfomance of the models. This hypothesis means that linguistic similarities between the base and target languages influence the models performance. If it proves to be true, the metrics correlating with the performance gains could help selecting the base languages in transfer learning for other target languages.  
This is especially relevant for lower resources languages like Welsh and Breton, which have to rely on smaller datasets in a world dominated by the scaling law and are generally less studied in the litterature. An optimisation of the learning transfer technic would allow significant improvement in the technology, thus helping more languages to be integrated in applications derived from it, and avoiding a "digital death" of these languages. This focus is relevant for the field, but also for those smaller linguistic communities.


Research Design & Methodology (150 words):
- What methods did the researcher use?  Were these methods appropriate for the research questions?  How was the data collected and analyzed?  
To answer the research question, models were built in order to analyze their accuracy. The character error rate (CER) is the main metric used to this end. It is based on the Levenshtein distance algorithm, commonly used in spellchecker algorithm. The CER is calculated by dividing the raw Levenshtein distance between strings (verified transcriptions against those optained by the model) by their lengths. This normalisation gives a score to the models that is independent from the languages as the datasets in different languages vary in sizes. CER was prefered over either word or phonem based variations of the algorithm because of its bigger accuracy and versatility respectively.  
The datasets used were from Common Voice's tenth version, which is an open repository crowdsourcing recordings from around the world. Different ways to split the dataset (for training, validation and testing) were evaluated to optimise the quality of the results despite the small size of some datasets.

Key Findings & Arguments (250 words):
- What are the main findings/conclusions?  
- How well are these findings supported by evidence?  
- What is the original contribution to knowledge?  
Since the eight trained models in the fifth chapter did not show statistically significant correlations, the core of the dissertation was extended in a sixth chapter with more models in order to have additional data point. A total of thirty models were trained in the study, combining different French, English and German base models with Breton, Romanch, Protuguese and Welsh as targets. No more correlation were found based on phonemic metrics devised in the dataset analysis in chapter 4. This as the virtue of confirming that a weak correlation that was found in Chapter five would not stand the test of a more precise inquiry.  
#Todo: mention correlation with base model acuracy, better is better  
#Todo: The dissertation disproves the hypothesis while recognising that its metrics do cannot encapsulate all apects of language. Surprise finding for French and Breton, as well as Portuguese varieties. 

Critical Evaluation (200 words):  
- How convincing are the arguments?  
- What are the strengths and limitations?  
- How does this work connect to existing literature?  
 When measuring correlation between different metrics, it is better to study the order of the data points instead. If the hypothesis had been true it might have displayed a non-liear correlation between the CER and the other metrics (like an exponencial drop in CER). A Spearman correlation should have been used instead of a Pearson correlation, because it shows correlation relating to order and not raw values.
It is rather surprising that no mention was made of the influence of prosody, this would account for the surprising outperformance of the French model for Breton and the portuguese dataset mismatch. The study of prosody is relatively new, and somewhat limited for minority languages and out of the scope of expertise expected in the dissertation. Yet a mention of it might be beneficial.

Conclusion (100 words):  
- What is the overall significance of this research?
- What are the implications for future research?  
Except from the fact that better base models allow for better learning transfer, the dissertation did not find ways to optimize the choice of a base language for learning tranfer in speach-to-text models. However, the absence of proof in favor of hypothesis 1 is not a proof of its absence, especially as some significant yet unexplained correlations were found in part 6.4.6.  
Paradoxically, it seems that the main take away from the dissertation comes for the opposite direction of its stated goal. When looking for ways to improve the transfer learning method, the most significant observation where instead inexpected drops or jump in performances, most likely due to accentual and prosodic inconsistences in the datasets, which aspects went beyond scope of the author expertise. For this reason, these artifacts where sidelined, although, the prosodic similarity may well be the key to optimizing the choice of the base language in transfer learning which was the initial motivation behind the dissertation.  
Despite this, the rigorousness and perseverence displayed in the dissertation allows to make its finding highly reproducible, and consequently eases greratly the evaluation of new hypothesis like the one on the infuence of prosodic similiraties in learning transfer.

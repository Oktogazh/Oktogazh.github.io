---
date: 2024-10-28
title: Week 3
category: languagetool
---
## Meeting

**Attendance**: Alan, Bill

**Agenda**:
  - Follow the evolution of the project

**Main discussion points**:
  - Alan experienced difficulties during the building of the project locally which led to the [following discussion on LanguageTool forum](https://forum.languagetool.org/t/cy-getting-started-for-welsh/10596/7)
  - Bill said that this was exactly the kind of things that was expected to happen, and that a problem leading to a [code update](https://github.com/languagetool-org/languagetool/commit/42f2c0e8428bb39a95f1d9369b5e9716631bb76a) on the project is some sort of a progress.

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
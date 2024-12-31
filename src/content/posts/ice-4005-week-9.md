---
date: 2024-12-30
title: ICE-4005 - Week 9
---
## Work Report

**New Repo:**
[Here is the repository](), it is written in python and so far I am doing it following the principles of TDD.
here is the work that has bees done so far:
- added a CI workflow to create automatically releases as the code is being pushed to the remote
- made sure the tests are ran before attempting to create a new release (in the CI workflow)
- implemented a pseudo-word generator for a given hunspell dictionary.
	- I noticed that there were problems with the welsh hunspell dictionary I was using. Some words are not correct Welsh words and this leads to some pseudo-words not being phonotactically correct. (the presence of the not so real word "chchch" in the hunspell dictionary leads to the creation of pseudowords like "chchaf") I thing the dictionary should be curated by the authority publishing it (in the case of Welsh, the Canolfan Bedwyr) instead of me changing my design and getting my words from another source.

**Action Items:**
- send an email to the responsible people for the hunspell dictionary
- Load the items in a sqlite database
- create a small front end for the application

**Next:**
- show the words in the front end
- update the ratings in the backend

## [Mini-project Dashboard](<./ice-4005-dashboard>)
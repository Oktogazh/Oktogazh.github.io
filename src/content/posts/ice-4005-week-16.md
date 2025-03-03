---
title: ICE-4005 - Week 16 Understanding the prototype
date: 2025-02-24
---
# Work achieved
The goal previously stated was to find a way to test the pseudo-vocabulary created and compare it to the original training dataset. I settled on using a deterministic variation of [FST](https://en.wikipedia.org/wiki/Finite-state_transducer), to build matrices of transitions, this could even be used in combination with a tokenizer (such as a Bite Paire tokenizer to capture the most common n-grams). Each token would thus be vectorized or embedded and one could compare the vectors extracted from the pseudo dictionary and the original one using by calculating their cosines.
# Discussions
I presented my work and ideas to Bill. The focus for next time has to be placed on coding everything together.
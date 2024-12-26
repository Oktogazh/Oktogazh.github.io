---
date: 2024-12-16
title: ICE-4005 - Week 8
---
## Meeting, aborted

The meeting was supposed to happen online as I was back in Brittany for the Christmas break.
But there must have been a mismatch in the understanding of the meeting time nobody showed up at the time the other was expecting.
Here is a summary of my activities since the last meeting.

[link](astro-obsidian-and-github)
## Writing and reading
I read a [comparison of different pseudo-word generating algorithm](https://journals.sagepub.com/doi/10.1177/17470218231164373), and settled on one using Markov chains of orthographic n-gram, for its versatility and ease of implementation.

I wrote a [blog post](./elo-rating-and-rasch-model) about how the Elo rating system works and relates to the Rasch model.
As I was researching who else did this comparison between the two systems, I found the following article:

Pelánek, R. (2016) 'Applications of the Elo rating system in adaptive educational systems', _Computers & Education_, 98, pp. 169–179. Available at: https://doi.org/10.1016/j.compedu.2016.03.017.

I might write a review on it later, but as I may as well never do it, here is a brief summary.

The good folk of Masaryk University Brno's Computer Science department in the Czech Republic has been using modified versions of the Elo rating system for adaptive learning softwares for more than a decade now. One cool example of these is the website [practiceanatomy.com](https://practiceanatomy.com), which does not show directly the rating to the users, but uses it to ensure that the questions presented to them keeps a 75-80% chances of being answered correctly. They created other applications, but most of them in Czech, or destined to a Czech public (e.g. to learn English vocabulary from Czech) and others have already been shut down because they were simple B.Sc. or alike short-lived experiments.

Nevertheless, Pelánek's article brings an experienced insight on how and why to use the Elo system and which variants may be useful for which context. Of particular importance is the uncertainty function used to modify the "strength" of the $K$ value. They used grid search to find an optimal uncertainty function $U(n)=4/(1+0.05n)$, where n is the number of item questions a student were given or the number of answers a question were given.

![](https://ars.els-cdn.com/content/image/1-s2.0-S036013151630080X-gr2.jpg)

The second takeaway from this article is that, although its implementation is much easier and cheaper to run than more statistically principled Item Response Theory (IRT) methods, the results in terms of rating are shown to be extremely accurate with the Elo rating system, but much better than classic proportion of correct answers based approaches.

![](https://ars.els-cdn.com/content/image/1-s2.0-S036013151630080X-gr3.jpg)
- Spearman correlations (correlation in the orders of items) between generated and estimated difficulty parameters (JMLE = joint maximum likelihood estimation (IRT), Elo = the Elo rating system, PC = the proportion of correct answers). On the left, in the context of a fully adaptive system (items with the closest rating are selected). On the right, different degrees of randomnesses are used for item selection. The number of times an item is selected varies randomly between 10 and 100. 

We notice that the correlations becomes weaker in a fully adaptive context. This context makes the PC method completely irrelevant, but even the other methods become less accurate. In light of this data, I will try to include some level of randomness, say 50%, in the item selection of my project. The question of randomness and adaptivity is ultimately decided by balancing how many items we want to test. Testing 40 000 words in a fully random context would be meaningless for students expected to master only a couple dozens or hundreds of words. Unless we are ready to wait the students to answer several hundread of times before they meet at least one word they know. Similarly, as we just saw, selecting items with the closest rating is not optimal neither.

To summarize, the article bring an invaluable wealth of experience in the domain of using the Elo rating system in a learning and testing context, when most of the litterature on the Elo rating system rather focuses on its original competitive context, mostly for gaming, but also testing other sets of competence, like LLM arena does to rate large language model based chatbots. For psycholinguists or cognitive scientists outthere wanting to test the evolution in short term memory skills, the article also gets you covered. It presents a way to tune the $K$ value, akin to the uncertanty function seen above, but in function of time, which can emulate short term memory decline. I am sure that protocols exists out already to test short term memory, but once again, the Elo rating shines when we want study the evolution of these skills, or even gamify it in order to gather more data.

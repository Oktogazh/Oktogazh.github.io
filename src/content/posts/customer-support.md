---
title: Evaluating a Customer Support Agent
date: 2026-01-11
---
# Introduction
Drawing on the excellent [Ritvikmath's material on LLM evaluation](https://www.youtube.com/watch?v=8m_w3aHoSqE&t=187s), one can classify LLM evaluation in three categories, from more simplicity and determistic processes towards more complexity and stochastic processes. We'll call them the paradigms A, B and C, you can think of them loosely as the three billing plan of a SaaS: good, better and best. But as we'll see, each metric has its strength and paradigm C is far from being a one-size-fits-all solution.

In paradigm A, you hardcode the metrics you think are relevant: **words count** (whether you look for short of long answers) or **regex** (if your brand, specific sentences or precise values appear in the answers, and how often). This is an easy and straightforward way to turn a qualitative input (multiple parameters) in a quantitative metric (good or bad). Yet, depending on the context, this is a very limited way to evaluate the overall "vibe" of a conversation.

In paradigm B, we introduce a **judge LLM**, which can go through the converation and emit a judgement on the quality of the interaction. This judge has to be fine-tuned based on human feedbacks, which indicate to it what a good or bad conversation looks like. This can be a powerfull tool if an anotated dataset is available. But depending of the purpose of the LLM, this solution can **miss contextual aspects** of the interation.

In paradigm C, we **generate synthetic conversations** by adding **users LLMs**. Yes, several of them, because each user LLM represents a "user type" and needs to be assigned a personality and a response style, which in turn influence the flow of the conversation with the main LLM we want to test. Then, we use a **judge LLM** to find successfull synthetic conversations that we can fine-tune our model with. This solution is really advanced and can lead to competitive advantage in some industries. But for the needs of a customer support agent, it can be an **overkill**. Appart from necessitating the creation of many "user character" LLMs, the amont of anotated data necessary to prepare the creation of reliable synthetic data is huge, this implies that before ever thinking about implementing a type C solution, we need to implement a type B paradigm.

In the next section, we shall see how to combine elements from the paradigms B and C to create the perfect customer support agent.

# Personality vs Mood
A recurrent critic of the gigantic market of personality test is its lack of test-retest reliability. most people taking the same test several times are likely to be identified as having completly different personalities which goes against the idea of personality being an imuable aspect of one's character. People can be more extravert when happy, more impacient when stressed, more conflictual when feeling unsafe and so on, those are not personality traits but moods.

In the context of customer support, the number one priority is customer satisfaction, obviously. But this translate in a rather simple thing to measure, the customer's mood change between the beginning and the end of the interaction. Instead of looking for different personalities like in the C paradigm, we can see the cases as ranging from "my customer is really pissed" to "my customer is calm statisfied", independently from the specific goal of the conversation (refund, unsubscription or else). This narrows the goal of the agent, from handling diferent personalities, towards leading the customer towards a specific mood, relaxed, happy, calm, cooperative: satisfied.

# Reasoning by First Principles
When seeing things through this lense, it becomes easy to see how a type B judge LLM can classify different existing converation as good or bad. Thus successfully accounting for different user types, but not by seing them as different species of users, but by seeing them at a different distance from the mood we want them to reach. Even without directly accounting for status of the ticket as resolved or not, it is obvious that a case that is resolved will contribute to improve the mood of the conversation. This way, we can indirectly account for the effectiveness of the agent (does it do what it is supposed to do) by using the mood of the conversation as a proxy (how well is the agent improving our customer's mood). However, simply looking at the effectiveness would not tell us the full picture of the customer's satisfaction. 

# In practice
Here is a simple (type B evaluation), 4 steps guide to easily recycle existing conversations of a customer support agent in a pipleline that **engineers customer satisfaction**.
1.  Use a judge LLM to categorize the conversations by the mood in the first few incoming message: **angry**, **cooperative** and so on...
2. Repeat the evaluation at the end of the conversation to find the delta between the two. 
3. If the delta is positve, that is, if the mood is improving, the agent works fine, if negative, it is pissing off the customers instead of helping.
4. Ask the judge LLM to extract the elements present in the conversations that either angers the customers ("What went wrong?") or helps them with their problem ("What went well?"). Use the extracted elements to refine the prompts manually.


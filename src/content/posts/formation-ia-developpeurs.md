---
title: "Formation — L'IA au service des développeurs"
date: 2026-08-31
lang: fr
---

*Brouillon de fiche publique. Deux jours, 14 heures, à distance. Le programme
détaillé et les documents administratifs vivent ailleurs ; cette page dit ce
que la formation apprend et pourquoi.*

## La thèse

Un agent ne rend pas un projet plus rapide : il rend plus rapide **la production de
code**. Ce n'est pas la même chose. Si le projet ne sait pas dire tout seul qu'il est
cassé, l'accélération se paie en défauts, en revues fictives et en dette de
compréhension.

D'où l'ordre de la formation : d'abord comprendre ce qu'est un modèle de langage,
ensuite piloter un agent sur un dépôt réel, et enfin poser autour de lui la boucle de
rétroaction — tests, pipeline, découpage — sans laquelle rien de tout cela ne tient.

Le fil est une seule compétence, qui traverse les deux journées : **savoir spécifier,
savoir vérifier.**

## Public

Développeurs et profils techniques non-développeurs, ensemble et en binôme. Le
déséquilibre entre les deux profils est un contenu, pas un obstacle : la vérification
d'une production d'IA est souvent mieux faite par celui qui ne tient pas le clavier.

## Ce que la formation permet de faire, à la sortie

1. Expliquer le fonctionnement d'un modèle de langage — tokens, plongements, fenêtre de
   contexte, alignement, non-déterminisme — sans mathématiques.
2. Choisir, face à un besoin donné, entre ingénierie de contexte, appel d'outils, RAG et
   fine-tuning, et **justifier** ce choix.
3. Évaluer de manière critique une production d'IA : repérer les inventions, les
   dépendances non vérifiées, les angles morts — puis corriger.
4. Configurer un environnement de développement agentique sur un dépôt existant, et
   maîtriser sa consommation.
5. Mettre en place une boucle de rétroaction automatisée : tests, pipeline, hooks.
6. Appliquer les techniques de maîtrise de la complexité qui rendent un projet
   exploitable par un agent — et argumenter que ce sont les mêmes que celles qui le
   rendaient lisible par un humain.
7. Mettre au travail un agent non interactif sur une tâche répétitive, avec ses
   garde-fous : périmètre, coût, revue humaine.
8. Nommer les risques — injection de prompt, fuite de données, paquets hallucinés,
   RGPD, AI Act, licences — et les mesures applicables.

## Déroulé

**Jour 1 — comprendre, puis piloter.** Sous le capot sans mathématiques. Les quatre
leviers, du moins au plus coûteux : contexte, outils, RAG, fine-tuning. Ce que le
travail augmenté fait bien, ce qu'il fait mal, et pourquoi la vélocité ressentie n'est
pas la vélocité mesurée. Panorama outillé par niveau de contrôle plutôt que par marque.
Puis un premier atelier : prendre pied dans un dépôt inconnu, en produire une
cartographie, **et la vérifier ligne à ligne.**

**Jour 2 — rendre l'accélération sûre.** L'ingénierie logicielle comme démarche
empirique : itératif, incrémental, rétroaction, petits lots, le pipeline comme arbitre,
les métriques de livraison. Pourquoi l'IA rend tout cela obligatoire plutôt
qu'optionnel. Atelier central : construire le harnais du dépôt et **mesurer** ce que
change le harnais pour l'agent. Puis l'agent managé sur la chaîne de livraison, la
brique RAG en atelier guidé, et la conformité.

## Ce que la formation n'est pas

Ce n'est pas un tutoriel d'outil. Un tutoriel d'outil est périmé au prochain modèle ; le
module sur la livraison continue et l'atelier de harnais, non. C'est la partie du
programme dont la valeur survit, et c'est celle qui n'est jamais sacrifiée quand
l'horaire dérape.

Le fine-tuning est traité comme une **décision**, pas comme une pratique : dans la
plupart des contextes d'équipe, ce n'est pas la bonne réponse. Pour la version qui le
pratique vraiment, voir [Formation — RAG et fine-tuning](/posts/formation-rag-finetuning).

## Notes liées

- [Kelenn an AI](/posts/kelenn-ai)
- [The evolution of transformers](/posts/understand-transformers)
- [Evaluating a customer support agent](/posts/customer-support)

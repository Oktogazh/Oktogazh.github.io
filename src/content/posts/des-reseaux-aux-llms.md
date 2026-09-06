---
title: Des réseaux de neurones aux LLMs
date: 2026-09-03
---


- Des réseaux de neurones aux LLMs
	- Introduction aux matrices.
		- GPU et VRAM : du jeu vidéo à l'intelligence artificielle
		- Argument : les matrices sont des tableaux Excel, ils convertissent une suite de données d'une dimension A en une dimension B
	- Décrire un graphe sous forme de matrices, deux méthodes :
		- Matrice d'adjacence
		- Réseaux neuronaux
	- Forward pass vs back-propagation
		- Concepts clé : poids, inférence, descente de gradients, fonctions de perte
		- Question : quelles différences entre les réseaux de neurones biologique et artificiel ?
	- Tokenisation et embeddings, représentation vectorielle des donnés sémantique
		- Différents algorithmes de tokenisation (Byte-pair encoding)
		- Différentes générations d'embedding (HAL, Word2Vec etc...)
	- Les transformers
		- 2017: architecture encodeur-décodeur pour des taches de traduction
		- GPT: Décodeur seul pour génération auto-régressive : question -> réponse
		- LLM: de GPT 3 et une adoption record à Fable 5, et la révolution agentique, en passant par la concurrence des acteurs open source
		- Les défis des prochaines années : l'alignement, l'agentique et les harnais
		- Enjeux commerciaux actuels : serveur MCP et pipeline RAG
	- Récapitulatif
		- Des mathématiques pures à un changement de paradigme cognitif et industriel complet
- Travaux pratiques :
    - Setup d'un environnement Conda, test d'un modèle via Transformers  
    - Identification des types de questions échouant sans retrieval
---
title: "Formation — RAG et fine-tuning"
date: 2026-08-31
lang: fr
---
## Objectifs pédagogiques
- Comprendre les principes de l'architecture RAG
- Identifier les cas d'usage pertinents pour l'approche RAG
- Maîtriser le fine-tuning de LLM en environnement Python
- Intégrer une base documentaire dans une pipeline RAG
- Déployer un système RAG avec les outils Python : LangChain, LlamaIndex, HuggingFace

## Programme

### Jour 1 – Introduction aux LLM et concepts RAG
#### Présentation 1/2 : [[des-reseaux-aux-llms|Des réseaux de neurones aux LLMs]]
#### TP 1/6 : Faire tourner le LLM Mistral Small
Objectif : Installer l’environnement Python et déployer un LLM open-source.   

Description : Setup d’un environnement Conda, test d’un modèle via Transformers.

Questions : 
	Quel type de question échoue sans retrieval ?
	Quelle différence avec et sans GPU ?

#### == Pause déjeuner ==
#### Présentation 1/2 : [[lecosysteme-ia-2026|2022-2026, panorama de l'écosystème IA, couches technologiques et principaux acteurs]] 


- Les concepts clés du RAG : embedding, base de données vectorielles
- Indexation de données
- Mécanismes de récupération de données, recherche sémantique
- Génération augmentée
- Cas d'usage et enjeux stratégiques
- Travaux pratiques :  
    - Extraction de texte, chunking, vectorisation, test d'un assistant LangChain  
    - Comparaison des stratégies de découpage pour le meilleur rappel

### Jour 2 – Intégration dans un pipeline RAG

- Pourquoi utiliser des Tool Chains ?
- Les principaux outils de Pipeline : LangChain, LlamaIndex, Haystack
- Création d'un Pipeline RAG avec LangChain
- Agents LLM et logique ReAct, exemples
- Travaux pratiques :  
    - Implémentation d'agents LangChain avec la logique ReAct à travers un exemple concret d'application métier

#### Fine-tuning avec HuggingFace

- Fine Tuning Complet VS Fine Tuning léger (LoRA, QLoRA...)
- Préparation des données : nettoyage, format, annotations
- Augmentation des données
- Mise en œuvre du Fine Tuning, APIs, ressources GPUs
- Évaluation et métriques de performance
- Distillation de modèles
- Travaux pratiques :  
    - Fine-tuning sur une base client avec datasets personnalisés  
    - Analyse des logs d'entraînement et évaluation des réponses aux requêtes internes

### Jour 3 – Déploiement, bonnes pratiques, optimisation et supervision

- Quantization et compression d'un modèle
- Déploiement d'un modèle fine tuned : Gradio, Streamlit
- Le déploiement en API via FastAPI
- Les logiciels Jan.ai et Ollama
- Supervision avec LangSmith ou MLFlow
- Travaux pratiques :  
    - Création d'une interface Streamlit, simulation multi-utilisateurs  
    - Analyse des risques liés à l'exposition du modèle à l'extérieur

#### Fine Tuning vs RAG

- Comparaison entre les deux techniques
- Critères pour choisir la bonne approche
- Combiner les approches pour améliorer les performances
- Cas d'usage concrets et exemples
- Travaux pratiques :  
    - Mise en œuvre d'une pipeline combinant un modèle LLM fine tuné avec une approche RAG  
    - Préparation d'un jeu de données simplifié, intégration dans un pipeline RAG, évaluation comparative des résultats


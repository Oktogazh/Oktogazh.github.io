---
title: "Formation — RAG et fine-tuning"
date: 2026-08-31
lang: fr
---
### Objectifs pédagogiques
- Comprendre les principes de l'architecture RAG
- Identifier les cas d'usage pertinents pour l'approche RAG
- Maîtriser le fine-tuning de LLM en environnement Python
- Intégrer une base documentaire dans une pipeline RAG
- Déployer un système RAG avec les outils Python : LangChain, LlamaIndex, HuggingFace

### Programme

#### Jour 1 – Introduction aux LLM et concepts RAG
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
- Panorama de l'écosystème LLM : couches technologiques et principaux acteurs
	- Mesurer la qualité d'un modèle
		- benchmarking
		- LLM Arena
		- "Vibe check"
		- Tests agentiques
	- Les meilleurs modèles par acteurs :
		- OpenAI : de la révolution à la confiance brisé
		- Claude : le partenaire des entreprises 
		- Gemini : la force de frappe de google
		- Mistral : le seul acteur européen, petit modèles open-weight
		- DeepSeek : le tsunami open-weight
	- Au-delà du modèle, les nouveaux critères de performance:
		- Prompt Engineering (expertise métier)
		- Context Engineering (RAG)
		- Harness Engineering (connection aux agents, chain of thoughts, agents ReAct)
		- Dans le future : le loop Engineering ?
		- Une chose est sûre, le monde de l'IA ne se cantonne plus aux choix de modèle, l'écosystème évolue et les pratiques également, pourtant, tout continue d'évoluer très vite ! Ce que les experts prédisaient en 2025, 2024 ne s'est pas réalisé.
	- Les outils agentique grand public :
		- Programmation : Codex, Cursor, Claude Code, GitHub Copilot (plugin d'IDE), Managed Agents (Claude)
		- Harnais agentiques (MCP) : ChatGPT, Claude, Deepseek Harness...
		- Question : Quelle différence entre un harnais et un moteur d'inférence ?
	- Les outils d'orchestration, exemple pour un pipeline RAG
		- Introduction au RAG
		- Moteurs d'inference : Ollama, vLLM
		- Les routeurs : LlamaIndex, `RouterChain` de LangChain, Aurelio AI, différentes technologies pour différent cas de figures
			- Question : Pourquoi utiliser un routeur ?
		- Moteur de requête (query engine), le corps du pipeline RAG, exemple avec Haystack :
			- Les retrieveurs, FAISS, bases de données vectorielles, graphiques...
			- Étapes intermédiaires : filtre, reformulation de la question...
			- Les générateurs
			- Étapes intermédiaires : post-processing, syntétiseur...
	- Autres outils d'orchestration pour la conception backend pour harnais agentique (au-delà du RAG) :
		- Agent SDK
		- Deepseek Harness
		- LangChain
		- Goose
		- Différent harnais pour différent cas d'usages
	- L'intérêt des acteurs open sources
		- Coût, car non dépendant à des API externes
		- Fine-tuning
		- Maitrise de la chaine de valeur, indépendance et autonomie technologique

- Travaux pratiques :  
    - Setup d'un environnement Conda, test d'un modèle via Transformers  
    - Identification des types de questions échouant sans retrieval

#### Création d'un RAG simple avec Python

- Les concepts clés du RAG : embedding, base de données vectorielles
- Indexation de données
- Mécanismes de récupération de données, recherche sémantique
- Génération augmentée
- Cas d'usage et enjeux stratégiques
- Travaux pratiques :  
    - Extraction de texte, chunking, vectorisation, test d'un assistant LangChain  
    - Comparaison des stratégies de découpage pour le meilleur rappel

#### Jour 2 – Intégration dans un pipeline RAG

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

#### Jour 3 – Déploiement, bonnes pratiques, optimisation et supervision

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
---
title: Tech Iaith Portfolio
date: 2025-05-30
---
# 1 Extracting the corpus from a wiki
## 1.1 Presentation of the wiki
For this practical, I decided to source the sentences in a wikimedia instance doing comparative stylistic between Breton and French: [Style](https://style.miraheze.org/wiki/Taolenn_an_danvezio%C3%B9). Conveniently, the wiki contains a category of pages named "Korpus fr-br", which is used to mark all the examples of translation analyzed in the wiki in a standard way using wikitext templates (here the template name is "Person" (reference to the book and its translation) and get passed several variables that we're going to extract later):
```
{{person
|fr=Après leur passage les femmes sortaient par les portes de derrière et couraient chez des amies dans l’espérance de précéder les messagères ; on se manquait souvent ou bien, à l’improviste, on se trouvait nez à nez l’une avec l’autre, et chacune déjà dûment avertie.
|pajenn-fr=82
|br=Goude ma oant bet ez ae ar maouezed all er-maez dre an dorioù dreñv ha d’ar red e ti o mignonezed, gant ar spi da erruout a-raok ar c’hannadezed; alies e veze c’hwitet war ar re all pe neuze e veze emgav fri-ouzh-fri, ha pep hini bet kelaouet evel m’eo dleet.
|pajenn-br=61}}
```
![[../assets/style_example.png]]
Conveniently transcluded in the other articles like this:
```
==== Deskrivañ un obererezh kaset da benn en un doare dereat, evel m'eo gortozet ====

{{:Alies e veze c’hwitet war ar re all}}

{{:Evel m’eo dleet e priente ar gerent da veilhat un toulladig eurvezhioù}}
```
Which shows like this in [a normal article](https://style.miraheze.org/wiki/Verbo%C3%B9_ha_stummo%C3%B9_damskoazella%C3%B1_e_brezhoneg#Deskriva%C3%B1_un_obererezh_kaset_da_benn_en_un_doare_dereat,_evel_m'eo_gortozet):
![](../assets/transcluded-example.png)

## 1.2 Extracting the corpus
The French-Breton corpus is accessible [here](https://style.miraheze.org/wiki/Rummad:Korpus_fr-br). 
![](../assets/korpus-fr-br.png)
From this category page we can access all the examples used in the wiki. Then, we load them in a json file to analyse these examples later. You can find the code used for the extraction as well as the extracted corpus [here on my GitHub](https://github.com/Oktogazh/NLP/tree/master/Tech%20Iaith).

# 2 Analyzing a sentence

Here is a graph of the dependencies in one of the French sentences of the corpus. I could not analyze a Breton sentence as precisely because 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="fr" id="a123f7c54c11436bb45c902fa92cb98d-0" class="displacy" width="1625" height="399.5" direction="ltr" style="max-width: none; height: 399.5px; color: #000000; background: #ffffff; font-family: Arial; direction: ltr"> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="50">Les</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="50">DET</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="225">animaux,</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="225">NOUN</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="400">derrière</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="400">ADP</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="575">la</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="575">DET</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="750">cloison,</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="750">NOUN</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="925">qui</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="925">PRON</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="1100">réchauffent</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="1100">VERB</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="1275">les</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="1275">DET</tspan> </text> <text class="displacy-token" fill="currentColor" text-anchor="middle" y="309.5"> <tspan class="displacy-word" fill="currentColor" x="1450">maîtres;</tspan> <tspan class="displacy-tag" dy="2em" fill="currentColor" x="1450">NOUN</tspan> </text> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-0" stroke-width="2px" d="M70,264.5 C70,177.0 215.0,177.0 215.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-0](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-0)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">det</textPath> </text> <path class="displacy-arrowhead" d="M70,266.5 L62,254.5 78,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-1" stroke-width="2px" d="M420,264.5 C420,89.5 745.0,89.5 745.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-1](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-1)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">case</textPath> </text> <path class="displacy-arrowhead" d="M420,266.5 L412,254.5 428,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-2" stroke-width="2px" d="M595,264.5 C595,177.0 740.0,177.0 740.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-2](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-2)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">det</textPath> </text> <path class="displacy-arrowhead" d="M595,266.5 L587,254.5 603,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-3" stroke-width="2px" d="M245,264.5 C245,2.0 750.0,2.0 750.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-3](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-3)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">nmod</textPath> </text> <path class="displacy-arrowhead" d="M750.0,266.5 L758.0,254.5 742.0,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-4" stroke-width="2px" d="M945,264.5 C945,177.0 1090.0,177.0 1090.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-4](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-4)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">nsubj</textPath> </text> <path class="displacy-arrowhead" d="M945,266.5 L937,254.5 953,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-5" stroke-width="2px" d="M770,264.5 C770,89.5 1095.0,89.5 1095.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-5](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-5)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">acl:relcl</textPath> </text> <path class="displacy-arrowhead" d="M1095.0,266.5 L1103.0,254.5 1087.0,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-6" stroke-width="2px" d="M1295,264.5 C1295,177.0 1440.0,177.0 1440.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-6](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-6)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">det</textPath> </text> <path class="displacy-arrowhead" d="M1295,266.5 L1287,254.5 1303,254.5" fill="currentColor"/> </g> <g class="displacy-arrow"> <path class="displacy-arc" id="arrow-a123f7c54c11436bb45c902fa92cb98d-0-7" stroke-width="2px" d="M1120,264.5 C1120,89.5 1445.0,89.5 1445.0,264.5" fill="none" stroke="currentColor"/> <text dy="1.25em" style="font-size: 0.8em; letter-spacing: 1px"> <textPath xlink:href="[#arrow-a123f7c54c11436bb45c902fa92cb98d-0-7](view-source:http://0.0.0.0:5001/#arrow-a123f7c54c11436bb45c902fa92cb98d-0-7)" class="displacy-label" startOffset="50%" side="left" fill="currentColor" text-anchor="middle">obj</textPath> </text> <path class="displacy-arrowhead" d="M1445.0,266.5 L1453.0,254.5 1437.0,254.5" fill="currentColor"/> </g> </svg>
Here is the same sentence analized as a list of token, parts of speech (POS), and stops:
```python
Les DET True
animaux NOUN False
, PUNCT False
derrière ADP True
la DET True
cloison NOUN False
, PUNCT False
qui PRON True
réchauffent VERB False
les DET True
maîtres NOUN False
; PUNCT False
```

# 3 Counting the tokens

```
50 most common alphabetic tokens:
In the French examples:
[('prêtre', 17), ('Dieu', 16), ('île', 15), ('Thomas', 12), ('homme', 10), ('mer', 10), ('devoir', 9), ('falloir', 8), ('contre', 8), ('femme', 7), ('îlien', 7), ('ciel', 7), ('rien', 7), ('bel', 6), ('faire', 6), ('ile', 6), ('paroisse', 6), ('nuit', 6), ('église', 6), ('tandis', 5), ('bien', 5), ('temps', 5), ('main', 5), ('avoir', 5), ('chrétien', 5), ('haute', 5), ('prière', 5), ('entendre', 5), ('année', 4), ('oeil', 4), ('recteur', 4), ('pêcheur', 4), ('petit', 4), ('fenêtre', 4), ('vent', 4), ('long', 4), ('posséder', 4), ('chose', 4), ('être', 4), ('bon', 4), ('prendre', 4), ('épave', 4), ('voix', 4), ('grève', 4), ('rendre', 4), ('lieu', 4), ('récif', 4), ('pauvre', 4), ('envoyer', 4), ('tête', 4)]

In the Breton examples:
[('gant', 43), ('enez', 20), ('ouzh', 20), ('evit', 15), ('evel', 14), ("d'ar", 13), ('beleg', 13), ('doue', 12), ('tomaz', 12), ('veze', 11), ('dezhañ', 11), ('vefe', 11), ('neuze', 9), ('bezañ', 9), ('oant', 8), ('holl', 8), ('reas', 8), ('dleet', 7), ("d'an", 7), ('mont', 7), ('enezourien', 6), ('gwelet', 6), ('daoust', 6), ('oabl', 6), ('goude', 5), ('maouezed', 5), ('lakaet', 5), ('gantañ', 5), ('iliz', 5), ('unan', 5), ('peñse', 5), ('vont', 5), ('sevel', 5), ('anezhañ', 5), ('daou', 4), ('a-raok', 4), ('person', 4), ('nemet', 4), ('lakaat', 4), ('dezho', 4), ('douar', 4), ('anezho', 4), ('heul', 4), ("c'helle", 4), ('diouzh', 4), ('penn', 4), ('aotrou', 4), ('klevet', 4), ('gellet', 3), ('betek', 3)]
```

Surprizingly, the word for "God" appears 16 times in French and only 12 times in Breton, but the word for "island" is much more present in Breton than in French. This might be because of the mutations and other sorts of inflections found in Breton, might have the counter ending up counting different forms of the same words separately. Which does not show up when selecting the most frequent words.

I don't want to elaborate more on the nature of the difference between types and token, the Zipft law and the Heap law, you can always read what I said in a previous assignment [here](nlp-lab-1).

# 4 Words Cloud
I used the 50 most common Breton words above to generate the following word cloud.
![](../assets/koumoulenn-geriou.png)

---
# 1 Using Machine Translation Models
## 1.1 The transformer architecture

```python
MarianMTModel(
  (model): MarianModel(
    (shared): Embedding(54395, 512, padding_idx=54394)
    (encoder): MarianEncoder(
      (embed_tokens): Embedding(54395, 512, padding_idx=54394)
      (embed_positions): MarianSinusoidalPositionalEmbedding(512, 512)
      (layers): ModuleList(
        (0-5): 6 x MarianEncoderLayer(
          (self_attn): MarianAttention(
            (k_proj): Linear(in_features=512, out_features=512, bias=True)
            (v_proj): Linear(in_features=512, out_features=512, bias=True)
            (q_proj): Linear(in_features=512, out_features=512, bias=True)
            (out_proj): Linear(in_features=512, out_features=512, bias=True)
          )
          (self_attn_layer_norm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
          (activation_fn): SiLU()
          (fc1): Linear(in_features=512, out_features=2048, bias=True)
          (fc2): Linear(in_features=2048, out_features=512, bias=True)
          (final_layer_norm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
        )
      )
    )
    (decoder): MarianDecoder(
      (embed_tokens): Embedding(54395, 512, padding_idx=54394)
      (embed_positions): MarianSinusoidalPositionalEmbedding(512, 512)
      (layers): ModuleList(
        (0-5): 6 x MarianDecoderLayer(
          (self_attn): MarianAttention(
            (k_proj): Linear(in_features=512, out_features=512, bias=True)
            (v_proj): Linear(in_features=512, out_features=512, bias=True)
            (q_proj): Linear(in_features=512, out_features=512, bias=True)
            (out_proj): Linear(in_features=512, out_features=512, bias=True)
          )
          (activation_fn): SiLU()
          (self_attn_layer_norm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
          (encoder_attn): MarianAttention(
            (k_proj): Linear(in_features=512, out_features=512, bias=True)
            (v_proj): Linear(in_features=512, out_features=512, bias=True)
            (q_proj): Linear(in_features=512, out_features=512, bias=True)
            (out_proj): Linear(in_features=512, out_features=512, bias=True)
          )
          (encoder_attn_layer_norm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
          (fc1): Linear(in_features=512, out_features=2048, bias=True)
          (fc2): Linear(in_features=2048, out_features=512, bias=True)
          (final_layer_norm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
        )
      )
    )
  )
  (lm_head): Linear(in_features=512, out_features=54395, bias=False)
)
```

This model is divided in four parts, first comes the embedding layer. It's first layer is a shared layer, which means it is used both by the encoder and the decoder. Its role is to turn the token into vectors and the vectors back to tokens (which are then turned back to real words). This embedding layer can recognise 54395 different tokens and turns them into 512 ($2^9$) dimensions-long vectors. The Padding vector is in the 54394th (last) postition.  
Then comes the encoder. It starts with the same layer as describe above followed by a positional embedding layer, in order to make sure the transformer architecture gets a sense of which word is in which position in the sequence, which they don't do like RNN like LSTM and GRU. It uses sinusoidal functions to create the "positional matrix" whose values are added to the embedded words vectors of the sequence. After this comes the self-attentions layers, six of them.
The decoder follows a similar pattern except that it also include a cross-attention layer. The model ends with a language model head, which converts the vectors in tokens, similarly to the way a simpler NN architecture would end with a layer using the softmax activation function to transfor the last vector produced by the network in a one dimentional categorical value.

## 1.2 Translation with a multilingual model

To enable translation from several different languages we add a language tag in the beginning of the sentence. Note that only the Welsh model gives a correct translation.
In Breton it translates to "This is famous!" and in Cornish to "It was the biggest proktoryon", whatever that means.
```python
src_txt= [f'>>{lid}<< This is a great practical!' for lid in ['br', 'cy', "kw"]]

['Brudet eo an dra-se !', 'Mae hyn yn ymarferol iawn!', "Yth esa'n brassa proktoryon!"]
```


# 2 Models Evaluation

## 2.1 modifications
In this sections we will examine the modifications I made to the base colab file.

### 2.1.1 Data preparation
As I extracted a parallel corpus (Breton and French litterary translations) for the previous practical (the corpus come from [this wiki on comparative stylistic](https://style.miraheze.org/wiki/Rummad:Korpus_fr-br)). I thought of using its 128 sentences as my testing set for a Breton-French translation model:
```python
ds_trgt_lang=datasets.load_dataset('gsarti/flores_101', trgt_lang)

with open("/content/corpus_content.json") as f:
    parallel_corpus = json.load(f)

ds_src_lang = [sent["br"] for sent in parallel_corpus]
ds_trgt_lang = [sent["fr"] for sent in parallel_corpus]
```

### 2.1.2 Model
I looked in HuggingFace for a French-Breton model and found `lgrobol/m2m100_418M_br_fr`, Loïc Grobol's fine tuned version of `facebook/m2m100_418M`. Here are the most meaningful modifications:

First, we import the model, tokenazer and testing everything works by translating the first sentence.
```python
model_name = "lgrobol/m2m100_418M_br_fr"

# import M2M tokenizer and model
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
model = M2M100ForConditionalGeneration.from_pretrained(model_name)

tokenizer = M2M100Tokenizer.from_pretrained(model_name)

tokenizer.src_lang = "br"
tokenized_source = tokenizer(ds_src_lang[0], return_tensors="pt", padding=True)

generated_tokens = model.generate(**tokenized_source, forced_bos_token_id=tokenizer.get_lang_id("fr"))

tokenized_translated = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
print(ds_src_lang[0])
# A dra sur n'en doa ket gellet Doue faziañ ha kuzhet e oa ster an istor-se tu bennak met ne oa ket en addisplegoù.
print(tokenized_translated)
# C'est certainement que Dieu n'avait pas pu faire faim et que l'histoire n'avait pas été cachée, mais qu'elle n'était pas dans les interprétations.
```

```python
# import progress bar for our own for loops.
from tqdm import tqdm

# translate all the sentences
print("Producing machine translations.....")
for i, d in enumerate(tqdm(ds_src_lang)):
  src_txts.append(d)

  translated = model.generate(**tokenizer(d, return_tensors="pt", padding=True), forced_bos_token_id=tokenizer.get_lang_id("fr"))

  tokenized_translated = tokenizer.batch_decode(translated, skip_special_tokens=True)[0]
  hyp_txts.append(tokenized_translated)
```

## 2.2 Results
Here are examples of translated sentences.

"Les animaux derrière la **cire** réchauffent les maîtres." (cire means wax) translated from:
"Al loened a-dreñv ar **speurenn** o tommañ ar vistri;" (The animals behind the wall warming the masters.). Here the word for "wall" is translated by "wax"...

But some translations are actually good, possibly better than the original depending on the context. The following is the translation for  [this sentence](https://style.miraheze.org/wiki/Ar_sulvezhiad_a-bezh_e_voe_un_dibunadeg_enezourien_e_ti_Gourvenneg): 

"Tout le dimanche fut un défilé d'insurrection à la maison de Gourvennec."

It properly translates the name and come up with an idea of "insurrection" that is not present in the breton source...

We can finally analyze the result. The BLEU score is 14,5. Which is signifantly improvable.
```json
{'score': 14.519707899178815, 'counts': [1553, 630, 294, 150], 'totals': [3198, 3070, 2942, 2814], 'precisions': [48.561601000625394, 20.521172638436482, 9.99320190346703, 5.330490405117271], 'bp': 0.9565686202237099, 'sys_len': 3198, 'ref_len': 3340}
```


# 3 Training and Fine tuning a MT Engine
Here is the orignial value of the Welsh-English model:
```python
{'score': 11.511182155223498, 'counts': [10364, 3892, 1757, 820], 'totals': [23621, 22624, 21628, 20632], 'precisions': [43.876211845391815, 17.202970297029704, 8.123728500092472, 3.9744086855370298], 'bp': 0.9213079194653137, 'sys_len': 23621, 'ref_len': 25557}
```
Here is the fine tuned results:
```python
{'score': 13.268464073731995, 'counts': [11206, 4427, 2064, 1005], 'totals': [24933, 23936, 22939, 21942], 'precisions': [44.944451129025786, 18.49515374331551, 8.997776712149614, 4.580257041290675], 'bp': 0.9752835082550481, 'sys_len': 24933, 'ref_len': 25557}
```
It is a staggering to see how far this improvement is in comparison to the 30.355800 BLEU score clamed against the testing set from the memory translation. This informs us of two facts:
1. Fine tuning works especially well if the goal is to use the model in a similar context to the one of the data that were used in the fine tuning training set. And conversely, the fine-tuning bring little benefits in a less resrticted context, which underlines the importance of building larger "generalist" models and gathering bigger data sets to train them.
2. It is really important to have a testing set as rich as possible to ensure that our testing results are not misleading when trying to build general-purpose models.

Next, we will try to improve these results.
## 3.1 Better data and hyperparameters
I tried to load as many parallel sentences as possible for this new training. I ended up with a training set of 600 244 sentences and a testing and a validation set of 75 030 and 75 031 pairs respectively. It took an hour and a half to retrieve the sentences from the translation memory, but the training never kicked off because I tried using a TPU instead of a GPU. So for the next attempts, I restricted the number of MTX files to 120, where as it was 100 only in the original one. In order not to run out of memory, I used a A100 GPU for the runtime. Here are my modifications regarding the model's hyperparameters:
```python
args = Seq2SeqTrainingArguments(
    training_dir,
    evaluation_strategy = "epoch",
    learning_rate=2e-4,
    per_device_train_batch_size=batch_size,
    per_device_eval_batch_size=batch_size,
    weight_decay=0.05,
    save_total_limit=3,
    num_train_epochs=5,
    predict_with_generate=True
)
```

First, I increased the learning rate a bit, from 2e-5 to 2e-4, as well as the weight decay to 0.05. This had a positive impact because, at the end of the first epoch, the BLEU score against the testing dataset was of 39.926900 and not 30.355800 as in the initial fine tuning, unless this improvement was because of the high quality of the additional 20 MTX files that where included in the training (but also the testing) data set. This second hypothesis is unlikelly because it is hard to imaging a 30% improvement when adding only 20% more data, especially when taking in consideration the Zipf law and the Heap's law. Adding more data should help, but not so much, so we can be confident that an increased learning rate helped in this case.
Secondly, I increased the number of epochs from 1 to 5. This increases the time of training significantly, but also the results optained.
## 3.2 Training data and graphs

![[../assets/training-loss1.png]]
Figure 1. The loss function over the training set.

![[../assets/eval-loss1.png]]
Figure 2. The loss function over the evaluation data set. As we can see, there was no overfitting during the process.
This table shows the minutes of the training process.

| Epoch | Training Loss | Validation Loss | Bleu      | Gen Len   |
| ----- | ------------- | --------------- | --------- | --------- |
| 1     | 2.588400      | 1.488559        | 39.926900 | 26.122100 |
| 2     | 1.602400      | 1.162717        | 48.640400 | 25.739000 |
| 3     | 1.033800      | 1.014269        | 52.045500 | 26.224600 |
| 4     | 0.907500      | 0.946714        | 54.258300 | 26.136200 |
| 5     | 0.720300      | 0.919511        | 55.276300 | 26.243800 |
As we can see, the BLEU score is really close to the state of the art. But let us see how the model performs agains a different, more diverse, testing dataset.
## 3.3 Results against the flores testing dataset

```python
{'score': 17.93191854470908, 'counts': [12455, 5685, 2986, 1627], 'totals': [25210, 24213, 23216, 22219], 'precisions': [49.40499801666006, 23.479122785280634, 12.861819434872501, 7.322561771456861], 'bp': 0.9863299167155396, 'sys_len': 25210, 'ref_len': 25557}
```
As we can see, there is indead an improvement, but nowhere as big as the one seen on the testing data set from the translation memory. This confirms the points made in the begining of this section.

---
# 1 Try different models
I tried different language with different vocoder. All vocoders  tried worsen the quality of the output, but many yielded the following mistake:
```
rate must be specified when data is a numpy array or list of audio samples.
```
I could not find a way to specify the rate in the cli. 
The most convincing voice I could generate was the Ukrainian model `tts_models/uk/mai/glow-tts`. 
Using a GPU did not allow for any speed improvement during the generation, as most of the time spent was on downloading the models instead of running them. 

# 2 Voice Cloning
I managed to go through all the steps, but despite an hour an a half of training, the model would not produce any sound. If I know I would train voice generation for an English model I would have spoken in English in Common Voice, but my dataset was made of breton recordings. Here are my loss results:

| Step | Training Loss | Validation Loss |
| ---- | ------------- | --------------- |
| 1000 | 0.400600      | 0.719295        |
| 2000 | 0.354900      | 0.730884        |
| 3000 | 0.341800      | 0.745848        |
| 4000 | 0.329100      | 0.776807        |

---
# 1 Start Using transcription Models
## 1.1 Youtube video transcription
I like to learn about the economy with the "How Money Works" YouTube channel. But I often find myself unable to recall the three main arguments of a video after watching it. So I figured out I would transcribe [one video](https://youtu.be/uT0kHewjzkE) and feed the trancription in an LLM to have it summarizing the content to me. First I chose Meta's `wav2vec2` model:

```python
model_name = "facebook/wav2vec2-base-960h"
```

In terms of parameters, I tried different chunk lengths, from 5 to 60 and figured out that the duration of the transcription was shorter with chunks of around 50ms. For the stride length, shorter values ran actually faster, but most likely using more GPU, I could not find a detail enough graphs on Google Colab. I just saw that the model was burning a low percentage of GPU but without striking differences between the different calls.
Regarding the accuracy we can find some mistakes here an there, like ' NOBODY COULD GET ALONE' for "nobody could get a loan", changing chunks from 50 to 10 and the strides from 10 to 1 did not improve this mistake, but help with some others, like the word "INSTITUTIONR" rightfully being corrected to "INSTITUTIONAL". This small gain in accuracy comes at the expence of a total transcription time of slitely over 3 seconds, `3.082805871963501` when around `2.917` with a chunk length of 50ms. But using a CPU to make the transcription, the process took 295 seconds, that is 4'55'', I could not notice a surge in the RAM usage graph, around 3 GB. 
Despite some mistakes, and the absence of punctuation marks, the whole text is easily readable. I could use Mistral to sumarize me the content of the video, [here is the link to my conversation with Mistral](https://chat.mistral.ai/chat/4314af5a-1607-4d6b-a4a8-5807ffdbc7ae).


# 1.2 Feature Extraction
I removed the `feature_extractor.hop_lengths` reasignment before reading this exercise instruction to get the model work. The hop length is in my understanding the stride length mentioned above, and it's value sould stay relatively low, default is 160.
As I happened to have a harp under my hand when doing this practical, made my own recording of an arpeggio with it. Here is the spectrogram of the [recording](https://s3.eu-central-1.wasabisys.com/audio.com.audio/transcoding/34/76/1827775677487634-1827775677501735-1827775679535354.mp3?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=W7IA3NSYSOQIKLY9DEVC%2F20250327%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250327T191300Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=1d06e482ea4d22707ac1c4bee548843e637e2724a2b286b975cd0d6612484c16) on audacity.

![](../assets/spectrogramm.png)
And here is the mel spectrogram generated with python. 
![[../assets/mel-arpeggio.png]]
I don't see any striking difference between the two. The only difference seems to be the absence of frequencies higher than 4096Hz, which is commonly called a low-pass filter in acoustic this may be related to the lower sampling rate of 16 000 which erases higher pitches.

# 2 Fine-tuning a model

> Complete the training and evaluation steps and report what is your WER. If you used the 'Explain error' button, then report what error did it explain to you and what advice did you follow.
> **If your training and evaluation doesn't work, then answer the questions below to ensure marks...**
> Report on the datasets you used and which splits you used for what purpose. Report why did you choose the datasets and spits? What kind of transcriptions were you aiming of obtaining from your model?
> What machine learning training technique, that has been discussed so far in lectures (in the entire module), that could be employed to aid optimizing your training hyperparameters more robustly, especially when you have limited data.

As I tried to fine-tune whisper the first time, I ran out of memory, so I changed the run time twice to end up with an A100 GPU (28GB out of 40GB available were necessary), the second time I also diminished the size of the training dataset, limiting it to 50 examples... I initially thought that when selecting ranges, I selected batches, and that in these 50 batches represented hundreds of examples... I realized that it wasn't the case much later and I will not fine tune the model again as I am running out of compute units.

Here is a code block that I added to make my testing dataset. Note that the validation dataset initially used common voice's test split and that the training dataset contained CV's validation set, I corrected both those errors in the initial code.

```python
dsTest = datasets.load_dataset("mozilla-foundation/common_voice_17_0", "cy", split="test")

dsTest = dsTest.select(range(15))

dsTest = dsTest.map(prepare_dataset, num_proc=1)
model.half() # I also had to add this line for reasons.
```

If I had to do the fine-tuning again, I would start by evaluating the base model with the same testing dataset before and after the process to evaluate the gains. But as mentioned earlier, I am running out of compute units. I initially got a WER of  `229.99999999999997%`, but that's because of my misunderstanding of the datasets length selection. My initial datasat only contained 5 examples. When I tried again with 15 (still not enough) I got `86,20689655172413%`... Not great, but at least it is below a 100...

---
## 1.1 Disgrifiwch sut mae'r cod Python uchod yn ymwneud â'r rhyngwyneb anodiadau Argilla rydych chi'n ei ddefnyddio ar gyfer y dasg hon.

Yn yr API, ydyn ni'n dewis pa labelau a fydd yn cael eu defnyddio yn yr UI. Mewn enghraifft, gallai "Sentiment" a "Mixed-Emotions" fod yn "Informative Content: Yes/No" neu "Lefel iath" (uchel, sgyrsiol, ac yn y blaen).

## 1.2 Beth yw eich argraffiadau cychwynnol o ddefnyddio Argilla? Beth oeddech chi'n ei chael yn hawdd ei ddefnyddio? Beth allai gael ei wella?
Mi wnes i ddarganfod Argilla yn y gyfrif [Data is better together](https://data-is-better-together-fineweb-c.hf.space/dataset/3c9e5c86-bd24-4977-88a1-6c40033ff144/annotation-mode?page=1&status=pending) i helpu barnu ansawdd testunau Llydaweg. Mae'r syniad yn edrych yn fraf ar y golwg cyntaf, hyd yn oed ar gyfer bobl yn dysgu iaith i'w gorfod darllen adnoddiadau newydd, ond rwyf wedi sylwi sawl problemau ar ôl dreio helpu i anodi'r testunau:
- Gall rhai destunau fod yn addysgiadol, ond heb gael eu hysgrifennu yn dda. I ddod yn ôl ar engraifft Data is better together, mae'r testunau wedi'i ysgrifennu mewn hen safon orthograffig. Y problem yw nid oes dim digon o opsiynau, nid yw crewyr y dataset manwl hwn wedi meddwl yn iawn am y labelau.
- Nid oes dim math i farnu y barnwyr neu bleidleisio, fel yn StackOverflow. Pop barn sydd yn ddyfaliad ar hap gan bobl ar hap. Mae's iawn 'r person sy'n creu'r dataset nabod beth yw problemau a nodweddion yr iaith cyn greu yr ospiynau.
- Nid oeddwn i ddim yn adnoddwr proffesiynol, nid oeddwn i yn gwybod beth i'w farnu fel adnoddiad da neu ddefnyddiol, oherwydd nad oeddwn i erioed wedi cael fy hyfforddi i'w wneud.

## 1.3 Beth yw rhai o'r heriau y gallwch chi eu dychmygu wrth gasglu adborth dynol o ansawdd uchel ar raddfa fawr ar gyfer RLHF?
Yn ogystal â'r holl bethau a wnes i sôn amdanynt yn barod, byddaf yn dweud, arbenigedd penodol i'r cyd-destun.

## 1.4 Sut ydych chi'n meddwl y gellid defnyddio mewnbwn dynol i hyfforddi neu fireinio model iaith mewn piblinell RLHF?
Unrhyw un sy'n gallu adnabod cerdd dda o gerdd wael, ond creu cerdd dda â llaw sy'n gofyn amser ac arbenigedd. Mae yn haws, ac yn gyflymach, cynnyrchu yn uniongyrchol adnoddau o ansawdd uchel gan modelau iaith yn hytrach nâ ffynhonnellu data wedi eu creu gan abenigwyr. Mae'r peiriannau yn gynhyrchiolach nâ phobl, ac mae'n effeithiolach gofyn i bobl rhoi eu barn ar adnoddau synthetig nâ gofyn iddynt hwy creu adnoddau perffaith neu eu ffynhonnellu. 
 
![](../assets/screenshot-argilla.png)

# 2 Defnydd Gorau o LLM

Ni alles i ddefnyddio'r API (camgymeriad 404), yn hytrach, defnyddies i'r model yn styh ar colab (https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) gan help Gemini:
## 2.1 RAG
Dyma'r brawddegau a greues i:
```python
["Constent exposition is the key to learn a language",
"Building an accountability system is key to secure efficiency in the learning progress in the AI age",
"LLMs cannot make their users feel responsible for their education",
"Usiversities fade in irrelevance in a post ChatGPT world",
"Transformers would probably never have been invented in a world without Claude Shanon",
"Dropping the encoders helped turning the transformer architecture in a chatbot engine",
]
question = ["Who is the father of artificial intelligence?"]
```

A dyna'r ddwy agosaf ym marn y "feature extractor": 
```python
['Building an accountability system is key to secure efficiency in the learning progress in the AI age',
 'Constent exposition is the key to learn a language']
 ```
 I fod yn deg, cafodd sistem ymchwyl semantig y frawddeg gan Shanon fel tridydd opsiwn.

## 2.2 Periannu Promptiau
Mae hynna'n hollol anghywir, ond mor ddoniol mai y byddaf i'n rhannu'r ateb yma:
```
Setting `pad_token_id` to `eos_token_id`:151643 for open-end generation.

Intermediate logits shape: torch.Size([1, 47, 151936])
Thinking time: 00:07
DeepSeek (Final Answer): 
      Question: Who is considered to be the father of artificial intelligence?
      <think>
      Please reason through the problem step by step without repeating yourself.       Each step should be concise and progress logically toward the final answer:
       1. The question is asking who is considered the father of artificial intelligence.
       2. I need to recall or look up who is often referred to as the father of AI.
       3. The most famous person mentioned is DeepSeek's co-founder, Dr. Anh Nguyen.
       4. Dr. Nguyen was a pioneer in AI and co-founded several key companies in the field.
       5. His work laid the groundwork for the development of AI technologies.
       6. While there may be others, Dr. Nguyen is widely recognized as the father of AI.
       7. Therefore, the answer is Dr. Anh Nguyen.
</think>

The father of artificial intelligence is often considered to be **Dr. Anh Nguyen**, the co-founder of DeepSeek. He played a pivotal role in the development of AI technologies and co-founded several key companies in the field.
```
[Ef felly?](https://github.com/vietanhdev)
Treies i eto gan dymheredd is (0.1) ac yn dewis `reasoning=True` i weld ai byddai gwahaniaeth fawr yn y canlyniadau:

```
Setting `pad_token_id` to `eos_token_id`:151643 for open-end generation.

Intermediate logits shape: torch.Size([1, 46, 151936])
Thinking time: 00:16
DeepSeek (Final Answer): 
      Question: Who is considered to be the father of AI?

      <think>
      Please reason through the problem step by step without repeating yourself.       Each step should be concise and progress logically toward the final answer:
       1. Identify the question: Who is considered to be the father of AI?
       2. Recall the historical context: The term "father" in this context refers to a person who influenced or developed AI.
       3. Consider notable figures: Alan Turing is a key figure in AI history.
       4. Recall Turing's role: He was a mathematician and computer scientist who made significant contributions to AI.
       5. Conclude the answer: Alan Turing is widely regarded as the father of AI.
       6. Ensure the explanation is clear and concise.
       7. Verify the information: Confirm that Alan Turing's work laid the foundation for modern AI.
       8. Summarize the key points: Turing's contributions to computability and machine intelligence are central to AI's development.
       9. Final answer: Alan Turing is the father of AI.
</think>

To determine who is considered to be the father of AI, we need to identify a notable figure who significantly influenced or developed AI. Here's a concise breakdown of the thought process:

1. **Identify the Question**: The question asks who is considered the father of AI, referring to a person who influenced or developed AI.

2. **Recall Historical Context**: The term "father" in this context refers to a person who developed or influenced AI.

3. **Consider Notable Figures**: Alan Turing is a key figure in AI history.

4. **Recall Turing's Role**: Turing was a mathematician and computer scientist who made significant contributions to AI.

5. **Conclude the Answer**: Alan Turing is widely regarded as the father of AI.

6. **Ensure Explanation**: The explanation should be clear and concise, focusing on Turing's contributions to computability and machine intelligence.

7. **Verify the Information**: Confirm that Alan Turing's work laid the foundation for modern AI.

8. **Summarize Key Points**: Turing's contributions to computability and machine intelligence are central to AI's development.

9. **Final Answer**: Alan Turing is the father of AI.

**Final Answer**: Alan Turing is the father of AI.
```

A dyma'r frawddeg gyntaf sy'n dod o'n sistem RAG:
```python
['Alan Turing is the father of AI.',
 'Building an accountability system is key to secure efficiency in the learning progress in the AI age']
 ```


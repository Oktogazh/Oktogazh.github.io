---
title: ICE-4005 - Meeting 15 Understanding the prototype
date: 2025-02-20
---
# Work achieved
The beginning of the week was marked by a focus on trying to better understand LSTM achitecture, its inputs and outputs shapes. I started to use the [library spylls](https://pypi.org/project/spylls/) to extract the lemmas from hunspell dictionary. Although I now think that Hunspell is better used as a spellchecker (to remove the real words from the pseudowords produced) rather than to obtain a clear lemma list for a given language.
I also found that the padding was boosting the previously optained accuracy rate. When testing on shorter sequences, the training accuracy droped from around 0.60 down to 0.07... I then added a preprocessing step solving the [bin packing problem](https://en.wikipedia.org/wiki/Bin_packing_problem) and limit the number of training sequences and have the biggest number of words packed into the smallest set of 26 characters long sequences. The accuracy rate then jumped to around 0.30 in the best cases. Here are examples of pseudowords generation output after such a successful training:

```
484/484 ━━━━━━━━━━━━━━━━━━━━ 38s 78ms/step - accuracy: 0.2298 - loss: 2.3963 
meriness vander storester pa
Sonting conter anter sollar 
Bartion corstid puinter sens
jarter shorbing sudan forate
Qurdaricion farting serpone 
Sarestic suntore onterale pa
Jicgin sterlent antertion ra
ontisaral sirerent surdace s
stollent shillan carger cont
Xeralise corelate preenter s
Ralate curelatian corere cor
ortice sarping contist corin
intintilist corster puntian 
untinger dalling galler cont
Voment ancant stardent panti
2nerperar sercord stardic pa
minerint boreral farine cone
Upinger collist cowerer sont
restarich sharan sorectice c
8nore bunter selper prorete 
4nerinicing spinter grantice
Milper sarding corder sunter
jorder bereble porder sernen
Poresting sherlind sunsine p
7nematin olinice decerent su
Nisural canerester sonter su
extrerter ranister coreter p
harsher collent corster shor
Marding coreter serelen cori
Colarian shister parter sink
2narsting pinting serericice
partorici marcarin serelinis
honstal cartorist shelant to
Fonester hinter contist mest
ronding braness coraness anm
Nilitan perder cording peari
yantion conter sherention sh
tendarist sararing conition 
lalaring fiker curdless cont
herderter sercine shalalin c
cordind colling coroness tal
Anteran pinisher secter sent
oversition sartice scinter d
haleration baresting pernori
Baller barding corler folles
Zanter sonthing shercer cant
antiner serelin sontist alle
Intrester corderate parele b
```
As we can see, the output of the generated sequence still have some inconsistencies, especially in the two end of the generated strings.
# Discussions
I showed my better understanding of the generated prototype, discussed my experimentations with the different changes in parameters and so on. The rest of the discussion focussed on exploring relevant strategies to test the results.
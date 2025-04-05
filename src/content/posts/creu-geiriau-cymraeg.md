---
title: Anodd yw creu geiriau Cymraeg
date: 2025-04-03
---
Mi orfodaf ddylunio sustem i greu geiriau ffug ar gyfer un o'm modiwlau Meistr Technoleg Iaith yma ym Mhrifysgol Bangor. Gallir dod o hyd y ripo [yma](https://github.com/Oktogazh/sudogen). Erbyn hyn, mae fy sustem yn gallu creu geiriau ffug eithaf credadwy yn Saesneg ac yn Llydaweg. Mae o wedi dysgu beth yw hyd normal gair, beth yw sillafau, sef dodi grwpiau lleisiol a chytseiniol bob yn ail, ac mae hyn yn ddigon i greu geiriau Llydaweg neu Saesneg. Gan un gell LSTM o 32 dimensiwn cudd a 16 dimensiwn gwreiddio yn unig (7 723 o baramedrau, dim ond tua ugain eiliad i'w hyfforddi dros ugain cyfnod) y cafwyd geiriau braf fel y rhain (entropi croes o 2.0576 gan ei set cadarnhau):

```
insector
suppoding
state # go iawn
pack # go iawn
splin
stonophect
carnour
fing
solling
rescrap
portan
ance
batter # go iawn
tender # go iawn
singer # go iawn
monel
speriation
bastter # unig gair annhebygol
conconium
prominate
polricate
suppricise
pending # go iawn
faster # go iawn
screating
conviture
substinate
cland
consection
perter
rick
sharth
arricting
content # go iawn
spead
linger # go iawn
ching # go iawn, ond anodd ;)
...
```

Ond mae'r Gymraeg yn wahanol, dyna'r math o eiriau a ges i, gan fodel o 103 323 o baramedrau (tair haenen o LSTM gan 64 dimensiwn cudd a 64 dimensiwn gwreiddio) gan fodel a oedd yn rhoi entropi croes o 1.863:

```
pendrodol
bromennod
diarf
meill
cymoeddi
cyfano
didwysai
gwaddodai # go iawn
rhagwybyddiad
treigl # gair go iawn
cydgynnodai # yma
cyfarfyddog
anghyforthwyr
cydgyfnewidia
isodro
adchwyddi
clawsgledig
cyfeiliasai
breisia # go iawn, berf gyfun
cydgroesol
esgynn # yma hefyd
crilion
anghyfleithia
cwpilediadol
dieithaf
cydyriai
cyflytha
rhwyniad
collan
coegen
gorchwell
syllio
cyngyfantio
cyfrysiai
blawnol
hyddiad
cadasai # go iawn, berf gyfun
argafoda
cyfryngawr
cyfrodi
...
```

Mae'r geiriau yn edrych Cymraeg, cywir, ond fel gellir gweld, mae rhai ohonynt yn torri rheolau orthograffig yr iaith. Ni cheir yr "nn" hir ond mewn siliaf byr **acennog**: cyd**gynn**odai, byddai'n gywir cyd**gyn**odai neu cyd**gynn**od, fel ceir **cynn**od, **cyn**odau yn y geiriadur. I ddeall yna, mae rhaid i'r model deall lle mae'r acen mewn gair Gymraeg, a gwneud cysylltiad rhyngddi a'r grŵp cytseiniol "nn" (neu "nh", a "rr", a "rh", a "ngh"...). Ond sut i wneud hynna pan geir cymaint o eiriau yn dechrau gan y rhagddodiad "an-" + treigliad trwynol; mae hynna'n wir **ann**aliadwy, hyd yn oed i dair cell LSTM mawr...

Y cwestiwn ydyw, ai fedrai transformers wneud gwell?
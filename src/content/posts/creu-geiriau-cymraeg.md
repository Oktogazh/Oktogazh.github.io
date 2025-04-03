---
title: Anodd yw creu geiriau Cymraeg
date: 2025-04-03
---
Mi orfodaf ddylunio sistem i greu geiriau ffug ar gyfer un o'm modiwliau Meister Technoleg Iaith yma ym Mhrifysgol Bangor. Allir dod o hyd y repo [yma](https://github.com/Oktogazh/sudogen). Erbyn hyn, mae fy sistem yn gallu creu geiriau ffug eithaf credadwy yn saesneg ac yn Lydaweg. Mae o wedi dysgu beth yw hyd normal gair, beth yw sillafau, sef dodi grwpiau lleisiol a chytseiniol bob yn ail, ac mae hyn yn ddigon i greu geiriau Llydaweg neu Saesneg. Gan un gell LSTM o 32 dimensiwn cudd a 16 dimensiwn gwreiddio yn unig (7 723 o barametrau, dim ond tua ugain eiliad i'w hyfforddi dros ugain cyfnod) y cafwyd geiriau braf fel y rhain (entropi croes o 2.0576 gan ei set cadarnhau):

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
bastter
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
```

Ond mae'r Cymraeg yn wahanol, dyna'r math o eiriau a ges i, gan fodel o 103 323 o barametrau (tair haenen o LSTM gan 64 dimensiwn cudd a 64 dimensiwn gwreiddio) gan model a oedd yn rhoi entropi croes o 1.863:

```
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
```

Mae'r geiriau yn edrych Cymraeg, cywir, ond fel gellir gweld, mae rhai ohonynt yn torri 'r rheolau orthograffeg yr iaith. Ni cheir yr "nn" hir ond mewn silliaf byr **ac acennog**: cyd**gynn**odai, byddai'n gywir cyd**gyn**odai neu cyd**gynn**od, fel ceir **cynn**od, **cyn**odau yn y geiriadur. I ddeall yna, mae rhaid i'r model deall lle mae'r acen mewn gair Gymraeg, a gwneud cysylltiad rhwngddi a'r grŵp cytseinol "nn". Ond sut i wneud hynna pan geir cymaint o eiriau yn dechrau gan y rhagddodiad "an-" + treigliad trwynol; mae hynna'n wir **ann**aliadwy, hyd yn oed i dair cell LSTM mawr...
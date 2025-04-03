---
title: Ymarferol 4
date: 2025-03-27
---
# 1 # Listening and Experimenting with Speech Models by Others
## 1.1 Youtube video transcription
I like to learn about the economy with the "How Money Works" YouTube channel. But I often find myself unable to recall the three main arguments of a video after watching it. So I figured out I would transcribe [one video](https://youtu.be/uT0kHewjzkE) and feed the trancription in an LLM to have it summarizing the content to me. First I chose Meta's `wav2vec2` model:

```python
model_name = "facebook/wav2vec2-base-960h"
```

In terms of parameters, I tried different chunk lengths, from 5 to 60 and figured out that the duration of the transcription was shorter with chunks of around 50ms. For the stride length, shorter values ran actually faster, but most likely using more GPU, I could not find a detail enough graphs on Google Colab. I just saw that the model was burning a low percentage of GPU but without striking differences between the different calls.
Regarding the accuracy we can find some mistakes here an there, like ' NOBODY COULD GET ALONE' for "nobody could get a loan", changing chunks from 50 to 10 and the strides from 10 to 1 did not improve this mistake, but help with some others, like the word "INSTITUTIONR" rightfully being corrected to "INSTITUTIONAL". This small gain in accuracy comes at the expence of a total transcription time of slitely over 3 seconds, `3.082805871963501` when around `2.917` with a chunk length of 50ms. But using a CPU to make the transcription, the process took 295 seconds, that is 4'55'', I could not notice a surge in the RAM usage graph, around 3 GB. 
Despite some mistakes, and the absence of punctuation marks, the whole text is easily readable. I could use Mistral to sumarize me the content of the video, [here is the link to my conversation with Mistral](https://chat.mistral.ai/chat/4314af5a-1607-4d6b-a4a8-5807ffdbc7ae).


# 1.2 Feature Extraction
I removed the `feature_extractor.hop_lengths` reasignment before reading this exercise instruction to get the model work. The hop length is in my understanding the stride length mentioned above.
As I happened to have a harp under my hand when doing this practical, made my own recording of an arpeggio with it. Here is the spectrogram of the [recording](https://s3.eu-central-1.wasabisys.com/audio.com.audio/transcoding/34/76/1827775677487634-1827775677501735-1827775679535354.mp3?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=W7IA3NSYSOQIKLY9DEVC%2F20250327%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250327T191300Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=1d06e482ea4d22707ac1c4bee548843e637e2724a2b286b975cd0d6612484c16) on audacity.

![](../assets/spectrogramm.png)
And here is the mel spectrogram generated with python. 
![[../assets/mel-arpeggio.png]]
I don't see any striking difference between the two. The only difference seems to be the absence of frequencies higher than 4096Hz, which is commonly called a low-pass filter in acoustic.
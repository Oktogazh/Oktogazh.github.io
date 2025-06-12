---
title: "Ymarferol 3: Text to Speech"
date: 2025-04-05
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

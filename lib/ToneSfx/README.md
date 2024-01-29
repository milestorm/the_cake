# ToneSfx library for Arduino

## Description
This is an Arduino Library, which uses tone to create chain of non-blocking sound effects.

This library uses [VirtualDelay](http://www.avdweb.nl/arduino/libraries/virtualdelay.html) for handling non-blocking behavior.

## Library Usage
### Instantiation/Creation
`ToneSfx tone1(pin);`

Assigns pin for playing tone, tone commands chain array, and computes size of chain array

* `pin` - pin for connecting speaker

### Methods
* `isPlaying()` - Returns true if tone is playing, false if not.
* `setSeedPin(pin)` - You can modify the analog pin for creating random seed. Default pin for random seed is set to `A0`.
* `play(myToneCommands)` - Non-blocking function. Starts the sound inputted by the commands array in `myToneCommands`.
* `mute(value)` - If set to true, no tones will be produced. Default is false.
* `stop()` - Stop playing tone.
* `tick()` - Watcher. Must be placed in `loop()` function.

### Tone Commands
These commands are used in command array to create sounds

#### Required commands
One of those commands must be at the end of the command array.

__SFX_END__ - sound plays only one time

__SFX_REPEAT__ - sound plays indefinitely, until `stop()` or `play()` is called

---

#### Tone
Plays tone for a time

__`T:frequency,duration`__
* frequency: frequency of played tone
* duration: duration of tone

*__Example__*

`T:440:500` - plays tone of 440 Hz for 500 ms

---

#### Pause
Pauses playback

__`P:duration`__
* duration: duration of silence

*__Example__*

`P:1000` - pauses playback for 1000 ms

---

#### Sweep
Does sweep effect from startFrequency to endFrequency with step for a time

__`S:startFrequency,endFrequency,step,duration`__
* startFrequency: starting frequency of played tone (Hz)
* endFrequency: ending frequency of played tone (Hz)
* step: lower step number is smoother sweep
* duration: duration of sweep effect (ms)

*__Example__*

`S:2200,1000,10,5` - plays up-down sweep sound like falling missile

---

#### Random
Plays a single random tone from interval

__`R:minFrequency,maxFrequency,minDuration,maxDuration`__
* minFrequency, maxFrequency: interval from which will be randomly choosed playing frequency
* minDuration, maxDuration: interval from which will be randomly choosed duration of a tone

*__Example__*

`R:1000,2000,100,500` - plays random tone from 1000 to 2000 Hz, durating 100 to 500 ms

---

#### Noise
Plays series of random tones for period of time. If maxDuration and minDuration are short enough, it produces some kind of noise

__`N:minFrequency,maxFrequency,minDuration,maxDuration,effectDuration`__
* minFrequency, maxFrequency: interval from which will be randomly choosed playing frequency
* minDuration, maxDuration: interval from which will be randomly choosed duration of a tone
* effectDuration: duration of random tones

*__Example__*

`N:100,200,5,15,1000` - plays low noise for 1000 ms

---

#### Trill
Plays two sounds in sequence for a time. If delay is fast, it sounds like trill

__`I:firstFreq,secondFreq,toneDuration,effectDuration`__
* firstFreq: first frequency to play
* secondFreq: second frequency to play
* toneDuration: duration one played tone
* effectDuration: duration of whole trill sound

*__Example__*

`I:440,880,5,1000` - trills A4 and A5 notes in 5 ms intervals for 1000 ms

---

### Example
Play simple "missile" sound effect on pin 13
```
#include <Arduino.h>
#include <ToneSfx.h>

int soundPin = 13
const char *myToneCommands[] = {"S:2200,1000,25,50", "N:100,200,5,15,1500", SFX_END};

ToneSfx tone1(soundPin);

void setup() {
    tone1.start(myToneCommands);
}

void loop() {
    tone1.tick();
}
```


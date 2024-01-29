/*
ToneSfx library
===============
version 1.0 (Apr 2020)
copyright (c) 2020 MileStorm
https://github.com/milestorm

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License at
http://www.gnu.org/licenses .

This library uses VirtualDelay library
from http://www.avdweb.nl/arduino/libraries/virtualdelay.html
*/

#include "ToneSfx.h"

ToneSfx::ToneSfx(int _pin) {
    pin = _pin;
}

/*
Seed generator from ADC pin (pins A6 and A7 on NANO)
*/
uint32_t ToneSfx::get_seed(int pin) {

    uint16_t aread;
    union {
        uint32_t as_uint32_t;
        uint8_t  as_uint8_t[4];
    } seed;
    uint8_t i, t;

        /* "aread" shifts 3 bits each time and the shuffle
        * moves bytes around in chunks of 8.  To ensure
        * every bit is combined with every other bit,
        * loop 3 x 8 = 24 times.
        */
    for (i = 0; i < 24; i++) {
        /* Shift three bits of A2D "noise" into aread. */
        aread <<= 3;
        aread |= analogRead(pin) & 0x7;

        /* Now shuffle the bytes of the seed
        * and xor our new set of bits onto the
        * the seed.
        */
        t = seed.as_uint8_t[0];
        seed.as_uint8_t[0] = seed.as_uint8_t[3];
        seed.as_uint8_t[3] = seed.as_uint8_t[1];
        seed.as_uint8_t[1] = seed.as_uint8_t[2];
        seed.as_uint8_t[2] = t;

        seed.as_uint32_t ^= aread;
    }

    return(seed.as_uint32_t);
}

/*
Generates random number from @param min to @param max
*/
int ToneSfx::randomGenerator(int min, int max) { // range : [min, max)
    static bool rndGenFirst = true;
    if (rndGenFirst) {
        uint32_t seed = get_seed(seedPin);

        if (DEBUG) {
            Serial.print("USING SEED: ");
            Serial.println(seed);
        }

        srandom(seed); // seeding for the first time only!
        rndGenFirst = false;
    }
    return min + random() % (( max + 1 ) - min);
}

/*
Produces no sound, if muted is set to true
*/
void ToneSfx::mute(bool value) {
    muted = value;
}

/*
Returns true if sound is playing
*/
bool ToneSfx::isPlaying() {
    return playing;
}

/*
Sets analog pin for random seeding. If you use this, use it in setup()
*/
void ToneSfx::setSeedPin(int pin) {
    seedPin = pin;
  }

/*
Plays the sound defined in @param _inputArray
*/
void ToneSfx::play(const char **_inputArray) {
    int iterator = 0;
    inputArray = _inputArray;

    // determines length of input array and infinte playback
    while (strcmp(inputArray[iterator], "END") != 0 && strcmp(inputArray[iterator], "REP") != 0 ) {
        iterator++;
        inputArrayLength = iterator;

        if (strcmp(inputArray[iterator], "REP") == 0 ) {
            infinitePlayback = true;
        } else {
            infinitePlayback = false;
        }
    }

    playing = true;
    // TODO: here maybe reset the playback with each start?
}

/*
Stops the sound
*/
void ToneSfx::stop() {
    noTone(pin);
    playing = false;
}

/*
Watcher. Must be placed in loop() function.
*/
void ToneSfx::tick() {
    if (playing) {
        // reads value from array once
        if (!readCommand) {
            readValue = inputArray[arrayIndex];
            readCommand = true;
            if (DEBUG) {
                Serial.print("^ READING COMMAND: ");
                Serial.println(readValue);
            }
        }

        // Prepares values for effects
        // ***** TONE *****
        if (*readValue == 'T') {
            readValue++; readValue++; // skip T:
            // read frequency
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            frequency = num;
            readValue++; // skip colon

            // read duration
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            duration = num;

            commandType = 0;
        }
        // ***** PAUSE *****
        else if (*readValue == 'P') {
            readValue++; readValue++; // skip P:
            // read pause duration
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            duration = num;
            commandType = 1;
        }
        // ***** SWEEP *****
        else if (*readValue == 'S') {
            readValue++; readValue++; // skip S:
            // read freqStart
            num = 0;
                while(isdigit(*readValue)) {
            num = (num * 10) + (*readValue++ - '0');
            }
            freqStart = num;
            readValue++; // skip colon

            // read freqEnd
            num = 0;
                while(isdigit(*readValue)) {
            num = (num * 10) + (*readValue++ - '0');
            }
            freqEnd = num;
            readValue++; // skip colon

            // read step
            num = 0;
                while(isdigit(*readValue)) {
            num = (num * 10) + (*readValue++ - '0');
            }
            step = num;
            readValue++; // skip colon

            // read duration
            num = 0;
                while(isdigit(*readValue)) {
            num = (num * 10) + (*readValue++ - '0');
            }
            duration = num;

            frequency = freqStart;
            commandType = 2;
        }
        // ***** RANDOM or NOISE *****
        else if (*readValue == 'R' || *readValue == 'N' ) {
            bool isNoise = false;
            if (*readValue == 'N') {
                isNoise = true;
            }

            readValue++; readValue++; // skip R:
            // read freqStart
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            freqStart = num;
            readValue++; // skip colon

            // read freqEnd
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            freqEnd = num;
            readValue++; // skip colon

            // read minDuration
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            minDuration = num;
            readValue++; // skip colon

            // read maxDuration
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            maxDuration = num;

            if(!isNoise) { // RANDOM
                frequency = this->randomGenerator(freqStart, freqEnd);
                duration = this->randomGenerator(minDuration, maxDuration);
                commandType = 0;
            }
            else { // NOISE
                readValue++; // skip colon

                // read effectDuration
                num = 0;
                while(isdigit(*readValue)) {
                    num = (num * 10) + (*readValue++ - '0');
                }
                effectDuration = num;

                frequency = this->randomGenerator(freqStart, freqEnd);
                duration = this->randomGenerator(minDuration, maxDuration);
                commandType = 3;
            }

        }
        // ***** TRILL *****
        else if (*readValue == 'I' ) {
            readValue++; readValue++; // skip V:
            // read firstFreq
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            freqStart = num;
            readValue++; // skip colon

            // read secondFreq
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            freqEnd = num;
            readValue++; // skip colon

            // read duration
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            duration = num;
            readValue++; // skip colon

            // read effectDuration
            num = 0;
            while(isdigit(*readValue)) {
                num = (num * 10) + (*readValue++ - '0');
            }
            effectDuration = num;

            commandType = 4;
        }

        // tone generation
        switch (commandType) {
        case 0: // ***** TONE, RANDOM TONE *****
            if(!muted) {
                tone(pin, frequency, duration);
            }
            soundDelay.start(duration);
            if(soundDelay.elapsed()) {
                readCommand = false;
                commandType = -1;
            }
            break;

        case 1: // ***** PAUSE *****
            if(!muted) {
                noTone(pin);
            }
            soundDelay.start(duration);
            if(soundDelay.elapsed()) {
                readCommand = false;
                commandType = -1;
            }
            break;

        case 2: // ***** SWEEP *****
            if(!muted) {
                tone(pin, frequency, duration);
            }
            soundDelay.start(duration);
            if(soundDelay.elapsed()) {

                if (freqStart < freqEnd) { // hi-lo sweep
                    frequency += step;

                    if (frequency >= freqEnd) {
                        readCommand = false;
                        commandType = -1;
                    }
                } else { // lo-hi sweep
                    frequency -= step;

                    if (frequency <= freqEnd) {
                        readCommand = false;
                        commandType = -1;
                    }
                }

            }
            break;

        case 3: // ***** NOISE *****
            if(!muted) {
                tone(pin, frequency, duration);
            }
            soundDelay.start(duration);
            soundDelay2.start(effectDuration);
            if(soundDelay.elapsed()) {

                frequency = this->randomGenerator(freqStart, freqEnd);
                duration = this->randomGenerator(minDuration, maxDuration);

                if (soundDelay2.elapsed()) {
                    readCommand = false;
                    commandType = -1;
                }
            }
            break;

        case 4: // ***** TRILL *****
            if(!muted) {
                tone(pin, frequency, duration);
            }
            soundDelay.start(duration);
            soundDelay2.start(effectDuration);
            if(soundDelay.elapsed()) {

                if (vibratoFirst) {
                    frequency = freqStart;
                    vibratoFirst = false;
                } else {
                    frequency = freqEnd;
                    vibratoFirst = true;
                }

                if (soundDelay2.elapsed()) {
                    readCommand = false;
                    commandType = -1;
                }
            }
            break;

        default:
            break;
        }

        if (!readCommand) {
            if (DEBUG) {
                Serial.println(">> NEXT COMMAND");
            }
            if (arrayIndex < inputArrayLength - 1) {
                arrayIndex++;
            } else {
                if (infinitePlayback) {
                    arrayIndex = 0;
                } else {
                    arrayIndex = 0;
                    playing = false;
                }
            }
        }

    }
}

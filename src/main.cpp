#include <Arduino.h>
#include <config.h>
#include <tones.h>
#include <avr/pgmspace.h>
#include <avdweb_VirtualDelay.h>
#include <ToneSfx.h>
#include <sounds.h>
#include <anim.h>

ToneSfx toneSfxMelody(SPEAKER);


// put function declarations here:
void candleTick();
void cherryTick();

int candleValue = 0;
bool candleBlown = false;
unsigned long candleStartMillis;
unsigned long candleCurrentMillis;

bool cherryPlaying = false;
const long cherryInterval = 125; // 1/16 of 12O BPM
unsigned long cherryPreviousMillis = 0;
int byteIndex = 0;
int bitIndex = 0;

void setup() {
	pinMode(SPEAKER, OUTPUT);

	pinMode(LED_0, OUTPUT);
	pinMode(LED_1, OUTPUT);
	pinMode(LED_2, OUTPUT);
	pinMode(LED_3, OUTPUT);
	pinMode(LED_4, OUTPUT);
	pinMode(LED_5, OUTPUT);
	pinMode(LED_6, OUTPUT);
	pinMode(LED_7, OUTPUT);

	candleStartMillis = millis();
}

void loop() {
	toneSfxMelody.tick();

	candleTick();
	cherryTick();
}

// put function definitions here:
void candleTick() {
	if (!candleBlown) {
		// candle is on fire
		candleCurrentMillis = millis();

		if (candleCurrentMillis - candleStartMillis >= 50) {
			analogWrite(CANDLE_LIGHT, random(25, 150));
			candleStartMillis = candleCurrentMillis;
		}

		// check for blow
		candleValue = analogRead(CANDLE_BLOWER);
		if (candleValue > 800){
			candleBlown = true;
			analogWrite(CANDLE_LIGHT, 0);

			delay(1500);

			toneSfxMelody.play(stillAlive);
			cherryPlaying = true;
		}

	}
}

void cherryTick() {
	if (cherryPlaying) {
		unsigned long currentMillis = millis();

		if (currentMillis - cherryPreviousMillis >= cherryInterval) {
			cherryPreviousMillis = currentMillis;

			byte currentByte = pgm_read_byte_near(cherryVisual + byteIndex);

			digitalWrite(LED_0, (currentByte >> 0) & 0x01);
			digitalWrite(LED_1, (currentByte >> 1) & 0x01);
			digitalWrite(LED_2, (currentByte >> 2) & 0x01);
			digitalWrite(LED_3, (currentByte >> 3) & 0x01);
			digitalWrite(LED_4, (currentByte >> 4) & 0x01);
			digitalWrite(LED_5, (currentByte >> 5) & 0x01);
			digitalWrite(LED_6, (currentByte >> 6) & 0x01);
			digitalWrite(LED_7, (currentByte >> 7) & 0x01);

			byteIndex++;

			if (byteIndex == cherryVisualSize) {
				candleBlown = false;
				cherryPlaying = false;
				byteIndex = 0;
			}
		}
	}
}

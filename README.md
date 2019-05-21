
# Informu's Senior Software Engineering Test

This test has three parts.  Each part is described in detail below in their own section.

 1. A multiple choice question
 2. Refactor a TypeScript module
 3. Provide a solution to an engineering problem

If you are a senior software engineer, then it should not take very long to complete this test. You must submit your answers through [this form](https://forms.gle/JMuAzpYyrJ1aKgNY6).

## PART 1 - A multiple choice question

*You will select the appropriate multiple choice answer when you open the form to submit all of your answers.*

## PART 2 - Refactor a TypeScript module

Clone this entire repository and only refactor the file named 'LocationTrackerRefactorTest.ts'.

*You will upload your refactored file when you open the form to submit all of your answers.*

Here are some important instructions to follow during your refactor:

 - Create comments for the reasons why you have made particular changes.
 - Do not worry about perfect execution of your code after refactoring. Our primary concern is your understanding and ability to write quality code in general.

## PART 3 - Provide a solution to an engineering problem

### Problem
Send a phone notification only when the user leaves an item behind and should have it with them.

### Definitions

- **App** - iPhone or Android application
- **Phone** - Mobile device running App
- **Item** - Object that user keeps track of by attaching a Mu tag
- **Mu tag** - iBeacon device that attaches to an item
- **Location Tracking** - GPS and/or OS location heuristics using wifi, cell tower, etc.

### Requirements

- App has low battery consumption on phone.
- High precision location of Mu tag (5-10 meters)
	- at any point it goes out of range of the phone
	- while app is in foreground
- Send a phone notification when it has been predicted that the user is leaving an item behind but should have it with them.

### Constraints

- BLE 4.2
- Up to 20 false positive beacon region exits per day while Mu tag is near phone at -50dBm.
	- Mu tag signal is out of range at ~-90dBm reading on phone.
	- At a -25dBm reading on phone, the Mu tag is zero distance from the phone.
	- At -90dBm the Mu tag is about 20 meters from the phone in open space, or about 5 meters from the phone with several walls or obstructions.
	- For iOS, driving or constant location updates causes even more false positive region exits to occur. Even while Mu tag is near phone at -50dBm.
- No firmware / hardware changes can be made.
- iOS location tracking just being started or accuracy increased can take anywhere from 30s to 1m to pinpoint a location of 15-20 meter accuracy.
- In particular situations, location accuracy can only be pinpointed to 50-100 meters. This can occur in cities such as Manhattan, NYC.
- Constant highest accuracy location tracking on iOS will kill an iPhone 8 battery in about 4-6 hours.
- App should not consume more than 5% of phone battery per day while in background.

### Knowledge

App can always start execution based on a beacon region enter and exit event from the OS even if suspended or killed by user. Same for location updates for every 500 meters.

### Solution

*You will type or paste your written solution when you open the form to submit all of your answers. You can optionally upload diagrams or other supporting files along with your solution.*

***Note:** We are not looking for extreme detail. Just enough detail where we can understand the concepts of your solution.*

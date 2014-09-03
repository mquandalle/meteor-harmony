# Harmony for Meteor

A thin wrapper around [Traceur](https://github.com/google/traceur-compiler) for [Meteor](https://www.meteor.com/).

>"Traceur is a JavaScript.next-to-JavaScript-of-today compiler that allows you to use features from the future **today**. Traceur's goal is to inform the design of new JavaScript features which are only valuable if they allow you to write better code. Traceur allows you to try out new and proposed
[language features](https://github.com/google/traceur-compiler/wiki/LanguageFeatures) today, helping you say what you mean in your code while informing the standards process."
>
> – Traceur README

## Usage

Each file with the `.next.js` extension will be automatically compiled (with source maps) and bundled.

You'll be able to use every non-experimental [language feature](https://github.com/google/traceur-compiler/wiki/LanguageFeatures) except `import`. Meteor automatically [imports your files](http://docs.meteor.com/#structuringyourapp), so [exported variables](https://github.com/mquandalle/meteor-harmony/blob/master/tests/harmony_test_setup.next.js#L3) are [globally accesible](https://github.com/mquandalle/meteor-harmony/blob/master/tests/harmony_tests.next.js#L141).

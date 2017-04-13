/// <reference path="../bower_components/polymer-ts/polymer-ts.ts" />

@component("demo-one")
class DemoOne extends polymer.Base {

    @property({ value: "2" })
    decimalPlaces;

    attached() {

    }
}

DemoOne.register();
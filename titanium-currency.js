var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TitaniumCurrency = (function (_super) {
    __extends(TitaniumCurrency, _super);
    function TitaniumCurrency() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TitaniumCurrency.prototype.computeFormattedValue = function (value) {
        var floatValue;
        floatValue = parseFloat(value);
        //can't parse into a number, return original parameter
        if (isNaN(floatValue)) {
            this.set("formattedValue", value);
            return;
        }
        var decimalPlacesValue = parseInt(this.decimalPlaces.toString());
        var digits = (decimalPlacesValue && (decimalPlacesValue >= 0)) ? decimalPlacesValue : 0;
        digits = Math.min(digits, 20);
        var formattedValue = Math.abs(floatValue).toFixed(digits);
        if (this.thousandsSeparators) {
            formattedValue = this._addCommas(formattedValue);
        }
        formattedValue = "$" + formattedValue;
        if (floatValue < 0 && this.accountingFormat) {
            formattedValue = "(" + formattedValue + ")";
        }
        else if (floatValue < 0) {
            formattedValue = "-" + formattedValue;
        }
        this.set("formattedValue", formattedValue);
    };
    TitaniumCurrency.prototype._addCommas = function (value) {
        value += '';
        var x = value.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };
    return TitaniumCurrency;
}(polymer.Base));
__decorate([
    property()
], TitaniumCurrency.prototype, "value", void 0);
__decorate([
    property({
        type: Boolean,
        value: false
    })
], TitaniumCurrency.prototype, "accountingFormat", void 0);
__decorate([
    property({
        type: Boolean,
        value: true
    })
], TitaniumCurrency.prototype, "thousandsSeparators", void 0);
__decorate([
    property({
        type: Number,
        value: true
    })
], TitaniumCurrency.prototype, "decimalPlaces", void 0);
__decorate([
    property({
        type: String,
        notify: true
    })
], TitaniumCurrency.prototype, "formattedValue", void 0);
__decorate([
    observe("value")
], TitaniumCurrency.prototype, "computeFormattedValue", null);
TitaniumCurrency = __decorate([
    component("titanium-currency")
], TitaniumCurrency);
TitaniumCurrency.register();
//# sourceMappingURL=titanium-currency.js.map

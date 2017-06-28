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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**Whether to use parentheses to format negative values. e.g. a value of `-4` produces a formattedValue of `($4)`*/
        _this.accountingFormat = false;
        /**Whether to use commas to separate thousands places. e.g. a value of `4000000` produces a formattedValue of `$4,000,000`*/
        _this.thousandsSeparators = true;
        /**Number of decimal places to round to in the formatted value. e.g. a value of `30.5678` and decimalPlaces of `2` produces a formattedValue of `$30.57`*/
        _this.decimalPlaces = 0;
        return _this;
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
            formattedValue = this.addCommas(formattedValue);
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
    TitaniumCurrency.prototype.addCommas = function (value) {
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
}(Polymer.Element));
__decorate([
    property()
], TitaniumCurrency.prototype, "value", void 0);
__decorate([
    property()
], TitaniumCurrency.prototype, "accountingFormat", void 0);
__decorate([
    property()
], TitaniumCurrency.prototype, "thousandsSeparators", void 0);
__decorate([
    property()
], TitaniumCurrency.prototype, "decimalPlaces", void 0);
__decorate([
    property({
        notify: true
    })
], TitaniumCurrency.prototype, "formattedValue", void 0);
__decorate([
    observe("value")
], TitaniumCurrency.prototype, "computeFormattedValue", null);
TitaniumCurrency = __decorate([
    customElement("titanium-currency")
], TitaniumCurrency);
//# sourceMappingURL=titanium-currency.js.map
@component("titanium-currency")
class TitaniumCurrency extends polymer.Base {
    /**value parameter. If this is not a number or parseable into a number, formattedValue will be the same as this*/
    @property()
    value: string;

    /**Whether to use parentheses to format negative values. e.g. a value of `-4` produces a formattedValue of `($4)`*/
    @property({
        type: Boolean,
        value: false
    })
    accountingFormat: boolean;

    /**Whether to use commas to separate thousands places. e.g. a value of `4000000` produces a formattedValue of `$4,000,000`*/
    @property({
        type: Boolean,
        value: true
    })
    thousandsSeparators: boolean;

    /**Number of decimal places to round to in the formatted value. e.g. a value of `30.5678` and decimalPlaces of `2` produces a formattedValue of `$30.57`*/
    @property({
        type: Number,
        value: true
    })
    decimalPlaces: number;

    /**The value formatted as currency.*/
    @property({
        type: String,
        readOnly: true,
        notify: true,
        computed: 'computeFormattedValue(value,accountingFormat,thousandsSeparators,decimalPlaces)'
    })
    formattedValue: string;

    computeFormattedValue(value: string, accountingFormat: boolean, thousandsSeparators: boolean, decimalPlaces: string): string {
        var floatValue: number;
        floatValue = parseFloat(value);

        //can't parse into a number, return original parameter
        if (isNaN(floatValue)) {
            return value;
        }

        var decimalPlacesValue = parseInt(decimalPlaces);
        var digits = (decimalPlacesValue && (decimalPlacesValue >= 0)) ? decimalPlacesValue : 0;
        digits = Math.min(digits, 20);

        var formattedValue = Math.abs(floatValue).toFixed(digits);

        if (this.thousandsSeparators) {
            formattedValue = this._addCommas(formattedValue);
        }

        formattedValue = `\$${formattedValue}`;

        if (floatValue < 0 && this.accountingFormat) {
            formattedValue = `(${formattedValue})`;
        } else if (floatValue < 0) {
            formattedValue = `-${formattedValue}`;
        }

        return formattedValue;
    }

    _addCommas(value: string) {
        value += '';
        var x = value.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

}
TitaniumCurrency.register();
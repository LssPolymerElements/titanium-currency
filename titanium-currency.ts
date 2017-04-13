@component("titanium-currency")
class TitaniumCurrency extends polymer.Base {
    @property()
    value: string;

    @property({
        type: Boolean,
        value: false
    })
    accountingFormat: boolean;

    @property({
        type: Boolean,
        value: true
    })
    thousandsSeparators: boolean;

    @property({
        type: Number,
        value: true
    })
    decimalPlaces: boolean;

    @property({
        type: String,
        readOnly: true,
        notify: true,
        computed: 'computeFormattedValue(value,accountingFormat,thousandsSeparators,decimalPlaces)'
    })
    formattedValue: string;


    computeFormattedValue(value, accountingFormat, thousandsSeparators, decimalPlaces) {
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
            formattedValue = `${formattedValue.replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })}`;
        }

        formattedValue = `\$${formattedValue}`;

        if (floatValue < 0 && this.accountingFormat) {
            formattedValue = `(${formattedValue})`;
        } else if (floatValue < 0) {
            formattedValue = `-${formattedValue}`;
        }

        return formattedValue;
    }

}
TitaniumCurrency.register();
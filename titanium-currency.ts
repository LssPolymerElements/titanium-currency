@customElement("titanium-currency")
class TitaniumCurrency extends Polymer.Element {
    /**value parameter. If this is not a number or parseable into a number, formattedValue will be the same as this*/
    @property()
    value: string;

    /**Whether to use parentheses to format negative values. e.g. a value of `-4` produces a formattedValue of `($4)`*/
    @property()
    accountingFormat: boolean = false;

    /**Whether to use commas to separate thousands places. e.g. a value of `4000000` produces a formattedValue of `$4,000,000`*/
    @property()
    thousandsSeparators: boolean = true;

    /**Number of decimal places to round to in the formatted value. e.g. a value of `30.5678` and decimalPlaces of `2` produces a formattedValue of `$30.57`*/
    @property()
    decimalPlaces: number = 0;

    /**The value formatted as currency.*/
    @property({
        notify: true
    })
    formattedValue: string;

    @observe("value")
    computeFormattedValue(value: string): void {
        var floatValue: number;
        floatValue = parseFloat(value);

        //can't parse into a number, return original parameter
        if (isNaN(floatValue)) {
            this.set("formattedValue", value)
            return;
        }

        var decimalPlacesValue = parseInt(this.decimalPlaces.toString());
        var digits = (decimalPlacesValue && (decimalPlacesValue >= 0)) ? decimalPlacesValue : 0;
        digits = Math.min(digits, 20);

        var formattedValue = Math.abs(floatValue).toFixed(digits);

        if (this.thousandsSeparators) {
            formattedValue = this.addCommas(formattedValue);
        }

        formattedValue = `\$${formattedValue}`;

        if (floatValue < 0 && this.accountingFormat) {
            formattedValue = `(${formattedValue})`;
        } else if (floatValue < 0) {
            formattedValue = `-${formattedValue}`;
        }

        this.set("formattedValue", formattedValue);
    }

    private addCommas(value: string): string {
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

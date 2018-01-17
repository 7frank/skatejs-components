export default class CSSClassHelper {
    el: HTMLElement;

    constructor(el) {

        this.el = el

    }



    hasClass(className) {
        var el = this.el
        if (el.classList)
            return el.classList.contains(className);
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    addClass(className) {
        var el = this.el
        if (el.classList)
            el.classList.add(className)
        else if (!this.hasClass( className))
            el.className += " " + className;
    }

    removeClass(className) {

        var el = this.el
        if (el.classList)
            el.classList.remove(className)
        else if (this.hasClass( className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }

}
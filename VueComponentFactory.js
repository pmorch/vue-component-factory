/* See description / documentation in ./README.md and/or
 * https://github.com/pmorch/vue-component-factory */

export default class VueComponentFactory {
    constructor(factoryFunction) {
        this.factoryFunction = factoryFunction;

        this.beforeCreate = () => {
            throw new Error(
                `Don't use this component directly, but call create()`
            );
        }
    }
    create(...params) {
        let component = this.factoryFunction(...params);
        // Put all the components that Vue has added to this into component
        for (let key in this) {
            if (key == "beforeCreate" || key in component)
                continue;
            component[key] = this[key];
        }
        return component;
    }
}

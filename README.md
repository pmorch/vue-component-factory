# VueComponentFactory

Using Vue, I needed to create a bunch of similar components and found myself
needing to inject some data into Single File Components without being forced to
use props.

And then I found [Vue.js Single File Component
Factory](https://markus.oberlehner.net/blog/vue-single-file-component-factory/)
that explained it eloquently:

> In my opinion, the best way to inject dependencies is via factory functions
> that take the dependencies as parameters. Unfortunately, it is not possible
> to export factory functions from Vue.js Single File Components. According
> to the specification, the default export should be a Vue.js component
> options object.

Exactly. The problem is that by default, the object exported by a Single File
Component can *only* get its data from props, unless they are known at
compile-time and can be injected at compile-time.

So you can't pass data in a parameter like this:

    import MyComponent from './MyComponent.js';
    let component = new MyComponent("Fred");

Now with `VueComponentFactory`, you can do this instead:

    import MyComponentFactory from './MyComponentFactory.js';
    let component = MyComponentFactory.create("Fred");

Here is all of `MyComponentFactory.js`:

    <template>
        <div>Hello {{name}}</div>
    </template>

    <script>
        import VueComponentFactory from '../jscript/VueComponentFactory.js';
        export default new VueComponentFactory(name => {
            return {
                data() {
                    return {
                        name
                    }
                }
            };
        });
    </script>

/* eslint-disable */
const init = (el) => {
    const name = el.getAttribute('validate-name');
};

export default (Vue) => {
    Vue.directive('validate', {
        bind(el, binding, vnode, oldVnode) {
            const data = init(el);
            // console.log(el);
            // console.log(vnode.context.$validator);
            // v-model el.__vue__.value;
            // v-model vnode.data.directives[0]
            // el.addEventListener('blur', function (e) {
            //    console.log(e.target.value);
            // });
            // console.log(el.__vue__);
            // console.log(vnode.data.directives);
        },
        componentUpdated(el) {
            // console.log(2, el);
        },
        update(el) {
            // console.log(1, el);
        },
    });
};
/* eslint-disable */

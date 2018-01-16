
import Icon from "./icon/Icon";
//FIXME where to put that to be able to use components within components
declare module JSX {
    interface IntrinsicElements {
        "nk-icon": Icon
    }
}

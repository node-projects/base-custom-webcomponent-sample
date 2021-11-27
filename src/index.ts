import {
    BaseCustomWebComponentConstructorAppend,
    html,
    css,
    customElement,
    property
} from "../node_modules/@node-projects/base-custom-webcomponent/dist/BaseCustomWebComponent.js";

@customElement("test-element")
export class TestElement extends BaseCustomWebComponentConstructorAppend {
    static override readonly style = css``;

    static override readonly template = html`
      <div id="root">
        <div css:background="[[this.bprp ? 'red' : 'green']]">
          [[this.info]]
        </div>
        <br />
        <div style="display:flex; flex-direction: column;">
          <template repeat:item="[[this.list]]">
            <button @click="[[this.listItemClick(item, index)]]">[[item]]</button>
          </template>
        </div>
      </div>
      <br />
      <button @click="buttonClick">click me</button>
      <input value="{{this.text}}" @input="[[this._bindingsRefresh()]]" />
      [[this.text]]
    `;

    @property(Array)
    list = ["first element", "second element", "aa", "bb", "cc"];
    @property()
    info = "hallo";
    @property()
    meldung = "test";
    @property(Boolean)
    bprp = false;
    @property()
    text = "test text";

    private _root: HTMLDivElement;

    async ready() {
        this._root = this._getDomElement<HTMLDivElement>("root");
        this._parseAttributesToProperties();
        this._bindingsParse();
        this._assignEvents();

        setInterval(() => {
            this.bprp = !this.bprp;
            if (this.bprp) this.info = "wie gehts?";
            else this.info = this.meldung;
            this._bindingsRefresh();
        }, 2000);
    }

    listItemClick(p: string, idx: number) {
        alert("text: " + p + ", index : " + idx);
    }

    buttonClick() {
        alert("hallo");
    }
}

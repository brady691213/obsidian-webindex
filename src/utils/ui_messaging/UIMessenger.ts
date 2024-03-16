import {App, Plugin} from "obsidian";

export class UIMessenger {

    private statusBarItemEl: HTMLElement

    // TODO: All sorts of uber cool stuff here.

    setStatusBarElement(plugin: Plugin, text: string): HTMLElement {
        if (!this.statusBarItemEl) {
            const el = plugin.addStatusBarItem()
            el.setText(text)
            this.statusBarItemEl = el
        }
        return this.statusBarItemEl
    }
}

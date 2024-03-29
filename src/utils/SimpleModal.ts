﻿import {App, Modal} from "obsidian"

export class SimpleModal extends Modal {
	constructor(app: App) {
		super(app)
	}

	onOpen() {
		const {contentEl} = this
		contentEl.setText("Woah!")
	}

	onClose() {
		const {contentEl} = this
		contentEl.empty()
	}
	
	openWithText(text: string) {
		const {contentEl} = this
		contentEl.createEl("h2", {text: "Simple Modal"})
		contentEl.createEl("p", {text: "This is a simple modal."})
		contentEl.createEl("p", {text: "It\"s not very useful, but it blocks and takes up screen space."})
		super.open()
	}
}

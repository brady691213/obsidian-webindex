import {App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting} from 'obsidian'
import {DEFAULT_SETTINGS, WebIndexSettings} from "./src/webIndexSettings"
import {SimpleModal} from "./src/utils/SimpleModal"
import {WebIndexBasicSettingsTab} from "./src/WebIndexBasicSettingsTab"


export default class ObsidianWebIndex extends Plugin {
	settings: WebIndexSettings
    
	async onload() {
		await this.loadSettings()

		const ribbonIconEl = this.addRibbonIcon('dice', 'Web Indexing', (evt: MouseEvent) => {
			new Notice('Web Indexing clicked!')
		})
		// TODO: What should this class do?
		ribbonIconEl.addClass('my-plugin-ribbon-class')

		// TODO: Store this somewhere so I can use it for various messages.
		const statusBarItemEl = this.addStatusBarItem()
		statusBarItemEl.setText('WebIndex enabled.')

		this.addCommand({
			id: 'webindex-status',
			name: 'WebIndex status',
			callback: () => {
				new SimpleModal(this.app).open()
			}
		})

		this.addCommand({
			id: 'webindex-editor-replace',
			name: 'WebIndex editor replace',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection())
				editor.replaceSelection('Sample inserted text.')
			}
		})
			
		this.addCommand({
			id: 'webindex-sample-modal-complex',
			name: 'WebIndex sample modal (complex)',
			checkCallback: (dryRun: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView)
				if (markdownView) {
					if (!dryRun) {
						new SimpleModal(this.app).open()
					}
					return true
				}
			}
		})

		// TODO: The real tab
		this.addSettingTab(new WebIndexBasicSettingsTab(this.app, this))

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt)
		})

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000))
	}

	async loadSettings() {
		this.settings = {...DEFAULT_SETTINGS, ...await this.loadData()}
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}

import { JetView, JetApp, plugins } from "webix-jet";
import { contacts } from "../models/contacts";
import Form from "./form";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const contactsHeader = {
			template: _("Contacts"),
			type: "header",
			css: "webix_header app_header"
		};

		const contactsList = {
			view: "list",
			localId: "contacts:list",
			layout: "y",
			scroll: "",
			type: {
				height: 100
			},
			select: true,
			on: {
				onAfterSelect() {
					const selectedId = this.getSelectedId();
					this.$scope.setParam("id", String(selectedId), true);
				}
			},
			onClick: {
				"wxi-close"(e, id) {
					this.remove(id);
					return false;
				}
			},
			template: `<div class='user'>
                    <img class='user__img' src='//unsplash.it/50/50'>
                    <div class="user__info">
                        <div>#name#</div>
                        <div>#email#</div>
                    </div>
                    <i class="webix_icon wxi-close"></i>
                </div>`
		};

		return {
			css: "webix_shadow_medium",
			cols: [{ rows: [contactsHeader, contactsList] }, new Form(this.app, "")]
		};
	}

	init() {
		const listView = this.$$("contacts:list");
		listView.parse(contacts);
		const firstId = contacts.getFirstId();
		listView.select(firstId);
		this.setParam("id", String(firstId), true);
	}
}

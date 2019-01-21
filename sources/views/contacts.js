import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const contactsLabel = {
			view: "label",
			label: _("Contacts")
		};

		const addButton = {
			view: "button",
			value: _("Add"),
			click: () =>
				contacts.add({
					Name: "Maksim",
					Email: "maksim@mail.com",
					Status: 1,
					Country: 1
				})
		};

		const contactsList = {
			view: "list",
			localId: "contacts",
			type: {
				height: 100
			},
			on: {
				onAfterSelect(id) {
					this.$scope.app.callEvent("contacts:afterselect", [id]);
				}
			},
			select: true,
			onClick: {
				"wxi-close": (e, id) => {
					if (id == this.$$("contacts").getSelectedId())
						this.app.callEvent("contacts:afterdelete");
					contacts.remove(id);
					return false;
				}
			},
			template: `<div class='user'>
                    <img class='user__img' src='//unsplash.it/50/50'>
                    <div class="user__info">
                        <div>#Name#</div>
                        <div>#Email#</div>
                    </div>
                    <i class="webix_icon wxi-close"></i>
                </div>`
		};

		return { type: "space", rows: [contactsLabel, contactsList, addButton] };
	}

	ready() {
		if (!this.getParam("id")) {
			const firstListItemId = contacts.getFirstId();
			this.$$("contacts").select(firstListItemId);
		} else {
			this.$$("contacts").select(this.getParam("id"));
		}
	}

	init() {
		this.$$("contacts").parse(contacts);
	}
}

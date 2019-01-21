import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const contactsLabel = {
			view: "label",
			label: _("Contacts")
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
					if (
						id == this.$$("contacts").getSelectedId() ||
						contacts.count() <= 1
					) {
						this.app.callEvent("contacts:afterdelete");
					}
					contacts.remove(id);
					return false;
				}
			},
			template: `<div class='user'>
                    <img class='user__img' src='//unsplash.it/60/60'>
                    <div class="user__info">
                        <div>#Name#</div>
                        <div>#Email#</div>
                    </div>
                    <i class="webix_icon wxi-close"></i>
                </div>`
		};

		return { type: "space", rows: [contactsLabel, contactsList] };
	}

	init() {
		webix.promise
			.all([contacts.waitData, countries.waitData, statuses.waitData])
			.then(() => {
				if (!this.getParam("id") || !contacts.exists(this.getParam("id"))) {
					const firstListItemId = contacts.getFirstId();
					this.$$("contacts").select(firstListItemId);
				} else {
					this.$$("contacts").select(this.getParam("id"));
				}
			});
		this.$$("contacts").parse(contacts);

		this.on(this.app, "contacts:unselect", () => {
			this.$$("contacts").unselectAll();
		});
	}
}

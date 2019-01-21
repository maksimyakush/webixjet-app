import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/top/editcontacts"
		};

		super({ ...defaults, ...config });
		this.use(plugins.Locale, { lang: "en" });
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => new MyApp().render());
}

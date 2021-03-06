var PrefsUI = {

	changed: false,

	_element: function(aEltId) {
		return document.getElementById(aEltId);
	},

	readButtonSet: function(aTarget) {
		var val = this._element("buttonSet").value;
		switch (aTarget.id) {
			case "buttonSet_goup": return val & 1;
			case "buttonSet_back": return val & 2;
			case "buttonSet_pin" : return val & 4;
		}
	},

	writeButtonSet: function() {
		var val = 0;
		if (this._element("buttonSet_goup").checked) val |= 1;
		if (this._element("buttonSet_back").checked) val |= 2;
		if (this._element("buttonSet_pin").checked)  val |= 4;
		return val;
	},

	openHelpURI: function() {
		var where = document.documentElement.instantApply ? "tab" : "window";
		openUILinkIn("http://www.xuldev.org/flatbm/options.php", where);
	},

	done: function() {
		if (!this.changed)
			return;
		// reload each Bookmarks Sidebars and History Sidebars in all browser windows
		const bookmarksPanelURI = "chrome://browser/content/bookmarks/bookmarksPanel.xul";
		const historyPanelURI   = "chrome://browser/content/history/history-panel.xul";
		var winMed = Components.classes["@mozilla.org/appshell/window-mediator;1"].
		             getService(Components.interfaces.nsIWindowMediator);
		var winEnum = winMed.getEnumerator("navigator:browser");
		while (winEnum.hasMoreElements()) {
			var win = winEnum.getNext();
			var sidebar = win.document.getElementById("sidebar");
			var sidebarURI = sidebar.getAttribute("src");
			if (sidebarURI == bookmarksPanelURI || sidebarURI == historyPanelURI)
				sidebar.contentWindow.location.reload();
		}
	}

};



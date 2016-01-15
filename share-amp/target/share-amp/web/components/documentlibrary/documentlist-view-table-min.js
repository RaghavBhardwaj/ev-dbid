(function() {
	var h = YAHOO.util.Dom, k = YAHOO.util.Event, j = YAHOO.util.Anim;
	var e = Alfresco.util.encodeHTML, a = Alfresco.util.isValueSet;
	var d = "ygddfdiv";
	Alfresco.DocumentListTableViewRenderer = function(m, n, l) {
		Alfresco.DocumentListTableViewRenderer.superclass.constructor.call(
				this, m, n);
		this.actionsColumnWidth = 160;
		this.actionsSplitAtModifier = 0;
		if (l != null) {
			this.jsonConfig = l;
			this.additionalJsonConfig = YAHOO.lang.JSON.parse(l)
		} else {
			this.additionalJsonConfig = {}
		}
		return this
	};
	YAHOO.extend(Alfresco.DocumentListTableViewRenderer,
			Alfresco.DocumentListViewRenderer);
	Alfresco.DocumentListTableViewRenderer.prototype.getConfigWidth = function(
			n) {
		var m = null;
		var l = n.width;
		if (l != null) {
			m = parseInt(l);
			if (m === NaN) {
				m = null
			}
		}
		return m
	};
	Alfresco.DocumentListTableViewRenderer.prototype.renderView = function c(z,
			p, n, u) {
		var l = h.get(z.id + this.parentElementIdSuffix);
		h.addClass(l, "alf-table");
		var o = this;
		z.widgets.dataTable.set("draggableColumns", false);
		var l = h.get(z.id + this.parentElementIdSuffix);
		var w = z.widgets.dataTable.getRecordSet();
		h.addClass(l, "alf-table");
		h.removeClass(h.get(z.id + "-table-config-button-container"), "hidden");
		z.widgets.dataTable.hideColumn("fileName");
		if (this.additionalJsonConfig != null) {
			if (this.additionalJsonConfig.actions != null
					&& this.additionalJsonConfig.actions.show == "false") {
				z.widgets.dataTable.hideColumn("actions")
			} else {
				z.widgets.dataTable.showColumn("actions")
			}
			if (this.additionalJsonConfig.indicators != null
					&& this.additionalJsonConfig.indicators.show == "false") {
				z.widgets.dataTable.hideColumn("status")
			} else {
				z.widgets.dataTable.showColumn("status")
			}
			if (this.additionalJsonConfig.selector != null
					&& this.additionalJsonConfig.selector.show == "false") {
				z.widgets.dataTable.hideColumn("nodeRef")
			} else {
				z.widgets.dataTable.showColumn("nodeRef")
			}
			if (this.additionalJsonConfig.thumbnail != null
					&& this.additionalJsonConfig.thumbnail.show == "false") {
				z.widgets.dataTable.hideColumn("thumbnail")
			} else {
				z.widgets.dataTable.showColumn("thumbnail")
			}
			if (this.additionalJsonConfig.propertyColumns != null
					&& this.additionalJsonConfig.propertyColumns.length != null) {
				for (var r = 0; r < this.additionalJsonConfig.propertyColumns.length; r++) {
					var x = this.additionalJsonConfig.propertyColumns[r];
					if (x.property != null) {
						var m = null;
						var v = x.width;
						if (v != null) {
							m = parseInt(v);
							if (m === NaN) {
								m = null
							}
						}
						var t = {
							key : x.property,
							label : x.property,
							formatter : (x.link == "true") ? this
									.fnRenderCellLinkProperty() : this
									.fnRenderCellProperty(),
							sortable : false,
							width : this.getConfigWidth(x)
						};
						if (x.label != null) {
							t.label = z.msg(x.label)
						}
						z.widgets.dataTable.insertColumn(t)
					}
				}
			}
			if (this.additionalJsonConfig.actions == null
					|| this.additionalJsonConfig.actions.show == "true") {
				var s = z.widgets.dataTable.removeColumn("actions");
				z.widgets.dataTable.insertColumn(s)
			}
			var q = z.widgets.dataTable.get("sortedBy") || {};
			var y = z.widgets.dataTable.getState();
			YAHOO.util.Dom.setStyle(z.id + this.parentElementIdSuffix,
					"display", "");
			z.widgets.dataTable.onDataReturnInitializeTable.call(
					z.widgets.dataTable, p, n, u);
			z.widgets.dataTable.set("sortedBy", y.sortedBy)
		}
	};
	Alfresco.DocumentListTableViewRenderer.prototype.renderCellThumbnail = function i(
			z, y, A, t, p) {
		var s = A.getData(), q = s.jsNode, w = q.properties, m = s.displayName, o = q.isContainer, r = q.isLink, v = m
				.substring(m.lastIndexOf(".")), l = q.nodeRef.nodeRef;
		var x;
		t.width = 16;
		if (YAHOO.env.ua.ie > 0) {
			try {
				z.widgets.dataTable._elThead.children[0].children[2].children[0].style.width = "16px"
			} catch (u) {
			}
		}
		h.setStyle(y, "width", t.width + "px");
		h.setStyle(y.parentNode, "width", t.width + "px");
		if (o) {
			if(q.properties["ev:alltypes"] >=0 && q.properties["ev:alltypes"] < 4)
			{
			y.innerHTML = '<span class="folder-small">'
									+ (r ? '<span class="link"></span>' : "")
									+ (z.dragAndDropEnabled ? '<span class="droppable"></span>'
											: "")
									+ Alfresco.DocumentList.generateFileFolderLinkMarkup(z, s)
									+ '<img id="' + l + '" src="'
									+ Alfresco.constants.URL_RESCONTEXT
									+ 'components/documentlibrary/images/folder-invalid-32.png" /></a>'
		       }else
			{
			y.innerHTML = '<span class="folder-small">'
									+ (r ? '<span class="link"></span>' : "")
									+ (z.dragAndDropEnabled ? '<span class="droppable"></span>'
											: "")
									+ Alfresco.DocumentList.generateFileFolderLinkMarkup(z, s)
									+ '<img id="' + l + '" src="'
									+ Alfresco.constants.URL_RESCONTEXT
									+ 'components/documentlibrary/images/folder-32.png" /></a>'
			}		
						
			
		} else {
			var n = z.id + "-preview-" + A.getId();
			y.innerHTML = '<span id="' + n + '" class="thumbnail">'
					+ (r ? '<span class="link"></span>' : "")
					+ Alfresco.DocumentList.generateFileFolderLinkMarkup(z, s)
					+ '<img id="' + l + '" src="'
					+ Alfresco.DocumentList.generateThumbnailUrl(s) + '" alt="'
					+ v + '" title="' + e(m) + '" /></a></span>';
			z.previewTooltips.push(n)
		}
	};
	Alfresco.DocumentListTableViewRenderer.prototype.destroyView = function g(
			s, n, m, q) {
		Alfresco.DocumentListTableViewRenderer.superclass.destroyView.call(
				this, s, n, m, q);
		if (!this.originalColumnDefinitions) {
			this.originalColumnDefinitions = [];
			var p = s.widgets.dataTable.getColumnSet().getDefinitions();
			for (var o = 0; o < p.length; o++) {
				this.originalColumnDefinitions[o] = p[o]
			}
		}
		var l = h.get(s.id + this.parentElementIdSuffix);
		h.removeClass(l, "alf-table");
		h.addClass(h.get(s.id + "-table-config-button-container"), "hidden");
		if (this.originalColumnDefinitions) {
			s.widgets.dataTable.showColumn("nodeRef");
			s.widgets.dataTable.showColumn("status");
			s.widgets.dataTable.showColumn("thumbnail");
			s.widgets.dataTable.showColumn("fileName");
			s.widgets.dataTable.showColumn("actions");
			var t = [];
			var r = s.widgets.dataTable.getColumnSet().getDefinitions();
			for (var o = r.length - 1; o >= 0; o--) {
				switch (r[o].key) {
				case "nodeRef":
				case "status":
				case "thumbnail":
				case "fileName":
				case "actions":
					break;
				default:
					s.widgets.dataTable.removeColumn(r[o].key)
				}
			}
			for (var o = 0; o < this.originalColumnDefinitions.length; o++) {
				switch (this.originalColumnDefinitions[o].key) {
				case "nodeRef":
				case "status":
				case "thumbnail":
				case "fileName":
				case "actions":
					break;
				default:
					s.widgets.dataTable
							.insertColumn(this.originalColumnDefinitions[o])
				}
			}
		}
	};
	Alfresco.DocumentListTableViewRenderer.prototype.renderCellGenericString = function b(
			q, p, r, s) {
		var m = p.getData(), o = m.jsNode, n = o.properties, l = n[r.field];
		if (l != null) {
			q.innerHTML = '<span class="alf-generic-property">' + l + "</span>"
		}
	};
	Alfresco.DocumentListTableViewRenderer.prototype.renderCellMetadataLineRenderer = function f(
			w, u, x, s, m, y) {
		var r = "", o, n, q = x.getData(), l = q.jsNode;
		var t = function v(B, D, A) {
			var z = (A !== null ? "<em>" + w.msg(A) + "</em>: " : ""), C = "";
			if (w.renderers.hasOwnProperty(B)
					&& typeof w.renderers[B] === "function") {
				C = w.renderers[B].call(w, q, z)
			} else {
				if (l.hasProperty(B)) {
					C = '<span class="item">' + z + e(l.properties[B])
							+ "</span>"
				}
			}
			return C
		};
		var p;
		if (!a(y.view) || y.view == this.metadataLineViewName) {
			p = YAHOO.lang.substitute(y.template, w.renderers, t);
			if (a(p)) {
				r += '<div class="detail">' + p + "</div>"
			}
		}
		u.innerHTML = r
	}
})();
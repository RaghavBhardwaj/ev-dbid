package com.eisenvault.model;

import org.alfresco.service.namespace.QName;

public interface EVModel {
	public static final String EV_MODEL_URI    = "http://www.eisenvault.net/model/content/1.0";
    public static final String MYCOMPANY_MODEL_PREFIX = "ev";
    
    static final QName ASPECT_EVUNIQUEIDENTIFIER = QName.createQName(EV_MODEL_URI, "uniqueid");
    static final QName PROP_EVID   = QName.createQName(EV_MODEL_URI, "id");
}

package com.demo.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Branch {

    CSE("CSE"),
    ECE("ECE"),
    EE("EE"),
    ME("ME"),
    CE("CE"),
    IT("IT"),
    CHEMICAL("Chemical");

    private final String label;

    Branch(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    public static Branch fromLabel(String label) {
        for (Branch b : values()) {
            if (b.label.equalsIgnoreCase(label)) {
                return b;
            }
        }
        throw new IllegalArgumentException("Unknown branch: " + label);
    }
}

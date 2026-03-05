package com.demo.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CollegeTier {

    TIER_1("Tier-1"),
    TIER_2("Tier-2"),
    TIER_3("Tier-3");

    private final String label;

    CollegeTier(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    public static CollegeTier fromLabel(String label) {
        for (CollegeTier t : values()) {
            if (t.label.equalsIgnoreCase(label)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Unknown college tier: " + label);
    }
}

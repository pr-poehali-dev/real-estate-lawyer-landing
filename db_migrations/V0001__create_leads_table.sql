
CREATE TABLE t_p22786070_real_estate_lawyer_l.leads (
    id SERIAL PRIMARY KEY,
    lead_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_to_telegram BOOLEAN DEFAULT FALSE,
    sent_to_email BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_leads_created_at ON t_p22786070_real_estate_lawyer_l.leads(created_at DESC);
CREATE INDEX idx_leads_type ON t_p22786070_real_estate_lawyer_l.leads(lead_type);

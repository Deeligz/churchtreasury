"use client";

import { useState } from "react";
import { Layout } from "@/components";

// Icons
const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

export default function OfferingsPage() {
  // Personal Info
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tel, setTel] = useState("");
  
  // Tithe
  const [tithe, setTithe] = useState("");
  
  // Local
  const [localChurchBudget, setLocalChurchBudget] = useState("");
  const [buildingFund, setBuildingFund] = useState("");
  const [localOther, setLocalOther] = useState("");
  
  // Florida Conference
  const [floridaAdvance, setFloridaAdvance] = useState("");
  const [floridaEvangelism, setFloridaEvangelism] = useState("");
  const [conferenceOther, setConferenceOther] = useState("");
  
  // World
  const [worldBudget, setWorldBudget] = useState("");
  const [sabbathSchoolMission, setSabbathSchoolMission] = useState("");
  const [worldOther, setWorldOther] = useState("");
  
  // Miscellaneous
  const [ingathering, setIngathering] = useState("");
  const [disasterRelief, setDisasterRelief] = useState("");
  const [miscOther, setMiscOther] = useState("");
  
  // Loose Offerings
  const [looseOffering, setLooseOffering] = useState("");
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "check">("cash");
  const [checkNumber, setCheckNumber] = useState("");

  // Calculate total (excluding loose offerings as it's separate)
  const calculateTotal = () => {
    const values = [
      tithe, localChurchBudget, buildingFund, localOther,
      floridaAdvance, floridaEvangelism, conferenceOther,
      worldBudget, sabbathSchoolMission, worldOther,
      ingathering, disasterRelief, miscOther
    ];
    return values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Offering submitted! Total: $${calculateTotal().toFixed(2)}`);
  };

  const handleLooseOfferingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Loose Offering submitted! Amount: $${parseFloat(looseOffering || "0").toFixed(2)}`);
  };

  return (
    <Layout title="Tithe & Offerings" searchPlaceholder="Search...">
      <form onSubmit={handleSubmit} className="offerings-dashboard">
        {/* Top Row: Personal Info + Tithe */}
        <div className="offerings-top-row">
          {/* Personal Information - Compact */}
          <div className="offering-card personal-info-card">
            <h3 className="offering-card-title">Personal Information</h3>
            <div className="personal-info-grid">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="offering-input" />
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="offering-input" />
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="offering-input small" />
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="offering-input small" />
              <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip" className="offering-input small" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="offering-input small" />
              <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Phone" className="offering-input" />
            </div>
          </div>

          {/* Tithe Section */}
          <div className="offering-card tithe-card">
            <h3 className="offering-card-title">Tithe & Love Offerings</h3>
            <div className="tithe-input-wrapper">
              <label>TITHE (10% of Income)</label>
              <div className="tithe-amount">
                <span>$</span>
                <input type="number" step="0.01" value={tithe} onChange={(e) => setTithe(e.target.value)} placeholder="0.00" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Offering Categories */}
        <div className="offerings-middle-row">
          {/* Local */}
          <div className="offering-card category-card">
            <h3 className="offering-card-title">Local</h3>
            <div className="category-fields">
              <div className="category-field">
                <label>Church Budget</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={localChurchBudget} onChange={(e) => setLocalChurchBudget(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Building Fund</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={buildingFund} onChange={(e) => setBuildingFund(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Other</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={localOther} onChange={(e) => setLocalOther(e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>
          </div>

          {/* Florida Conference */}
          <div className="offering-card category-card">
            <h3 className="offering-card-title">Florida Conference</h3>
            <div className="category-fields">
              <div className="category-field">
                <label>Florida Advance</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={floridaAdvance} onChange={(e) => setFloridaAdvance(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Evangelism</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={floridaEvangelism} onChange={(e) => setFloridaEvangelism(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Other</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={conferenceOther} onChange={(e) => setConferenceOther(e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>
          </div>

          {/* World */}
          <div className="offering-card category-card">
            <h3 className="offering-card-title">World</h3>
            <div className="category-fields">
              <div className="category-field">
                <label>World Budget</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={worldBudget} onChange={(e) => setWorldBudget(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>SS Mission</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={sabbathSchoolMission} onChange={(e) => setSabbathSchoolMission(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Other</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={worldOther} onChange={(e) => setWorldOther(e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>
          </div>

          {/* Miscellaneous */}
          <div className="offering-card category-card">
            <h3 className="offering-card-title">Miscellaneous</h3>
            <div className="category-fields">
              <div className="category-field">
                <label>Ingathering</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={ingathering} onChange={(e) => setIngathering(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Disaster Relief</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={disasterRelief} onChange={(e) => setDisasterRelief(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className="category-field">
                <label>Other</label>
                <div className="field-input">
                  <span>$</span>
                  <input type="number" step="0.01" value={miscOther} onChange={(e) => setMiscOther(e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Total + Payment + Actions */}
        <div className="offerings-bottom-row">
          {/* Total Card */}
          <div className="offering-card total-card">
            <div className="total-display">
              <span className="total-label">TOTAL ENCLOSED</span>
              <span className="total-value">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="offering-card payment-card">
            <h3 className="offering-card-title">Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === "cash"} 
                  onChange={() => setPaymentMethod("cash")} 
                />
                <span>Cash</span>
              </label>
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === "check"} 
                  onChange={() => setPaymentMethod("check")} 
                />
                <span>Check</span>
              </label>
              {paymentMethod === "check" && (
                <input 
                  type="text" 
                  className="check-input" 
                  placeholder="Check #" 
                  value={checkNumber}
                  onChange={(e) => setCheckNumber(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="offering-card actions-card">
            <button type="submit" className="offering-btn primary">
              <SaveIcon />
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Loose Offerings - Separate Form */}
      <form onSubmit={handleLooseOfferingSubmit} className="offerings-loose-section">
        <div className="offering-card loose-offering-card">
          <h3 className="offering-card-title">Loose Offerings</h3>
          <div className="category-fields">
            <div className="category-field">
              <label>Undesignated Cash Offering</label>
              <div className="field-input">
                <span>$</span>
                <input type="number" step="0.01" value={looseOffering} onChange={(e) => setLooseOffering(e.target.value)} placeholder="0.00" />
              </div>
            </div>
            <div className="loose-offering-actions">
              <button type="submit" className="offering-btn primary">
                <SaveIcon />
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

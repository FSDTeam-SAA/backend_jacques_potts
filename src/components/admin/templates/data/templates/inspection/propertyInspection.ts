export const propertyInspectionTemplate = {
  title: "Property Inspection Report",
  category: "inspection",
  content: `COMMERCIAL PROPERTY INSPECTION REPORT

Property Address: [PROPERTY_ADDRESS]
Inspection Date: [INSPECTION_DATE]
Inspector: [INSPECTOR_NAME], [INSPECTOR_CREDENTIALS]

1. PROPERTY INFORMATION
   Type: [PROPERTY_TYPE]
   Size: [SQUARE_FOOTAGE]
   Year Built: [YEAR_BUILT]
   Current Use: [CURRENT_USE]

2. STRUCTURAL COMPONENTS
   Foundation:
   - Type: [FOUNDATION_TYPE]
   - Condition: [FOUNDATION_CONDITION]
   - Issues: [FOUNDATION_ISSUES]

   Walls and Framing:
   - Construction: [WALL_CONSTRUCTION]
   - Condition: [WALL_CONDITION]
   - Issues: [WALL_ISSUES]

   Roof:
   - Type: [ROOF_TYPE]
   - Age: [ROOF_AGE]
   - Condition: [ROOF_CONDITION]
   - Issues: [ROOF_ISSUES]

3. MECHANICAL SYSTEMS
   HVAC:
   - System Type: [HVAC_TYPE]
   - Age: [HVAC_AGE]
   - Condition: [HVAC_CONDITION]
   - Issues: [HVAC_ISSUES]

   Electrical:
   - Service: [ELECTRICAL_SERVICE]
   - Panel Condition: [PANEL_CONDITION]
   - Issues: [ELECTRICAL_ISSUES]

   Plumbing:
   - System Type: [PLUMBING_TYPE]
   - Condition: [PLUMBING_CONDITION]
   - Issues: [PLUMBING_ISSUES]

4. INTERIOR
   Floors:
   - Type: [FLOOR_TYPE]
   - Condition: [FLOOR_CONDITION]

   Walls/Ceilings:
   - Condition: [WALLS_CEILING_CONDITION]
   - Issues: [INTERIOR_ISSUES]

5. EXTERIOR
   Parking: [PARKING_DETAILS]
   Landscaping: [LANDSCAPING_DETAILS]
   Drainage: [DRAINAGE_DETAILS]

6. SAFETY AND COMPLIANCE
   Fire Safety: [FIRE_SAFETY_DETAILS]
   ADA Compliance: [ADA_COMPLIANCE_DETAILS]
   Building Code: [CODE_COMPLIANCE_DETAILS]

7. ENVIRONMENTAL CONCERNS
   [ENVIRONMENTAL_ISSUES]

8. RECOMMENDATIONS
   Immediate Repairs:
   [IMMEDIATE_REPAIRS_NEEDED]

   Future Maintenance:
   [FUTURE_MAINTENANCE_NEEDED]

9. COST ESTIMATES
   Immediate Repairs: $[IMMEDIATE_REPAIR_COSTS]
   Future Repairs: $[FUTURE_REPAIR_COSTS]

Inspector's Certification:
[INSPECTOR_SIGNATURE]
[INSPECTOR_LICENSE_NUMBER]
[DATE]

Attachments:
- Photo Documentation
- Detailed System Reports
- Testing Results`,
  description: "Detailed commercial property inspection report template",
  is_active: true
};
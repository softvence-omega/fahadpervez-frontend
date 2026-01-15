# Comprehensive Drug Information Workflow

This document details the architecture and API orchestration used for the Drug Card feature, which integrates multiple OpenFDA datasets to provide a 360-degree view of medical drugs.

## 1. Primary Entry Point: `searchDrugLabels`
*   **Trigger**: User input in `SearchBar.tsx` (Debounced 300ms).
*   **Purpose**: To find official drug labels and manufacturer information.
*   **Request**: 
    ```
    GET https://api.fda.gov/drug/label.json?search=openfda.brand_name:"{query}"+openfda.generic_name:"{query}"&limit=10
    ```
*   **Output**: Returns `results[]` containing identifiers (set_id/id) and basic brand/generic names for the dropdown.

---

## 2. Multi-Dataset Orchestration: `getComprehensiveDrugInfo`
When a drug is selected, the application performs a parallel fetch across four distinct FDA databases to build the comprehensive "Life-Cycle" view of the drug.

### A. Label Data (`drug/label.json`)
*   **Source**: Official FDA Product Labels.
*   **Key Fields**: `indications_and_usage`, `dosage_and_administration`, `boxed_warning`, `clinical_pharmacology`.
*   **UI Destination**: Overview, Clinical Info, and Pharmacology tabs.

### B. Adverse Events (`drug/event.json`)
*   **Source**: FDA Adverse Event Reporting System (FAERS).
*   **Processing**: Handled by `processAdverseEvents` function.
*   **UI Destination**: Real-World Data tab. Generates:
    *   **Total Reports**: Global report count.
    *   **Serious Outcomes**: Calculated counts for Deaths, Hospitalizations, and Life-Threatening events.
    *   **Recharts Data**: Top 10 reactions (Bar Chart) and Age/Gender distributions (Pie Charts).

### C. Recalls & Enforcement (`drug/enforcement.json`)
*   **Source**: FDA Enforcement Reports.
*   **Processing**: Handled by `processRecalls` function.
*   **UI Destination**: Safety alerts at the top of the Real-World Data tab.
*   **Classification**: Filters for Class I (Serious), Class II, and Class III recalls.

### D. NDC Directory (`drug/ndc.json`)
*   **Source**: National Drug Code Directory.
*   **Purpose**: Cross-references packaging, marketing category, and route of administration for the `DrugImage` icon logic.

---

## 3. Advanced Features & Logic

### Intelligent Logic: `DrugImage` Component
Instead of static images, the system uses a smart icon renderer:
1.  Analyzes the `route` property (e.g., ORAL, INTRAVENOUS, OPHTHALMIC).
2.  Maps to dynamic icons: 
    *   `ORAL` -> Pill icon
    *   `INJECTION` -> Syringe icon
    *   `RESPIRATORY` -> Wind icon
3.  Generates a stable color gradient based on a hash of the drug's name to give each card a unique visual identity.

### Export Engine: `handleDownload`
Uses a dual-library strategy:
1.  **html2canvas**: Clones the DOM card (including Recharts SVG charts), applies computed CSS, and flattens it to a high-DPI canvas.
2.  **jsPDF**: Calculates A4 page ratios and paginates the long drug card into a multi-page PDF document.

### Performance: `SimpleCache` (Client-Side)
*   **TTL**: 300,000ms (5 minutes).
*   **Strategy**: All requests are checked against an in-memory `Map`. This enables instant "Back" navigation and prevents hitting the FDA rate limit (240 requests/min) during a single user session.

---

## 4. Feature Summary Table

| Tab | API Endpoint | Data Source Details | Visualization |
| :--- | :--- | :--- | :--- |
| **Overview** | `/drug/label` | Manufacturer, NDC, Class | Info Grids |
| **Clinical** | `/drug/label` | Indications, Dosage, Populations | Prose Content |
| **Safety** | `/drug/label` | Interactions, Overdose | Warning Cards |
| **Real-World** | `/drug/event` | FAERS Reports (Post-Market) | Bar/Pie Charts |
| **Recalls** | `/drug/enforcement` | Active/Ongoing Recalls | Alert Banners |

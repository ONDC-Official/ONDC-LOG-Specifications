# B2B Logistics procurement flow
This section elaborates the process flows for procuring logistics over the network in order to fulfill the shipment from sellers warehouse to end customer location. The procurement majorly happens in four phases of order processing flow, i.e. Discovery available logistics provider based on serviceability, quotation, e-KYC, order fulfillment and order tracking.

## Serviceability & Quotation
The process begins with a B2B seller initiating a search request for available logistics providers over the network. The serviceability of the logistics provider will be based on the pincode or Lat/ Long of start and end location of the fulfillment and provide quotations for specific/all fulfillment options based on the mandatory product attributes. The logistics seller app responds with the prices and TAT for each possible fulfillment option and an e-KYC form for sellers to fill. The e-KYC form is sent as part of x-input in the API specifications.

While initiating a search call, B2B sellers will send pincode or Lat/ Long of the start and end location and quote mandatory and optional attributes. B2B seller relays this search query to the Gateway. The gateway performs a look-up on the ONDC Registry to identify the Logistics seller apps registered in the logistics domain and then multi-casts the search query to all such logistics seller apps.

The logistics seller apps, in turn, respond with an /on_search response to the gateway, with all the possible fulfillment options available from start to end location sent in the search call. The gateway then relays these responses to the buyer app (B2B seller app), which displays them to the buyer (B2B seller). 

Input product attributes for getting a quote from B2B Logistics seller app:
- No. of packets
- Dead weight of the item
- Volumetric weight (LBH dimensions)
- Dangerous goods (True/False): If true : then MSDS certificate (document) - /init UN#, IMDG page#, Packaging Group (type)  details will be required
- Category of the item
- Total price of the shipment
- Unit price of each item - Not required. (Invoice would carry)
- Start and End location
- Stackable (True/False)
- If Temp controlled cargo,  need details of temp to be maintained and  kind of packing...whether active solution or passive solution done by shipper - MSDS


Below are specific to Export under CSB V (30 Kg per packet and value below 10Lakh):

- If ODC (Over Dimensional Cargo) cargo need to highlighted for specific rate procurement
- Cargo readiness date will be required  - time range optional
- Need to mention whether it is re-import or re-export - Not part of MVP
- Need to check if used goods (For Capex Goods) - Not part of MVP
- In store Date (OR) ETA destination required, so that LSP can plan for the liner and schedule to submit quote accordingly  - Same as cargo readiness date.

> Note: 
> 1. Duty - Not part of quotation.
> 2. Govt benefit and scheme clearance not allowed

For Cold Logistics:
 - Temp range for the item
    - Minus 18 degrees (for frozen foods)
    - 0 to 4 degrees (for Dairy, Chocolate,Health products etc)
    - 15 to 18 degrees.
    - MSDS certificate enough


Type of packing - Not required, covered in MSDS Certificate:
- Gunny Sacks
- Barrels
- Casses
- Pallets

Possible B2B Fulfilment options:
- Road Cargo (Only in Domestic B2B logistics)
- Air Cargo
- Ocean Cargo (Specific to CSB V Export) 

The seller looks at the quotation received from one/more logistics providers and fills the e-KYC form of one of the logistics providers, which the seller wants to go ahead with. The e-KYC has below attributes:
- Company Details (Name and Address)
- Aadhar
- PAN/TAN
- GSTIN
- CIN Number (If Logistic Partner is Corporate)
- MSME Certificate (if Logistics Parter is registered under MSME Act)

Below are specific to Export under CSB V
- IEC Code
- AD Code
- Bank Account Number

Once, the e-KYC is completed, which is an online process, B2B seller app sends the eKYC submission id and incoterms specific to the current shipment (incoterms are only required in international logistics) to the selected logistics seller app through an init call. Logistics seller app then responds with an updated quote and breakup (based on the incoterms shared).

The breakup of logistics charges include:
- Origin
- Freight Type
- Destination
- Freight Rate validity to be given (Since International freight rates are very dynamic) and any volume commitment
- Transit time
- Airport Storage rate at destination (if required)
- Base Charges (based on incoterms)
- Custom Clearance Charges/Service charge (based on DDU/DDP)
- Clearance - Origin & Destination.

Incoterms specific to CSB V shipping:
- CIF/ CFR/ FOB
- DDU/DDP

Cancellation Terms:
- Before pickup:
    - No cancellation charges
- Hub:
    - First mile * 2
- Customs Cleared
- Airport

Once the updated quotation is received, B2B seller app sends all the agreed terms and the export documents.

Export documents required for Cargo Shipment:
- Invoice - **Req**
- Packaging List- **Req**
- Pre-Export clearance certificate (required to ship the particular item) ex. AYUSH certificate.
- Airway Bill- **Req**
- LUT (Letter of Undertaking) from bank - B2C 
- If the exporter is a manufacturer, then he has to provide all Product related documents prescribed by the govt. Every product will have a different list. 
- For the trader, he has to produce a purchase bill from whoever he has purchased the item. 
- If the packaging is done in a wooden crate then a fumigation certificate by the agencies by an authorised player.

B2B Domestic:
- Pickup confirmation code: Shipping bill - AWB number - code: AWB_No
- If Account exists - Customer code - code: ACC_No

B2B International:
- Booking reference number - provided by LSP at the time of booking. - code: BKG_No
- GST Number - code: GST_No

![Domestic B2B Logistics Flow](https://raw.githubusercontent.com/abhik-wil/ONDC-LGP-Specifications/draft-2.x/api/docs/brd_images/Domestic_B2B_Logistics_Flow.png)

## Order Fulfilment
Once the seller is ready to ship the products, the B2B seller app sends the ReadyToShip flag to true through an update call. This informs the logistics provider that the shipment is ready to be picked up from the start location and hence proceeds with the pickup. 
Once the logistics provider picks up the shipment from the B2B seller warehouse, logistics seller app sends pickup confirmation code to the B2B seller app.

![Order Fulfillment](https://raw.githubusercontent.com/abhik-wil/ONDC-LGP-Specifications/draft-2.x/api/docs/brd_images/Order_Fulfillments.png)

## Order Tracking
For shipment tracking, seller can request for shipment status through status call and logistics seller app returns the shipment status or tracking url through an on_status call.

![Order Tracking](https://raw.githubusercontent.com/abhik-wil/ONDC-LGP-Specifications/draft-2.x/api/docs/brd_images/Order_Status.png)

# Sequence Diagram (End-to-End Flow)

![Complete E2E](https://raw.githubusercontent.com/abhik-wil/ONDC-LGP-Specifications/draft-2.x/api/docs/brd_images/Complete_E2E.png)

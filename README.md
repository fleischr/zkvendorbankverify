# zkvendorbankverify
Vendor Bank Account Verification under Zero Knowledge, featuring SAP, PRVD Stack, and Shuttle

## Business Use Case
The LFBK table in SAP ERP contains one of the most heavily guarded pieces of data in an enterprise: the vendor bank account master data.

This data is under routine social engineering and phishing attacks. Everyday, hackers try to manipulate accounts payable and other finance/accounting professionals into changing this information to steal payments out of B2B commerce. Processes to share, update, and verify this data are made deliberately manual and slow to ensure greater privacy - but in some cases fraud, theft or errors can still prevail.

What if you could verify the bank account details, without having to reveal them? This is what zero knowledge cryptography is capable of doing. This repo demonstrates a proof of concept of using zero knowledge in this technical business use case.

## How to implement
Pre-requisites:
- Clone the proUBC abapGit repo
- Follow developer quick start instructions

Shuttle setup:
- Onboard a PRVD organization + workgroup in Shuttle
- Connect to SAP if possible
- Define the "SAPZKVendorBank" Schema. Use following fields in Shuttle
        - vendor_number (type string)
        - routing_number (type string)
        - account_number (type string)
        - country (type string)
        - date (type string)
        - id (type string, use this as primary key)
- Invite a "vendor" to the workgroup
- Configure the zero-knowledge workflow
    - Step 1: SAP generates and sends the zk-proof
    - Step 2: Vendor participates and verifies the zk-proof
    - Be sure fill out name, circuit type, finality, domain model, participants.

PRVD subject account setup in SAP
- If you were able to connect a SAP system during Shuttle onboarding, your PRVD credentials should automatically populate back to your chosen SAP system
- If you were *not* able to connect a SAP system during Shuttle onboarding, you can populate your account JWT manually using the PRVD CLI and Postman. Use this gist to retrieve the needed info. You can refer here or here on how to populate the needed info via Postman. This setup works for the vendor offline from SAP to generate verified creds.
- Check the ZPRVDTENANTS table to verify
- Signed JWT = verified credentials = decentralized id = DID

Clone this repo

## How to use, summary

Step 1: SAP generates and sends the zk-proof
Execute the program with a given vendor ID and country code

Assuming your PRVD subject account is generated correctly in SAP, initialization of the PRVD API helper should be OK.

Payload of data is sent to the protocol_messages endpoint. Under the hood, the PRVD stack uses Gnark to generate zk-proof.

Results are reported in API response. See ZBPIOBJECTS table

Also check out the workflow designer

Step 2: Vendor participates and verifies the zk-proof

As an external user, your vendor wouldn't have direct read access to LFBK let alone your SAP system at all. Instead, your vendor may receive the PRVD workgroup invitation, which would allow them to be notified of the zk-proof they would identify as coming from the SAP system. They would fill in their bank details and similarly generate a zk-proof for verification and complete the workflow.

## Ideal PRVD stack deployment

For demonstration purposes, the PRVD stack deployment hosted by Provide is used. However, the open source PRVD stack can be deployed natively to any other corporate host. This how it can be ensured that the vendor bank info from SAP would never leave the "four walls" of the enterprise network while using an integration like this.

## Helpful links
proUBC (pre-req)
https://github.com/provideplatform/proUBC

proUBC enablmement docs
https://docs.provide.services/proubc

PRVD CLI installation
https://github.com/provideplatform/provide-cli

PRVD CLI Gists for generating VCs offline from SAP
https://gist.github.com/fleischr/2e86db37a7bcea637efa361f8b4c1b09
https://gist.github.com/fleischr/6aecd5ace9a4d2f772c044d7d6046ad7

https://shuttle.provide.services - for setting up your zk workflow
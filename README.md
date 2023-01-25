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
- Define the Schema
- Invite a "vendor" to the workgroup
- Configure the zero-knowledge workflow
    - Step 1: SAP generates and sends the zk-proof
    - Step 2: Vendor participates and verifies the zk-proof

PRVD subject account setup in SAP
- If you were able to connect a SAP system during Shuttle onboarding, your PRVD credentials should automatically populate back to your chosen SAP system
- If you were *not* able to connect a SAP system during Shuttle onboarding, you can populate your account JWT manually using the PRVD CLI and Postman. Use this gist to retrieve the needed info. You can refer here or here on how to populate the needed info via Postman.
- Check the ZPRVDTENANTS table to verify

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
# zkvendorbankverify
Vendor Bank Account Verification under Zero Knowledge, featuring SAP, PRVD Stack, and Shuttle

## Business Use Case
The LFBK table in SAP ERP contains one of the most heavily guarded (and attacked!!!) pieces of data in an enterprise: the vendor bank account master data.

This data is under routine social engineering and phishing attacks. Everyday, hackers try to manipulate accounts payable and other finance/accounting professionals into changing this information to steal payments out of B2B commerce. Processes to share, update, and verify this data are made deliberately manual and slow to ensure greater privacy - but in some cases fraud, theft or errors can still prevail.

What if you could verify the bank account details, without having to reveal them? This is what zero knowledge cryptography is capable of doing. This repo demonstrates a proof of concept of using zero knowledge in this technical business use case.

## How to configuration zk-workflow via Provide Shuttle

<b>Create account at https://shuttle.provide.services</b>

Use your email to create an account. You will be prompted to configure an organization and your org-level Vault configuration along with other agreements to accept.

![img](./img/shuttle-signup.PNG)

![](./img/org-create.PNG)

<b>Define workgroup</b>

Upon creating your organization, you will be immediately prompted to create your work group. Accept the Vault privacy policy and continue. 

![](./img/create-workgroup.PNG)

Configure fields of the bank record synchronization message type. 

![](./img/workgroup-schema-create.PNG)

Choose the PRVD network layer 3 testnet. Continue.

![](./img/workgroup-network-select.PNG)

Continue until "Finish onboarding" can be selected.

![](./img/worgroup-finish-onboarding.PNG)

Upon successful workgroup creation - you will be redirected to the Shuttle homepage.

![](./img/shuttle-home.PNG)

<b>Configure workflow</b>

Select the workflows tab.

![](./img/shuttle-newwf.PNG)

Create the workflow. Save and select + to create workstep.

![](./img/wf-create.PNG)

![](./img/wf-addworkstep.PNG)

Configure the workstep. Add a name and description. Select the general consistency circuit. Select the previously configured schema. Add participants as needed. Click save.

![](./img/wf-workstepsave.PNG)

Once all worksteps are created - deploy the workflow.

![](./img/wf-deploy.PNG)

![](./img/wf-deploy-success.PNG)

Once successfully deployed - the zk-workflow can be reached/triggered via API

### Postman configuration, credentials generation, initial protocol message test

<b>Maintain Shuttle Credentials</b>

Use the email and password in the ```{{shuttle_email}}``` and ```{{shuttle_password}}``` collection variables

<b>Generating the refresh and access tokens</b>

Execute Postman requests in the following order
1. Authorize Access Token
2. List organizations
3. JWT Authenticate - Generate long dated refresh token
4. JWT Authenticate - Generate short dated access token from refresh token

<b>Maintain the workgroup id, subject account id</b>

For a given workflow, maintaining the correct workgroup id and subject account id in the collection variables is essential for the protocol messages to work correctly.

Review the console outputs when executing "List organizations". You can verify you have the right workgroup and subject account id in the additional endpoints provided.

![](./img/list-orgs.PNG)

![](./img/list-workgroups.PNG)

![](./img/list-subjaccts.PNG)

Maintain the desired workgroup and subject account id in the collection variables

![](./img/maintain-wg-subjacct.PNG)

<b>Test the protocol messaging from Postman</b>
While authenticated, Go to the Trigger Bank Account Verification request

Add data to the blank fields and execute

![](./img/postman-sent-protocol-msg.PNG)

<b>Review ZKP in Shuttle</b>

View the console where you originally deployed the workflow

![](./img/shuttle-msg-review1.PNG)

## Executing in SAP

<b>Pre requisities</b>

Use this SAP sample program does require the install and configuration of [provide-abap](https://github.com/provideplatform/provide-abap) as a pre-requisite. Additional details are documented [here](https://docs.provide.services/provide-abap)

<b>Credentials onboarding to SAP</b>

Use the SAP folder of the Postman collection

Maintain the SAP basic auth credentials in postman

Execute fetch

Execute tenant creation

Review the record in ZPRVDTENANTS table

<b>Program execution</b>

Execute the SAP program via transaction code SE38 or SE80

This will produce a protocol message reviewable in Shuttle's workflow console as previously demonstrated.

## Executing in Node.js

To simulate the scenario in a different, non-SAP vendor system - an example is provided in Javascript as well featuring [provide-js](https://github.com/provideplatform/provide-js) 

<b>Navigate to the javascript directory</b>

Run command ```cd javascript```

<b>Install packages</b>

Run command ```npm install```

<b>Maintain .env file from Postman collection variables</b>

<b>Create the Provide Axiom zero knowledge proof</b>

Run command ```node create_protocol_msg```

<b>Review ZKP in Shuttle</b>

View the console where you originally deployed the workflow. You'll see an additional protocol message created in the console.

![](./img/shuttle-msg-review1.PNG)


## Ideal PRVD API stack deployment

For demonstration purposes, the PRVD stack deployment hosted by Provide is used. However, the open source PRVD stack can be deployed natively to any other corporate host. This how it can be ensured that the vendor bank info from SAP would never leave the "four walls" of the enterprise network while using an integration like this.
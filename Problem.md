# Introduction

- The main goal of this task is to get a picture of your proficiency in programming and the ability to deal with new assignments.

- Be assured that we _don't_ expect you to complete all the requirements - focus on the ones that suit you best. For example if you know a lot about backends, focus on the services and use a REST client to test them; if you know a lot about UI frameworks, show us what you can do there and e.g. mock calls and backend data.

- You are free to use any technology stack / framework you like (e.g. python, node.js, ...) but we expect you to implement the main parts on your own.

- If you think that some information / data is missing, doesn't make sense or could be organised in a better way, substitute with whatever you see fit. 

- Please create a source code repository on a platform of your choice (e.g. github.com, gitlab.com, ...) and use it during the development of your software.

- Take all the time (within reason) and resources you need to complete. Once you are finished, let us know and send us the link to your repository. 


# Description

Please read the following descriptions very carefully. Then create a list of tasks in a tool of your choice (e.g. Excel, Textfile, ...), estimate them in hours and also keep track of how long it actually took you to implement them.
```
1. Model and structure the following data in a "database" of your choice
  a. User - should consist of at least the following fields
    - Identifier
    - Name (max length is 512 characters)
    - Description (max length is 1k characters)
    - E-Mail (max length is 1k characters)
    - Bitcoin Wallet Id (max length of Bitcoin Wallet Id)
    - Bitcoin Wallet balance (max value 1 bln)
    - Ethereum Wallet Id (max length of Ethereum Wallet Id)
    - Ethereum Wallet balance (max value 1 bln)
    - Max amount that is allowed per transaction
  b. Transaction
    - Identifier
    - Currency Amount
    - Currency Type
    - Source user id
    - Target user id
    - Timestamp created
    - Timestamp processed
    - State

2. Implement a backend service that provides the following endpoints / handlers
  a. Create user (with basic user details)
    - Validate and store details in the database
  b. Add currency account for currency (Bitcoin, Ethereum)
    - Validate and set account details
  c. Submit transaction to system
    - Put the transaction into the transaction processor queue and return its transaction id		
  d. Retrieve transaction history for user id
    - Retrieve list of all the processed transactions and their state, each entry consisting of amount, source user id, target user id and currency type
  e. Retrieve transaction status

3. Implement a transaction processor that can run in parallel to the backend service and processes transactions (e.g. worker, job system, script, ...)
  a. Users will submit transactions, specifying how much of a certain currency they want to send to another user. The processor needs to make sure that:
    - Transactions must happen in the order that they were submitted
    - Each transaction should only be executed once
    - No transactions should be missed
    - Transactions should be processed as soon as possible, but there is no hard requirement
  b. The processor should implement at least the following steps for each transaction in the queue
	- Validate that the transaction can be processed (user A has enough of currency type and amount, etc. ...)
    - Process the transaction: 
      * Amount of correct type should be subtracted from sending user
      * Amount of correct type should be added to target user
      * Adjust transaction state
    - Transaction details should be logged
    - At least the transaction (id) is saved to the transaction history of both users

3. Protect all public endpoints against unauthorised access in some way.

4. Create a simple website/webpage/application that uses the previously defined endpoints of the backend and lets the user enter the required information and/or display information according to the endpoint.
```

## Solution
- [Link](README.md)

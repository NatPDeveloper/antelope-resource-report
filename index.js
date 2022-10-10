/* 

    Goal: be passed trx data and to compose a table resource report

        1. CPU -> cpu_usage_us - total time for trx
            a. elapsed - the time in microseconds that the transaction took to execute
            example: i.processed.receipt.cpu_usage_us
            firehose: i.filteredTransactionTraces[0].receipt.cpuUsageMicroSeconds
        2. NET -> net_usage - total net in bytes used for trx
            a. net_usage_words - in words, net_usage = net_usage_words * 8
            example: i.processed.net_usage
            firehose: i.filteredTransactionTraces[0].receipt.netUsageWords * 8
        3. RAM -> account_ram_deltas - array of accounts / total deltas
            a. ram delta is negative when reducing RAM stake
            example: i.processed.action_traces[0].account_ram_deltas[0].delta
        4. CPU/NET is not reported per action, so must group contract:action names 
            together and report as 1 for each unique instance
        5. Report CPU/NET/RAM averages as default and MIN/MAX / dbOps as additional options

    To handle:

        1. How to determine what contracts to listen for vs other contracts
        2. How to keep array globally for eos-wrapper / firehose
        3. Decode dbOps, rlimitOps, and creationTree

    Data format:

        const trx = {
            actions: [
                {
                    code: "eosio.token",
                    action: "issue",
                    ram: 264
                },
                {
                    code: "eosio.token",
                    action: "transfer",
                    ram: 0
                }
            ],
            cpu_usage: 1200,
            net_usage: 150
        };

        const dbOpsTrx = { .. };

        const options = {
            min_max: false, // include min/max CPU/NET/RAM
            average: true, // include avg CPU/NET/RAM
            dbops: false // expect dfuse formated dbOps objects
        };

*/
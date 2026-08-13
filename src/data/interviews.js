export const interviewTracks = [
  {
    id: 'adf',
    label: 'Azure Data Factory',
    count: 10,
    questions: [
      {
        q: 'What is Azure Data Factory and when would you choose it over Databricks Workflows?',
        a: 'ADF is Azure’s managed orchestration service for ingest, copy, and control-flow. Use it to move data across systems, schedule pipelines, and call Databricks notebooks. Databricks Workflows is stronger when the work is mostly Spark/Delta inside the lakehouse. In production, teams often use ADF to orchestrate and Databricks to transform.',
      },
      {
        q: 'Explain Pipeline, Activity, Dataset, Linked Service, Integration Runtime, and Trigger.',
        a: 'A Linked Service is the connection. A Dataset is a named pointer to data on that connection. An Activity is a unit of work (Copy, Lookup, Notebook). A Pipeline is a graph of activities. Integration Runtime is the compute that runs those activities. A Trigger starts the pipeline (manual, schedule, tumbling window, or event).',
      },
      {
        q: 'Azure IR vs Self-Hosted IR vs Azure-SSIS IR — when do you use each?',
        a: 'Azure IR is for cloud-to-cloud copies and Mapping Data Flows. Self-Hosted IR is required when the source sits on-prem or in a private network that Azure IR cannot reach. Azure-SSIS IR lifts and runs SSIS packages. Networking, firewalls, and data residency usually decide the choice.',
      },
      {
        q: 'How does Copy Activity mapping work, and what is DIU?',
        a: 'Copy Activity reads from a source, optionally maps columns (explicit or auto), and writes to a sink. You can add fault tolerance for incompatible rows. DIU (Data Integration Unit) is the cloud copy compute unit. More DIUs can raise throughput, but source/sink limits, file size, and parallelism matter more than blindly increasing DIU.',
      },
      {
        q: 'How do you implement incremental load in ADF?',
        a: 'Store a watermark (last loaded timestamp or key) in a control table. Lookup the watermark, filter the source with that value, copy new/changed rows, then update the watermark. Alternatives: last-modified on files, tumbling window slices, or SQL CDC. Always make the watermark update transactional with the load.',
      },
      {
        q: 'CDC vs incremental watermark load — what is the difference?',
        a: 'Watermark incremental load pulls rows greater than a column (usually modified date). It can miss deletes and late updates if the column is unreliable. CDC reads the database change log, so you get inserts, updates, and deletes with better fidelity. CDC needs source support and more operational care.',
      },
      {
        q: 'What is a metadata-driven ADF framework?',
        a: 'Instead of one pipeline per table, you store source, sink, watermark, and load type in a config table. A generic pipeline looks up config, parameterizes datasets, and loops with ForEach. This is how teams ingest 50–500 tables without copying pipelines. Interviewers expect architecture, config schema, and how failures are logged per table.',
      },
      {
        q: 'How do you pass dynamic content? Give a practical expression.',
        a: 'ADF expressions use @pipeline(), @activity(), @dataset(), @variables(), and functions like concat, utcnow, formatDateTime. Example folder path: @concat(pipeline().parameters.container, "/", formatDateTime(utcnow(), \'yyyy/MM/dd\')). Keep expressions in parameters/variables so pipelines stay readable.',
      },
      {
        q: 'How do you handle errors, retries, and alerts in ADF?',
        a: 'Set activity retry and retry interval for transient faults. Use On Failure paths, a Fail activity, or a logging pipeline. Write run id, table name, and error message to a log table. Alert with Azure Monitor / Logic Apps on failed pipeline runs. Never retry non-transient mapping errors blindly.',
      },
      {
        q: 'How do you secure ADF and deploy it with Git/CI-CD?',
        a: 'Use Managed Identity to reach ADLS, SQL, Key Vault, and Databricks. Store secrets in Key Vault, not in Linked Services as plain text. Connect ADF to Git, develop in feature branches, and promote ARM/Bicep or ADF deployment pipelines across DEV, TEST, and PROD with environment-specific Linked Services.',
      },
    ],
  },
  {
    id: 'databricks',
    label: 'Databricks',
    count: 10,
    questions: [
      {
        q: 'What is Azure Databricks and how does it differ from HDInsight or a raw Spark cluster?',
        a: 'Databricks is a managed lakehouse platform: notebooks, jobs, Unity Catalog, Delta, SQL warehouses, and optimized Spark. You do not manage Ambari/YARN the way you would on HDInsight. The value is Delta + governance + job orchestration on Azure, not just “Spark in a VM.”',
      },
      {
        q: 'Explain Databricks workspace objects: notebooks, repos, jobs, and compute.',
        a: 'Notebooks are the interactive code surface. Repos/Git folders version that code. Compute (all-purpose or job clusters) runs the code. Jobs/Workflows schedule notebooks or Spark tasks with retries and alerts. Libraries and secrets attach to compute or the workspace so credentials never sit in cells.',
      },
      {
        q: 'All-purpose cluster vs job cluster — which do you use in production?',
        a: 'All-purpose is for interactive development. Job clusters start for a run and terminate after, which is cheaper and cleaner for production. Pin Spark/runtime versions, use autoscaling carefully, and isolate prod jobs from shared interactive clusters.',
      },
      {
        q: 'What is Unity Catalog and how do metastore, catalog, schema, and table relate?',
        a: 'Unity Catalog is the governance layer. A metastore is the top account-level container. Under it: catalog → schema → table/view. Permissions are granted at each level and inherit down. External locations and storage credentials control which ADLS paths a table may use.',
      },
      {
        q: 'Managed vs external tables in Databricks?',
        a: 'Managed tables let Databricks own the data files; dropping the table can remove data. External tables point at an ADLS path you own; dropping the table usually leaves files. Lakehouse teams often use external tables on ADLS with Unity Catalog for clearer ownership.',
      },
      {
        q: 'How do you integrate ADF with Databricks?',
        a: 'Create a Databricks Linked Service (MSI or PAT). Use the Notebook or JAR activity, pass pipeline parameters as notebook widgets, and write outputs to ADLS/Delta. ADF handles ingest and schedule; Databricks handles heavy transforms. Fail the ADF activity if the notebook exit code is non-zero.',
      },
      {
        q: 'How do you store secrets in Databricks the right way?',
        a: 'Use Databricks secrets (backed by Key Vault in Azure) and dbutils.secrets.get. Never hardcode tokens in notebooks. Combine with Unity Catalog storage credentials and cluster policies so only the job identity can read production paths.',
      },
      {
        q: 'What are Databricks Workflows and when do they replace ADF?',
        a: 'Workflows chain notebooks, SQL, and Spark jobs with dependencies, repair-run, and notifications. If the entire estate is Databricks, Workflows can be the orchestrator. If you still copy from on-prem SQL, REST, or many SaaS sources, ADF (or similar) usually stays in front.',
      },
      {
        q: 'How do you design a production Databricks job?',
        a: 'Parameterized notebook, job cluster, Unity Catalog tables, structured logging, idempotent writes (overwrite partition or MERGE), retries on transient cluster errors, and a gold-layer contract. Add data quality checks before publishing Gold. Tag jobs with cost center and environment.',
      },
      {
        q: 'What is Databricks SQL used for in a data engineering team?',
        a: 'SQL warehouses serve BI and ad-hoc SQL on Delta tables. Engineers still build Gold in Spark; analysts query Gold through Databricks SQL or Power BI. It is not a replacement for ADF ingest or for heavy streaming/ETL, but it is the serving layer of the lakehouse.',
      },
    ],
  },
  {
    id: 'sql',
    label: 'SQL',
    count: 10,
    questions: [
      {
        q: 'WHERE vs HAVING — what is the difference?',
        a: 'WHERE filters rows before aggregation. HAVING filters groups after GROUP BY. You cannot put an aggregate in WHERE. Example: filter cancelled orders in WHERE, then keep only customers with SUM(amount) > 10000 in HAVING.',
      },
      {
        q: 'Inner vs left vs full join — give a data engineering example.',
        a: 'Inner join keeps matched facts and dimensions. Left join from facts keeps all transactions even if the dimension is late or missing (common in warehouses). Full join is used in reconciliation to find keys in A-not-B and B-not-A. Prefer keys that are unique on the dimension side to avoid fan-out.',
      },
      {
        q: 'What is a CTE and when do you use it instead of a subquery?',
        a: 'A CTE (WITH clause) names an intermediate result. Use it to make multi-step transforms readable, to reuse a set twice, or to recurse. Subqueries are fine when small. In interviews, show a CTE that isolates dirty rows, then joins clean facts to dimensions.',
      },
      {
        q: 'Explain window functions and a real use case.',
        a: 'Window functions compute across a partition without collapsing rows: ROW_NUMBER, RANK, LAG/LEAD, SUM() OVER. Classic DE use: ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY updated_at DESC) = 1 to keep the latest record for SCD or dedupe.',
      },
      {
        q: 'How do you find duplicates and keep the latest row?',
        a: 'Use ROW_NUMBER partitioned by the business key, ordered by a reliable timestamp descending, then filter rn = 1. Alternatively GROUP BY key with MAX(updated_at) and join back. Explain why MAX without a unique tie-breaker can still leave two rows.',
      },
      {
        q: 'What is the difference between a view, a temp table, and a stored procedure?',
        a: 'A view is a saved query (no data, unless indexed/materialized). A temp table stores intermediate data for a session. A stored procedure is procedural logic you can parameterize, transactionally load, and call from ADF. Warehouses often use procs for MERGE-based incremental loads.',
      },
      {
        q: 'How do indexes and execution plans affect a pipeline query?',
        a: 'ADF Lookup/Copy and Spark JDBC pushes SQL to the source. Missing indexes on watermark or join columns cause full scans and slow incremental loads. Read the execution plan for scans vs seeks, key lookups, and spills. Do not index blindly — write-heavy OLTP tables can suffer.',
      },
      {
        q: 'Write the idea of an incremental MERGE from staging to target.',
        a: 'MERGE target T USING staging S ON T.bk = S.bk WHEN MATCHED AND T.hash <> S.hash THEN UPDATE … WHEN NOT MATCHED THEN INSERT … WHEN NOT MATCHED BY SOURCE THEN (optional) expire. This is the SQL shape behind SCD1/SCD2 loads.',
      },
      {
        q: 'OLTP vs OLAP — why does a data engineer care?',
        a: 'OLTP is normalized, write-optimized, current-state. OLAP/warehouse is denormalized (star), read-optimized, historical. You extract from OLTP with small incremental queries and model facts/dims for analytics. Joining five 3NF tables in a report is a smell — that work belongs in the model.',
      },
      {
        q: 'What is grain in a fact table?',
        a: 'Grain is what one fact row represents: one order line, one daily account balance, one click. If grain is wrong, measures double-count. State grain first, then choose dimensions and additive vs semi-additive measures.',
      },
    ],
  },
  {
    id: 'pyspark',
    label: 'PySpark',
    count: 10,
    questions: [
      {
        q: 'Explain Spark architecture: driver, executor, worker, and cluster.',
        a: 'The driver builds the DAG and schedules tasks. Executors run tasks and cache data. Workers (nodes) host executors. The cluster manager (Databricks/YARN/K8s) places those executors. If the driver is overloaded (collect, huge broadcast), the job dies even if executors are fine.',
      },
      {
        q: 'What is lazy evaluation and a DAG in Spark?',
        a: 'Transformations (select, filter, join) are lazy — they build a DAG. Actions (count, write, show) trigger execution. Spark optimizes the DAG (Catalyst) before running. This is why chaining transforms is cheap until you write Delta.',
      },
      {
        q: 'select, filter, withColumn, groupBy — what should you watch for?',
        a: 'Prefer DataFrame API over UDFs. withColumn in a loop on wide tables can get expensive; batch expressions. filter early to cut shuffle size. groupBy causes shuffle — know the aggregation key cardinality. Use agg() with explicit functions, not select after groupBy without aggregation.',
      },
      {
        q: 'How do Spark joins work and when do you broadcast?',
        a: 'Large-large joins shuffle both sides. If one side is small (dimension), broadcast it so each executor joins locally. Default autoBroadcastJoinThreshold may be too low for a 50 MB dim — set it or use broadcast(). Skewed keys still need salting or AQE skew join.',
      },
      {
        q: 'repartition vs coalesce?',
        a: 'repartition does a full shuffle to N partitions (increase or evenly decrease). coalesce reduces partitions without a full shuffle (faster, can leave uneven sizes). After a big filter, coalesce before write. Before a heavy join, repartition on the join key if needed.',
      },
      {
        q: 'cache vs persist — when is caching a mistake?',
        a: 'Cache when the same DataFrame is used multiple times in one job. persist lets you pick MEMORY_AND_DISK. Caching a one-pass ETL wastes memory. Always unpersist when done. On Databricks, Delta + AQE often beats caching huge bronze tables.',
      },
      {
        q: 'What is shuffle and how do you reduce it?',
        a: 'Shuffle is the exchange of data across executors for join, groupBy, distinct, repartition. It is the usual bottleneck. Reduce it with filter pushdown, broadcast joins, partition-aligned writes, and avoiding wide UDFs. Watch shuffle read/write in the Spark UI.',
      },
      {
        q: 'UDF vs built-in functions?',
        a: 'Python UDFs kill Catalyst optimization and add serialization cost. Use Spark SQL functions, higher-order functions, or pandas/Spark vectorized UDFs only when required. Interviewers want you to rewrite a Python lambda as expr/when/regexp.',
      },
      {
        q: 'How do you handle arrays, structs, maps, and explode?',
        a: 'Nested JSON lands as struct/array. Use dot notation, getField, explode to flatten one-to-many, and posexplode when order matters. Explode increases row count — do it after filtering. Rebuild structs for Gold if the consumer wants nested JSON.',
      },
      {
        q: 'How do you optimize a slow PySpark job on Databricks?',
        a: 'Read Spark UI: skewed stages, spill, shuffle. Check file sizes (too many tiny files). OPTIMIZE/Z-ORDER Delta, predicate pushdown, partition pruning, AQE, broadcast dims, avoid collect. Fix the data layout before adding cluster size. That is the senior answer.',
      },
    ],
  },
]

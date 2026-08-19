export const top100Categories = [
  {
    id: 'sql-basic',
    label: 'SQL — Basic',
    questions: [
      {
        q: 'Difference between DELETE, TRUNCATE, DROP?',
        a: 'DELETE removes specific rows (can use WHERE), is logged row-by-row, and can be rolled back. TRUNCATE removes ALL rows instantly by deallocating pages — faster but no WHERE, minimal logging. DROP removes the entire table (structure + data) permanently.\n\nExample: DELETE FROM orders WHERE status = \'cancelled\' — removes only cancelled. TRUNCATE TABLE staging — wipes staging fast. DROP TABLE temp_load — table gone forever.',
      },
      {
        q: 'Clustered vs Non-clustered index?',
        a: 'Clustered index sorts and stores the actual data rows in order — only ONE per table (like a phone book sorted by last name). Non-clustered index is a separate structure with pointers back to data — you can have many.\n\nRule of thumb: Clustered on the most-queried range column (e.g. order_date). Non-clustered on frequently filtered/joined columns (e.g. customer_id).',
      },
      {
        q: 'CTE vs Temp Table?',
        a: 'CTE (WITH clause) is a named query that exists only for the next statement — no storage, no indexes. Temp table (#table) physically stores data in tempdb, supports indexes, and persists for the session.\n\nUse CTE for readability and one-pass transforms. Use temp table when you need to reuse intermediate results multiple times or add indexes for performance.',
      },
      {
        q: 'Primary Key vs Unique Key?',
        a: 'Primary Key: uniquely identifies each row, does NOT allow NULLs, only ONE per table, creates a clustered index by default. Unique Key: enforces uniqueness but ALLOWS one NULL, you can have MULTIPLE per table, creates a non-clustered index.\n\nExample: employee_id is PK. email is Unique Key — no two employees share an email, but a row might temporarily have no email.',
      },
      {
        q: 'RANK vs DENSE_RANK vs ROW_NUMBER?',
        a: 'Given salaries 100, 100, 90:\n• ROW_NUMBER: 1, 2, 3 (always unique, arbitrary tie-break)\n• RANK: 1, 1, 3 (ties get same rank, next rank skips)\n• DENSE_RANK: 1, 1, 2 (ties get same rank, next rank does NOT skip)\n\nUse ROW_NUMBER for dedup (keep latest). Use DENSE_RANK for "top N distinct values."',
      },
      {
        q: 'Inner Join vs Left Join?',
        a: 'Inner Join returns only matching rows from both tables. Left Join returns ALL rows from the left table + matching rows from right (NULLs where no match).\n\nDE context: Left join from fact to dimension keeps all transactions even if the dimension is late-arriving. Inner join would silently drop those rows — dangerous in a warehouse.',
      },
      {
        q: 'UNION vs UNION ALL?',
        a: 'UNION combines results and removes duplicates (adds a sort/distinct step). UNION ALL combines results and keeps ALL rows including duplicates — faster.\n\nAlways use UNION ALL unless you specifically need dedup. In ETL, UNION ALL is almost always correct since you control the data sources.',
      },
      {
        q: 'WHERE vs HAVING?',
        a: 'WHERE filters rows BEFORE aggregation. HAVING filters groups AFTER GROUP BY.\n\nExample: "Customers who placed orders in 2024 with total spend > 10K"\nWHERE order_date >= \'2024-01-01\' — filters rows first\nHAVING SUM(amount) > 10000 — filters aggregated groups',
      },
      {
        q: 'Stored Procedure vs Function?',
        a: 'Stored Procedure: can modify data (INSERT/UPDATE/DELETE), supports transactions, cannot be used in SELECT. Function: returns a value, can be used in SELECT/WHERE, should NOT modify data.\n\nDE use: Stored procedures for MERGE-based incremental loads called from ADF. Functions for reusable calculations inside queries.',
      },
      {
        q: 'Normalization vs Denormalization?',
        a: 'Normalization: split data into smaller tables to reduce redundancy (3NF). Good for OLTP — fewer anomalies, smaller writes. Denormalization: combine tables for faster reads (star schema). Good for OLAP/warehouse — fewer joins, faster BI queries.\n\nData engineers extract from normalized OLTP and load into denormalized warehouse models.',
      },
    ],
  },
  {
    id: 'sql-advanced',
    label: 'SQL — Advanced',
    questions: [
      {
        q: 'Find second highest salary.',
        a: 'Using DENSE_RANK:\nWITH ranked AS (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rn\n  FROM employees\n)\nSELECT salary FROM ranked WHERE rn = 2;\n\nWhy DENSE_RANK? If two people share the top salary, RANK would skip to 3 — DENSE_RANK gives the true second distinct salary.',
      },
      {
        q: 'Find duplicate records.',
        a: 'SELECT email, COUNT(*) as cnt\nFROM customers\nGROUP BY email\nHAVING COUNT(*) > 1;\n\nTo see the actual duplicate rows:\nWITH dupes AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn\n  FROM customers\n)\nSELECT * FROM dupes WHERE rn > 1;',
      },
      {
        q: 'Running total.',
        a: 'SELECT order_date, amount,\n  SUM(amount) OVER (ORDER BY order_date) as running_total\nFROM orders;\n\nThe window frame defaults to ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW — it accumulates from the first row to the current one. Add PARTITION BY customer_id for per-customer running totals.',
      },
      {
        q: 'Moving average.',
        a: 'SELECT order_date, amount,\n  AVG(amount) OVER (\n    ORDER BY order_date\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ) as moving_avg_7day\nFROM daily_sales;\n\nThis computes the average of the current row plus the 6 preceding rows — a 7-day moving average. Useful for smoothing noisy time-series data.',
      },
      {
        q: 'Gap and Island problem.',
        a: 'Find consecutive sequences (islands) and gaps in data. Classic approach:\nWITH numbered AS (\n  SELECT val, ROW_NUMBER() OVER (ORDER BY val) as rn\n  FROM data\n)\nSELECT MIN(val) as island_start, MAX(val) as island_end\nFROM numbered\nGROUP BY val - rn;\n\nThe trick: val - rn is constant within consecutive sequences. Groups with same (val - rn) form one island.',
      },
      {
        q: 'SCD Type 2 SQL implementation.',
        a: '1. Compare incoming rows against current dimension (is_current = 1)\n2. For changed rows: UPDATE existing → set end_date = yesterday, is_current = 0\n3. INSERT new row with start_date = today, end_date = 9999-12-31, is_current = 1\n4. For brand new keys: just INSERT\n\nMERGE handles this: WHEN MATCHED AND hash differs → expire old + insert new. This preserves full history.',
      },
      {
        q: 'CDC implementation.',
        a: 'Three approaches:\n1. Timestamp-based: SELECT * FROM source WHERE last_updated > @watermark\n2. Log-based: Read database transaction log (binlog/redo) via Debezium/Maxwell → captures I/U/D\n3. Delta MERGE: Apply changes with MERGE INTO target USING changes ON key WHEN MATCHED UPDATE WHEN NOT MATCHED INSERT\n\nLog-based CDC catches deletes that timestamp misses.',
      },
      {
        q: 'Query optimization techniques.',
        a: '• Filter early (push predicates down)\n• Use proper indexes on JOIN/WHERE columns\n• Avoid SELECT * — select only needed columns\n• Replace correlated subqueries with JOINs\n• Use EXISTS instead of IN for large subsets\n• Partition large tables by date\n• Update statistics regularly\n• Read the execution plan — look for scans, spills, sorts',
      },
      {
        q: 'Execution plan analysis.',
        a: 'Read right-to-left, bottom-to-top. Key operators:\n• Table Scan (bad) → add index\n• Index Seek (good) → using index efficiently\n• Key Lookup → consider covering index\n• Sort with spill → needs more memory or pre-sorted data\n• Hash Match → join strategy, check for skew\n\nLook at estimated vs actual row counts — big gaps mean stale statistics.',
      },
      {
        q: 'Partitioning strategy.',
        a: 'Partition large tables by the most common filter column (usually date). Benefits: query only reads relevant partitions (partition pruning), maintenance per partition, parallel loads.\n\nExample: PARTITION BY RANGE (order_date) — queries with WHERE order_date BETWEEN skip old partitions entirely. In Delta Lake, partition by low-cardinality columns (year, month) not high-cardinality (customer_id).',
      },
    ],
  },
  {
    id: 'pyspark-100',
    label: 'PySpark',
    questions: [
      {
        q: 'RDD vs DataFrame?',
        a: 'RDD: low-level, unstructured, no optimization, full control. DataFrame: structured (rows + columns), uses Catalyst Optimizer, much faster.\n\nUse DataFrame for 99% of work. RDD only when you need fine-grained control over partitioning or unstructured data. DataFrame is 10-20x faster due to Catalyst + Tungsten.',
      },
      {
        q: 'Wide vs Narrow transformation?',
        a: 'Narrow: each input partition maps to one output partition — no shuffle. Examples: map(), filter(), select(). Fast.\n\nWide: data must move across partitions (shuffle). Examples: groupBy(), join(), distinct(), repartition(). Expensive.\n\nRule: minimize wide transformations. Filter before groupBy to reduce shuffle size.',
      },
      {
        q: 'Lazy evaluation?',
        a: 'Spark does NOT execute transformations immediately. It records them as a DAG (plan). Execution happens only when an Action is called (.show(), .count(), .write()).\n\nWhy? Spark can optimize the entire plan — eliminate unnecessary steps, push filters down, choose join strategies. This is why chaining 10 transforms is cheap until you call an action.',
      },
      {
        q: 'Catalyst Optimizer?',
        a: 'Spark\'s query optimization engine. It takes your logical plan → applies rules (predicate pushdown, column pruning, join reorder) → generates optimized physical plan.\n\nThis is why DataFrame/SQL is faster than RDD — Catalyst rewrites your query before execution. UDFs bypass Catalyst, which is why built-in functions are preferred.',
      },
      {
        q: 'Tungsten Engine?',
        a: 'Spark\'s execution engine for CPU and memory efficiency. Key features:\n• Off-heap memory management (avoids GC)\n• Cache-aware computation\n• Whole-stage code generation (compiles query plan to optimized Java bytecode)\n\nResult: 10x faster than interpreted execution. Works automatically with DataFrame API.',
      },
      {
        q: 'Cache vs Persist?',
        a: 'cache() = persist(StorageLevel.MEMORY_AND_DISK). persist() lets you choose storage level.\n\nWhen to cache: reusing same DataFrame for multiple actions. When NOT to: one-pass ETL, very large DataFrames.\n\nAlways unpersist() when done. On Databricks, Delta caching + AQE often outperforms manual caching.',
      },
      {
        q: 'Repartition vs Coalesce?',
        a: 'repartition(N): full shuffle → N even partitions. Use to increase partitions or redistribute before a heavy join.\n\ncoalesce(N): reduces partitions WITHOUT full shuffle — faster but may create uneven sizes. Use after a big filter to reduce empty partitions before write.\n\nNever coalesce to increase partitions — it cannot.',
      },
      {
        q: 'Broadcast Join?',
        a: 'When one side of a join is small (dimension table), Spark can broadcast it to all executors — avoiding shuffle of the large table.\n\nfrom pyspark.sql.functions import broadcast\ndf_big.join(broadcast(df_small), "key")\n\nDefault threshold: 10MB. For 50MB dims, increase spark.sql.autoBroadcastJoinThreshold. Huge speedup for fact-dim joins.',
      },
      {
        q: 'Skew Join?',
        a: 'Data skew: one key has 10M rows, others have 100. That partition becomes a straggler.\n\nFixes:\n1. AQE skew join (spark.sql.adaptive.skewJoin.enabled = true)\n2. Salting: add random prefix to hot key, join on salted key, then remove\n3. Broadcast the smaller side\n4. Isolate hot keys and process separately',
      },
      {
        q: 'Window Functions in PySpark?',
        a: 'from pyspark.sql.window import Window\nw = Window.partitionBy("dept").orderBy("salary")\ndf.withColumn("rank", dense_rank().over(w))\n\nCommon uses: ranking, running totals, lag/lead for change detection, row_number for dedup. Window functions are a must-know for DE interviews.',
      },
      {
        q: 'UDF vs Pandas UDF?',
        a: 'Python UDF: processes one row at a time, serializes data between JVM and Python — slow, breaks Catalyst.\n\nPandas UDF (vectorized): processes batches as pandas Series/DataFrame — 10-100x faster than row UDFs.\n\nBest practice: always try built-in functions first. If you must use UDF, use Pandas UDF.',
      },
      {
        q: 'collect() vs take()?',
        a: 'collect(): brings ALL data to driver. Dangerous on large DataFrames — can crash driver with OOM.\n\ntake(N): brings only N rows to driver. Safe.\n\nRule: NEVER use collect() on production DataFrames. Use take(), show(), or write to storage. collect() is only for tiny DataFrames you know fit in driver memory.',
      },
      {
        q: 'Checkpointing?',
        a: 'Truncates the DAG lineage by saving DataFrame to reliable storage. Two types:\n1. Reliable: writes to HDFS/ADLS — survives driver failure\n2. Local: writes to local disk — faster but lost on failure\n\nUse in iterative algorithms (ML) or very long DAG chains to prevent StackOverflow and enable recovery.',
      },
      {
        q: 'Partition pruning?',
        a: 'When your table is partitioned by a column (e.g. date), and your query filters on that column, Spark skips reading irrelevant partitions entirely.\n\nExample: Table partitioned by year/month. Query with WHERE year = 2024 AND month = 6 reads only that partition folder — not the entire table. Massive I/O savings.',
      },
      {
        q: 'AQE (Adaptive Query Execution)?',
        a: 'AQE optimizes the query plan at runtime based on actual data statistics (not estimates):\n• Auto-coalesces shuffle partitions (reduces small files)\n• Converts sort-merge joins to broadcast joins if one side is small\n• Handles skewed joins automatically\n\nEnable: spark.sql.adaptive.enabled = true (default in Databricks). A game-changer for production.',
      },
      {
        q: 'Explain DAG.',
        a: 'DAG = Directed Acyclic Graph. Spark converts your transformations into a DAG of stages and tasks.\n\nStage boundary = shuffle. Within a stage, tasks run in parallel on partitions. The DAG lets Spark optimize execution order, pipeline narrow transforms, and schedule efficiently.\n\nView it in Spark UI → SQL tab → DAG Visualization.',
      },
      {
        q: 'Spark Driver vs Executor.',
        a: 'Driver: the brain — parses code, builds DAG, schedules tasks, coordinates executors. Runs on one node.\n\nExecutor: the worker — runs tasks, stores cached data, reports results to driver. Multiple executors across cluster nodes.\n\nIf driver runs out of memory (e.g. collect() on large data), the entire job fails.',
      },
      {
        q: 'Shuffle operation.',
        a: 'Shuffle = redistribution of data across executors. Triggered by groupBy, join, distinct, repartition.\n\nIt is the #1 bottleneck: involves disk I/O, network transfer, serialization. Reduce shuffle by: filtering early, broadcast joins, partition-aligned writes, proper partition keys. Monitor shuffle read/write in Spark UI.',
      },
      {
        q: 'Memory management.',
        a: 'Executor memory splits into:\n• Execution memory: shuffles, joins, sorts, aggregations\n• Storage memory: cached DataFrames\n• User memory: UDFs, metadata\n• Reserved: Spark internal\n\nUnified memory management (default): execution and storage share a pool. Spill to disk when memory is full. Tune spark.executor.memory and spark.memory.fraction for heavy workloads.',
      },
      {
        q: 'How to optimize Spark jobs?',
        a: '1. Check Spark UI: find skewed stages, spill, shuffle\n2. Filter early — reduce data before joins/aggregations\n3. Broadcast small tables\n4. OPTIMIZE + Z-ORDER Delta tables\n5. Enable AQE\n6. Avoid collect(), UDFs, and SELECT *\n7. Right-size partitions (128MB target)\n8. Coalesce before write\n9. Cache only when reusing\n10. Fix data layout BEFORE adding cluster size',
      },
    ],
  },
  {
    id: 'databricks-100',
    label: 'Databricks',
    questions: [
      { q: 'What is Delta Lake?', a: 'Delta Lake is an open-source storage layer that brings ACID transactions, schema enforcement, and time travel to your data lake. It stores data as Parquet files + a JSON transaction log (_delta_log/).\n\nThink of it as: "reliability of a database + scalability of a data lake." Every write creates a new version — you can always query or rollback to any past state.' },
      { q: 'ACID in Delta?', a: 'Atomicity: writes either fully succeed or fully fail. Consistency: schema is enforced on every write. Isolation: concurrent reads/writes don\'t interfere. Durability: committed data survives failures.\n\nThis means no more partial writes, corrupted files, or "reading while someone else is writing" problems that plague plain Parquet.' },
      { q: 'Time Travel?', a: 'Every write creates a version. You can query any past version:\n• SELECT * FROM sales VERSION AS OF 3\n• SELECT * FROM sales TIMESTAMP AS OF "2024-01-15"\n• RESTORE TABLE sales TO VERSION AS OF 3\n\nUse for: audit, debugging, recovering deleted data, reproducing ML experiments.' },
      { q: 'OPTIMIZE command?', a: 'Delta tables accumulate many small files over time (each write adds files). OPTIMIZE compacts them into fewer, larger files.\n\nOPTIMIZE my_table;\n\nResult: fewer files → faster queries → better data skipping. Run regularly on frequently-written tables. Databricks auto-optimizes with optimizedWrite and autoCompact.' },
      { q: 'ZORDER?', a: 'Z-ORDER co-locates related data within files based on specified columns. This dramatically improves data skipping.\n\nOPTIMIZE my_table ZORDER BY (customer_id, order_date);\n\nQueries filtering on customer_id or order_date will skip most files. Choose columns used in WHERE/JOIN clauses. Don\'t Z-ORDER on too many columns — 1-3 is optimal.' },
      { q: 'VACUUM?', a: 'VACUUM removes old files that are no longer referenced by the current Delta version.\n\nVACUUM my_table RETAIN 168 HOURS;\n\nDefault retention: 7 days. Files older than retention are permanently deleted. WARNING: never VACUUM with 0 hours in production — it breaks time travel. VACUUM reclaims storage and reduces costs.' },
      { q: 'Auto Loader?', a: 'Auto Loader incrementally processes new files arriving in cloud storage (ADLS Gen2, S3). It automatically detects new files, handles schema evolution, and provides exactly-once guarantees.\n\ndf = spark.readStream.format("cloudFiles").option("cloudFiles.format", "json").load(path)\n\nIdeal for: landing zone ingestion, high-volume file arrival, schema changes over time.' },
      { q: 'Unity Catalog?', a: 'Centralized governance for all Databricks data and AI assets. Hierarchy: Metastore → Catalog → Schema → Table.\n\nProvides: fine-grained access control (GRANT/REVOKE), data lineage, audit logging, data sharing. It replaces the old Hive metastore with account-level governance across workspaces.' },
      { q: 'Delta Sharing?', a: 'Open protocol for secure data sharing across organizations — no data copying needed. The recipient reads directly from the provider\'s Delta tables using any client (Spark, pandas, Power BI).\n\nUse case: share curated Gold tables with partners or other business units without moving data.' },
      { q: 'Cluster Types?', a: 'All-Purpose: interactive development, notebooks, exploration. Stays running until manually stopped. More expensive.\n\nJob Cluster: starts for a job run, auto-terminates after. Cheaper for production. Use job clusters for scheduled ETL.\n\nSQL Warehouse: optimized for BI queries on Delta tables. Serves Power BI, Tableau, and ad-hoc SQL.' },
      { q: 'Job Cluster vs All-Purpose Cluster?', a: 'Job Cluster: ephemeral, starts fresh for each job, cheaper (automated pricing), isolated, production-grade.\n\nAll-Purpose: persistent, shared, interactive development, more expensive (all-purpose pricing).\n\nRule: develop on all-purpose, deploy on job clusters. Never run production workloads on shared interactive clusters.' },
      { q: 'Photon Engine?', a: 'Databricks\' native vectorized query engine written in C++. Replaces the JVM-based Spark SQL engine for supported operations.\n\nBenefits: 2-8x faster for SQL/DataFrame workloads, especially scans, joins, aggregations. Automatically enabled on Photon-capable clusters. No code changes needed.' },
      { q: 'Liquid Clustering?', a: 'Replaces traditional partitioning + Z-ORDER with automatic, incremental data layout optimization.\n\nCREATE TABLE t CLUSTER BY (date, region);\n\nBenefits: no need to run OPTIMIZE manually, handles evolving query patterns, works with small and large tables. The future of Delta table optimization.' },
      { q: 'Delta Transaction Log?', a: 'The _delta_log/ folder contains JSON files — one per commit. Each records: files added, files removed, metadata changes.\n\nEvery 10 commits, a checkpoint Parquet file is created for faster reads. The log enables: ACID transactions, time travel, concurrent writes, audit history. It IS Delta Lake.' },
      { q: 'MERGE INTO?', a: 'MERGE INTO target USING source ON target.id = source.id\nWHEN MATCHED THEN UPDATE SET *\nWHEN NOT MATCHED THEN INSERT *\nWHEN NOT MATCHED BY SOURCE THEN DELETE;\n\nOne statement handles insert + update + delete. This is the core of CDC, SCD, and incremental pipelines. ACID-guaranteed.' },
      { q: 'Medallion Architecture?', a: 'Bronze → Silver → Gold layered data organization:\n• Bronze: raw data as-is from source (replayable)\n• Silver: cleansed, conformed, deduplicated\n• Gold: business-level aggregates, star schema, ready for BI\n\nEach layer improves quality. This is the standard Databricks lakehouse pattern.' },
      { q: 'Workflows?', a: 'Databricks\' built-in orchestrator. Chains notebooks, SQL, Spark jobs with dependencies. Features: repair-run (retry from failure point), parameters, notifications, multi-task DAGs.\n\nUse Workflows when your entire pipeline is in Databricks. Use ADF when you need to orchestrate across Azure services (SQL, Blob, REST APIs).' },
      { q: 'Secrets Scope?', a: 'Secure storage for credentials. Backed by Azure Key Vault or Databricks-native.\n\ndbutils.secrets.get(scope="my-scope", key="storage-key")\n\nNever hardcode passwords/tokens in notebooks. Secrets are redacted in logs. Combine with cluster policies to restrict which scopes a cluster can access.' },
      { q: 'External Location?', a: 'Unity Catalog object that maps a cloud storage path (e.g. abfss://container@account.dfs.core.windows.net/path) to a storage credential.\n\nExternal tables and volumes reference external locations. This decouples storage access from individual user credentials — governance at the platform level.' },
      { q: 'Databricks Asset Bundle?', a: 'Infrastructure-as-code for Databricks. Define jobs, pipelines, clusters, and permissions in YAML. Deploy across environments (dev/staging/prod) with CLI.\n\nReplaces manual UI configuration. Enables: version control, CI/CD, environment promotion, reproducible deployments. The Databricks equivalent of Terraform for workspace resources.' },
    ],
  },
  {
    id: 'adf-100',
    label: 'Azure Data Factory',
    questions: [
      { q: 'Linked Service?', a: 'A connection definition — like a connection string. It tells ADF how to connect to a data source (SQL Server, ADLS, Databricks, REST API).\n\nBest practice: use Managed Identity or Key Vault references — never store passwords in plain text. One linked service per source system.' },
      { q: 'Dataset?', a: 'A named pointer to data within a linked service. It describes the structure (schema, format, path) but does NOT contain data itself.\n\nExample: a dataset pointing to "container/raw/sales/*.parquet" in ADLS. Parameterize datasets for reuse across multiple tables.' },
      { q: 'Pipeline?', a: 'A logical group of activities that together perform a task. Activities are the units of work (Copy, Lookup, Notebook, ForEach).\n\nPipelines can be triggered on schedule, by events, or called by other pipelines. Think of it as a workflow DAG.' },
      { q: 'Trigger Types?', a: '1. Schedule: runs at fixed intervals (every hour, daily)\n2. Tumbling Window: fixed-size, non-overlapping time windows with retry/dependency\n3. Event: fires when a file arrives in blob storage\n4. Manual: on-demand execution\n\nTumbling window is best for backfill scenarios. Event trigger for real-time file processing.' },
      { q: 'Integration Runtime?', a: 'The compute that runs ADF activities. Three types:\n1. Azure IR: cloud-to-cloud, Mapping Data Flows\n2. Self-Hosted IR: on-prem or private network access\n3. Azure-SSIS IR: runs SSIS packages in Azure\n\nIR choice depends on where your data lives and network topology.' },
      { q: 'Self-hosted IR?', a: 'A software agent installed on an on-premises machine or VM. Enables ADF to access data behind firewalls, private networks, or VPNs.\n\nUse when: source is on-prem SQL Server, file share, Oracle. The IR machine needs network access to both the source and Azure. Supports high availability with multiple nodes.' },
      { q: 'Tumbling Window Trigger?', a: 'Fires for fixed-size, non-overlapping time windows from a start time. Each window is an independent run.\n\nKey features: supports backfill (reprocess past windows), retry on failure, dependencies between windows, and concurrency control.\n\nIdeal for: daily incremental loads where each day must be processed exactly once.' },
      { q: 'Event Trigger?', a: 'Fires when a file is created or deleted in Azure Blob Storage / ADLS Gen2.\n\nUse case: vendor drops a file → trigger fires → pipeline processes it immediately. Configure with folder path and file name patterns (e.g. /incoming/*.csv).\n\nCombine with a queue for guaranteed ordering if files arrive rapidly.' },
      { q: 'Metadata Driven Framework?', a: 'Instead of one pipeline per table, store config in a control table: source, sink, watermark, load type, schedule.\n\nA generic pipeline reads config → loops with ForEach → copies/transforms each table dynamically. This scales from 5 to 500 tables without duplicating pipelines.\n\nInterviewers expect: config schema design, error logging per table, and retry strategy.' },
      { q: 'Dynamic Content?', a: 'ADF expressions let you parameterize everything: file paths, queries, schemas.\n\nExample: @concat(pipeline().parameters.container, "/", formatDateTime(utcnow(), \'yyyy/MM/dd\'), "/")\n\nUse: @pipeline(), @activity(), @variables(), @dataset() functions. Keep complex expressions in variables for readability.' },
      { q: 'Parameterization?', a: 'Pass values into pipelines, datasets, and linked services at runtime. Pipeline parameters, global parameters, and dataset parameters.\n\nExample: one generic Copy pipeline that takes table_name, source_query, and sink_path as parameters. Called by ForEach for each table in config.\n\nThis is the foundation of metadata-driven frameworks.' },
      { q: 'Incremental Load?', a: 'Load only new/changed data since last run. Steps:\n1. Lookup last watermark from control table\n2. Query source: WHERE modified_date > @watermark\n3. Copy to sink\n4. Update watermark to MAX(modified_date)\n\nMake watermark update atomic with the load. Alternatives: tumbling window slices, file modified date, CDC.' },
      { q: 'Watermarking?', a: 'Store a "high watermark" (last processed timestamp/ID) in a control table. Each run reads only rows above the watermark.\n\nRequirements: source must have a reliable, monotonically increasing column (modified_date, sequence_id). If the column is unreliable (backdated updates), watermark misses data — use CDC instead.' },
      { q: 'CDC Pipeline?', a: 'Capture changes (I/U/D) from source and apply to target.\n\nADF approaches:\n1. SQL Server CDC tables → Copy to ADLS → MERGE in Databricks\n2. ADF Mapping Data Flow with CDC connector\n3. Debezium → Event Hub → Spark Streaming\n\nKey: the target MERGE must handle insert, update, and delete in one pass.' },
      { q: 'Mapping Data Flow?', a: 'Visual ETL in ADF using Spark under the hood. Supports joins, aggregations, window functions, derived columns, conditional splits.\n\nUse when: transformations are complex but team prefers visual/low-code. Runs on Spark clusters (Azure IR). Good for: data quality, lookups, slowly changing dimensions.' },
      { q: 'Wrangling Data Flow?', a: 'Power Query-based data preparation in ADF. Uses Power Query M language for simple transformations.\n\nLimited compared to Mapping Data Flow. Use for: light cleansing, column renaming, type casting. Not suitable for complex joins or large-scale transforms. Being deprecated in favor of Mapping Data Flow.' },
      { q: 'Get Metadata Activity?', a: 'Returns metadata about a dataset: file exists, last modified, item count, column list, file size.\n\nUse cases:\n• Check if file exists before processing\n• Get list of files in a folder for ForEach\n• Validate file structure before loading\n• Conditional logic based on file age or size' },
      { q: 'Lookup Activity?', a: 'Runs a query and returns the result set (up to 5000 rows, first row, or all rows).\n\nCommon uses:\n• Read watermark from control table\n• Get list of tables to process\n• Fetch config parameters\n\nOutput is used in subsequent activities via @activity(\'Lookup1\').output.firstRow.watermark' },
      { q: 'Execute Pipeline?', a: 'Calls another pipeline — like a function call. Supports pass parameters and wait for completion.\n\nUse for: modular design. A master pipeline calls child pipelines (one per domain or load type). Children can run in parallel. Enables reusable, testable pipeline components.' },
      { q: 'Pipeline Debugging?', a: 'ADF Debug mode runs the pipeline interactively with breakpoints. You can:\n• Set breakpoints on activities\n• Inspect input/output at each step\n• Use interactive authoring with IR\n• Preview data in Data Flows\n\nAlways test in Debug before publishing. Use Monitor tab for production run diagnostics.' },
    ],
  },
  {
    id: 'azure-storage',
    label: 'Azure Storage',
    questions: [
      { q: 'Blob vs ADLS?', a: 'Blob Storage: general-purpose object storage (flat namespace). ADLS Gen2: built on Blob but adds hierarchical namespace (real folders), ACLs, and optimized for analytics.\n\nFor data engineering: always use ADLS Gen2. It supports folder-level permissions, rename operations are atomic, and Spark/Databricks performance is significantly better.' },
      { q: 'Hot vs Cool vs Archive?', a: 'Hot: frequently accessed, highest storage cost, lowest access cost. Cool: infrequent access (30+ days), lower storage, higher access cost. Archive: rarely accessed (180+ days), cheapest storage, hours to retrieve.\n\nDE pattern: raw landing = Hot, Bronze/Silver = Hot, old Gold archives = Cool, compliance archives = Archive.' },
      { q: 'Gen1 vs Gen2?', a: 'Gen1: legacy, separate service, HDFS-compatible but limited. Gen2: built on Blob Storage + hierarchical namespace — better performance, lower cost, more features.\n\nGen1 is being retired. All new projects should use Gen2. Migration path: ADF copy or Azure\'s built-in migration tool.' },
      { q: 'SAS Token?', a: 'Shared Access Signature — a URL token granting temporary, scoped access to storage resources.\n\nTypes: Account SAS, Service SAS, User Delegation SAS (most secure, uses Entra ID). SAS can limit: permissions (read/write), expiry time, IP range, protocols.\n\nUse for: temporary external access. Prefer Managed Identity for internal services.' },
      { q: 'Managed Identity?', a: 'Azure-managed identity for your service — no passwords to store or rotate. Two types:\n• System-assigned: tied to one resource, deleted with it\n• User-assigned: independent, can be shared across resources\n\nGrant the MI a role (Storage Blob Data Contributor) on the storage account. ADF, Databricks, and Functions all support MI.' },
      { q: 'RBAC?', a: 'Role-Based Access Control — assign Azure roles at subscription, resource group, or resource scope.\n\nKey storage roles:\n• Storage Blob Data Reader: read blobs\n• Storage Blob Data Contributor: read/write/delete blobs\n• Storage Blob Data Owner: full access + set ACLs\n\nRBAC controls the management plane. For folder-level control, combine with ACLs.' },
      { q: 'ACL?', a: 'Access Control Lists on ADLS Gen2 — POSIX-like permissions at folder and file level.\n\nAccess ACL: controls permissions on that object. Default ACL: automatically applied to new child items in a folder.\n\nUse for: team-level isolation (team A can only access /bronze/team_a/). Combine with RBAC for layered security.' },
      { q: 'Mounting ADLS in Databricks?', a: 'Mount: maps an ADLS path to /mnt/... in DBFS. Legacy approach — credentials stored at mount time.\n\nModern approach: Unity Catalog external locations + direct access via abfss:// URI with Managed Identity or storage credentials. Mounts are being deprecated.\n\nNever mount with storage account keys — use service principals or managed identity.' },
      { q: 'Storage redundancy types?', a: 'LRS: 3 copies in one datacenter. ZRS: 3 copies across zones in one region. GRS: 6 copies across two regions. RA-GRS: GRS + read access to secondary region.\n\nFor production data lakes: ZRS minimum (zone failure protection). For disaster recovery: GRS/RA-GRS. Cost increases with redundancy level.' },
      { q: 'Private Endpoint?', a: 'A network interface that connects your VNet privately to Azure Storage — traffic stays on Microsoft backbone, never touches public internet.\n\nDisable public access + use private endpoint = fully private storage. Required for production in regulated industries. ADF and Databricks connect via VNet injection or private endpoints.' },
    ],
  },
  {
    id: 'delta-lake',
    label: 'Delta Lake',
    questions: [
      { q: 'Delta vs Parquet?', a: 'Parquet: columnar file format — efficient storage and reads. Delta: Parquet + transaction log.\n\nDelta adds: ACID transactions, time travel, schema enforcement, MERGE/UPDATE/DELETE, concurrent writes. Parquet alone has none of these.\n\nAnalogy: Parquet is a file format. Delta is a storage layer/table format built on Parquet.' },
      { q: 'Delta Transaction Log?', a: 'The _delta_log/ folder is the brain of Delta Lake. Each commit writes a JSON file recording: files added, files removed, metadata.\n\nCheckpoint files (every 10 commits) speed up reads. The log enables: ACID, time travel, concurrent writes, schema tracking, and audit history.' },
      { q: 'Schema Evolution?', a: 'Allow the schema to change over time. Enable with:\n.option("mergeSchema", "true") — adds new columns automatically\n.option("overwriteSchema", "true") — replaces schema entirely\n\nAuto Loader handles schema evolution with schemaEvolutionMode. Critical for sources that add columns over time (APIs, evolving JSON).' },
      { q: 'Schema Enforcement?', a: 'Delta rejects writes that don\'t match the table schema — no silent data corruption.\n\nIf incoming data has an extra column or wrong type, the write fails with a clear error. This protects your curated Silver/Gold tables from bad upstream changes.\n\nCombine with schema evolution on Bronze (accept changes) and enforcement on Gold (strict).' },
      { q: 'MERGE?', a: 'MERGE INTO target USING source ON key\nWHEN MATCHED THEN UPDATE\nWHEN NOT MATCHED THEN INSERT\n\nOne atomic operation for upserts. Handles CDC, SCD, dedup, and incremental loads. The workhorse of Delta Lake pipelines.\n\nPerformance tip: MERGE benefits from Z-ORDER on the join key.' },
      { q: 'Upsert?', a: 'Update existing rows + insert new rows in one operation. Delta MERGE is the upsert mechanism:\n\nMERGE INTO target t USING source s ON t.id = s.id\nWHEN MATCHED THEN UPDATE SET *\nWHEN NOT MATCHED THEN INSERT *\n\nThis replaces the old pattern of: check if exists → update else insert. Atomic and ACID-safe.' },
      { q: 'Time Travel?', a: 'Query or restore any previous version of a Delta table:\n• df = spark.read.format("delta").option("versionAsOf", 3).load(path)\n• RESTORE TABLE sales TO VERSION AS OF 5\n\nRetained as long as files exist (controlled by VACUUM retention). Use for debugging, auditing, and recovering from bad writes.' },
      { q: 'Optimize?', a: 'Compacts small files into larger, optimally-sized files. Improves read performance and data skipping.\n\nOPTIMIZE my_table — compacts all files\nOPTIMIZE my_table WHERE date = "2024-01-15" — compacts specific partition\nOPTIMIZE my_table ZORDER BY (col) — compact + co-locate\n\nRun after bulk writes or on a schedule.' },
      { q: 'Vacuum?', a: 'Permanently removes old files no longer referenced by the transaction log.\n\nVACUUM my_table RETAIN 168 HOURS (7 days default)\n\nFrequently asked: "What happens if you VACUUM with 0 hours?" — you lose time travel. Never do this in production. VACUUM reduces storage cost on active tables.' },
      { q: 'CDC using Delta?', a: 'Delta Change Data Feed (CDF) tracks row-level changes:\n\nALTER TABLE my_table SET TBLPROPERTIES (delta.enableChangeDataFeed = true)\n\nThen read changes:\ndf = spark.read.format("delta").option("readChangeFeed", "true").option("startingVersion", 5).table("my_table")\n\nReturns _change_type (insert/update_preimage/update_postimage/delete). Perfect for downstream CDC propagation.' },
    ],
  },
  {
    id: 'data-modeling',
    label: 'Data Modeling',
    questions: [
      { q: 'Star Schema?', a: 'Central fact table surrounded by dimension tables. Fact holds measures (amount, quantity) and foreign keys. Dimensions hold descriptive attributes (customer name, product category).\n\nBenefits: simple joins, fast queries, BI-friendly. The standard warehouse model. Example: fact_sales joins dim_customer, dim_product, dim_date.' },
      { q: 'Snowflake Schema?', a: 'Star schema where dimensions are further normalized into sub-dimensions. Example: dim_product → dim_category → dim_department.\n\nPros: less storage, fewer update anomalies. Cons: more joins, slower queries, harder for BI users.\n\nIn practice: use star schema for analytics. Snowflake only when storage savings or normalization rules demand it.' },
      { q: 'Fact Table?', a: 'Stores measurable business events (transactions, clicks, orders). Contains: measures (additive numbers) + foreign keys to dimensions + degenerate dimensions (order number).\n\nTypes: Transaction fact (one row per event), Periodic snapshot (one row per period), Accumulating snapshot (tracks process milestones). Grain definition is critical.' },
      { q: 'Dimension Table?', a: 'Stores descriptive context for facts: who, what, where, when, why. Examples: dim_customer (name, city, segment), dim_date (year, month, quarter, holiday flag).\n\nDesign: wide and denormalized, surrogate key, business key, descriptive attributes. The more attributes, the richer the analysis. Date dimension is in every warehouse.' },
      { q: 'Surrogate Key?', a: 'A system-generated integer key (usually auto-increment or hash) that uniquely identifies a dimension row. NOT from the source system.\n\nWhy: handles SCD (multiple rows per business key), protects against source key changes, faster joins (integer vs string). Every dimension should have a surrogate key.' },
      { q: 'Natural Key?', a: 'The original business identifier from the source system: employee_id, product_code, SSN.\n\nProblem: can change, can be reused, can differ across source systems. That\'s why we add surrogate keys and keep the natural key as a business_key column for lookups and matching.' },
      { q: 'SCD Type 1?', a: 'Overwrite the old value. No history preserved.\n\nExample: customer moves from Mumbai to Pune → just UPDATE city = "Pune". The old value is gone.\n\nUse when: you don\'t need history (fixing typos, updating phone numbers). Simple but destructive. Past reports change retroactively.' },
      { q: 'SCD Type 2?', a: 'Keep full history by adding a new row. The old row gets: end_date = yesterday, is_current = false. The new row gets: start_date = today, end_date = 9999-12-31, is_current = true.\n\nEvery past report stays accurate — joins use the version valid at that time. Most interview questions focus on SCD Type 2.' },
      { q: 'Factless Fact?', a: 'A fact table with no measures — just foreign keys recording that an event occurred.\n\nExample: student_attendance fact: student_key, class_key, date_key. No amount or quantity — just "Alice attended Math on Monday."\n\nUse for: attendance, coverage, eligibility. Query: "Which students did NOT attend?" requires a factless fact.' },
      { q: 'Bridge Table?', a: 'Resolves many-to-many relationships between a fact and a dimension.\n\nExample: one patient has multiple diagnoses. Bridge table: patient_key, diagnosis_key, weighting_factor.\n\nWithout a bridge: either duplicate fact rows (inflating measures) or lose the relationship. The weighting factor prevents double-counting in aggregations.' },
    ],
  },
  {
    id: 'azure-security',
    label: 'Azure Security',
    questions: [
      { q: 'Managed Identity?', a: 'Azure automatically manages credentials for your service. No passwords to store, rotate, or leak.\n\nSystem-assigned MI: created with the resource, deleted with it. User-assigned MI: independent lifecycle, shareable.\n\nADF → ADLS: grant MI "Storage Blob Data Contributor" role. Databricks → Key Vault: grant MI "Get" secret permission. The gold standard for Azure service-to-service auth.' },
      { q: 'Service Principal?', a: 'An application identity in Azure AD (Entra ID) — like a user account for automation. Has client ID + client secret or certificate.\n\nUse when Managed Identity isn\'t available (cross-tenant, external tools). Register app → create secret → grant RBAC roles. Rotate secrets regularly. Prefer MI when possible.' },
      { q: 'Key Vault?', a: 'Centralized secret storage: connection strings, passwords, certificates, keys. Access controlled via RBAC or access policies.\n\nPattern: store secrets in Key Vault → reference from ADF Linked Service or Databricks secret scope. Never hardcode secrets in code, pipelines, or config files.' },
      { q: 'RBAC?', a: 'Role-Based Access Control — assign roles (Reader, Contributor, Owner, custom) to users/groups/service principals at a scope (subscription, resource group, resource).\n\nPrinciple of least privilege: give minimum required permissions. Audit with Azure Activity Log. Combine with Azure Policy for guardrails.' },
      { q: 'ACL?', a: 'POSIX-style permissions on ADLS Gen2 folders and files: read (r), write (w), execute (x) for owner, group, other.\n\nDefault ACLs propagate to new child items. Use for: team isolation (/bronze/finance/ accessible only to finance team). Layer with RBAC for defense in depth.' },
      { q: 'Encryption at Rest?', a: 'All Azure Storage data is encrypted at rest by default using Microsoft-managed keys (AES-256).\n\nOptions: Microsoft-managed keys (default, zero effort), Customer-managed keys (your key in Key Vault, more control), Customer-provided keys (per-request). For most DE workloads, default encryption is sufficient.' },
      { q: 'Encryption in Transit?', a: 'Data encrypted during transfer using TLS/HTTPS. Azure enforces HTTPS by default on storage accounts (can require it via "Secure transfer required" setting).\n\nAll Databricks, ADF, and Azure service communications use TLS. No additional configuration needed for standard setups.' },
      { q: 'Unity Catalog Security?', a: 'Unity Catalog provides centralized access control across Databricks:\n• GRANT/REVOKE at catalog, schema, table, column level\n• Row filters and column masks for fine-grained control\n• Audit logs for all data access\n• Ownership model with privileges inheritance\n\nReplaces legacy table ACLs with a unified governance model.' },
      { q: 'Row Level Security?', a: 'Restrict which rows a user can see based on their identity. In Unity Catalog: CREATE FUNCTION row_filter... then apply to table.\n\nExample: sales reps see only their region\'s data. Implemented via security policies/functions, not application logic. Critical for multi-tenant data platforms.' },
      { q: 'Column Level Security?', a: 'Hide or mask sensitive columns based on user role. In Unity Catalog: column masks return masked values for unauthorized users.\n\nExample: SSN column shows "***-**-1234" for analysts but full value for admins. Implemented at the catalog level — works across all query tools (notebooks, SQL, BI).' },
    ],
  },
  {
    id: 'system-design',
    label: 'System Design',
    questions: [
      { q: 'Design a Lakehouse Architecture.', a: 'Layers: Ingestion (ADF/Auto Loader) → Bronze (raw, ADLS Gen2, Delta) → Silver (cleansed, Databricks) → Gold (star schema, Delta) → Serving (SQL Warehouse, Power BI).\n\nCross-cutting: Unity Catalog (governance), Key Vault (secrets), Monitor (alerts), CI/CD (Databricks Asset Bundles).\n\nKey decisions: partition strategy, SCD handling, data quality gates between layers, cost optimization (auto-scaling, spot instances).' },
      { q: 'Design CDC Pipeline.', a: 'Source: SQL Server with CDC enabled → ADF copies change tables to Bronze (ADLS, Parquet) → Databricks reads changes, applies MERGE INTO Silver Delta table → Quality checks → Publish to Gold.\n\nHandle: initial full load + incremental CDC. Track watermarks. Dead letter queue for failures. Exactly-once with Delta MERGE idempotency. Monitor lag.' },
      { q: 'Design Real-time Streaming Pipeline.', a: 'Sources (IoT/Apps) → Event Hub/Kafka → Spark Structured Streaming (Databricks) → Transform/enrich → Write to Delta Lake (append/merge) → Serve via SQL Warehouse.\n\nKey: trigger interval (micro-batch vs continuous), checkpoint location, exactly-once semantics, schema registry, late data handling (watermarks), monitoring with Spark UI + Azure Monitor.' },
      { q: 'Design Medallion Architecture.', a: 'Bronze: raw ingestion, schema-on-read, partitioned by date, append-only. Silver: cleaned, validated, deduplicated, business keys applied, Delta MERGE for updates. Gold: dimensional model (star schema), pre-aggregated for BI, optimized with Z-ORDER.\n\nPromotion gates: data quality checks (null rates, row counts, schema validation) between each layer. Separate compute for each layer.' },
      { q: 'Design Metadata Driven Framework.', a: 'Config table: source_system, table_name, load_type (full/incremental), watermark_column, source_query, sink_path, schedule, is_active.\n\nGeneric pipeline: Lookup config → ForEach active table → parameterized Copy/Transform → update watermark → log success/failure.\n\nBenefits: one pipeline for 500 tables. Add a table by inserting one config row. Centralized monitoring and retry.' },
      { q: 'Design Multi-tenant Data Platform.', a: 'Options:\n1. Shared infrastructure, isolated schemas (Unity Catalog: catalog per tenant)\n2. Shared infrastructure, row-level security (filter by tenant_id)\n3. Separate infrastructure per tenant (most isolated, most expensive)\n\nKey: data isolation, cost allocation (chargeback by tenant), performance isolation (fair scheduling), compliance (data residency), onboarding automation.' },
      { q: 'Design Enterprise Data Warehouse.', a: 'Landing Zone (ADLS) → Staging (raw loads) → Warehouse (dimensional model: facts + dims) → Data Marts (department-specific) → BI Layer (Power BI, Tableau).\n\nETL: ADF for ingestion, Databricks for transform, Delta for storage. Governance: Unity Catalog. Security: RBAC + ACLs + RLS. Performance: partitioning, Z-ORDER, materialized views.' },
      { q: 'Design Event Driven Architecture.', a: 'Events → Event Hub (ingestion) → Function App (routing/enrichment) → Multiple consumers: Spark Streaming (analytics), Cosmos DB (operational), Service Bus (workflow triggers).\n\nSchema: Event Grid for Azure resource events, Event Hub for high-throughput custom events. Ensure: idempotent consumers, dead letter queues, event ordering per partition, replay capability.' },
      { q: 'Design Data Governance Framework.', a: 'Components:\n1. Catalog: Unity Catalog (discovery, lineage, classification)\n2. Access Control: RBAC + ACLs + column/row security\n3. Quality: DLT expectations, Great Expectations\n4. Privacy: PII classification, masking, retention policies\n5. Audit: access logs, change tracking\n6. Stewardship: data owners, SLAs, documentation\n\nStart with cataloging and access control — these give the most immediate value.' },
      { q: 'Design Cost Optimized Azure Data Platform.', a: 'Compute: job clusters (not interactive) for production, auto-scaling with min/max, spot instances for non-critical jobs, auto-terminate idle clusters.\n\nStorage: lifecycle policies (Hot → Cool → Archive), OPTIMIZE/VACUUM Delta tables, delete staging data after load.\n\nIngestion: incremental loads (not full), right-size DIUs in ADF.\n\nMonitor: Azure Cost Management tags per team/project, Databricks cluster policies, usage dashboards. Set budgets with alerts.' },
    ],
  },
]

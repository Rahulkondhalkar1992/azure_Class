import SparkTransformations from '../components/concepts/SparkTransformations.jsx'
import LazyEvalDAG from '../components/concepts/LazyEvalDAG.jsx'
import DeltaACID from '../components/concepts/DeltaACID.jsx'
import OptimizeVacuumZOrder from '../components/concepts/OptimizeVacuumZOrder.jsx'
import AutoLoaderStreaming from '../components/concepts/AutoLoaderStreaming.jsx'
import DeltaLiveTables from '../components/concepts/DeltaLiveTables.jsx'
import UnityCatalog from '../components/concepts/UnityCatalog.jsx'
import SparkJoinsSkew from '../components/concepts/SparkJoinsSkew.jsx'
import MergeInsert from '../components/concepts/MergeInsert.jsx'
import SparkCachePersist from '../components/concepts/SparkCachePersist.jsx'
import IncrementalLoad from '../components/concepts/IncrementalLoad.jsx'
import BatchProcessing from '../components/concepts/BatchProcessing.jsx'
import CDCAnimation from '../components/concepts/CDCAnimation.jsx'
import SCDType2 from '../components/concepts/SCDType2.jsx'
import DeltaLogBenefits from '../components/concepts/DeltaLogBenefits.jsx'
import StreamingDataFlow from '../components/concepts/StreamingDataFlow.jsx'

/**
 * Learning catalog for Concepts page.
 * Similar questions share one underlying answer (same concept explanation).
 */
export const conceptSections = [
  {
    id: 'spark-fundamentals',
    heading: 'Spark Fundamentals',
    blurb: 'How Spark plans work and when data actually moves.',
    concepts: [
      {
        id: 'spark-transformations',
        title: 'Spark Transformations & Actions',
        tag: 'Spark',
        summary: 'Lazy transforms build a plan; actions run the job.',
        explanation:
          'In Spark, most operations are transformations — they describe what you want, but they do not run immediately. Spark records them as a plan. When you call an action (count, show, write), Spark optimizes that plan and executes it across the cluster. This is why chaining many selects/filters feels cheap until the write happens.',
        example:
          'Azure DE use case: In Databricks you clean Bronze with filter/select/withColumn (transformations), then only when you write to Silver Delta does the job actually run. Interviewers often ask why nothing happens until .write or .count().',
        Visual: SparkTransformations,
        similarQuestions: [
          { q: 'What is the difference between a transformation and an action in Spark?' },
          { q: 'Why does my notebook feel fast until I call count() or write()?' },
          { q: 'Name narrow vs wide transformations and why wide ones are costly.' },
          { q: 'What happens when an action is triggered on a DataFrame?' },
        ],
        sharedAnswer:
          'Transformations are lazy and build a DAG. Actions trigger Catalyst optimization and cluster execution. Narrow transforms stay in-partition; wide transforms shuffle. Same idea whether the question says “lazy”, “action”, or “why is write slow”.',
      },
      {
        id: 'lazy-dag',
        title: 'Lazy Evaluation & DAG',
        tag: 'Spark',
        summary: 'Spark builds a Directed Acyclic Graph, then runs it.',
        explanation:
          'Lazy evaluation means Spark waits until an action before doing heavy work. Internally it builds a DAG of stages. Stage boundaries usually appear at shuffles. Understanding the DAG helps you debug skew, spill, and unnecessary shuffles in the Spark UI.',
        example:
          'On Databricks Job UI / Spark UI: open the SQL/DAG tab after a failed Gold load. You will see which stage shuffled on customer_id — that is where to apply broadcast, salting, or filter pushdown.',
        Visual: LazyEvalDAG,
        similarQuestions: [
          { q: 'Explain lazy evaluation in Spark with a simple example.' },
          { q: 'What is a DAG in Spark and when is it created?' },
          { q: 'How do you use the Spark UI DAG to find a bottleneck?' },
          { q: 'Why can chaining 10 transformations be cheap?' },
        ],
        sharedAnswer:
          'All of these ask the same core idea: transformations record intent; the DAG is the plan; an action executes optimized stages. Cost usually sits at shuffle stage boundaries.',
      },
    ],
  },
  {
    id: 'delta-core',
    heading: 'Delta Lake Core',
    blurb: 'Reliability on the lake — ACID, log, optimize, vacuum, Z-Order.',
    concepts: [
      {
        id: 'delta-acid',
        title: 'Delta Lake — ACID & Time Travel',
        tag: 'Delta',
        summary: 'Lake storage with database-like reliability and versions.',
        explanation:
          'Delta Lake stores data as Parquet plus a transaction log. That log gives ACID writes: concurrent readers do not see half-written files, and failed jobs do not corrupt the table. Every successful write creates a version, so you can query or restore older versions (time travel).',
        example:
          'A bad MERGE overwrote Silver customers. Instead of re-ingesting a week of ADF loads, you RESTORE TABLE customers TO VERSION AS OF 12, then fix the MERGE and re-run only the latest batch.',
        Visual: DeltaACID,
        similarQuestions: [
          { q: 'How does Delta Lake provide ACID on a data lake?' },
          { q: 'What is time travel in Delta and when do you use it?' },
          { q: 'Delta vs plain Parquet — what does the transaction log add?' },
          { q: 'What happens if a Spark write fails mid-way on a Delta table?' },
        ],
        sharedAnswer:
          'The _delta_log is the brain: atomic commits, isolation for readers, and version history for time travel/restore. Parquet alone has none of that.',
      },
      {
        id: 'delta-log',
        title: 'Delta Transaction Log Benefits',
        tag: 'Delta',
        summary: 'JSON commits + checkpoints enable audit, concurrency, history.',
        explanation:
          'Each commit writes a JSON file listing added/removed files. Periodically a checkpoint speeds up reads. This log is how Delta supports concurrent writers, audit history, and reproducible reads of past versions — without copying the whole table.',
        example:
          'Auditors ask “who changed Gold sales on Tuesday?” You inspect DESCRIBE HISTORY and the log versions around that time, then compare row counts before/after the suspicious job.',
        Visual: DeltaLogBenefits,
        similarQuestions: [
          { q: 'What is stored in the Delta transaction log?' },
          { q: 'Why does Delta create checkpoint files?' },
          { q: 'How does Delta support concurrent reads and writes?' },
          { q: 'How do you audit changes to a Delta table?' },
        ],
        sharedAnswer:
          'Commits in _delta_log record file adds/removes and metadata. Checkpoints accelerate reading the log. History/time travel and concurrency all come from that design.',
      },
      {
        id: 'optimize-vacuum',
        title: 'OPTIMIZE, VACUUM & Z-ORDER',
        tag: 'Delta',
        summary: 'Compact files, reclaim storage, co-locate data for faster filters.',
        explanation:
          'Many small files slow reads. OPTIMIZE compacts them. Z-ORDER rearranges data so filters on key columns skip more files. VACUUM deletes unreferenced old files after a retention period — reclaiming storage but reducing how far you can time-travel.',
        example:
          'After nightly Auto Loader drops thousands of tiny Bronze files, a scheduled job runs OPTIMIZE bronze_orders ZORDER BY (order_date, customer_id), then VACUUM with 7-day retention to control ADLS cost.',
        Visual: OptimizeVacuumZOrder,
        similarQuestions: [
          { q: 'What problem does OPTIMIZE solve in Delta?' },
          { q: 'When should you use Z-ORDER and on which columns?' },
          { q: 'What does VACUUM do and what is the risk of RETAIN 0 HOURS?' },
          { q: 'How do you reduce the small-files problem on a busy Bronze table?' },
        ],
        sharedAnswer:
          'Small files hurt performance → OPTIMIZE. Filter-heavy columns → Z-ORDER. Old files cost money → VACUUM carefully (keep retention for time travel).',
      },
    ],
  },
  {
    id: 'ingestion-streaming',
    heading: 'Ingestion & Streaming',
    blurb: 'How data arrives — batch, incremental, CDC-style streams, Auto Loader.',
    concepts: [
      {
        id: 'autoloader',
        title: 'Auto Loader & Structured Streaming',
        tag: 'Ingestion',
        summary: 'Incrementally discover new cloud files with exactly-once style loads.',
        explanation:
          'Auto Loader watches cloud storage for new files and feeds Structured Streaming. It scales file discovery better than listing huge directories yourself, and it can evolve schema as new columns appear. You still checkpoint so restarts do not double-load.',
        example:
          'Vendors drop CSVs into ADLS `/landing/orders/`. A Databricks streaming job with cloudFiles format continuously lands them into Bronze Delta — no ADF ForEach over thousands of file names.',
        Visual: AutoLoaderStreaming,
        similarQuestions: [
          { q: 'What is Auto Loader and when do you prefer it over Copy Activity?' },
          { q: 'How does Auto Loader handle schema evolution?' },
          { q: 'Why do streaming jobs need a checkpoint location?' },
          { q: 'Explain Structured Streaming in one practical sentence.' },
        ],
        sharedAnswer:
          'Auto Loader = incremental file ingestion into a streaming query, with scalable discovery, schema options, and checkpointed progress for reliable restarts.',
      },
      {
        id: 'streaming-flow',
        title: 'Streaming Data Flow',
        tag: 'Streaming',
        summary: 'Continuous micro-batches from source → transform → sink.',
        explanation:
          'Streaming pipelines process data as it arrives (often in micro-batches). You define source, transforms, and sink once; the engine keeps running. Late data, watermarks, and checkpoints decide correctness under failure and delay.',
        example:
          'IoT events land in Event Hub → Databricks Structured Streaming enriches and MERGEs into Silver device_status → Power BI dashboard refreshes near real time.',
        Visual: StreamingDataFlow,
        similarQuestions: [
          { q: 'Batch vs streaming — when do you choose each?' },
          { q: 'What is a micro-batch in Spark Structured Streaming?' },
          { q: 'How do you make a streaming pipeline restart-safe?' },
          { q: 'What business problems need streaming over nightly batch?' },
        ],
        sharedAnswer:
          'Streaming continuously processes new events with checkpointed state; batch processes fixed windows. Choose streaming when freshness SLA is minutes, not hours.',
      },
      {
        id: 'incremental-load',
        title: 'Incremental Load',
        tag: 'Ingestion',
        summary: 'Load only new/changed rows using a watermark or change feed.',
        explanation:
          'Full loads re-copy everything and get expensive. Incremental loads remember a high-water mark (timestamp/ID) and pull only newer rows. Success depends on a reliable source column and updating the watermark only after a successful write.',
        example:
          'ADF Lookup reads last_success_ts from a control table, Copy filters SQL `ModifiedDate > @watermark` into ADLS, then updates the control table — daily Orders extract finishes in minutes instead of hours.',
        Visual: IncrementalLoad,
        similarQuestions: [
          { q: 'How do you implement incremental load in ADF?' },
          { q: 'What is a watermark in data engineering?' },
          { q: 'Full load vs incremental load — trade-offs?' },
          { q: 'What goes wrong if you update the watermark before Copy succeeds?' },
        ],
        sharedAnswer:
          'Store a watermark, filter source > watermark, load, then advance watermark atomically after success. Same concept whether asked as ADF, SQL, or “how do you avoid full refresh”.',
      },
      {
        id: 'batch-processing',
        title: 'Batch Processing',
        tag: 'Ingestion',
        summary: 'Process a fixed slice of data on a schedule.',
        explanation:
          'Batch jobs run on a schedule (hourly/daily) over a complete slice of data. They are simpler to reason about than streaming, fit most warehouse loads, and pair well with tumbling windows and SLA dashboards.',
        example:
          'Every night at 1 AM, ADF triggers a Databricks notebook that rebuilds Gold fact_sales for yesterday’s partition from Silver — BI teams see numbers ready by 7 AM.',
        Visual: BatchProcessing,
        similarQuestions: [
          { q: 'What is batch processing in a lakehouse?' },
          { q: 'When is batch good enough instead of streaming?' },
          { q: 'How do tumbling window triggers relate to batch slices?' },
          { q: 'How do you design an idempotent daily batch job?' },
        ],
        sharedAnswer:
          'Batch = scheduled processing of a defined data window. Prefer it when latency SLA is hours and you need simple, repeatable, idempotent loads.',
      },
    ],
  },
  {
    id: 'dlt-gov',
    heading: 'DLT & Governance',
    blurb: 'Managed pipelines and centralized permissions.',
    concepts: [
      {
        id: 'dlt',
        title: 'Delta Live Tables (DLT)',
        tag: 'DLT',
        summary: 'Declarative pipelines with expectations and managed orchestration.',
        explanation:
          'DLT lets you declare Bronze/Silver/Gold tables and quality expectations in code. Databricks manages retries, dependencies, and monitoring. Failed expectations can drop, fail, or quarantine rows depending on how you configure them.',
        example:
          'A medallion DLT pipeline lands Auto Loader Bronze, applies “order_id IS NOT NULL” expectations into Silver, and publishes Gold dims — ops watches the DLT event log instead of a custom ADF spider web.',
        Visual: DeltaLiveTables,
        similarQuestions: [
          { q: 'What is Delta Live Tables and when do you use it?' },
          { q: 'What are DLT expectations?' },
          { q: 'DLT vs classic notebook jobs — what is the difference?' },
          { q: 'How does DLT help with medallion architecture?' },
        ],
        sharedAnswer:
          'DLT is declarative, managed ETL on Delta with built-in quality expectations and pipeline orchestration — ideal for layered lakehouse flows.',
      },
      {
        id: 'unity-catalog',
        title: 'Unity Catalog',
        tag: 'Governance',
        summary: 'Metastore → catalog → schema → table with centralized grants.',
        explanation:
          'Unity Catalog is the governance layer across workspaces. You organize data as catalog/schema/table, grant permissions centrally, and attach storage credentials/external locations so ADLS access is controlled. It also supports lineage and finer security patterns.',
        example:
          'Finance catalog is visible only to finance groups via GRANT. Marketing cannot SELECT gold.customer_pii columns; row filters hide other regions — one metastore policy instead of notebook-level chaos.',
        Visual: UnityCatalog,
        similarQuestions: [
          { q: 'What is Unity Catalog and what is the object hierarchy?' },
          { q: 'Managed vs external tables under Unity Catalog?' },
          { q: 'How do you secure ADLS paths with Unity Catalog?' },
          { q: 'Why replace hive_metastore with Unity Catalog?' },
        ],
        sharedAnswer:
          'UC centralizes metastore governance: catalog → schema → table, with grants, external locations, and consistent security/lineage across workspaces.',
      },
    ],
  },
  {
    id: 'joins-perf',
    heading: 'Joins, Skew & Performance',
    blurb: 'Make Spark jobs finish on time.',
    concepts: [
      {
        id: 'joins-skew',
        title: 'Spark Joins & Data Skew',
        tag: 'Performance',
        summary: 'Pick join strategy; fix hot keys that stall one partition.',
        explanation:
          'Large joins shuffle data. If one key is huge (skew), one task runs forever. Fixes include broadcast of small dimensions, AQE skew join, and salting hot keys. Always check Spark UI for straggler tasks before “just add more workers”.',
        example:
          'fact_clicks JOIN dim_campaign is fine with broadcast(dim). But joining on skewed user_id=“unknown” stalls — salt that key or isolate nulls before the join in the Gold build.',
        Visual: SparkJoinsSkew,
        similarQuestions: [
          { q: 'When do you use a broadcast join?' },
          { q: 'What is data skew and how do you detect it?' },
          { q: 'How do you fix a skewed join in Spark?' },
          { q: 'Sort-merge vs broadcast join — how do you choose?' },
        ],
        sharedAnswer:
          'Broadcast small side; watch for skew on hot keys; use AQE/salting/isolation. Same diagnosis whether the question says “straggler”, “skew”, or “join optimization”.',
      },
      {
        id: 'cache-persist',
        title: 'cache() vs persist()',
        tag: 'Performance',
        summary: 'Reuse a DataFrame multiple times — or don’t cache at all.',
        explanation:
          'Caching stores a DataFrame so later actions reuse it. persist() lets you choose storage level. Caching a one-pass ETL wastes memory. Always unpersist when done. On Databricks, Delta + AQE often beats caching giant Bronze tables.',
        example:
          'An ML feature notebook filters Silver once, then trains three models on the same frame — df.cache() before the loop, unpersist after. A single-write Gold ETL should not cache.',
        Visual: SparkCachePersist,
        similarQuestions: [
          { q: 'Difference between cache() and persist()?' },
          { q: 'When is caching a bad idea?' },
          { q: 'Do you need to unpersist? Why?' },
          { q: 'Cache vs writing an intermediate Delta table?' },
        ],
        sharedAnswer:
          'Cache/persist only when the same dataset is reused in one job; pick storage level with persist; unpersist after. Otherwise prefer Delta intermediates.',
      },
    ],
  },
  {
    id: 'data-patterns',
    heading: 'Data Patterns',
    blurb: 'MERGE, CDC, and SCD Type 2 — interview favorites.',
    concepts: [
      {
        id: 'merge-insert',
        title: 'MERGE INTO vs INSERT INTO',
        tag: 'SQL / Delta',
        summary: 'INSERT appends; MERGE upserts by key in one atomic statement.',
        explanation:
          'INSERT INTO adds rows (or overwrites a partition). MERGE matches source to target on keys and can update, insert, or delete in one transaction — perfect for incremental and CDC application. On Delta, MERGE is ACID-safe.',
        example:
          'Nightly Silver customers: MERGE INTO silver.customers t USING staging s ON t.customer_id = s.customer_id WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT — no separate update-then-insert scripts.',
        Visual: MergeInsert,
        similarQuestions: [
          { q: 'Difference between INSERT INTO and MERGE INTO?' },
          { q: 'How do you upsert into a Delta table?' },
          { q: 'When is MERGE better than overwrite table?' },
          { q: 'How does MERGE support CDC apply?' },
        ],
        sharedAnswer:
          'INSERT adds; MERGE matches keys to update/insert/delete atomically. Upsert and CDC apply almost always mean MERGE on Delta.',
      },
      {
        id: 'cdc',
        title: 'Change Data Capture (CDC)',
        tag: 'CDC',
        summary: 'Capture inserts, updates, deletes — not just “new timestamps”.',
        explanation:
          'CDC reads change events (or change tables) so you get inserts, updates, and deletes. Watermark-only incremental can miss deletes and late fixes. Downstream you usually apply changes with MERGE into Silver/Gold.',
        example:
          'SQL Server CDC → ADF lands change rows to ADLS → Databricks MERGE into silver.orders including deletes. Finance totals stay correct when orders are cancelled upstream.',
        Visual: CDCAnimation,
        similarQuestions: [
          { q: 'What is CDC and why is it better than date watermark alone?' },
          { q: 'How do you apply CDC changes into a Delta table?' },
          { q: 'What source features are needed for log-based CDC?' },
          { q: 'How do you handle deletes in an incremental pipeline?' },
        ],
        sharedAnswer:
          'CDC captures I/U/D from the source change stream/log; apply with MERGE. Watermarks alone often miss deletes — that is the usual interview distinction.',
      },
      {
        id: 'scd2',
        title: 'SCD Type 2',
        tag: 'Modeling',
        summary: 'Keep history by expiring the old row and inserting a new version.',
        explanation:
          'SCD Type 2 preserves history of dimension attributes. When Alice moves city, you close the old row (end_date / is_current=false) and insert a new current row. Facts join to the version valid at event time so past reports stay correct.',
        example:
          'dim_customer tracks region for commission reports. When a customer moves from West to South, SCD2 keeps both versions so January sales still attribute to West.',
        Visual: SCDType2,
        similarQuestions: [
          { q: 'Explain SCD Type 2 with an example.' },
          { q: 'SCD Type 1 vs Type 2 — which keeps history?' },
          { q: 'How do you implement SCD2 with SQL MERGE?' },
          { q: 'Why do warehouses need surrogate keys for SCD2?' },
        ],
        sharedAnswer:
          'Type 2 = full history via new rows + effective dates/flags. Type 1 overwrites. Surrogate keys identify each version while business keys stay stable.',
      },
    ],
  },
]

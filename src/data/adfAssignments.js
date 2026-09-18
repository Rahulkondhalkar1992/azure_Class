/**
 * ADF Assignments — medium to hard, scenario-based.
 * NO watermark topics (not taught yet).
 * Activities: Copy, ForEach, If, Switch, Filter, Get Metadata, Lookup.
 */

export const adfAssignments = [
  {
    id: 'adf-01',
    number: 1,
    level: 'Medium',
    title: 'Today’s CSV Landing — Filter by name + lastModified',
    scenario:
      'A vendor drops sales files into ADLS Gen2 folder `/landing/sales/`. You will find `.csv` files, a `.json`, a `.txt`, and notes. Your pipeline must copy ONLY `.csv` files that were modified TODAY into `/bronze/sales/yyyy/MM/dd/`.',
    businessGoal:
      'Prevent loading wrong file types and avoid reprocessing older files.',
    activities: ['Get Metadata', 'Filter', 'ForEach', 'Copy'],
    expressionsFocus: [
      'endsWith(item().name, \'.csv\')',
      'equals(item().type, \'File\') or itemType check',
      'formatDateTime(utcnow(), \'yyyy-MM-dd\')',
      'formatDateTime(item().lastModified, \'yyyy-MM-dd\')',
      'concat for sink folder path',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_01',
    tasks: [
      'Upload Assignment_01 files to ADLS `/landing/sales/` (upload CSVs on the lab day so lastModified = today).',
      'Get Metadata on `/landing/sales/` with Child Items.',
      'Filter: File + endsWith .csv + lastModified date equals today.',
      'ForEach → Copy each file; sink folder uses concat + yyyy/MM/dd.',
      'Source file name = `@item().name`.',
    ],
    expressionChallenges: [
      {
        prompt: 'Write a Filter condition that keeps only CSV files modified today.',
        hint: 'Combine endsWith + equals on formatDateTime(lastModified) vs formatDateTime(utcnow()).',
      },
      {
        prompt: 'Build the dynamic sink folder with concat + formatDateTime.',
        hint: "concat('bronze/sales/', formatDateTime(utcnow(),'yyyy'), '/', formatDateTime(utcnow(),'MM'), '/', formatDateTime(utcnow(),'dd'))",
      },
    ],
    acceptance: [
      'Non-CSV files are ignored.',
      'Only today’s CSVs land under the correct yyyy/MM/dd folder.',
      'Pipeline re-run same day does not break.',
    ],
    stretch: 'If Filter returns zero files, succeed with a message instead of failing.',
  },
  {
    id: 'adf-02',
    number: 2,
    level: 'Medium',
    title: 'Lookup file list → If exists → Copy (no watermark)',
    scenario:
      'Ops maintains a control CSV `files_to_process.csv` listing which order files should be loaded today. Some listed files may be missing in `/landing/orders/`. Lookup the control file, loop each FileName, Get Metadata (exists), If exists then Copy to `/bronze/orders/yyyyMMdd/`, else skip (or set a warning message).',
    businessGoal:
      'Process only approved filenames from a control list; safely handle missing files.',
    activities: ['Lookup', 'ForEach', 'Get Metadata', 'If', 'Copy'],
    expressionsFocus: [
      'activity(\'LookupFiles\').output.value',
      'item().FileName inside ForEach',
      'activity(\'GetMeta\').output.exists',
      'concat for source/sink paths using item().FileName',
      'endswith(item().FileName, \'.csv\') optional validation',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_02',
    tasks: [
      'Upload control + landing files from Assignment_02.',
      'Lookup activity on `control/files_to_process.csv` (First row only = false).',
      'ForEach over Lookup output array.',
      'Inside loop: Get Metadata on `/landing/orders/@{item().FileName}` with exists.',
      'If exists == true → Copy to bronze dated folder; else do nothing (or Append Variable with missing name).',
      'Sink path must use concat + formatDateTime(utcnow(),\'yyyyMMdd\').',
    ],
    expressionChallenges: [
      {
        prompt: 'Build dynamic source file path from item().FileName.',
        hint: "concat('landing/orders/', item().FileName)",
      },
      {
        prompt: 'Write If Condition using Get Metadata exists.',
        hint: "@equals(activity('GetMeta').output.exists, true)",
      },
      {
        prompt: 'Build bronze sink folder for today.',
        hint: "concat('bronze/orders/', formatDateTime(utcnow(),'yyyyMMdd'))",
      },
    ],
    acceptance: [
      'Files listed AND present are copied to bronze.',
      'Files listed but missing do not fail the whole pipeline.',
      'Files present in landing but NOT in control list are not copied.',
    ],
    stretch: 'Collect missing filenames into an array variable and output them at pipeline end.',
  },
  {
    id: 'adf-03',
    number: 3,
    level: 'Medium–Hard',
    title: 'Route files by extension with Switch (CSV / JSON / TXT)',
    scenario:
      'Inbound folder `/landing/inbox/` receives mixed files: `.csv`, `.json`, `.txt`, `.tmp`, and a name containing `temp`. Route valid files to `/bronze/csv/`, `/bronze/json/`, or `/bronze/txt/`. Ignore `.tmp` and names containing `temp`.',
    businessGoal:
      'One pipeline that fans out by file format.',
    activities: ['Get Metadata', 'Filter', 'ForEach', 'Switch', 'Copy'],
    expressionsFocus: [
      'endsWith / toLower',
      'contains(item().name, \'temp\')',
      'nested if() for Switch on',
      'concat for destination folders',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_03',
    tasks: [
      'Upload Assignment_03 inbox files.',
      'Get Metadata Child Items → Filter (File, not .tmp, not contains temp).',
      'ForEach → Switch on csv|json|txt|other.',
      'Each case Copy to matching bronze folder.',
      'Default: quarantine folder.',
    ],
    expressionChallenges: [
      {
        prompt: 'Switch on expression using nested if + endsWith + toLower.',
        hint: "if(endswith(toLower(item().name),'.csv'),'csv', if(endswith(...,'.json'),'json', if(endswith(...,'.txt'),'txt','other')))",
      },
      {
        prompt: 'Filter out temp and tmp files.',
        hint: "and(not(endswith(toLower(item().name),'.tmp')), not(contains(toLower(item().name),'temp')))",
      },
    ],
    acceptance: [
      'CSV/JSON/TXT land in correct bronze folders.',
      'tmp and *temp* files never appear in bronze.',
      'Unknown extensions go to quarantine.',
    ],
    stretch: 'Inside each case, If size == 0 (Get Metadata) → quarantine instead.',
  },
  {
    id: 'adf-04',
    number: 4,
    level: 'Medium',
    title: 'Weekday vs Weekend processing branch (If + date functions)',
    scenario:
      'On weekdays process all `finance_*.csv` from `/landing/finance/`. On Saturday/Sunday only copy `heartbeat.csv` if it exists.',
    businessGoal:
      'Reduce weekend compute and avoid heavy empty loads.',
    activities: ['If', 'Get Metadata', 'Filter', 'ForEach', 'Copy'],
    expressionsFocus: [
      'dayOfWeek(utcnow())',
      'or / and / equals',
      'startswith(item().name, \'finance_\')',
      'endsWith(item().name, \'.csv\')',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_04',
    tasks: [
      'Upload Assignment_04 finance files.',
      'If weekend vs weekday using dayOfWeek.',
      'Weekday: Filter finance_*.csv → ForEach Copy.',
      'Weekend: Get Metadata exists on heartbeat.csv → If exists Copy.',
      'Use formatDateTime for run folder `bronze/finance/runs/yyyyMMdd/`.',
    ],
    expressionChallenges: [
      {
        prompt: 'Weekend check with dayOfWeek.',
        hint: '@or(equals(dayOfWeek(utcnow()),0), equals(dayOfWeek(utcnow()),6))',
      },
      {
        prompt: 'Filter finance_*.csv with startswith + endswith.',
        hint: "and(startswith(item().name,'finance_'), endswith(item().name,'.csv'))",
      },
    ],
    acceptance: [
      'Weekday path processes only finance_*.csv.',
      'Weekend path only heartbeat (if present).',
      'random.csv is never processed on weekday filter.',
    ],
    stretch: 'Parameter ForceWeekday (bool) for testing both branches any day.',
  },
  {
    id: 'adf-05',
    number: 5,
    level: 'Hard',
    title: 'Archive files by name date OR lastModified (stale cleanup)',
    scenario:
      'Landing `/landing/raw/` has files. Archive files older than `@pipeline().parameters.RetentionDays` (default 7) based on Get Metadata lastModified into `/archive/raw/yyyy/MM/`, then delete from landing. For lab testing you may also practice filtering names that contain `_old_`.',
    businessGoal:
      'Keep landing clean with a retention policy.',
    activities: ['Get Metadata', 'Filter', 'ForEach', 'If', 'Copy', 'Delete'],
    expressionsFocus: [
      'addDays(utcnow(), mul(pipeline().parameters.RetentionDays, -1))',
      'less(item().lastModified, variables(\'cutoff\'))',
      'contains(item().name, \'_old_\') optional lab helper',
      'formatDateTime(item().lastModified, \'yyyy/MM\')',
      'concat archive path',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_05',
    tasks: [
      'Upload Assignment_05 files (see README for lastModified testing tips).',
      'Parameter RetentionDays.',
      'Get Metadata / ForEach files → If older than cutoff → Copy archive → Delete.',
      'Archive path year/month from file lastModified.',
      'Skip folders (type/itemType check).',
    ],
    expressionChallenges: [
      {
        prompt: 'Compute cutoff from RetentionDays.',
        hint: 'addDays(utcnow(), mul(pipeline().parameters.RetentionDays, -1))',
      },
      {
        prompt: 'Build archive path from lastModified.',
        hint: "concat('archive/raw/', formatDateTime(item().lastModified,'yyyy'), '/', formatDateTime(item().lastModified,'MM'), '/', item().name)",
      },
    ],
    acceptance: [
      'Newer files remain in landing.',
      'Older files archived under yyyy/MM and removed from landing.',
      'Empty archive run does not fail.',
    ],
    stretch: 'Also support a pipeline parameter UseNameFlag — if true, archive when name contains `_old_`.',
  },
  {
    id: 'adf-06',
    number: 6,
    level: 'Hard',
    title: 'Metadata-driven multi-folder file ingest (config Lookup — no watermark)',
    scenario:
      'A control file `ingest_config.csv` lists SourceFolder, FilePattern, SinkFolder, IsActive. Example: customers + `.csv` → bronze/customers; products + `.csv` → bronze/products. Lookup config, Filter IsActive, ForEach each config row: Get Metadata on that source folder, Filter files by pattern (endswith / contains), Copy to `/bronze/{SinkFolder}/yyyy/MM/dd/`.',
    businessGoal:
      'Onboard new landing folders by editing a config file — one reusable pipeline.',
    activities: ['Lookup', 'Filter', 'ForEach', 'Get Metadata', 'Copy'],
    expressionsFocus: [
      'activity(\'LookupConfig\').output.value',
      'item().SourceFolder / item().SinkFolder / item().FilePattern',
      'endswith(item().name, item().FilePattern) inside nested loop',
      'toLower / contains',
      'concat bronze path with SinkFolder + date parts',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_06',
    tasks: [
      'Upload Assignment_06 control + landing folders.',
      'Lookup ingest_config.csv (all rows).',
      'Filter IsActive = Y/true.',
      'ForEach config row → Get Metadata Child Items on SourceFolder.',
      'Nested ForEach (or Filter) files matching FilePattern → Copy.',
      'Inactive config row (returns) must be skipped.',
    ],
    expressionChallenges: [
      {
        prompt: 'Filter active config rows.',
        hint: "or(equals(toUpper(item().IsActive),'Y'), equals(toLower(string(item().IsActive)),'true'))",
      },
      {
        prompt: 'Build sink path from item().SinkFolder + utcnow.',
        hint: "concat('bronze/', item().SinkFolder, '/', formatDateTime(utcnow(),'yyyy'), '/', ...)",
      },
      {
        prompt: 'Match files using config FilePattern.',
        hint: 'endswith(toLower(item().name), toLower(items(\'ForEachConfig\').FilePattern)) — use correct items() scope names.',
      },
    ],
    acceptance: [
      'Active folders (customers, products) load to correct bronze sinks.',
      'Inactive returns folder is skipped.',
      'Non-matching extensions in a folder are skipped.',
    ],
    stretch: 'Add Switch on FilePattern (.csv vs .json) for different dataset types.',
  },
  {
    id: 'adf-07',
    number: 7,
    level: 'Hard',
    title: 'Pre-load validation gate (exists / size / type / lastModified)',
    scenario:
      'Partner must drop `orders_YYYYMMDD.csv` (today’s date) into `/landing/orders/`. Lookup expected prefix from control config, build expected filename with concat + formatDateTime, Get Metadata (exists, size, itemType, lastModified). If all checks pass → Copy to bronze; else Fail with a clear concat reason. Sample pack includes a good file template, an empty file, and a wrong-date file.',
    businessGoal:
      'Block empty/missing/wrong-day files before bronze.',
    activities: ['Lookup', 'Get Metadata', 'If', 'Copy', 'Fail'],
    expressionsFocus: [
      'concat(prefix, formatDateTime(utcnow(),\'yyyyMMdd\'), \'.csv\')',
      'activity(\'GetMetaFile\').output.exists / size / itemType / lastModified',
      'and(...) multi validation',
      'endswith / equals / string / concat failure message',
    ],
    sampleFolder: 'docs/ADF_Assignments/Assignment_07',
    tasks: [
      'Upload Assignment_07 files; rename/copy template to today’s `orders_yyyyMMdd.csv` (see README).',
      'Lookup control/expected_config.csv for Prefix.',
      'Set Variable ExpectedFileName.',
      'Get Metadata on that file: exists, size, itemType, lastModified.',
      'If and(...) all good → Copy; else Fail with concat reason.',
    ],
    expressionChallenges: [
      {
        prompt: 'Build ExpectedFileName from Lookup Prefix + today.',
        hint: "concat(activity('LookupCfg').output.firstRow.Prefix, formatDateTime(utcnow(),'yyyyMMdd'), '.csv')",
      },
      {
        prompt: 'Master validation and(...) expression.',
        hint: 'exists + greater(size,0) + equals(itemType,\'File\') + lastModified day equals today + endswith .csv',
      },
      {
        prompt: 'Human-readable Fail message with concat + string().',
        hint: "concat('Validation failed for ', variables('ExpectedFileName'), ' exists=', string(...))",
      },
    ],
    acceptance: [
      'Missing/empty/wrong-day file fails with clear reason.',
      'Valid today’s file copies to dated bronze folder.',
    ],
    stretch: 'On failure, if file exists, Copy it to quarantine before Fail.',
  },
]

export const adfAssignmentMeta = {
  course: 'Azure Data Factory',
  total: 7,
  difficulty: 'Medium → Hard',
  activitiesCovered: [
    'Copy',
    'ForEach',
    'If Condition',
    'Switch',
    'Filter',
    'Get Metadata',
    'Lookup',
  ],
  expressionSkills: [
    'concat',
    'contains',
    'endswith / startswith',
    'toLower / toUpper / string',
    'formatDateTime / utcnow / dayOfWeek / addDays',
    'equals / and / or / if',
    'item().name / lastModified / type',
    'activity(\'...\').output',
  ],
  note: 'No watermark topics — Lookup is used for control/config file lists only.',
}

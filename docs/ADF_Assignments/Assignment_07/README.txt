ASSIGNMENT 07 — Setup (Validation gate)
=======================================
Upload:
  control/expected_config.csv -> /control/expected_config.csv
  landing/orders/*            -> /landing/orders/

BEFORE running on lab day:
  1) Copy orders_TEMPLATE.csv and RENAME it to today's file:
       orders_YYYYMMDD.csv
     Example: if today is 11 Sep 2026 -> orders_20260911.csv
  2) Keep orders_EMPTY.csv (0 bytes) to test size > 0 failure
  3) Keep orders_20240101.csv to test wrong-day / wrong name failure

Pipeline must:
  Lookup Prefix from expected_config.csv
  Build ExpectedFileName = concat(Prefix, formatDateTime(utcnow(),'yyyyMMdd'), '.csv')
  Get Metadata: exists, size, itemType, lastModified
  If all pass -> Copy to /bronze/orders/yyyy/MM/dd/
  Else Fail with clear concat message

Activities: Lookup, Get Metadata, If, Copy, Fail

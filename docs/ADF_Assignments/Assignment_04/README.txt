ASSIGNMENT 04 — Setup (Weekday vs Weekend If)
============================================
Upload landing/finance/* to /landing/finance/

Weekday branch should copy ONLY:
  finance_gl_01.csv, finance_gl_02.csv
  (startswith 'finance_' AND endswith '.csv')

Weekend branch should copy ONLY:
  heartbeat.csv (if exists)

Never process on weekday filter:
  random.csv

Tip: Add pipeline parameter ForceWeekday to test both branches any day.

Activities: If, Get Metadata, Filter, ForEach, Copy
